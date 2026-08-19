import { useState, useMemo } from 'react';
import { companies, collegeInfo } from '../data/placementData';
import PlacementTable from './PlacementTable';

export default function CompanyTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const placementPct = ((collegeInfo.totalPlaced / collegeInfo.totalStudents) * 100).toFixed(1);

  return (
    <section>
      {/* Hero Content for Companies view */}
      <div className="hero-content-section" style={{ maxWidth: '100%', textAlign: 'left', padding: 0, marginBottom: 24 }}>
        <div className="hero-badge">
          <span className="badge-pulse" aria-hidden="true"></span>
          {companies.length} Campus Recruiters — Session {collegeInfo.session}
        </div>
        <h2 className="hero-title" style={{ fontSize: 36, textAlign: 'left' }}>
          Company <span className="hero-title-accent">Records</span>
        </h2>
        <p className="hero-subtitle" style={{ textAlign: 'left', maxWidth: 700 }}>
          Browse all recruiting companies, CTC packages, and hiring data.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="hero-stats-glass-bar" style={{ marginBottom: 20 }}>
        <div className="stat-item">
          <span className="stat-label">Companies</span>
          <span className="stat-val font-mono highlight-ice-aqua">{collegeInfo.totalCompanies}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-label">Total Offers</span>
          <span className="stat-val font-mono">{collegeInfo.totalOffers}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-label">Super Dream</span>
          <span className="stat-val font-mono highlight-ice-aqua">{collegeInfo.superDreamOffers}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-label">Dream</span>
          <span className="stat-val font-mono">{collegeInfo.dreamOffers}</span>
        </div>
      </div>

      {/* Search & Tier Filters */}
      <div className="hero-filter-bar" style={{ maxWidth: '100%', marginBottom: 20 }}>
        <div className="hero-search-input-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="hero-search-input"
            placeholder="Search company, sector, branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search companies"
            id="company-search"
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>
        <div className="hero-tier-pills">
          {['All', 'Super Dream', 'Dream', 'Normal'].map((type) => (
            <button
              key={type}
              className={`tier-pill ${filterType === type ? 'active' : ''}`}
              onClick={() => setFilterType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Placement Table */}
      <PlacementTable
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
      />
    </section>
  );
}
