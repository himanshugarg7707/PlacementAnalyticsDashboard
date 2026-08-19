import { useState, useMemo } from 'react';
import { branches } from '../data/placementData';

export default function BranchWise() {
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

  const maxAvgPackage = Math.max(...branches.map((b) => b.avgPackage));

  return (
    <section className="branch-section" aria-labelledby="branches-heading">
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

              {/* Progress Bar */}
              <div className="branch-progress-bar-wrap">
                <div className="branch-progress-bar-track">
                  <div
                    className="branch-progress-bar-fill"
                    style={{ width: `${placementRate}%` }}
                  ></div>
                </div>
                <div className="branch-progress-labels">
                  <span>{b.placed} placed</span>
                  <span>{b.totalStudents} total students</span>
                </div>
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

      {/* Visual Comparative Summary */}
      <div className="branch-charts-duo">
        {/* Placement Rate Rank */}
        <div className="branch-chart-card">
          <h4>🏆 Placement Rate Comparison</h4>
          <div className="mini-bars-list">
            {[...branches]
              .sort((a, b) => b.placed / b.totalStudents - a.placed / a.totalStudents)
              .map((b) => {
                const pct = ((b.placed / b.totalStudents) * 100).toFixed(1);
                return (
                  <div className="mini-bar-item" key={b.id}>
                    <span className="mini-bar-label font-mono">{b.shortName}</span>
                    <div className="mini-bar-track">
                      <div className="mini-bar-fill rate-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                    <span className="mini-bar-val font-mono">{pct}%</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Average CTC Rank */}
        <div className="branch-chart-card">
          <h4>💰 Average Package Comparison (LPA)</h4>
          <div className="mini-bars-list">
            {[...branches]
              .sort((a, b) => b.avgPackage - a.avgPackage)
              .map((b) => {
                const widthPct = Math.max(15, Math.round((b.avgPackage / maxAvgPackage) * 100));
                return (
                  <div className="mini-bar-item" key={b.id}>
                    <span className="mini-bar-label font-mono">{b.shortName}</span>
                    <div className="mini-bar-track">
                      <div className="mini-bar-fill ctc-fill" style={{ width: `${widthPct}%` }}></div>
                    </div>
                    <span className="mini-bar-val font-mono">₹{b.avgPackage}L</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
