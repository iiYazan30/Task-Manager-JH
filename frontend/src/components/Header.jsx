function Header() {
  return (
    <header className="dashboard-header">
      <div>
        <span className="workspace-badge">Workspace: JH Team Demo</span>
        <h1>TaskFlow</h1>
        <p>Simple task management for focused teams</p>
      </div>
      <div className="header-actions" aria-label="Workspace overview">
        <span className="status-dot"></span>
        <span>Live workspace</span>
      </div>
    </header>
  )
}

export default Header
