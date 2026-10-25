// Contributor: Alankrit Narang - Navigation Bar Component
export default function Navbar({
  activeTab,
  setActiveTab,
  shortlistedCount = 0,
  onChangeCollege,
  onLogin,
  theme,
  onToggleTheme,
  tabs = [
    { id: 'recruiters', label: 'Recruiters Directory', icon: '🏢' },
    { id: 'branches', label: 'Branch Analytics', icon: '🎓' },
    { id: 'insights', label: 'Placement Insights', icon: '📊' },
  ],
}) {
  const isLight = theme === 'light';

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
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

        <div className="nav-right">
          {onToggleTheme && (
            <button
              type="button"
              className="btn-theme-toggle"
              onClick={onToggleTheme}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <span className="theme-toggle-icon">
                {isLight ? '☀️' : '🌙'}
              </span>
              <span className="theme-toggle-label">
                {isLight ? 'Light' : 'Dark'}
              </span>
            </button>
          )}

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
