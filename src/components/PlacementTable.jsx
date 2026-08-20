import { useState, useMemo } from 'react';
import { companies } from '../data/placementData';
import CompanyLogo from './CompanyLogo';
import CompanyDetailModal from './CompanyDetailModal';

export default function PlacementTable({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  shortlisted = [],
  onToggleShortlist,
  showToast,
}) {
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [ctcRange, setCtcRange] = useState('All'); // 'All' | '30+' | '20-30' | '10-20' | 'below10'
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

    // Tier / Shortlist Filter
    if (filterType === 'Shortlisted') {
      list = list.filter((c) => shortlisted.includes(c.id));
    } else if (filterType !== 'All') {
      list = list.filter((c) => c.type === filterType);
    }

    // CTC Range filter
    if (ctcRange === '30+') {
      list = list.filter((c) => c.ctc >= 30);
    } else if (ctcRange === '20-30') {
      list = list.filter((c) => c.ctc >= 20 && c.ctc < 30);
    } else if (ctcRange === '10-20') {
      list = list.filter((c) => c.ctc >= 10 && c.ctc < 20);
    } else if (ctcRange === 'below10') {
      list = list.filter((c) => c.ctc < 10);
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
  }, [searchTerm, filterType, shortlisted, ctcRange, selectedSector, selectedBranch, sortField, sortDir]);

  // Reset pagination on filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, ctcRange, selectedSector, selectedBranch, pageSize]);

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

  const resetAllFilters = () => {
    setSearchTerm('');
    setFilterType('All');
    setSelectedSector('All');
    setSelectedBranch('All');
    setCtcRange('All');
  };

  const hasActiveFilters =
    searchTerm ||
    filterType !== 'All' ||
    selectedSector !== 'All' ||
    selectedBranch !== 'All' ||
    ctcRange !== 'All';

  return (
    <section id="placement-table-section" className="records-section">
      {/* Top Controls Bar */}
      <div className="table-controls-bar">
        <div className="table-meta-info">
          <span className="results-count">
            <strong>{filteredCompanies.length}</strong> Recruiters on Record
          </span>
          {hasActiveFilters && (
            <button className="clear-filters-link" onClick={resetAllFilters}>
              Reset Filters ✕
            </button>
          )}
        </div>

        <div className="table-right-controls">
          {/* Quick CTC Bracket Filter */}
          <div className="select-wrap">
            <select
              className="minimal-select"
              value={ctcRange}
              onChange={(e) => setCtcRange(e.target.value)}
              aria-label="Filter by CTC Range"
            >
              <option value="All">All CTC Brackets</option>
              <option value="30+">₹30+ LPA</option>
              <option value="20-30">₹20 - ₹30 LPA</option>
              <option value="10-20">₹10 - ₹20 LPA</option>
              <option value="below10">&lt; ₹10 LPA</option>
            </select>
          </div>

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
        </div>
      </div>

      {/* Main Table */}
      {filteredCompanies.length === 0 ? (
        <div className="minimal-empty-state">
          <span className="empty-state-icon">🔍</span>
          <p>No recruiters match the selected criteria.</p>
          <button className="reset-btn-pill" onClick={resetAllFilters}>
            Show All Companies
          </button>
        </div>
      ) : (
        <div className="table-card">
          <div className="table-scroll-container">
            <table className="clean-table">
              <thead>
                <tr>
                  <th className="th-action-col">⭐</th>
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
                  const isSaved = shortlisted.includes(c.id);

                  return (
                    <tr
                      key={c.id}
                      onClick={() => setActiveCompany(c)}
                      className="clickable-row"
                    >
                      {/* Shortlist Star Cell */}
                      <td
                        className="td-star-cell"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleShortlist(c.id);
                        }}
                      >
                        <button
                          className={`row-star-btn ${isSaved ? 'starred' : ''}`}
                          title={isSaved ? 'Remove from shortlist' : 'Add to target shortlist'}
                          aria-label={`Shortlist ${c.name}`}
                        >
                          {isSaved ? '⭐' : '☆'}
                        </button>
                      </td>

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
        <CompanyDetailModal
          company={activeCompany}
          onClose={() => setActiveCompany(null)}
          isShortlisted={shortlisted.includes(activeCompany.id)}
          onToggleShortlist={onToggleShortlist}
          showToast={showToast}
        />
      )}
    </section>
  );
}
