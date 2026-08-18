import { collegeInfo, companies, branches } from '../data/placementData';

export default function DashboardOverview() {
  // Top 10 companies by CTC
  const topCompanies = [...companies]
    .sort((a, b) => b.ctc - a.ctc)
    .slice(0, 10);

  // Top hiring companies by students hired
  const topHiring = [...companies]
    .sort((a, b) => b.studentsHired - a.studentsHired)
    .slice(0, 8);

  // Summary cards
  const quickStats = [
    { label: 'Total Offers', value: collegeInfo.totalOffers, color: '#6366f1' },
    { label: 'Super Dream', value: collegeInfo.superDreamOffers, color: '#a855f7' },
    { label: 'Dream Offers', value: collegeInfo.dreamOffers, color: '#06b6d4' },
    { label: 'Median CTC', value: `₹${collegeInfo.medianPackage}L`, color: '#f59e0b' },
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

      <div className="charts-row">
        {/* Top Packages */}
        <div className="chart-card">
          <h4>🏆 Top 10 Packages Offered</h4>
          <ol style={{ marginTop: '16px', paddingLeft: '20px' }}>
            {topCompanies.map((c) => (
              <li key={c.id} style={{ marginBottom: '8px' }}>
                {c.name} - <strong>₹{c.ctc}L</strong>
              </li>
            ))}
          </ol>
        </div>

        {/* Top Hiring Volume */}
        <div className="chart-card">
          <h4>📈 Highest Hiring Volume</h4>
          <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
            {topHiring.map((c) => (
              <li key={c.id} style={{ marginBottom: '8px' }}>
                {c.name}: <strong>{c.studentsHired} students</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Branch Placement Snapshot */}
      <div className="section-header" style={{ marginTop: 16 }}>
        <h3>Branch Placement Snapshot</h3>
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
                <tr key={b.id} style={{ color: b.color }}>
                  <td style={{ fontWeight: 600 }}>
                    {b.shortName}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {b.totalStudents}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {b.placed}
                  </td>
                  <td>
                    <span>{pct}%</span>
                  </td>
                  <td className="ctc-value">
                    ₹{b.avgPackage}L
                  </td>
                  <td className="ctc-value">₹{b.highestPackage}L</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
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
