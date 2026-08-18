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

  const maxAvgPackage = Math.max(...branches.map((b) => b.avgPackage));

  return (
    <section className="animate-in" aria-labelledby="branches-heading">
      <div className="section-header">
        <div>
          <h3 id="branches-heading">Branch-Wise Placement Data</h3>
          <p className="section-desc">
            Detailed department statistics, placement ratios, and package distribution
          </p>
        </div>
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search branch (e.g. CSE, ECE)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search branches"
          />
          <button
            className={`filter-btn ${sortBy === 'placementRate' ? 'active' : ''}`}
            onClick={() => setSortBy('placementRate')}
          >
            Placement %
          </button>
          <button
            className={`filter-btn ${sortBy === 'avgPackage' ? 'active' : ''}`}
            onClick={() => setSortBy('avgPackage')}
          >
            Avg Package
          </button>
          <button
            className={`filter-btn ${sortBy === 'highestPackage' ? 'active' : ''}`}
            onClick={() => setSortBy('highestPackage')}
          >
            Highest CTC
          </button>
        </div>
      </div>

      <div className="branch-grid">
        {filteredBranches.map((branch) => {
          const pct = ((branch.placed / branch.totalStudents) * 100).toFixed(1);
          return (
            <div className="branch-card" key={branch.id}>
              <div className="branch-card-header">
                <h4>{branch.name}</h4>
                <span className="branch-abbr">{branch.shortName}</span>
              </div>

              <div className="branch-stats">
                <div className="branch-stat">
                  <span className="label">Total Students</span>
                  <span className="value font-mono">{branch.totalStudents}</span>
                </div>
                <div className="branch-stat">
                  <span className="label">Placed</span>
                  <span className="value font-mono">{branch.placed}</span>
                </div>
                <div className="branch-stat">
                  <span className="label">Avg Package</span>
                  <span className="value font-mono">₹{branch.avgPackage}L</span>
                </div>
                <div className="branch-stat">
                  <span className="label">Highest</span>
                  <span className="value font-mono" style={{ color: 'var(--success)' }}>
                    ₹{branch.highestPackage}L
                  </span>
                </div>
              </div>

              <div className="placement-progress">
                <div className="progress-label">
                  <span>Placement Rate</span>
                  <span className="pct">{pct}%</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h4>📊 Placement % by Branch</h4>
          <div className="bar-chart">
            {[...branches]
              .sort((a, b) => b.placed / b.totalStudents - a.placed / a.totalStudents)
              .map((branch) => {
                const pct = ((branch.placed / branch.totalStudents) * 100).toFixed(1);
                return (
                  <div className="bar-item" key={branch.id}>
                    <span className="bar-label">{branch.shortName}</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${pct}%` }}>
                        {pct}%
                      </div>
                    </div>
                    <span className="bar-value">{pct}%</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="chart-card">
          <h4>💰 Average CTC by Branch (in LPA)</h4>
          <div className="bar-chart">
            {[...branches]
              .sort((a, b) => b.avgPackage - a.avgPackage)
              .map((branch) => {
                const widthPct = Math.round((branch.avgPackage / maxAvgPackage) * 100);
                return (
                  <div className="bar-item" key={branch.id}>
                    <span className="bar-label">{branch.shortName}</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${widthPct}%`,
                          background: 'linear-gradient(90deg, #4f9fc4, #8ecae6)',
                        }}
                      >
                        ₹{branch.avgPackage}L
                      </div>
                    </div>
                    <span className="bar-value">₹{branch.avgPackage}L</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
