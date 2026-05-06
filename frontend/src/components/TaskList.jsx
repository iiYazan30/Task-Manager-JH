import TaskItem from './TaskItem'

function TaskList({ tasks }) {
  return (
    <section className="task-list-card" aria-labelledby="task-list-title">
      <div className="section-heading compact">
        <span>Current Tasks</span>
        <h2 id="task-list-title">Team queue</h2>
      </div>
      <div className="task-list">
        {tasks.map((task) => <TaskItem key={task.id} task={task} />)}
      </div>
    </section>
  )
}

export default TaskList
