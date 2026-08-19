import { useState } from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'companies', label: 'Companies' },
    { id: 'branches', label: 'Branch Wise' },
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <div className="nav-brand" onClick={() => setActiveTab('dashboard')}>
          <div className="nav-logo" aria-hidden="true">NK</div>
          <div className="nav-title-group">
            <span className="inst-name">NIT Kurukshetra</span>
            <span className="portal-sub">Campus Placement Cell</span>
          </div>
        </div>

        <div className="nav-center-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <div className="status-indicator">
            <span className="pulse-dot" aria-hidden="true"></span>
            Live 2024-25
          </div>
        </div>
      </div>
    </nav>
  );
}