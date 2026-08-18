import { useState, useMemo } from 'react';
import { companies } from '../data/placementData';

const TYPE_COLORS = {
  'Super Dream': '#a855f7',
  Dream: '#4f9fc4',
  Normal: '#8191a3',
};

const SECTOR_COLORS = {
  Technology: '#4f9fc4',
  'IT Services': '#00b4d8',
  Finance: '#e4bd68',
  Consulting: '#a855f7',
  'E-Commerce': '#f97316',
  Semiconductor: '#7dbf9b',
  Automobile: '#d98b8b',
  'Oil & Gas': '#d8b65b',
  'Power & Energy': '#14b8a6',
  Fintech: '#8b5cf6',
  Defence: '#526477',
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortField, setSortField] = useState('ctc');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const filteredCompanies = useMemo(() => {
    let result = [...companies];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.sector.toLowerCase().includes(term) ||
          c.branches.some((b) => b.toLowerCase().includes(term))
      );
    }

    // Filter by type
    if (filterType !== 'All') {
      result = result.filter((c) => c.type === filterType);
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return sortDir === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortDir === 'asc' ? valA - valB : valB - valA;
    });

    return result;
  }, [searchTerm, filterType, sortField, sortDir]);

  const handleExportCSV = () => {
    const headers = ['ID', 'Company Name', 'Sector', 'CTC (LPA)', 'Students Hired', 'Tier Type', 'Branches', 'Status'];
    const rows = filteredCompanies.map((c) => [
      c.id,
      `"${c.name}"`,
      `"${c.sector}"`,
      c.ctc,
      c.studentsHired,
      `"${c.type}"`,
      `"${c.branches.join(', ')}"`,
      `"${c.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NIT_Kurukshetra_Placements_${filterType}_Companies.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕';
    return sortDir === 'asc' ? '↑' : '↓';
  };

  return (
    <section className="animate-in" aria-labelledby="companies-heading">
      <div className="section-header">
        <div>
          <h3 id="companies-heading">Recruiting Companies</h3>
          <p className="section-desc">
            {companies.length} campus recruiters · <strong>{filteredCompanies.length}</strong> matching criteria
          </p>
        </div>
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search company, sector, branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search companies"
            id="company-search"
          />
          {['All', 'Super Dream', 'Dream', 'Normal'].map((type) => (
            <button
              key={type}
              className={`filter-btn ${filterType === type ? 'active' : ''}`}
              onClick={() => setFilterType(type)}
            >
              {type}
            </button>
          ))}
          <button
            className="export-btn"
            onClick={handleExportCSV}
            title="Download current filtered data as CSV"
            aria-label="Export to CSV"
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table" aria-label="Company recruitment data">
          <thead>
            <tr>
              <th
                onClick={() => handleSort('name')}
                className={sortField === 'name' ? 'sorted' : ''}
              >
                Company <span className="sort-icon">{getSortIcon('name')}</span>
              </th>
              <th
                onClick={() => handleSort('ctc')}
                className={sortField === 'ctc' ? 'sorted' : ''}
              >
                CTC (LPA) <span className="sort-icon">{getSortIcon('ctc')}</span>
              </th>
              <th
                onClick={() => handleSort('studentsHired')}
                className={sortField === 'studentsHired' ? 'sorted' : ''}
              >
                Hired <span className="sort-icon">{getSortIcon('studentsHired')}</span>
              </th>
              <th>Type</th>
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
                    {searchTerm && (
                      <button
                        className="filter-btn"
                        style={{ marginTop: 12 }}
                        onClick={() => setSearchTerm('')}
                      >
                        Clear Search
                      </button>
                    )}
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
                            SECTOR_COLORS[company.sector] || 'var(--blue-dark)',
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
                    <span className="ctc-value font-mono">₹{company.ctc.toFixed(1)}L</span>
                  </td>
                  <td>
                    <span className="hired-count font-mono">{company.studentsHired}</span>
                  </td>
                  <td>
                    <span
                      className={`type-badge ${company.type
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {company.type}
                    </span>
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
