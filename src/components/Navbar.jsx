// Contributor: Alankrit Narang - Navigation Bar Component
export default function Navbar({
  activeTab,
  setActiveTab,
  onTabSelect,
  shortlistedCount = 0,
  onChangeCollege,
  onLogin,
  onOpenQuestions,
  tabs = [
    { id: 'recruiters', label: 'Recruiters Directory', icon: '🏢' },
    { id: 'branches', label: 'Branch Analytics', icon: '🎓' },
    { id: 'insights', label: 'Placement Insights', icon: '📊' },
  ],
}) {
  const handleTabClick = (tabId, e) => {
    if (e) {
      e.preventDefault();
    }
    if (onTabSelect) {
      onTabSelect(tabId);
    } else if (setActiveTab) {
      setActiveTab(tabId);
    }
  };

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <div
          className="nav-brand"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (window.location.hash) {
              try {
                window.history.pushState(null, '', window.location.pathname + window.location.search);
              } catch {
                window.location.hash = '';
              }
            }
          }}
          title="Return to top of page"
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
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={(e) => handleTabClick(tab.id, e)}
                role="tab"
                aria-selected={isActive}
              >
                <span className="nav-tab-icon">{tab.icon}</span>
                <span className="nav-tab-label">{tab.label}</span>
                {tab.id === 'recruiters' && shortlistedCount > 0 && (
                  <span className="nav-shortlist-badge">{shortlistedCount}</span>
                )}
              </a>
            );
          })}
        </nav>

        <div className="nav-right">
          {onOpenQuestions && (
            <button
              type="button"
              className="btn-top-questions"
              onClick={onOpenQuestions}
              title="Top Companies Mostly Asked Interview Questions"
              aria-label="Top Companies Mostly Asked Questions"
            >
              <span className="btn-tq-icon">💡</span>
              <span className="btn-tq-label">Top Questions</span>
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
