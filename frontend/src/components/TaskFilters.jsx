function TaskFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  onAddTaskClick,
}) {
  return (
    <section className="filters-card" aria-label="Task actions and filters">
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search tasks..."
        aria-label="Search tasks"
      />
      <div className="filter-row">
        <div className="segmented-control" aria-label="Filter by status">
          <button
            type="button"
            className={statusFilter === 'all' ? 'active' : ''}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={statusFilter === 'pending' ? 'active' : ''}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            type="button"
            className={statusFilter === 'done' ? 'active' : ''}
            onClick={() => setStatusFilter('done')}
          >
            Done
          </button>
        </div>
        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          aria-label="Filter by priority"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="button" className="add-task-trigger" onClick={onAddTaskClick}>
        + Add Task
      </button>
    </section>
  )
}

export default TaskFilters
