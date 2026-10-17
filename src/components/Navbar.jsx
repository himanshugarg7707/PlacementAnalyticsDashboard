// Contributor: Alankrit Narang & Placement Team - Navigation Bar Component
// Feature: Scroll-aware animations, theme toggle, sleek active states
import { useState, useEffect } from 'react';

export default function Navbar({
  activeTab,
  setActiveTab,
  shortlistedCount = 0,
  onChangeCollege,
  onLogin,
  user = null,
  onLogout = null,
  theme = 'dark',
  onToggleTheme = null,
  tabs = [
    { id: 'recruiters', label: 'Recruiters Directory', icon: '🏢' },
    { id: 'branches', label: 'Branch Analytics', icon: '🎓' },
    { id: 'insights', label: 'Placement Insights', icon: '📊' },
  ],
}) {
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for navbar shrink/glass elevation
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      role="banner"
    >
      <div className="navbar-inner">
        {/* Brand Group */}
        <div
          className="nav-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="IIT Bombay Placement Records"
        >
          <div className="nav-logo">IITB</div>
          <div className="nav-title-group">
            <span className="inst-name">IIT Bombay</span>
            <span className="portal-sub">Placement Records 2024–25</span>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="nav-center-tabs" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
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

        {/* Right Actions */}
        <div className="nav-right">
          {/* Theme Toggle Capsule */}
          {onToggleTheme && (
            <button
              type="button"
              className="btn-theme-toggle"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              <span className={`theme-toggle-pill ${theme === 'dark' ? 'is-dark' : 'is-light'}`}>
                <span className="theme-toggle-icon theme-icon-sun" title="Light Mode">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                  </svg>
                </span>
                <span className="theme-toggle-icon theme-icon-moon" title="Dark Mode">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                </span>
              </span>
            </button>
          )}

          {/* Change College */}
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

          {/* User Profile or Login */}
          {user ? (
            <div className="nav-user-profile">
              <span className="nav-user-badge">
                <span>{user.role === 'admin' ? '🛡️' : user.role === 'recruiter' ? '🏢' : '🎓'}</span>
                <span>{user.name ? user.name.split(' ')[0] : 'User'}</span>
              </span>
              <button
                type="button"
                className="btn-logout font-mono"
                onClick={onLogout}
                title="Log Out of Portal"
              >
                Logout
              </button>
            </div>
          ) : (
            onLogin && (
              <button
                type="button"
                className="btn-login-capsule"
                onClick={onLogin}
                title="Sign In / Register"
                aria-label="Login"
              >
                <span className="btn-login-icon">👤</span>
                <span>Login</span>
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
