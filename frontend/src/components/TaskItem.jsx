function TaskItem({ task }) {
  const statusClass = task.status === 'done' ? 'done' : 'pending'
  const priorityClass = task.priority.toLowerCase()

  return (
    <article className="task-card">
      <span className={`task-status-icon ${statusClass}`} aria-hidden="true"></span>
      <div className="task-content">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <button className="icon-button" type="button" aria-label={`Delete ${task.title}`}>
            <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
              <path d="M8 8h8M10 11v6M14 11v6M6 8l1 12h10l1-12M9 8V5h6v3" />
            </svg>
          </button>
        </div>
        <p>{task.description}</p>
        <div className="task-meta">
          <span>Assigned to {task.assignedTo}</span>
          <span>{task.date}</span>
        </div>
        <div className="task-footer">
          <div className="badge-row">
            <span className={`badge priority-${priorityClass}`}>{task.priority} Priority</span>
            <span className={`badge status-${statusClass}`}>
              {task.status === 'done' ? 'Done' : 'Pending'}
            </span>
          </div>
          <button className="task-action" type="button">
            {task.status === 'done' ? 'Mark as Pending' : 'Mark as Done'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default TaskItem
