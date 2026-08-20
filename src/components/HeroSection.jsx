import { useState, useEffect } from 'react';
import { collegeInfo } from '../data/placementData';

export default function HeroSection({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  shortlistedCount = 0,
}) {
  // Animated metric counters on mount
  const [animatedHighest, setAnimatedHighest] = useState(0);
  const [animatedAvg, setAnimatedAvg] = useState(0);
  const [animatedOffers, setAnimatedOffers] = useState(0);
  const [animatedCompanies, setAnimatedCompanies] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setAnimatedHighest(Number((ease * collegeInfo.highestPackage).toFixed(1)));
      setAnimatedAvg(Number((ease * collegeInfo.averagePackage).toFixed(1)));
      setAnimatedOffers(Math.floor(ease * collegeInfo.totalOffers));
      setAnimatedCompanies(Math.floor(ease * collegeInfo.totalCompanies));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  const quickCategories = [
    { id: 'All', label: 'All Recruiters', count: collegeInfo.totalCompanies },
    { id: 'Super Dream', label: 'Super Dream (>20L)', count: collegeInfo.superDreamOffers },
    { id: 'Dream', label: 'Dream (10-20L)', count: collegeInfo.dreamOffers },
    { id: 'Normal', label: 'Core / Normal', count: collegeInfo.normalOffers },
  ];

  return (
    <div className="hero-master-wrapper">
      {/* ── STANDALONE PHOTO BANNER ── */}
      <div className="campus-showcase-card">
        <div className="campus-image-container">
          <img
            src="/campus-bg.png"
            alt="Indian Institute of Technology Bombay Main Gate and Emblem Wall"
            className="campus-hero-img"
          />
          <div className="campus-image-fade"></div>
          <div className="campus-photo-caption">
            <span className="caption-dot"></span>
            <span>Main Entrance &amp; Institutional Emblem Wall • IIT Bombay</span>
          </div>
        </div>
      </div>

      {/* ── HERO CONTENT (SHIFTED DOWNWARDS) ── */}
      <div className="hero-content-section">
        <div className="hero-badge">
          <span className="badge-pulse"></span>
          <span>Training &amp; Placement Cell • Session {collegeInfo.session}</span>
        </div>

        <h1 className="hero-title">
          Campus Placement <span className="hero-title-accent">Records</span>
        </h1>

        <p className="hero-subtitle">
          Official recruitment directory, CTC package analytics, and branch eligibility database for{' '}
          <strong>Indian Institute of Technology Bombay</strong>.
        </p>

        {/* Minimal 4-Metric Glass Bar (#CCE7EB Ice Aqua + Deep Black) */}
        <div className="hero-stats-glass-bar">
          <div className="stat-item">
            <span className="stat-label">Peak Package</span>
            <span className="stat-val font-mono highlight-ice-aqua">
              ₹{animatedHighest} <small>LPA</small>
            </span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">Average CTC</span>
            <span className="stat-val font-mono highlight-ice-aqua-soft">
              ₹{animatedAvg} <small>LPA</small>
            </span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">Total Offers</span>
            <span className="stat-val font-mono">{animatedOffers.toLocaleString()}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">Recruiters</span>
            <span className="stat-val font-mono">{animatedCompanies}</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="hero-filter-bar">
          <div className="hero-search-input-wrap">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="search-icon-svg"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="hero-search-input"
              placeholder="Search company (Google, Microsoft), branch (CSE, ECE), or sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search recruiters"
            />
            {searchTerm && (
              <button
                className="clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>

          <div className="hero-tier-pills">
            {quickCategories.map((cat) => (
              <button
                key={cat.id}
                className={`tier-pill ${filterType === cat.id ? 'active' : ''}`}
                onClick={() => setFilterType(cat.id)}
              >
                {cat.label}
              </button>
            ))}

            {/* Bookmark Shortlist Filter Pill */}
            <button
              className={`tier-pill bookmark-filter-pill ${filterType === 'Shortlisted' ? 'active' : ''}`}
              onClick={() => setFilterType(filterType === 'Shortlisted' ? 'All' : 'Shortlisted')}
              title="View your saved target companies"
            >
              ⭐ Shortlisted {shortlistedCount > 0 && <span className="shortlist-count-badge">{shortlistedCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
