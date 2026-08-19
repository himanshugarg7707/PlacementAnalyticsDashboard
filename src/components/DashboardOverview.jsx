import { collegeInfo, companies, branches, sectorWiseData, yearWiseTrend } from '../data/placementData';

export default function DashboardOverview() {
  // Top 10 companies by CTC
  const topCompanies = [...companies]
    .sort((a, b) => b.ctc - a.ctc)
    .slice(0, 8);
  const maxCTC = topCompanies[0]?.ctc || 1;

  // Top hiring companies by students hired
  const topHiring = [...companies]
    .sort((a, b) => b.studentsHired - a.studentsHired)
    .slice(0, 8);
  const maxHired = topHiring[0]?.studentsHired || 1;

  return (
    <section>
      {/* Visual Bar Charts Row */}
      <div className="branch-charts-duo">
        {/* Top Packages Bar Chart */}
        <div className="branch-chart-card">
          <h4>🏆 Top Packages Offered (LPA)</h4>
          <div className="mini-bars-list">
            {topCompanies.map((c) => {
              const widthPct = Math.max(12, Math.round((c.ctc / maxCTC) * 100));
              return (
                <div className="mini-bar-item" key={c.id}>
                  <span className="mini-bar-label">{c.name.split(' ')[0]}</span>
                  <div className="mini-bar-track">
                    <div className="mini-bar-fill ctc-fill" style={{ width: `${widthPct}%` }} />
                  </div>
                  <span className="mini-bar-val font-mono">₹{c.ctc}L</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Hiring Volume Bar Chart */}
        <div className="branch-chart-card">
          <h4>📈 Highest Hiring Volume</h4>
          <div className="mini-bars-list">
            {topHiring.map((c) => {
              const widthPct = Math.max(12, Math.round((c.studentsHired / maxHired) * 100));
              return (
                <div className="mini-bar-item" key={c.id}>
                  <span className="mini-bar-label">{c.name.split(' ')[0]}</span>
                  <div className="mini-bar-track">
                    <div className="mini-bar-fill rate-fill" style={{ width: `${widthPct}%` }} />
                  </div>
                  <span className="mini-bar-val font-mono">{c.studentsHired}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5-Year Historical Placement Trend */}
      {yearWiseTrend && yearWiseTrend.length > 0 && (
        <>
          <div className="branch-header-row" style={{ marginTop: 32 }}>
            <div>
              <div className="section-badge-pill">HISTORICAL</div>
              <h3 className="branch-title" style={{ fontSize: 22 }}>5-Year Placement Growth Trend</h3>
              <p className="branch-desc">Consistent year-on-year growth in offers and packages</p>
            </div>
          </div>
          <div className="branch-grid-layout" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {yearWiseTrend.map((t) => (
              <div className="branch-glass-card" key={t.year} style={{ textAlign: 'center' }}>
                <span className="stat-label" style={{ color: 'var(--aqua-primary)' }}>{t.year}</span>
                <span className="stat-val font-mono" style={{ fontSize: 26 }}>{t.totalPlaced}</span>
                <span className="stat-label">Students Placed</span>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                  Avg: <strong style={{ color: '#fff' }}>₹{t.avgPackage}L</strong> · Max: <strong style={{ color: '#fff' }}>₹{t.highestPackage}L</strong>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Sector-wise Distribution */}
      {sectorWiseData && sectorWiseData.length > 0 && (
        <>
          <div className="branch-header-row" style={{ marginTop: 32 }}>
            <div>
              <div className="section-badge-pill">INDUSTRY</div>
              <h3 className="branch-title" style={{ fontSize: 22 }}>Sector-Wise Recruitment</h3>
              <p className="branch-desc">Hiring volume and package trends across industry sectors</p>
            </div>
          </div>
          <div className="branch-grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {sectorWiseData.slice(0, 8).map((s) => (
              <div className="branch-glass-card" key={s.sector}>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#ffffff' }}>{s.sector}</span>
                <div className="branch-metrics-grid" style={{ gridTemplateColumns: '1fr' }}>
                  <div className="branch-metric-cell">
                    <span className="b-label">Companies</span>
                    <span className="b-val font-mono">{s.companies}</span>
                  </div>
                  <div className="branch-metric-cell">
                    <span className="b-label">Offers</span>
                    <span className="b-val font-mono">{s.offers}</span>
                  </div>
                  <div className="branch-metric-cell highlight">
                    <span className="b-label">Avg CTC</span>
                    <span className="b-val font-mono" style={{ color: 'var(--aqua-primary)' }}>₹{s.avgCTC}L</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Branch Placement Snapshot */}
      <div className="branch-header-row" style={{ marginTop: 32 }}>
        <div>
          <div className="section-badge-pill">DEPARTMENTS</div>
          <h3 className="branch-title" style={{ fontSize: 22 }}>Branch Placement Snapshot</h3>
          <p className="branch-desc">Summary of placement percentages and CTCs by department</p>
        </div>
      </div>
      <div className="table-card" style={{ marginBottom: 48 }}>
        <div className="table-scroll-container">
          <table className="clean-table" aria-label="Branch placement snapshot">
            <thead>
              <tr>
                <th>Branch</th>
                <th className="text-center">Total</th>
                <th className="text-center">Placed</th>
                <th className="text-center">Placement %</th>
                <th className="text-right">Avg CTC</th>
                <th className="text-right">Highest CTC</th>
                <th className="text-right">Median CTC</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((b) => {
                const pct = ((b.placed / b.totalStudents) * 100).toFixed(1);
                return (
                  <tr key={b.id}>
                    <td>
                      <span style={{ fontWeight: 700, color: '#ffffff' }}>
                        {b.shortName}
                      </span>{' '}
                      <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>— {b.name}</span>
                    </td>
                    <td className="text-center font-mono">{b.totalStudents}</td>
                    <td className="text-center font-mono font-bold">{b.placed}</td>
                    <td className="text-center">
                      <span className={`ctc-value-pill ${pct >= 80 ? 'super-dream' : pct >= 60 ? 'dream' : 'normal'}`}>
                        {pct}%
                      </span>
                    </td>
                    <td className="text-right font-mono" style={{ color: 'var(--aqua-primary)' }}>
                      ₹{b.avgPackage}L
                    </td>
                    <td className="text-right font-mono font-bold" style={{ color: 'var(--aqua-primary)' }}>
                      ₹{b.highestPackage}L
                    </td>
                    <td className="text-right font-mono">₹{b.medianPackage}L</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}