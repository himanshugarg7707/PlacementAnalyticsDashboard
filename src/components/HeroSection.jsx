// Contributor: Diya Arora - Hero Section Component
import { useState, useEffect } from 'react';
import { collegeInfo, branches, sectorWiseData } from '../data/placementData';

export default function HeroSection({
  activeTab = 'recruiters',
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  shortlistedCount = 0,
  onOpenQuestions,
  onScrollToSection,
}) {
  const [animatedHighest, setAnimatedHighest] = useState(0);
  const [animatedAvg, setAnimatedAvg] = useState(0);
  const [animatedOffers, setAnimatedOffers] = useState(0);
  const [animatedCompanies, setAnimatedCompanies] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
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

  const heroMeta = {
    recruiters: {
      badge: `Training & Placement Cell • Session ${collegeInfo.session}`,
      titlePrefix: 'Campus Placement',
      titleAccent: 'Records',
      subtitle: `Official recruitment directory, CTC package analytics, and branch eligibility database for Indian Institute of Technology Bombay.`,
      stat3Label: 'Total Offers',
      stat3Val: animatedOffers.toLocaleString(),
      stat4Label: 'Recruiters',
      stat4Val: animatedCompanies,
    },
    branches: {
      badge: `Departmental Analysis • Session ${collegeInfo.session}`,
      titlePrefix: 'Branch Placement',
      titleAccent: 'Analytics',
      subtitle: `Department-wise placement percentages, salary distributions, and cohort statistics across 12 IIT Bombay engineering departments.`,
      stat3Label: 'Departments',
      stat3Val: `${branches.length} Branches`,
      stat4Label: 'Avg Placement',
      stat4Val: `${((collegeInfo.totalPlaced / collegeInfo.totalStudents) * 100).toFixed(1)}%`,
    },
    insights: {
      badge: `Macro Intelligence • Session ${collegeInfo.session}`,
      titlePrefix: 'Placement Insights &',
      titleAccent: 'Trends',
      subtitle: `Deep analytics on sector distribution, recruiter compensation tiers, multi-offer trends, and 5-year placement trajectory.`,
      stat3Label: 'Industry Sectors',
      stat3Val: `${sectorWiseData.length} Sectors`,
      stat4Label: 'Super Dream',
      stat4Val: `${collegeInfo.superDreamOffers} Offers`,
    },
  };

  const currentMeta = heroMeta[activeTab] || heroMeta.recruiters;

  return (
    <div className="hero-master-wrapper">
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

      <div className="hero-content-section">
        <div className="hero-badge">
          <span className="badge-pulse"></span>
          <span>{currentMeta.badge}</span>
        </div>

        <h1 className="hero-title">
          {currentMeta.titlePrefix} <span className="hero-title-accent">{currentMeta.titleAccent}</span>
        </h1>

        <p className="hero-subtitle">
          {currentMeta.subtitle}
        </p>

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
            <span className="stat-label">{currentMeta.stat3Label}</span>
            <span className="stat-val font-mono">{currentMeta.stat3Val}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">{currentMeta.stat4Label}</span>
            <span className="stat-val font-mono">{currentMeta.stat4Val}</span>
          </div>
        </div>

        {activeTab === 'recruiters' && (
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
                  onClick={() => {
                    setFilterType(cat.id);
                    if (onScrollToSection) onScrollToSection('recruiters');
                  }}
                >
                  {cat.label}
                </button>
              ))}

              <button
                className={`tier-pill bookmark-filter-pill ${filterType === 'Shortlisted' ? 'active' : ''}`}
                onClick={() => {
                  setFilterType(filterType === 'Shortlisted' ? 'All' : 'Shortlisted');
                  if (onScrollToSection) onScrollToSection('recruiters');
                }}
                title="View your saved target companies"
              >
                ⭐ Shortlisted {shortlistedCount > 0 && <span className="shortlist-count-badge">{shortlistedCount}</span>}
              </button>

              {onOpenQuestions && (
                <button
                  type="button"
                  className="tier-pill questions-hero-pill"
                  onClick={onOpenQuestions}
                  title="Top Companies Mostly Asked Questions"
                >
                  💡 Mostly Asked Questions
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'branches' && (
          <div className="hero-filter-bar">
            <div className="hero-tier-pills">
              <button
                type="button"
                className="tier-pill active"
                onClick={() => onScrollToSection && onScrollToSection('branches')}
              >
                🎓 Engineering Departments (12)
              </button>
              <button
                type="button"
                className="tier-pill"
                onClick={() => onScrollToSection && onScrollToSection('branches')}
              >
                📈 5-Year Growth Trajectory
              </button>
              <button
                type="button"
                className="tier-pill"
                onClick={() => onScrollToSection && onScrollToSection('branches')}
              >
                🌐 Sector-Wise Analytics
              </button>
              {onOpenQuestions && (
                <button
                  type="button"
                  className="tier-pill questions-hero-pill"
                  onClick={onOpenQuestions}
                  title="Top Companies Mostly Asked Questions"
                >
                  💡 Mostly Asked Questions
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="hero-filter-bar">
            <div className="hero-tier-pills">
              <button
                type="button"
                className="tier-pill active"
                onClick={() => onScrollToSection && onScrollToSection('insights')}
              >
                💎 Top Paying &amp; Hiring
              </button>
              <button
                type="button"
                className="tier-pill"
                onClick={() => onScrollToSection && onScrollToSection('insights')}
              >
                📊 CTC Distribution
              </button>
              <button
                type="button"
                className="tier-pill"
                onClick={() => onScrollToSection && onScrollToSection('insights')}
              >
                🎓 Branch Heatmap
              </button>
              <button
                type="button"
                className="tier-pill"
                onClick={() => onScrollToSection && onScrollToSection('insights')}
              >
                📈 5-Year Trends
              </button>
              {onOpenQuestions && (
                <button
                  type="button"
                  className="tier-pill questions-hero-pill"
                  onClick={onOpenQuestions}
                  title="Top Companies Mostly Asked Questions"
                >
                  💡 Mostly Asked Questions
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
