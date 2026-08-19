import { collegeInfo } from '../data/placementData';

export default function HeroSection({ searchTerm, setSearchTerm, filterType, setFilterType }) {
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
            alt="National Institute of Technology Kurukshetra Campus Administrative Building and Lawn"
            className="campus-hero-img"
          />
          <div className="campus-image-fade"></div>
          <div className="campus-photo-caption">
            <span className="caption-dot"></span>
            <span>Administrative Block &amp; Main Campus • NIT Kurukshetra</span>
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
          Official recruitment directory, CTC package analytics, and branch eligibility database for <strong>National Institute of Technology, Kurukshetra</strong>.
        </p>

        {/* Minimal 4-Metric Glass Bar (#CCE7EB Ice Aqua + Deep Black) */}
        <div className="hero-stats-glass-bar">
          <div className="stat-item">
            <span className="stat-label">Peak Package</span>
            <span className="stat-val font-mono highlight-ice-aqua">
              ₹{collegeInfo.highestPackage} <small>LPA</small>
            </span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">Average CTC</span>
            <span className="stat-val font-mono highlight-ice-aqua-soft">
              ₹{collegeInfo.averagePackage} <small>LPA</small>
            </span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">Total Offers</span>
            <span className="stat-val font-mono">{collegeInfo.totalOffers.toLocaleString()}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">Recruiters</span>
            <span className="stat-val font-mono">{collegeInfo.totalCompanies}</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="hero-filter-bar">
          <div className="hero-search-input-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
