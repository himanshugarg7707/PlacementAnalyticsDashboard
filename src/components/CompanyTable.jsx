import { useState, useMemo } from 'react';
import { companies } from '../data/placementData';

// Color map for company logo avatars
const sectorColors = {
  Technology: '#4f46e5',
  'IT Services': '#0284c7',
  Finance: '#059669',
  Consulting: '#d97706',
  Automobile: '#dc2626',
  Semiconductor: '#7c3aed',
  'Oil & Gas': '#ea580c',
  'Power & Energy': '#ca8a04',
  Construction: '#64748b',
  Defence: '#475569',
  FMCG: '#db2777',
  'E-Commerce': '#9333ea',
  Fintech: '#0d9488',
  Others: '#6b7280',
};

export default function CompanyTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortField, setSortField] = useState('ctc');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'

  const filterTypes = ['All', 'Super Dream', 'Dream', 'Normal'];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredCompanies = useMemo(() => {
    return companies
      .filter((company) => {
        const matchesSearch =
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.branches.some((b) =>
            b.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const matchesType =
          selectedType === 'All' || company.type === selectedType;

        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [searchTerm, selectedType, sortField, sortOrder]);

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Super Dream':
        return 'super-dream';
      case 'Dream':
        return 'dream';
      default:
        return 'normal';
    }
  };

  return (
    <section className="animate-in" aria-labelledby="companies-heading">
      <div className="section-header">
        <div>
          <h3 id="companies-heading">Visiting Companies & Recruitment</h3>
          <p className="section-desc">
            Explore participating organizations, salary packages, hired count, and eligible branches
          </p>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by company, sector, branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search companies"
          />

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {filterTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table" aria-label="Company placement records">
          <thead>
            <tr>
              <th
                onClick={() => handleSort('name')}
                className={sortField === 'name' ? 'sorted' : ''}
              >
                Company {sortField === 'name' && (
                  <span className="sort-icon">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th
                onClick={() => handleSort('ctc')}
                className={sortField === 'ctc' ? 'sorted' : ''}
              >
                CTC (LPA) {sortField === 'ctc' && (
                  <span className="sort-icon">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th
                onClick={() => handleSort('studentsHired')}
                className={sortField === 'studentsHired' ? 'sorted' : ''}
              >
                Hired {sortField === 'studentsHired' && (
                  <span className="sort-icon">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th>Category</th>
              <th>Eligible Branches</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <tr key={company.id}>
                  <td>
                    <div className="company-cell">
                      <div
                        className="company-logo"
                        style={{
                          backgroundColor:
                            sectorColors[company.sector] || '#4f46e5',
                        }}
                      >
                        {company.logo || company.name.charAt(0)}
                      </div>
                      <div>
                        <div className="company-name">{company.name}</div>
                        <div className="company-sector">{company.sector}</div>
                      </div>
                    </div>
                  </td>
                  <td className="ctc-value">₹{company.ctc} LPA</td>
                  <td className="hired-count">{company.studentsHired}</td>
                  <td>
                    <span className={`type-badge ${getTypeBadgeClass(company.type)}`}>
                      {company.type}
                    </span>
                  </td>
                  <td>
                    <div className="branch-tags">
                      {company.branches.map((b) => (
                        <span key={b} className="branch-tag">
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="campus-status">
                      <span className="status-dot completed"></span>
                      <span>{company.status}</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <p>No companies found matching your search or filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}