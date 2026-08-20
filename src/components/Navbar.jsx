/**
 * Navbar Component
 * 
 * Top navigation bar for the IIT Bombay Placement Portal.
 * Provides tab-based navigation between Dashboard, Recruiters Directory,
 * and Branch-Wise Insights views.
 * 
 * @param {Object} props
 * @param {string} props.activeTab - Currently active navigation tab
 * @param {Function} props.setActiveTab - Callback to change the active tab
 * @param {number} [props.shortlistedCount=0] - Number of shortlisted companies to show as badge
 */
export default function Navbar({ activeTab, setActiveTab, shortlistedCount = 0 }) {
  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        {/* Brand Logo and Institution Name */}
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
