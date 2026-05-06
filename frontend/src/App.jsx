import { useEffect, useMemo, useState } from 'react'
import { createTask, deleteTask, getTasks, toggleTaskStatus } from './api/taskApi'
import Header from './components/Header'
import StatsCards from './components/StatsCards'
import TaskFilters from './components/TaskFilters'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function getTaskArray(data) {
  if (Array.isArray(data)) {
    return data
  }

  return data?.tasks || []
}

function getTaskPayload(data) {
  return data?.task || data?.newTask || data?.updatedTask || data
}

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadTasks() {
      try {
        setLoading(true)
        setError('')
        const data = await getTasks()

        if (isMounted) {
          setTasks(getTaskArray(data))
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadTasks()

    return () => {
      isMounted = false
    }
  }, [])

  const stats = useMemo(() => [
    { label: 'Total Tasks', value: tasks.length, helper: 'Across the workspace' },
    { label: 'Pending Tasks', value: tasks.filter((task) => task.status === 'pending').length, helper: 'Waiting for action' },
    { label: 'Completed Tasks', value: tasks.filter((task) => task.status === 'done').length, helper: 'Finished this cycle' },
    { label: 'High Priority', value: tasks.filter((task) => task.priority === 'high').length, helper: 'Needs attention' },
  ], [tasks])

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesSearch = !normalizedSearch
        || task.title?.toLowerCase().includes(normalizedSearch)
        || task.description?.toLowerCase().includes(normalizedSearch)
        || task.assignedTo?.toLowerCase().includes(normalizedSearch)
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [priorityFilter, searchTerm, statusFilter, tasks])

  async function handleCreateTask(formData) {
    try {
      setFormError('')
      const data = await createTask(formData)
      const createdTask = getTaskPayload(data)

      if (createdTask?._id) {
        setTasks((currentTasks) => [createdTask, ...currentTasks])
      } else {
        const latestData = await getTasks()
        setTasks(getTaskArray(latestData))
      }

      setIsTaskFormOpen(false)
    } catch (err) {
      setFormError(err.message)
      throw err
    }
  }

  async function handleToggleStatus(taskId) {
    try {
      setError('')
      const data = await toggleTaskStatus(taskId)
      const updatedTask = getTaskPayload(data)

      if (updatedTask?._id) {
        setTasks((currentTasks) => currentTasks.map((task) => (
          task._id === taskId ? updatedTask : task
        )))
      } else {
        const latestData = await getTasks()
        setTasks(getTaskArray(latestData))
      }
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDeleteTask(taskId) {
    const shouldDelete = window.confirm('Delete this task?')

    if (!shouldDelete) {
      return
    }

    try {
      setError('')
      await deleteTask(taskId)
      setTasks((currentTasks) => currentTasks.filter((task) => task._id !== taskId))
    } catch (err) {
      setError(err.message)
    }
  }

  function handleOpenTaskForm() {
    setFormError('')
    setIsTaskFormOpen(true)
  }

  return (
    <main className="task-dashboard">
      <Header />
      <StatsCards stats={stats} />
      <section className="task-panel" aria-label="Task management workspace">
        <TaskFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          onAddTaskClick={handleOpenTaskForm}
        />
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          error={error}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteTask}
        />
      </section>

      {isTaskFormOpen && (
        <div className="modal-overlay" role="presentation">
          <TaskForm
            error={formError}
            onClose={() => setIsTaskFormOpen(false)}
            onSubmit={handleCreateTask}
          />
        </div>
      )}
    </main>
  )
}

export default App
