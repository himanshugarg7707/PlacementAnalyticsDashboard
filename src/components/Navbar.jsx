/**
 * Navbar Component
 * 
 * Unified top navigation bar for the IIT Bombay Placement Portal.
 * Provides sleek, centralized tab navigation between Recruiters Directory,
 * Branch Analytics, and Placement Insights views.
 */
export default function Navbar({
  activeTab,
  setActiveTab,
  shortlistedCount = 0,
  tabs = [
    { id: 'recruiters', label: 'Recruiters Directory', icon: '🏢' },
    { id: 'branches', label: 'Branch Analytics', icon: '🎓' },
    { id: 'insights', label: 'Placement Insights', icon: '📊' },
  ],
}) {
  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        {/* Brand Logo and Institution Name */}
        <div
          className="nav-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="nav-logo">IITB</div>
          <div className="nav-title-group">
            <span className="inst-name">IIT Bombay</span>
            <span className="portal-sub">Placement Records 2024–25</span>
          </div>
        </div>

        {/* Unified Center Tab Switcher */}
        <nav className="nav-center-tabs" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-tab-icon">{tab.icon}</span>
                <span className="nav-tab-label">{tab.label}</span>
                {tab.id === 'recruiters' && shortlistedCount > 0 && (
                  <span className="nav-shortlist-badge">{shortlistedCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right-side Status Indicator */}
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
