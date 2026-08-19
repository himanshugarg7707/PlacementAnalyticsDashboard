export default function Navbar({ activeTab, setActiveTab, onExportCSV }) {
  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="nav-logo">NITKKR</div>
          <div className="nav-title-group">
            <span className="inst-name">NIT Kurukshetra</span>
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
          <button className="nav-export-btn" onClick={onExportCSV}>
            📥 Export CSV
          </button>
        </div>
      </div>
    </header>
  );
}
