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
  onChangeCollege,
  onLogin,
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

        {/* Right-side Action Buttons */}
        <div className="nav-right">
          {onChangeCollege && (
            <button
              type="button"
              className="btn-change-college"
              onClick={onChangeCollege}
              title="Switch College / Campus"
              aria-label="Change College"
            >
              <span className="btn-change-college-icon">🏛️</span>
              <span className="btn-change-college-label">Change College</span>
              <span className="btn-change-college-badge">Beta</span>
            </button>
          )}

          {onLogin && (
            <button
              type="button"
              className="btn-login"
              onClick={onLogin}
              title="Sign In / Portal Login"
              aria-label="Login"
            >
              <span className="btn-login-icon">👤</span>
              <span className="btn-login-label">Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
