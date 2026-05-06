function formatLabel(value) {
  if (!value) {
    return ''
  }

  return value.charAt(0).toUpperCase() + value.slice(1)
}

function formatDate(value) {
  if (!value) {
    return 'No date'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'No date'
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date)
}

function TaskItem({ task, onToggleStatus, onDelete }) {
  const statusClass = task.status === 'done' ? 'done' : 'pending'
  const priorityClass = task.priority || 'medium'
  const priorityLabel = formatLabel(priorityClass)
  const statusLabel = formatLabel(task.status)

  return (
    <article className="task-card">
      <span className={`task-status-icon ${statusClass}`} aria-hidden="true"></span>
      <div className="task-content">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <button
            className="icon-button"
            type="button"
            onClick={() => onDelete(task._id)}
            aria-label={`Delete ${task.title}`}
          >
            <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
              <path d="M8 8h8M10 11v6M14 11v6M6 8l1 12h10l1-12M9 8V5h6v3" />
            </svg>
          </button>
        </div>
        <p>{task.description}</p>
        <div className="task-meta">
          <span>Assigned to {task.assignedTo || 'Unassigned'}</span>
          <span>{formatDate(task.createdAt)}</span>
        </div>
        <div className="task-footer">
          <div className="badge-row">
            <span className={`badge priority-${priorityClass}`}>{priorityLabel} Priority</span>
            <span className={`badge status-${statusClass}`}>
              {statusLabel}
            </span>
          </div>
          <button className="task-action" type="button" onClick={() => onToggleStatus(task._id)}>
            {task.status === 'done' ? 'Mark as Pending' : 'Mark as Done'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default TaskItem
