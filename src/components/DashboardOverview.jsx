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

  // Summary quick stats
  const quickStats = [
    { label: 'Total Offers', value: collegeInfo.totalOffers, color: 'var(--blue-dark)' },
    { label: 'Super Dream (>20L)', value: collegeInfo.superDreamOffers, color: '#a855f7' },
    { label: 'Dream Offers (10-20L)', value: collegeInfo.dreamOffers, color: '#00b4d8' },
    { label: 'Median CTC', value: `₹${collegeInfo.medianPackage}L`, color: 'var(--warning)' },
  ];

  return (
    <section className="animate-in">
      {/* Additional Quick Stats */}
      <div className="stats-grid" style={{ marginBottom: 32 }}>
        {quickStats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div
              className="stat-value counter-animate"
              style={{ color: s.color, fontSize: 28 }}
            >
              {s.value}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Visual Bar Charts Row */}
      <div className="charts-row">
        {/* Top Packages Bar Chart */}
        <div className="chart-card">
          <h4>🏆 Top Packages Offered (LPA)</h4>
          <div className="bar-chart">
            {topCompanies.map((c) => {
              const widthPct = Math.max(12, Math.round((c.ctc / maxCTC) * 100));
              return (
                <div className="bar-item" key={c.id}>
                  <span className="bar-label">{c.name}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${widthPct}%` }}>
                      ₹{c.ctc}L
                    </div>
                  </div>
                  <span className="bar-value">₹{c.ctc}L</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Hiring Volume Bar Chart */}
        <div className="chart-card">
          <h4>📈 Highest Hiring Volume</h4>
          <div className="bar-chart">
            {topHiring.map((c) => {
              const widthPct = Math.max(12, Math.round((c.studentsHired / maxHired) * 100));
              return (
                <div className="bar-item" key={c.id}>
                  <span className="bar-label">{c.name}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${widthPct}%`,
                        background: 'linear-gradient(90deg, #00b4d8, #90e0ef)',
                      }}
                    >
                      {c.studentsHired}
                    </div>
                  </div>
                  <span className="bar-value">{c.studentsHired} hires</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5-Year Historical Placement Trend */}
      {yearWiseTrend && yearWiseTrend.length > 0 && (
        <>
          <div className="section-header" style={{ marginTop: 24 }}>
            <div>
              <h3>5-Year Placement Growth Trend</h3>
              <p className="section-desc">Consistent year-on-year growth in offers and packages</p>
            </div>
          </div>
          <div className="trend-grid">
            {yearWiseTrend.map((t) => (
              <div className="trend-card" key={t.year}>
                <div className="year">{t.year}</div>
                <div className="trend-value">{t.totalPlaced}</div>
                <div className="trend-label">Students Placed</div>
                <div className="trend-sub">
                  Avg: <strong>₹{t.avgPackage}L</strong> · Max: <strong>₹{t.highestPackage}L</strong>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Sector-wise Distribution */}
      {sectorWiseData && sectorWiseData.length > 0 && (
        <>
          <div className="section-header" style={{ marginTop: 24 }}>
            <div>
              <h3>Sector-Wise Recruitment</h3>
              <p className="section-desc">Hiring volume and package trends across industry sectors</p>
            </div>
          </div>
          <div className="sector-grid">
            {sectorWiseData.slice(0, 8).map((s) => (
              <div className="sector-card" key={s.sector}>
                <div className="sector-name">{s.sector}</div>
                <div className="sector-stats">
                  <div className="sector-stat-row">
                    <span className="s-label">Companies</span>
                    <span className="s-value">{s.companies}</span>
                  </div>
                  <div className="sector-stat-row">
                    <span className="s-label">Offers</span>
                    <span className="s-value">{s.offers}</span>
                  </div>
                  <div className="sector-stat-row">
                    <span className="s-label">Avg CTC</span>
                    <span className="s-value" style={{ color: 'var(--success)' }}>₹{s.avgCTC}L</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Branch Placement Snapshot */}
      <div className="section-header" style={{ marginTop: 32 }}>
        <div>
          <h3>Branch Placement Snapshot</h3>
          <p className="section-desc">Summary of placement percentages and CTCs by department</p>
        </div>
      </div>
      <div className="table-container" style={{ marginBottom: 48 }}>
        <table className="data-table" aria-label="Branch placement snapshot">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Total</th>
              <th>Placed</th>
              <th>Placement %</th>
              <th>Avg CTC</th>
              <th>Highest CTC</th>
              <th>Median CTC</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((b) => {
              const pct = ((b.placed / b.totalStudents) * 100).toFixed(1);
              return (
                <tr key={b.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text)' }}>
                    {b.shortName} <span style={{ color: 'var(--muted)', fontSize: 12, fontWeight: 400 }}>— {b.name}</span>
                  </td>
                  <td style={{ fontFamily: 'var(--mono)', fontWeight: 600 }}>
                    {b.totalStudents}
                  </td>
                  <td style={{ fontFamily: 'var(--mono)', fontWeight: 700 }}>
                    {b.placed}
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--blue-dark)' }}>{pct}%</span>
                  </td>
                  <td className="ctc-value font-mono">
                    ₹{b.avgPackage}L
                  </td>
                  <td className="ctc-value font-mono" style={{ fontWeight: 700 }}>
                    ₹{b.highestPackage}L
                  </td>
                  <td style={{ fontFamily: 'var(--mono)', fontWeight: 600 }}>
                    ₹{b.medianPackage}L
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
