export default function Navbar({ activeTab, setActiveTab, shortlistedCount = 0 }) {
  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="nav-logo">IITB</div>
          <div className="nav-title-group">
            <span className="inst-name">IIT Bombay</span>
            <span className="portal-sub">Placement Records 2024–25</span>
          </div>
        </div>

        {/* Center Tab Switcher */}
        <div className="nav-center-tabs">
          <button
            className={`nav-tab-btn ${activeTab === 'recruiters' ? 'active' : ''}`}
            onClick={() => setActiveTab('recruiters')}
          >
            🏢 Recruiters Directory
            {shortlistedCount > 0 && (
              <span className="nav-shortlist-badge">{shortlistedCount}</span>
            )}
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'branches' ? 'active' : ''}`}
            onClick={() => setActiveTab('branches')}
          >
            🎓 Branch-Wise Insights
          </button>
        </div>

        <div className="nav-right">
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            <span>Season Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
