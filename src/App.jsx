import { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PlacementTable from './components/PlacementTable';
import BranchWise from './components/BranchWise';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CompanyDetailModal from './components/CompanyDetailModal';
import CopyrightModal from './components/CopyrightModal';
import {
  companies,
  branches,
  collegeInfo,
  sectorWiseData,
  yearWiseTrend,
} from './data/placementData';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const TAB_CONFIG = [
  { id: 'recruiters', label: 'Recruiters Directory', icon: '🏢', shortcut: '1' },
  { id: 'branches', label: 'Branch Analytics', icon: '🎓', shortcut: '2' },
  { id: 'insights', label: 'Placement Insights', icon: '📊', shortcut: '3' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENT: PLACEMENT INSIGHTS & ANALYTICS DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PlacementInsights Component
 *
 * Data-driven analytics module computing live insights from placement records.
 * Features sector distribution bar chart, 5-year trend sparklines, placement
 * health gauges, top recruiter leaderboard, branch heatmap, and key stats
 * cards — all derived from the placement dataset with zero external deps.
 */
function PlacementInsights({ onSelectCompany, showToast }) {
  const [insightFilter, setInsightFilter] = useState('all');
  const [expandedInsight, setExpandedInsight] = useState(null);

  // ── Computed Analytics ──
  const analytics = useMemo(() => {
    // Placement Rate
    const placementRate = ((collegeInfo.totalPlaced / collegeInfo.totalStudents) * 100).toFixed(1);

    // Sector breakdown
    const sectorBreakdown = sectorWiseData
      .map((s) => ({
        ...s,
        pctOfOffers: ((s.offers / collegeInfo.totalOffers) * 100).toFixed(1),
      }))
      .sort((a, b) => b.offers - a.offers);

    // Top 10 highest-paying companies
    const topPayingCompanies = [...companies]
      .sort((a, b) => b.ctc - a.ctc)
      .slice(0, 10);

    // Top 10 by volume (most offers)
    const topHiringCompanies = [...companies]
      .sort((a, b) => b.studentsHired - a.studentsHired)
      .slice(0, 10);

    // Branch-wise placement rates
    const branchPerformance = branches.map((b) => ({
      ...b,
      placementRate: ((b.studentsPlaced / b.totalStudents) * 100).toFixed(1),
      gap: b.highestPackage - b.avgPackage,
    })).sort((a, b) => parseFloat(b.placementRate) - parseFloat(a.placementRate));

    // Offer tier distribution
    const tierDistribution = [
      { tier: 'Super Dream', count: collegeInfo.superDreamOffers, color: '#34d399' },
      { tier: 'Dream', count: collegeInfo.dreamOffers, color: '#60a5fa' },
      { tier: 'Normal', count: collegeInfo.normalOffers, color: '#94a3b8' },
    ];

    // Year-over-year growth
    const yoyGrowth = yearWiseTrend.map((y, i) => {
      const prev = yearWiseTrend[i - 1];
      return {
        ...y,
        avgGrowth: prev ? (((y.avgPackage - prev.avgPackage) / prev.avgPackage) * 100).toFixed(1) : null,
        placementRate: ((y.totalPlaced / y.totalStudents) * 100).toFixed(1),
      };
    });

    // CTC distribution buckets
    const ctcBuckets = [
      { range: '< 6 LPA', min: 0, max: 6, count: 0, color: '#94a3b8' },
      { range: '6–10 LPA', min: 6, max: 10, count: 0, color: '#60a5fa' },
      { range: '10–15 LPA', min: 10, max: 15, count: 0, color: '#8CD3DD' },
      { range: '15–25 LPA', min: 15, max: 25, count: 0, color: '#a78bfa' },
      { range: '25–40 LPA', min: 25, max: 40, count: 0, color: '#f59e0b' },
      { range: '40+ LPA', min: 40, max: Infinity, count: 0, color: '#34d399' },
    ];
    companies.forEach((c) => {
      const bucket = ctcBuckets.find((b) => c.ctc >= b.min && c.ctc < b.max);
      if (bucket) bucket.count++;
    });

    // Key insight cards
    const keyInsights = [
      {
        id: 'placement-rate',
        title: 'Overall Placement Rate',
        value: `${placementRate}%`,
        detail: `${collegeInfo.totalPlaced} out of ${collegeInfo.totalStudents} students placed`,
        trend: 'up',
        icon: '📈',
      },
      {
        id: 'avg-package',
        title: 'Average Package',
        value: `₹${collegeInfo.averagePackage} LPA`,
        detail: `Median: ₹${collegeInfo.medianPackage} LPA • Highest: ₹${collegeInfo.highestPackage} LPA`,
        trend: 'up',
        icon: '💎',
      },
      {
        id: 'multi-offers',
        title: 'Multiple Offers',
        value: `${collegeInfo.totalOffers - collegeInfo.totalPlaced}`,
        detail: `${collegeInfo.totalOffers} total offers for ${collegeInfo.totalPlaced} placed students`,
        trend: 'up',
        icon: '🎯',
      },
      {
        id: 'companies-visited',
        title: 'Recruiters Participated',
        value: `${collegeInfo.totalCompanies}`,
        detail: `Across ${sectorWiseData.length} industry sectors`,
        trend: 'up',
        icon: '🏢',
      },
      {
        id: 'super-dream',
        title: 'Super Dream Offers',
        value: `${collegeInfo.superDreamOffers}`,
        detail: `${((collegeInfo.superDreamOffers / collegeInfo.totalOffers) * 100).toFixed(1)}% of all offers above ₹20 LPA`,
        trend: 'up',
        icon: '🌟',
      },
      {
        id: 'diversity-index',
        title: 'Sector Diversity',
        value: `${sectorWiseData.length} Sectors`,
        detail: `Top sector: ${sectorBreakdown[0]?.sector} with ${sectorBreakdown[0]?.offers} offers`,
        trend: 'stable',
        icon: '🌐',
      },
    ];

    return {
      placementRate,
      sectorBreakdown,
      topPayingCompanies,
      topHiringCompanies,
      branchPerformance,
      tierDistribution,
      yoyGrowth,
      ctcBuckets,
      keyInsights,
    };
  }, []);


  return (
    <div className="insights-container">
      {/* Header */}
      <div className="insights-header">
        <div>
          <span className="section-badge-pill">Analytics Intelligence</span>
          <h2 className="section-title-clean">Placement Insights & Trends</h2>
          <p className="section-subtitle-clean">
            Deep-dive into sector dynamics, compensation trends, branch performance,
            and year-over-year placement health — all computed live from {companies.length} recruiter records.
          </p>
        </div>
        <div className="insights-filter-bar">
          {['all', 'leaderboards', 'branches', 'trends'].map((f) => (
            <button
              key={f}
              className={`insight-filter-btn ${insightFilter === f ? 'active' : ''}`}
              onClick={() => setInsightFilter(f)}
            >
              {f === 'all' ? '🔍 All' : f === 'leaderboards' ? '💎 Top Recruiters' : f === 'branches' ? '🎓 Branch Stats' : '📈 5-Year Trends'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="insight-kpi-grid">
        {analytics.keyInsights.map((card) => (
          <div
            key={card.id}
            className={`insight-kpi-card ${expandedInsight === card.id ? 'expanded' : ''}`}
            onClick={() => setExpandedInsight(expandedInsight === card.id ? null : card.id)}
          >
            <span className="kpi-icon">{card.icon}</span>
            <span className="kpi-value">{card.value}</span>
            <span className="kpi-title">{card.title}</span>
            <span className="kpi-detail">{card.detail}</span>
            <span className={`kpi-trend ${card.trend}`}>
              {card.trend === 'up' ? '▲' : card.trend === 'down' ? '▼' : '●'}
            </span>
          </div>
        ))}
      </div>

      {/* Dual Panel Leaderboards */}
      {(insightFilter === 'all' || insightFilter === 'leaderboards') && (
        <div className="insights-dual-panel">
          {/* Top Paying Leaderboard */}
          <div className="insight-section insight-half">
            <h3 className="insight-section-title">💎 Top 10 Highest-Paying Recruiters</h3>
            <div className="leaderboard-list">
              {analytics.topPayingCompanies.map((c, i) => (
                <div
                  key={c.id}
                  className="leaderboard-row clickable"
                  onClick={() => onSelectCompany(c)}
                >
                  <span className="lb-rank">{i + 1}</span>
                  <span className="lb-name">{c.name}</span>
                  <span className="lb-sector-tag">{c.sector}</span>
                  <span className="lb-ctc font-mono">₹{c.ctc} LPA</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Hiring Leaderboard */}
          <div className="insight-section insight-half">
            <h3 className="insight-section-title">📋 Top 10 Mass Hiring Recruiters</h3>
            <div className="leaderboard-list">
              {analytics.topHiringCompanies.map((c, i) => (
                <div
                  key={c.id}
                  className="leaderboard-row clickable"
                  onClick={() => onSelectCompany(c)}
                >
                  <span className="lb-rank">{i + 1}</span>
                  <span className="lb-name">{c.name}</span>
                  <span className="lb-sector-tag">{c.sector}</span>
                  <span className="lb-ctc font-mono">{c.studentsHired} hires</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Branch Performance Heatmap */}
      {(insightFilter === 'all' || insightFilter === 'branches') && (
        <div className="insight-section">
          <h3 className="insight-section-title">🎓 Branch-Wise Performance</h3>
          <div className="branch-heatmap-grid">
            {analytics.branchPerformance.map((b) => {
              const rate = parseFloat(b.placementRate);
              const heatClass = rate >= 90 ? 'heat-high' : rate >= 75 ? 'heat-mid' : 'heat-low';
              return (
                <div key={b.id} className={`heatmap-cell ${heatClass}`}>
                  <span className="heatmap-branch-name">{b.shortName}</span>
                  <span className="heatmap-rate">{b.placementRate}%</span>
                  <div className="heatmap-stats">
                    <span>Avg: ₹{b.avgPackage} L</span>
                    <span>High: ₹{b.highestPackage} L</span>
                    <span>{b.studentsPlaced}/{b.totalStudents} placed</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Year-over-Year Trend Table */}
      {(insightFilter === 'all' || insightFilter === 'trends') && (
        <div className="insight-section">
          <h3 className="insight-section-title">📈 5-Year Placement Trend</h3>
          <div className="trend-table-wrapper">
            <table className="trend-table">
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Placed</th>
                  <th>Placement %</th>
                  <th>Avg Package</th>
                  <th>Highest</th>
                  <th>Recruiters</th>
                  <th>YoY Growth</th>
                </tr>
              </thead>
              <tbody>
                {analytics.yoyGrowth.map((y) => (
                  <tr key={y.year}>
                    <td className="font-mono">{y.year}</td>
                    <td>{y.totalPlaced}/{y.totalStudents}</td>
                    <td className="font-mono font-bold">{y.placementRate}%</td>
                    <td className="font-mono">₹{y.avgPackage} L</td>
                    <td className="font-mono">₹{y.highestPackage} L</td>
                    <td>{y.companiesVisited}</td>
                    <td className={`yoy-cell ${y.avgGrowth && parseFloat(y.avgGrowth) > 0 ? 'positive' : ''}`}>
                      {y.avgGrowth ? `+${y.avgGrowth}%` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APPLICATION ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * App Component — Root Application Entry
 *
 * The main application container for the IIT Bombay Placement Analytics Portal.
 * Manages state for 3 primary views: Recruiters Directory, Branch Analytics,
 * and Placement Insights.
 *
 * @returns {JSX.Element} Complete placement analytics suite
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('recruiters');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [activeModalCompany, setActiveModalCompany] = useState(null);
  const [isCopyrightOpen, setIsCopyrightOpen] = useState(false);

  // Shortlisted Recruiters (persisted in localStorage)
  const [shortlisted, setShortlisted] = useState(() => {
    try {
      const saved = localStorage.getItem('iitb_shortlisted_recruiters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast Notifications
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
  }, []);

  // Save shortlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('iitb_shortlisted_recruiters', JSON.stringify(shortlisted));
    } catch {
      // ignore
    }
  }, [shortlisted]);

  // Global Keyboard Shortcuts (1-3 for tabs)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // If typing in input or modal open, skip number shortcuts
      if (
        ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName) ||
        activeModalCompany ||
        isCopyrightOpen
      ) {
        return;
      }

      // Quick tab numbers 1-3
      if (e.key >= '1' && e.key <= '3') {
        const tabIdx = parseInt(e.key, 10) - 1;
        if (TAB_CONFIG[tabIdx]) {
          setActiveTab(TAB_CONFIG[tabIdx].id);
          showToast(`Switched to ${TAB_CONFIG[tabIdx].label}`, 'info');
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeModalCompany, isCopyrightOpen, showToast]);

  // Toggle Shortlist Bookmark
  const toggleShortlist = useCallback(
    (companyId) => {
      const company = companies.find((c) => c.id === companyId);
      setShortlisted((prev) => {
        if (prev.includes(companyId)) {
          showToast(`Removed ${company?.name || 'company'} from shortlist`, 'info');
          return prev.filter((id) => id !== companyId);
        } else {
          showToast(`Added ${company?.name || 'company'} to target shortlist! ⭐`, 'bookmark');
          return [...prev, companyId];
        }
      });
    },
    [showToast]
  );

  return (
    <div className="portal-container">
      {/* Subtle Background Glows */}
      <div className="ambient-glow glow-top" />
      <div className="ambient-glow glow-bottom" />

      {/* Floating Global Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Institutional Top Navbar with Unified Tabs */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shortlistedCount={shortlisted.length}
        tabs={TAB_CONFIG}
      />

      {/* Full Campus Hero Section */}
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        shortlistedCount={shortlisted.length}
      />

      {/* ── MAIN PORTAL CONTENT AREA ── */}
      <main className="main-portal-content" role="main">
        {/* VIEW 1: RECRUITERS DIRECTORY TABLE */}
        {activeTab === 'recruiters' && (
          <PlacementTable
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            shortlisted={shortlisted}
            onToggleShortlist={toggleShortlist}
            showToast={showToast}
          />
        )}

        {/* VIEW 2: BRANCH-WISE INSIGHTS & 5-YEAR TRENDS */}
        {activeTab === 'branches' && <BranchWise />}

        {/* VIEW 3: PLACEMENT INSIGHTS & ANALYTICS */}
        {activeTab === 'insights' && (
          <PlacementInsights
            onSelectCompany={setActiveModalCompany}
            showToast={showToast}
          />
        )}
      </main>

      {/* Detail Modal Overlay */}
      {activeModalCompany && (
        <CompanyDetailModal
          company={activeModalCompany}
          onClose={() => setActiveModalCompany(null)}
          isShortlisted={shortlisted.includes(activeModalCompany.id)}
          onToggleShortlist={toggleShortlist}
          showToast={showToast}
        />
      )}

      {/* Clean Copyright & Legal Notice Modal */}
      {isCopyrightOpen && (
        <CopyrightModal
          onClose={() => setIsCopyrightOpen(false)}
          showToast={showToast}
        />
      )}

      {/* Institutional Footer */}
      <Footer onOpenLegal={() => setIsCopyrightOpen(true)} />
    </div>
  );
}
