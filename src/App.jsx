// Contributors: Alankrit Narang (App & Insights), Diya Arora (Hero & Table), Himanshu Garg (Branches & Data), Yuvraj Yadav (Logos & Toast)
import { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PlacementTable from './components/PlacementTable';
import BranchWise from './components/BranchWise';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CompanyDetailModal from './components/CompanyDetailModal';
import CopyrightModal from './components/CopyrightModal';
import ChangeCollegeModal from './components/ChangeCollegeModal';
import {
  companies,
  branches,
  collegeInfo,
  sectorWiseData,
  yearWiseTrend,
} from './data/placementData';

const TAB_CONFIG = [
  { id: 'recruiters', label: 'Recruiters Directory', icon: '🏢', shortcut: '1' },
  { id: 'branches', label: 'Branch Analytics', icon: '🎓', shortcut: '2' },
  { id: 'insights', label: 'Placement Insights', icon: '📊', shortcut: '3' },
];

function PlacementInsights({ onSelectCompany, showToast }) {
  const [insightFilter, setInsightFilter] = useState('all');
  const [expandedInsight, setExpandedInsight] = useState(null);

  const analytics = useMemo(() => {
    const placementRate = ((collegeInfo.totalPlaced / collegeInfo.totalStudents) * 100).toFixed(1);

    const sectorBreakdown = sectorWiseData
      .map((s) => ({
        ...s,
        pctOfOffers: ((s.offers / collegeInfo.totalOffers) * 100).toFixed(1),
      }))
      .sort((a, b) => b.offers - a.offers);

    const topPayingCompanies = [...companies]
      .sort((a, b) => b.ctc - a.ctc)
      .slice(0, 10);

    const topHiringCompanies = [...companies]
      .sort((a, b) => b.studentsHired - a.studentsHired)
      .slice(0, 10);

    const branchPerformance = branches.map((b) => {
      const placedCount = b.placed ?? b.studentsPlaced ?? 0;
      const rate = b.totalStudents > 0 ? ((placedCount / b.totalStudents) * 100).toFixed(1) : '0.0';
      return {
        ...b,
        placed: placedCount,
        placementRate: rate,
        gap: b.highestPackage - b.avgPackage,
      };
    }).sort((a, b) => parseFloat(b.placementRate) - parseFloat(a.placementRate));

    const tierDistribution = [
      { tier: 'Super Dream', count: collegeInfo.superDreamOffers, color: '#34d399' },
      { tier: 'Dream', count: collegeInfo.dreamOffers, color: '#60a5fa' },
      { tier: 'Normal', count: collegeInfo.normalOffers, color: '#94a3b8' },
    ];

    const yoyGrowth = yearWiseTrend.map((y, i) => {
      const prev = yearWiseTrend[i - 1];
      return {
        ...y,
        avgGrowth: prev ? (((y.avgPackage - prev.avgPackage) / prev.avgPackage) * 100).toFixed(1) : null,
        placementRate: ((y.totalPlaced / y.totalStudents) * 100).toFixed(1),
      };
    });

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

      {(insightFilter === 'all' || insightFilter === 'leaderboards') && (
        <div className="insights-dual-panel">
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
                    <span>{b.placed}/{b.totalStudents} placed</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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

export default function App() {
  const [activeTab, setActiveTab] = useState('recruiters');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [activeModalCompany, setActiveModalCompany] = useState(null);
  const [isCopyrightOpen, setIsCopyrightOpen] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState(null);

  // ── Theme state ──────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('iitb_theme_v2') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
    try {
      localStorage.setItem('iitb_theme_v2', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  const [shortlisted, setShortlisted] = useState(() => {
    try {
      const saved = localStorage.getItem('iitb_shortlisted_recruiters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('iitb_shortlisted_recruiters', JSON.stringify(shortlisted));
    } catch {
    }
  }, [shortlisted]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (
        ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName) ||
        activeModalCompany ||
        isCopyrightOpen ||
        comingSoonModal
      ) {
        return;
      }

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
  }, [activeModalCompany, isCopyrightOpen, comingSoonModal, showToast]);

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
      <div className="ambient-glow glow-top" />
      <div className="ambient-glow glow-bottom" />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shortlistedCount={shortlisted.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        onChangeCollege={() =>
          setComingSoonModal({
            title: 'Change College',
            description: 'The ability to change and switch between colleges is currently under development. Stay tuned for future updates!',
            badge: 'Multi-Campus',
            emoji: '🏛️',
          })
        }
        onLogin={() =>
          setComingSoonModal({
            title: 'Login Portal',
            description: 'Student authentication, T&P coordinator console, and recruiter login portals are currently under development.',
            badge: 'Sign In',
            emoji: '👤',
          })
        }
        tabs={TAB_CONFIG}
      />

      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        shortlistedCount={shortlisted.length}
      />

      <main className="main-portal-content" role="main">
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

        {activeTab === 'branches' && <BranchWise />}

        {activeTab === 'insights' && (
          <PlacementInsights
            onSelectCompany={setActiveModalCompany}
            showToast={showToast}
          />
        )}
      </main>

      {activeModalCompany && (
        <CompanyDetailModal
          company={activeModalCompany}
          onClose={() => setActiveModalCompany(null)}
          isShortlisted={shortlisted.includes(activeModalCompany.id)}
          onToggleShortlist={toggleShortlist}
          showToast={showToast}
        />
      )}

      {isCopyrightOpen && (
        <CopyrightModal
          onClose={() => setIsCopyrightOpen(false)}
          showToast={showToast}
        />
      )}

      {comingSoonModal && (
        <ChangeCollegeModal
          title={comingSoonModal.title}
          description={comingSoonModal.description}
          badge={comingSoonModal.badge}
          emoji={comingSoonModal.emoji}
          onClose={() => setComingSoonModal(null)}
        />
      )}

      <Footer
        onOpenLegal={() => setIsCopyrightOpen(true)}
      />
    </div>
  );
}
