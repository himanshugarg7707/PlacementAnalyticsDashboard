import { companies } from '../data/placementData';

const TYPE_COLORS = {
  'Super Dream': '#a855f7',
  Dream: '#6366f1',
  Normal: '#64748b',
};

const SECTOR_COLORS = {
  Technology: '#6366f1',
  'IT Services': '#06b6d4',
  Finance: '#f59e0b',
  Consulting: '#a855f7',
  'E-Commerce': '#f97316',
  Semiconductor: '#10b981',
  Automobile: '#ef4444',
  'Oil & Gas': '#eab308',
  'Power & Energy': '#14b8a6',
  Fintech: '#8b5cf6',
  Defence: '#64748b',
  Engineering: '#0ea5e9',
  Construction: '#78716c',
  FMCG: '#ec4899',
  Logistics: '#84cc16',
  EdTech: '#f43f5e',
  'Space & Research': '#2563eb',
  'Mining & Metals': '#a3a3a3',
  Conglomerate: '#c084fc',
};

export default function CompanyTable() {
  const filteredCompanies = [...companies];



  return (
    <section className="animate-in" aria-labelledby="companies-heading">
      <div className="section-header">
        <div>
          <h3 id="companies-heading">Recruiting Companies</h3>
          <p className="section-desc">
            {companies.length} companies on campus
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table" aria-label="Company recruitment data">
          <thead>
            <tr>
              <th>Company</th>
              <th>CTC (LPA)</th>
              <th>Hired</th>
              <th>Branches</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <p>No companies match your search criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredCompanies.map((company) => (
                <tr key={company.id}>
                  <td>
                    <div className="company-cell">
                      <div
                        className="company-logo"
                        style={{
                          background:
                            SECTOR_COLORS[company.sector] || '#6366f1',
                        }}
                        aria-hidden="true"
                      >
                        {company.logo}
                      </div>
                      <div>
                        <div className="company-name">{company.name}</div>
                        <div className="company-sector">{company.sector}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="ctc-value">₹{company.ctc.toFixed(1)}L</span>
                  </td>
                  <td>
                    <span className="hired-count">{company.studentsHired}</span>
                  </td>
                  <td>
                    <div className="branch-tags">
                      {company.branches.map((b) => (
                        <span className="branch-tag" key={b}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="campus-status completed">
                      <span
                        className="status-dot completed"
                        aria-hidden="true"
                      ></span>
                      {company.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}