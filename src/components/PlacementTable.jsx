import { useState, useMemo } from 'react';
import { companies } from '../data/placementData';
import CompanyLogo from './CompanyLogo';
import CompanyDetailModal from './CompanyDetailModal';

export default function PlacementTable({ searchTerm, setSearchTerm, filterType, setFilterType }) {
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [sortField, setSortField] = useState('ctc');
  const [sortDir, setSortDir] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [activeCompany, setActiveCompany] = useState(null);

  // Extract unique sectors & branches
  const uniqueSectors = useMemo(() => {
    const set = new Set(companies.map((c) => c.sector));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const uniqueBranches = useMemo(() => {
    const set = new Set();
    companies.forEach((c) => c.branches.forEach((b) => set.add(b)));
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Filter & Sort
  const filteredCompanies = useMemo(() => {
    let list = [...companies];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.sector.toLowerCase().includes(q) ||
          c.branches.some((b) => b.toLowerCase().includes(q)) ||
          c.type.toLowerCase().includes(q)
      );
    }

    if (filterType !== 'All') {
      list = list.filter((c) => c.type === filterType);
    }

    if (selectedSector !== 'All') {
      list = list.filter((c) => c.sector === selectedSector);
    }

    if (selectedBranch !== 'All') {
      list = list.filter((c) => c.branches.includes(selectedBranch));
    }

    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortDir === 'asc' ? valA - valB : valB - valA;
    });

    return list;
  }, [searchTerm, filterType, selectedSector, selectedBranch, sortField, sortDir]);

  // Reset pagination on filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, selectedSector, selectedBranch, pageSize]);

  // Pagination calculation
  const totalPages = pageSize === 'All' ? 1 : Math.ceil(filteredCompanies.length / pageSize);
  const paginatedCompanies = useMemo(() => {
    if (pageSize === 'All') return filteredCompanies;
    const start = (currentPage - 1) * pageSize;
    return filteredCompanies.slice(start, start + pageSize);
  }, [filteredCompanies, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const getSortIndicator = (field) => {
    if (sortField !== field) return <span className="sort-hint">↕</span>;
    return <span className="sort-active">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  const handleExportCSV = () => {
    const headers = ['Company', 'Sector', 'CTC (LPA)', 'Offers', 'Tier', 'Branches', 'Status'];
    const rows = filteredCompanies.map((c) => [
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.sector.replace(/"/g, '""')}"`,
      c.ctc.toFixed(2),
      c.studentsHired,
      `"${c.type}"`,
      `"${c.branches.join(', ')}"`,
      `"${c.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'NIT_Kurukshetra_Placement_Records.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="placement-table-section" className="records-section">
      {/* Top Controls Bar */}
      <div className="table-controls-bar">
        <div className="table-meta-info">
          <span className="results-count">
            <strong>{filteredCompanies.length}</strong> Recruiters on Record
          </span>
          {(searchTerm || filterType !== 'All' || selectedSector !== 'All' || selectedBranch !== 'All') && (
            <button
              className="clear-filters-link"
              onClick={() => {
                setSearchTerm('');
                setFilterType('All');
                setSelectedSector('All');
                setSelectedBranch('All');
              }}
            >
              Reset Filters ✕
            </button>
          )}
        </div>

        <div className="table-right-controls">
          <div className="select-wrap">
            <select
              className="minimal-select"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              aria-label="Filter by Sector"
            >
              <option value="All">All Sectors</option>
              {uniqueSectors.filter((s) => s !== 'All').map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          <div className="select-wrap">
            <select
              className="minimal-select"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              aria-label="Filter by Branch"
            >
              <option value="All">All Branches</option>
              {uniqueBranches.filter((b) => b !== 'All').map((br) => (
                <option key={br} value={br}>{br}</option>
              ))}
            </select>
          </div>

          <button className="minimal-export-btn" onClick={handleExportCSV} title="Download CSV">
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Main Table */}
      {filteredCompanies.length === 0 ? (
        <div className="minimal-empty-state">
          <p>No recruiters match the selected criteria.</p>
          <button
            className="reset-btn-pill"
            onClick={() => {
              setSearchTerm('');
              setFilterType('All');
              setSelectedSector('All');
              setSelectedBranch('All');
            }}
          >
            Show All Companies
          </button>
        </div>
      ) : (
        <div className="table-card">
          <div className="table-scroll-container">
            <table className="clean-table">
              <thead>
                <tr>
                  <th className="th-num">#</th>
                  <th onClick={() => handleSort('name')} className="sortable">
                    Company {getSortIndicator('name')}
                  </th>
                  <th onClick={() => handleSort('sector')} className="sortable">
                    Sector {getSortIndicator('sector')}
                  </th>
                  <th onClick={() => handleSort('ctc')} className="sortable text-right">
                    CTC Package {getSortIndicator('ctc')}
                  </th>
                  <th onClick={() => handleSort('studentsHired')} className="sortable text-center">
                    Offers {getSortIndicator('studentsHired')}
                  </th>
                  <th>Tier</th>
                  <th>Eligible Branches</th>
                  <th>Drive Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCompanies.map((c, idx) => {
                  const globalIdx = pageSize === 'All' ? idx + 1 : (currentPage - 1) * pageSize + idx + 1;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => setActiveCompany(c)}
                      className="clickable-row"
                    >
                      <td className="td-num font-mono">{globalIdx}</td>
                      <td>
                        <div className="company-name-cell">
                          <CompanyLogo company={c} size={36} />
                          <span className="company-title-text">{c.name}</span>
                        </div>
                      </td>
                      <td className="sector-text">{c.sector}</td>
                      <td className="text-right">
                        <span className={`ctc-value-pill ${c.ctc >= 20 ? 'super-dream' : c.ctc >= 10 ? 'dream' : 'normal'}`}>
                          ₹{c.ctc.toFixed(1)} LPA
                        </span>
                      </td>
                      <td className="text-center font-mono font-bold">
                        <span className="offers-badge">{c.studentsHired}</span>
                      </td>
                      <td>
                        <span className={`clean-badge ${c.type.toLowerCase().replace(' ', '-')}`}>
                          {c.type}
                        </span>
                      </td>
                      <td>
                        <div className="branch-tags-row">
                          {c.branches.slice(0, 3).map((b) => (
                            <span className="branch-tag-item" key={b}>{b}</span>
                          ))}
                          {c.branches.length > 3 && (
                            <span className="branch-tag-item more">+{c.branches.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`status-pill ${c.status.toLowerCase()}`}>
                          <span className="status-dot"></span>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Minimal Pagination */}
          <div className="table-footer-bar">
            <div className="page-size-selector">
              <span>Show:</span>
              {[15, 25, 50, 'All'].map((sz) => (
                <button
                  key={sz}
                  className={`size-btn ${pageSize === sz ? 'active' : ''}`}
                  onClick={() => setPageSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>

            {totalPages > 1 && pageSize !== 'All' && (
              <div className="pagination-nav">
                <button
                  className="nav-page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  ← Prev
                </button>
                <span className="page-indicator font-mono">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="nav-page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {activeCompany && (
        <CompanyDetailModal company={activeCompany} onClose={() => setActiveCompany(null)} />
      )}
    </section>
  );
}
