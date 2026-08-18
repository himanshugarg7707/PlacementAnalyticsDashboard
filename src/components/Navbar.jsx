import { useState } from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'companies', label: 'Companies' },
    { id: 'branches', label: 'Branch Wise' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="navbar-logo" aria-hidden="true">NK</div>
          <div className="navbar-title">
            <h1>NIT Kurukshetra</h1>
            <span>Campus Placement Cell</span>
          </div>
        </div>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}