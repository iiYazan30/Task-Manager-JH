function StatsCards({ stats }) {
  return (
    <section className="stats-grid" aria-label="Task summary">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
          <p>{stat.helper}</p>
        </article>
      ))}
    </section>
  )
}

export default StatsCards
