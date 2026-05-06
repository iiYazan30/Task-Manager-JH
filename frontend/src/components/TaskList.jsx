import TaskItem from './TaskItem'

function TaskList({ tasks, loading, error, onToggleStatus, onDelete }) {
  return (
    <section className="task-list-card" aria-labelledby="task-list-title">
      <div className="section-heading compact">
        <span>Current Tasks</span>
        <h2 id="task-list-title">Team queue</h2>
      </div>
      {loading && <div className="state-card">Loading tasks...</div>}
      {error && <div className="alert-error">{error}</div>}
      {!loading && !error && tasks.length === 0 && (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Try changing the filters or add a new task.</p>
        </div>
      )}
      {!loading && !error && tasks.length > 0 && (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default TaskList
