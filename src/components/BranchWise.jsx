import { useState, useMemo } from 'react';
import { branches } from '../data/placementData';

export default function BranchWise() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('placementRate');

  const filteredBranches = useMemo(() => {
    let list = branches.filter((b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    list.sort((a, b) => {
      if (sortBy === 'placementRate') {
        return (b.placed / b.totalStudents) - (a.placed / a.totalStudents);
      }
      if (sortBy === 'avgPackage') {
        return b.avgPackage - a.avgPackage;
      }
      if (sortBy === 'highestPackage') {
        return b.highestPackage - a.highestPackage;
      }
      return a.shortName.localeCompare(b.shortName);
    });

    return list;
  }, [searchTerm, sortBy]);

  const maxPlacementRate = Math.max(
    ...branches.map((b) => (b.placed / b.totalStudents) * 100)
  );
  const maxAvgPackage = Math.max(...branches.map((b) => b.avgPackage));

  return (
    <section className="branch-section" aria-labelledby="branches-heading">
      {/* Header */}
      <div className="branch-header-row">
        <div>
          <div className="section-badge-pill">DEPARTMENTS</div>
          <h3 id="branches-heading" className="branch-title">Branch-Wise Placement Data</h3>
          <p className="branch-desc">
            Detailed department statistics, placement ratios, and package distribution
          </p>
        </div>
        <div className="branch-controls">
          <div className="branch-search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="branch-search-input"
              placeholder="Search branch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search branches"
            />
          </div>
          <div className="branch-sort-pills">
            <button
              className={`sort-pill ${sortBy === 'placementRate' ? 'active' : ''}`}
              onClick={() => setSortBy('placementRate')}
            >
              Placement %
            </button>
            <button
              className={`sort-pill ${sortBy === 'avgPackage' ? 'active' : ''}`}
              onClick={() => setSortBy('avgPackage')}
            >
              Avg CTC
            </button>
            <button
              className={`sort-pill ${sortBy === 'highestPackage' ? 'active' : ''}`}
              onClick={() => setSortBy('highestPackage')}
            >
              Highest CTC
            </button>
          </div>
        </div>
      </div>

      {/* Branch Cards Grid */}
      <div className="branch-grid-layout">
        {filteredBranches.map((branch) => {
          const pct = ((branch.placed / branch.totalStudents) * 100).toFixed(1);
          return (
            <div className="branch-glass-card" key={branch.id}>
              <div className="branch-card-top">
                <span className="branch-badge">{branch.shortName}</span>
                <div className="branch-rate-pill">
                  <span className="rate-num">{pct}%</span>
                  <span className="rate-label">placed</span>
                </div>
              </div>
              <span className="branch-name">{branch.name}</span>

              <div className="branch-progress-bar-wrap">
                <div className="branch-progress-bar-track">
                  <div className="branch-progress-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="branch-progress-labels">
                  <span>{branch.placed} / {branch.totalStudents} students</span>
                  <span>{pct}%</span>
                </div>
              </div>

              <div className="branch-metrics-grid">
                <div className="branch-metric-cell">
                  <span className="b-label">Total</span>
                  <span className="b-val font-mono">{branch.totalStudents}</span>
                </div>
                <div className="branch-metric-cell">
                  <span className="b-label">Placed</span>
                  <span className="b-val font-mono">{branch.placed}</span>
                </div>
                <div className="branch-metric-cell highlight">
                  <span className="b-label">Avg CTC</span>
                  <span className="b-val font-mono">₹{branch.avgPackage}L</span>
                </div>
                <div className="branch-metric-cell">
                  <span className="b-label">Highest</span>
                  <span className="b-val font-mono" style={{ color: 'var(--emerald-accent)' }}>
                    ₹{branch.highestPackage}L
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparative Charts */}
      <div className="branch-charts-duo">
        <div className="branch-chart-card">
          <h4>📊 Placement % by Branch</h4>
          <div className="mini-bars-list">
            {[...branches]
              .sort((a, b) => b.placed / b.totalStudents - a.placed / a.totalStudents)
              .map((branch) => {
                const pct = ((branch.placed / branch.totalStudents) * 100).toFixed(1);
                const widthPct = Math.round((parseFloat(pct) / maxPlacementRate) * 100);
                return (
                  <div className="mini-bar-item" key={branch.id}>
                    <span className="mini-bar-label">{branch.shortName}</span>
                    <div className="mini-bar-track">
                      <div className="mini-bar-fill rate-fill" style={{ width: `${widthPct}%` }} />
                    </div>
                    <span className="mini-bar-val font-mono">{pct}%</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="branch-chart-card">
          <h4>💰 Average CTC by Branch (LPA)</h4>
          <div className="mini-bars-list">
            {[...branches]
              .sort((a, b) => b.avgPackage - a.avgPackage)
              .map((branch) => {
                const widthPct = Math.round((branch.avgPackage / maxAvgPackage) * 100);
                return (
                  <div className="mini-bar-item" key={branch.id}>
                    <span className="mini-bar-label">{branch.shortName}</span>
                    <div className="mini-bar-track">
                      <div className="mini-bar-fill ctc-fill" style={{ width: `${widthPct}%` }} />
                    </div>
                    <span className="mini-bar-val font-mono">₹{branch.avgPackage}L</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
