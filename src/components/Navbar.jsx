// Contributor: Alankrit Narang & Placement Team - Navigation Bar Component
// Feature: Scroll-aware animations, theme toggle, sleek active states
import { useState, useEffect } from 'react';

export default function Navbar({
  activeTab,
  setActiveTab,
  onTabSelect,
  shortlistedCount = 0,
  onChangeCollege,
  onLogin,
  onOpenQuestions,
  user = null,
  onLogout = null,
  theme = 'dark',
  onToggleTheme = null,
  tabs = [
    { id: 'recruiters', label: 'Recruiters' },
    { id: 'branches', label: 'Branches' },
    { id: 'insights', label: 'Insights' },
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
        <button
          type="button"
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
          title="Placement Analytics"
          aria-label="Placement Analytics, go to the top of the page"
        >
          <svg className="nav-brand-mark" viewBox="0 0 28 28" aria-hidden="true">
            <path d="M4 23h20" />
            <path d="M7 20v-5M13 20v-9M19 20V7" />
            <path d="m5 12 6-4 5 2 7-6" />
            <path d="M18 4h5v5" />
          </svg>
          <span className="nav-brand-wordmark">Placement <strong>Analytics</strong></span>
        </button>

        {/* Center Navigation Tabs */}
        <nav className="nav-center-tabs" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const shortLabels = { recruiters: 'Directory', branches: 'Branches', insights: 'Insights' };
            return (
              <button
                key={tab.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (onTabSelect) {
                    onTabSelect(tab.id);
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={tab.label}
              >
                <span className="nav-tab-label">{shortLabels[tab.id] || tab.label}</span>
                {tab.id === 'recruiters' && shortlistedCount > 0 && (
                  <span className="nav-shortlist-badge">{shortlistedCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="nav-right">
          {/* Top Questions Bank Button */}
          {onOpenQuestions && (
            <button
              type="button"
              className="btn-top-questions"
              onClick={() => onOpenQuestions('All')}
              title="Top Companies Mostly Asked Interview Questions"
              aria-label="Top Companies Mostly Asked Questions"
            >
              <span className="btn-tq-label">Interview questions</span>
            </button>
          )}

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
              <span className="btn-change-college-label">Change campus</span>
              <span className="btn-change-college-badge">Preview</span>
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
                <span>Sign in</span>
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
