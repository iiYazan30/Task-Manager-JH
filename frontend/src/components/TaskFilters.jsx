function TaskFilters({ onAddTask }) {
  return (
    <section className="filters-card" aria-label="Task actions and filters">
      <input type="search" placeholder="Search tasks..." aria-label="Search tasks" />
      <div className="filter-row">
        <div className="segmented-control" aria-label="Filter by status">
          <button type="button" className="active">All</button>
          <button type="button">Pending</button>
          <button type="button">Done</button>
        </div>
        <select defaultValue="all" aria-label="Filter by priority">
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="button" className="add-task-trigger" onClick={onAddTask}>
        + Add Task
      </button>
    </section>
  )
}

export default TaskFilters
