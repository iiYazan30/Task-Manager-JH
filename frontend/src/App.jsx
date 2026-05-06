import { useState } from 'react'
import Header from './components/Header'
import StatsCards from './components/StatsCards'
import TaskFilters from './components/TaskFilters'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const tasks = [
  {
    id: 1,
    title: 'Design landing page mockup',
    description: 'Create a polished responsive dashboard concept for the new marketing page.',
    assignedTo: 'Maya Chen',
    priority: 'High',
    status: 'pending',
    date: 'May 06, 2026',
  },
  {
    id: 2,
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated checks and deployment steps for the frontend app.',
    assignedTo: 'Omar Hale',
    priority: 'Medium',
    status: 'done',
    date: 'May 05, 2026',
  },
  {
    id: 3,
    title: 'Update documentation',
    description: 'Refresh setup notes, scripts, and task workflow details for the team.',
    assignedTo: 'Jordan Lee',
    priority: 'Low',
    status: 'pending',
    date: 'May 04, 2026',
  },
]

const stats = [
  { label: 'Total Tasks', value: tasks.length, helper: 'Across the workspace' },
  { label: 'Pending Tasks', value: tasks.filter((task) => task.status === 'pending').length, helper: 'Waiting for action' },
  { label: 'Completed Tasks', value: tasks.filter((task) => task.status === 'done').length, helper: 'Finished this cycle' },
  { label: 'High Priority', value: tasks.filter((task) => task.priority === 'High').length, helper: 'Needs attention' },
]

function App() {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  return (
    <main className="task-dashboard">
      <Header />
      <StatsCards stats={stats} />
      <section className="task-panel" aria-label="Task management workspace">
        <TaskFilters onAddTask={() => setIsTaskFormOpen(true)} />
        <TaskList tasks={tasks} />
      </section>

      {isTaskFormOpen && (
        <div className="modal-overlay" role="presentation">
          <TaskForm onClose={() => setIsTaskFormOpen(false)} />
        </div>
      )}
    </main>
  )
}

export default App
