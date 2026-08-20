import { useState, useMemo } from 'react';
import { branches, yearWiseTrend, sectorWiseData } from '../data/placementData';

/**
 * BranchWise Component
 *
 * Renders a comprehensive branch-wise placement analytics view with three
 * switchable sub-tabs: Engineering Departments, 5-Year Growth Trajectory,
 * and Sector-Wise Analytics.
 *
 * Features:
 * - Department-level placement cards with progress bars and metrics
 * - Sortable by placement rate, average CTC, or highest CTC
 * - Searchable department list with real-time filtering
 * - Comparative horizontal bar charts for placement rate and average package
 * - 5-year historical trend cards with year-over-year growth indicators
 * - Sector-wise distribution cards showing offers, recruiters, and average CTC
 *
 * Data sources:
 * - branches: Array of department objects from placementData
 * - yearWiseTrend: 5-year historical placement data
 * - sectorWiseData: Industry sector breakdown
 *
 * @returns {JSX.Element} Branch-wise analytics section with sub-navigation
 */
export default function BranchWise() {
  const [activeSubTab, setActiveSubTab] = useState('departments'); // 'departments' | 'trends' | 'sectors'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rate'); // 'rate' | 'avg' | 'highest' | 'total'

  const filteredBranches = useMemo(() => {
    let list = branches.filter(
      (b) =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    list.sort((a, b) => {
      if (sortBy === 'rate') {
        return b.placed / b.totalStudents - a.placed / a.totalStudents;
      }
      if (sortBy === 'avg') {
        return b.avgPackage - a.avgPackage;
      }
      if (sortBy === 'highest') {
        return b.highestPackage - a.highestPackage;
      }
      if (sortBy === 'total') {
        return b.totalStudents - a.totalStudents;
      }
      return a.shortName.localeCompare(b.shortName);
    });

    return list;
  }, [searchTerm, sortBy]);


  return (
    <section className="branch-section" aria-labelledby="branches-heading">
      {/* View Switcher Sub-Navigation */}
      <div className="insights-view-switcher">
        <button
          className={`insight-switch-btn ${activeSubTab === 'departments' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('departments')}
        >
          🎓 Engineering Departments
        </button>
        <button
          className={`insight-switch-btn ${activeSubTab === 'trends' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('trends')}
        >
          📈 5-Year Growth Trajectory
        </button>
        <button
          className={`insight-switch-btn ${activeSubTab === 'sectors' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('sectors')}
        >
          🌐 Sector-Wise Analytics
        </button>
      </div>

      {/* ── VIEW 1: ENGINEERING DEPARTMENTS ── */}
      {activeSubTab === 'departments' && (
        <div className="tab-pane-content">
          {/* Header & Filter Row */}
          <div className="branch-header-row">
            <div>
              <div className="section-badge-pill">Departmental Analytics</div>
              <h2 id="branches-heading" className="branch-title">
                Branch-Wise Placement Breakdown
              </h2>
              <p className="branch-desc">
                Detailed placement rates, salary distribution, and cohort statistics across engineering departments.
              </p>
            </div>

            <div className="branch-controls">
              <div className="branch-search-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search branch (CSE, ECE)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="branch-search-input"
                />
              </div>

              <div className="branch-sort-pills">
                <button
                  className={`sort-pill ${sortBy === 'rate' ? 'active' : ''}`}
                  onClick={() => setSortBy('rate')}
                >
                  Placement %
                </button>
                <button
                  className={`sort-pill ${sortBy === 'avg' ? 'active' : ''}`}
                  onClick={() => setSortBy('avg')}
                >
                  Avg CTC
                </button>
                <button
                  className={`sort-pill ${sortBy === 'highest' ? 'active' : ''}`}
                  onClick={() => setSortBy('highest')}
                >
                  Highest CTC
                </button>
              </div>
            </div>
          </div>

          {/* Branch Cards Grid */}
          <div className="branch-grid-layout">
            {filteredBranches.map((b) => {
              const placementRate = ((b.placed / b.totalStudents) * 100).toFixed(1);
              return (
                <div className="branch-glass-card" key={b.id}>
                  <div className="branch-card-top">
                    <div className="branch-badge font-mono">{b.shortName}</div>
                    <div className="branch-rate-pill">
                      <span className="rate-num font-mono">{placementRate}%</span>
                      <span className="rate-label">Placed</span>
                    </div>
                  </div>

                  <h3 className="branch-name">{b.name}</h3>

                  <div className="branch-progress-labels">
                    <span>{b.placed} placed</span>
                    <span>{b.totalStudents} total students</span>
                  </div>

                  {/* Stats Grid */}
                  <div className="branch-metrics-grid">
                    <div className="branch-metric-cell highlight">
                      <span className="b-label">Avg Package</span>
                      <span className="b-val font-mono">₹{b.avgPackage} LPA</span>
                    </div>
                    <div className="branch-metric-cell">
                      <span className="b-label">Highest Package</span>
                      <span className="b-val font-mono" style={{ color: '#34d399' }}>
                        ₹{b.highestPackage} LPA
                      </span>
                    </div>
                    <div className="branch-metric-cell">
                      <span className="b-label">Median Package</span>
                      <span className="b-val font-mono">₹{b.medianPackage} LPA</span>
                    </div>
                    <div className="branch-metric-cell">
                      <span className="b-label">Placement Ratio</span>
                      <span className="b-val font-mono">{placementRate}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── VIEW 2: 5-YEAR GROWTH TRAJECTORY ── */}
      {activeSubTab === 'trends' && (
        <div className="tab-pane-content">
          <div className="branch-header-row">
            <div>
              <div className="section-badge-pill">Historical Growth</div>
              <h2 className="branch-title">5-Year Institutional Placement Trend</h2>
              <p className="branch-desc">
                Consistent year-on-year expansion in recruiting partners, student placements, and peak compensation.
              </p>
            </div>
          </div>

          <div className="trends-grid-cards">
            {yearWiseTrend.map((t, idx) => {
              const prev = idx > 0 ? yearWiseTrend[idx - 1] : null;
              const growth = prev
                ? (((t.totalPlaced - prev.totalPlaced) / prev.totalPlaced) * 100).toFixed(1)
                : null;
              const isCurrent = idx === yearWiseTrend.length - 1;

              return (
                <div className={`trend-glass-card ${isCurrent ? 'current-year' : ''}`} key={t.year}>
                  <div className="trend-card-top">
                    <span className="trend-year font-mono">{t.year}</span>
                    {isCurrent ? (
                      <span className="trend-active-pill font-mono">Current Season</span>
                    ) : growth ? (
                      <span className="trend-growth-pill font-mono">+{growth}%</span>
                    ) : null}
                  </div>

                  <div className="trend-placed-stat">
                    <span className="trend-num font-mono">{t.totalPlaced}</span>
                    <span className="trend-num-label">Students Placed</span>
                  </div>

                  <div className="trend-meta-grid">
                    <div className="trend-meta-item">
                      <span className="t-meta-label">Avg Package</span>
                      <span className="t-meta-val font-mono">₹{t.avgPackage} LPA</span>
                    </div>
                    <div className="trend-meta-item">
                      <span className="t-meta-label">Highest Package</span>
                      <span className="t-meta-val font-mono highlight-ice-aqua">₹{t.highestPackage} LPA</span>
                    </div>
                    <div className="trend-meta-item">
                      <span className="t-meta-label">Companies</span>
                      <span className="t-meta-val font-mono">{t.companiesVisited}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── VIEW 3: SECTOR-WISE ANALYTICS ── */}
      {activeSubTab === 'sectors' && (
        <div className="tab-pane-content">
          <div className="branch-header-row">
            <div>
              <div className="section-badge-pill">Market Sector Breakdown</div>
              <h2 className="branch-title">Industry Sector Distribution</h2>
              <p className="branch-desc">
                Hiring volume, company participation, and average package dynamics across primary industrial verticals.
              </p>
            </div>
          </div>

          <div className="sectors-grid-layout">
            {sectorWiseData.map((s) => {
              return (
                <div className="sector-glass-card" key={s.sector}>
                  <div className="sector-card-top">
                    <h3 className="sector-card-name">{s.sector}</h3>
                    <span className="sector-ctc-pill font-mono">
                      ₹{s.avgCTC.toFixed(1)} LPA Avg
                    </span>
                  </div>

                  <div className="sector-metrics-duo">
                    <div className="sector-m-cell">
                      <span className="s-m-label">Job Offers</span>
                      <span className="s-m-val font-mono">{s.offers}</span>
                    </div>
                    <div className="sector-m-cell">
                      <span className="s-m-label">Recruiters</span>
                      <span className="s-m-val font-mono">{s.companies}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
