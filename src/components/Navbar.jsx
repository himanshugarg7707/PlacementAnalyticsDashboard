export default function Navbar({ activeTab, setActiveTab, onExportCSV }) {
  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'companies', label: '🏢 Recruiters Directory' },
    { id: 'branches', label: '🎓 Branch-Wise Insights' },
  ];

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <div
          className="nav-brand"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setActiveTab('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="nav-logo">NITKKR</div>
          <div className="nav-title-group">
            <span className="inst-name">NIT Kurukshetra</span>
            <span className="portal-sub">Placement Records 2024–25</span>
          </div>
        </div>

        {/* Center Tab Switcher */}
        <div className="nav-center-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            <span>Season Active</span>
          </div>
          {onExportCSV && (
            <button className="nav-export-btn" onClick={onExportCSV}>
              📥 Export CSV
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

