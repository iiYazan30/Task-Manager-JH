import { useState } from 'react'

const initialFormState = {
  title: '',
  assignedTo: '',
  description: '',
  priority: 'medium',
}

function TaskForm({ error, onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialFormState)
  const [submitting, setSubmitting] = useState(false)

  function updateField(field, value) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formData.title.trim()) {
      return
    }

    try {
      setSubmitting(true)
      await onSubmit({
        title: formData.title.trim(),
        assignedTo: formData.assignedTo.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
      })
      setFormData(initialFormState)
    } catch {
      return
    } finally {
      setSubmitting(false)
    }
  }

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

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-row two-column">
          <label>
            Task Title
            <input
              type="text"
              value={formData.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="What needs to get done?"
            />
          </label>

          <label>
            Assigned To
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(event) => updateField('assignedTo', event.target.value)}
              placeholder="Team member name"
            />
          </label>
        </div>

        <label>
          Description
          <textarea
            rows="5"
            value={formData.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Add helpful context for the task"
          ></textarea>
        </label>

        <div className="form-row priority-row">
          <label>
            Priority
            <select
              value={formData.priority}
              onChange={(event) => updateField('priority', event.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="secondary-action" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primary-action" disabled={!formData.title.trim() || submitting}>
            {submitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm
