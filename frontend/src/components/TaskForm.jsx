import { useState } from 'react'

function TaskForm({ onClose }) {
  const [title, setTitle] = useState('')

  return (
    <section
      className="modal-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <div className="modal-header">
        <div>
          <span>Add New Task</span>
          <h2 id="task-form-title">Add New Task</h2>
        </div>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close add task form">
          x
        </button>
      </div>

      <form className="task-form" onSubmit={(event) => event.preventDefault()}>
        <div className="form-row two-column">
          <label>
            Task Title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to get done?"
            />
          </label>

          <label>
            Assigned To
            <input type="text" placeholder="Team member name" />
          </label>
        </div>

        <label>
          Description
          <textarea rows="5" placeholder="Add helpful context for the task"></textarea>
        </label>

        <div className="form-row priority-row">
          <label>
            Priority
            <select defaultValue="Medium">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" className="secondary-action" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primary-action" disabled={!title.trim()}>
            Add Task
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm
