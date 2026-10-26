// Contributors: Himanshu Garg (UI Aesthetics, Theme System, Scroll Showcase & Login Portal), Diya Arora (Top Questions Bank, Navigation & Anchors), Yuvraj Yadav (Branch Roadmap & Toast), Alankrit Narang (Insights & Foundation)
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScrollShowcase from './components/ScrollShowcase';
import PlacementTable from './components/PlacementTable';
import BranchWise from './components/BranchWise';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CompanyDetailModal from './components/CompanyDetailModal';
import CopyrightModal from './components/CopyrightModal';
import ChangeCollegeModal from './components/ChangeCollegeModal';
import TopQuestionsModal from './components/TopQuestionsModal';
import LoginPage from './components/LoginPage';
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

function PlacementInsights({ onSelectCompany, onOpenQuestions, showToast }) {
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
        icon: '🚀',
      },
      {
        id: 'top-sector',
        title: 'Dominant Sector',
        value: sectorBreakdown[0]?.sector || 'Technology',
        detail: `${sectorBreakdown[0]?.offers || 0} offers (${sectorBreakdown[0]?.pctOfOffers || 0}% of all recruitments)`,
        trend: 'steady',
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
    <div
      id="insights"
      className="insights-container"
      data-tab-section="insights"
    >
      <span id="placement-insights" className="tab-anchor-alias" aria-hidden="true" />

      <div className="insights-header">
        <div>
          <span className="section-badge-pill">Analytics Intelligence</span>
          <h2 className="section-title-clean">Placement Insights &amp; Market Dynamics</h2>
          <p className="section-subtitle-clean">
            Statistical indicators, compensation percentiles, branch trajectories, and recruitment trends.
          </p>
        </div>

        <div className="insight-filter-pills">
          {['all', 'overview', 'compensation', 'sectors', 'branches', 'trends'].map((filter) => (
            <button
              key={filter}
              className={`insight-pill ${insightFilter === filter ? 'active' : ''}`}
              onClick={() => setInsightFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {onOpenQuestions && (
        <div className="insights-tq-callout-card">
          <div className="tq-callout-left">
            <span className="tq-callout-badge">Interview Preparation</span>
            <h3 className="tq-callout-title">Top Companies Mostly Asked Questions</h3>
            <p className="tq-callout-sub">
              Frequently asked interview questions, system designs, and core concepts from top recruiters.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary tq-callout-btn"
            onClick={() => onOpenQuestions('All')}
          >
            💡 View Questions
          </button>
        </div>
      )}

      <div className="insights-kpi-grid">
        {analytics.keyInsights.map((card) => (
          <div
            key={card.id}
            className={`insight-kpi-card ${expandedInsight === card.id ? 'expanded' : ''}`}
            onClick={() => setExpandedInsight(expandedInsight === card.id ? null : card.id)}
          >
            <div className="kpi-card-header">
              <div className="kpi-icon-bubble">{card.icon}</div>
              <div className={`kpi-trend-pill ${card.trend}`}>
                <span className="trend-arrow">{card.trend === 'up' ? '▲' : card.trend === 'down' ? '▼' : '●'}</span>
                <span>{card.trend === 'up' ? 'Growing' : card.trend === 'down' ? 'Dip' : 'Steady'}</span>
              </div>
            </div>

            <div className="kpi-card-body">
              <div className="kpi-value font-mono">{card.value}</div>
              <div className="kpi-title">{card.title}</div>
              <div className="kpi-detail">{card.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {(insightFilter === 'all' || insightFilter === 'compensation') && (
        <div className="insight-section">
          <h3 className="insight-section-title">📊 Compensation Distribution (CTC Tiers)</h3>
          <div className="tier-bar-chart">
            {analytics.ctcBuckets.map((bucket) => {
              const maxCount = Math.max(...analytics.ctcBuckets.map((b) => b.count));
              const heightPct = maxCount > 0 ? (bucket.count / maxCount) * 100 : 0;
              return (
                <div key={bucket.range} className="tier-bar-col">
                  <div className="tier-bar-count font-mono">{bucket.count}</div>
                  <div className="tier-bar-track">
                    <div
                      className="tier-bar-fill"
                      style={{ height: `${heightPct}%`, backgroundColor: bucket.color }}
                    />
                  </div>
                  <div className="tier-bar-label font-mono">{bucket.range}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(insightFilter === 'all' || insightFilter === 'overview') && (
        <div className="insight-grid-2col">
          <div className="insight-section">
            <h3 className="insight-section-title">🏆 Top 10 Highest CTC Recruiters</h3>
            <div className="leaderboard-list">
              {analytics.topPayingCompanies.map((c, i) => (
                <div
                  key={c.id}
                  className="leaderboard-row"
                  onClick={() => onSelectCompany?.(c)}
                >
                  <span className="lb-rank font-mono">{i + 1}</span>
                  <div className="lb-info">
                    <span className="lb-name">{c.name}</span>
                    <span className="lb-sector-tag">{c.sector}</span>
                  </div>
                  <span className="lb-ctc font-mono">₹{c.ctc.toFixed(1)} LPA</span>
                </div>
              ))}
            </div>
          </div>

          <div className="insight-section">
            <h3 className="insight-section-title">👥 Top 10 Volume Recruiters (Hires)</h3>
            <div className="leaderboard-list">
              {analytics.topHiringCompanies.map((c, i) => (
                <div
                  key={c.id}
                  className="leaderboard-row"
                  onClick={() => onSelectCompany?.(c)}
                >
                  <span className="lb-rank font-mono">{i + 1}</span>
                  <div className="lb-info">
                    <span className="lb-name">{c.name}</span>
                    <span className="lb-sector-tag">₹{c.ctc} LPA • {c.sector}</span>
                  </div>
                  <span className="lb-hires font-mono font-bold">{c.studentsHired} offers</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(insightFilter === 'all' || insightFilter === 'sectors') && (
        <div className="insight-section">
          <h3 className="insight-section-title">🌐 Sector Breakdown (% of Total Offers)</h3>
          <div className="sector-bar-list">
            {analytics.sectorBreakdown.map((s) => (
              <div key={s.sector} className="sector-bar-row">
                <div className="sector-bar-meta">
                  <span className="sector-bar-label">{s.sector}</span>
                  <span className="sector-bar-value font-mono">
                    {s.offers} offers ({s.pctOfOffers}%) • Avg: ₹{s.avgCTC.toFixed(1)} LPA
                  </span>
                </div>
                <div className="sector-bar-track">
                  <div
                    className="sector-bar-fill"
                    style={{ width: `${s.pctOfOffers}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(insightFilter === 'all' || insightFilter === 'branches') && (
        <div className="insight-section">
          <h3 className="insight-section-title">🎓 Department Placement Rates</h3>
          <div className="branch-rate-grid">
            {analytics.branchPerformance.map((b) => {
              const rateNum = parseFloat(b.placementRate);
              const colorClass = rateNum >= 90 ? 'rate-high' : rateNum >= 75 ? 'rate-mid' : 'rate-low';
              return (
                <div key={b.id} className="branch-rate-card">
                  <div className="br-header">
                    <span className="br-code font-mono">{b.shortName}</span>
                    <span className={`br-badge font-mono ${colorClass}`}>{b.placementRate}%</span>
                  </div>
                  <div className="br-name">{b.name}</div>
                  <div className="br-progress-track">
                    <div
                      className={`br-progress-fill ${colorClass}`}
                      style={{ width: `${Math.min(rateNum, 100)}%` }}
                    />
                  </div>
                  <div className="br-meta font-mono">
                    <span>{b.placed}/{b.totalStudents} placed</span>
                    <span>₹{b.avgPackage} LPA avg</span>
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

const HASH_MAP = {
  recruiters: 'recruiters',
  'recruiters-directory': 'recruiters',
  directory: 'recruiters',
  branches: 'branches',
  branchwise: 'branches',
  'branch-analytics': 'branches',
  'branch-wise': 'branches',
  insights: 'insights',
  'placement-insights': 'insights',
  analytics: 'insights',
};

const getTabFromHash = (hash) => {
  const clean = (hash || '').replace(/^#\/?/, '').toLowerCase().trim();
  return HASH_MAP[clean] || null;
};

export default function App() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const tab = getTabFromHash(window.location.hash);
      if (tab) return tab;
    }
    return 'recruiters';
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [activeModalCompany, setActiveModalCompany] = useState(null);
  const [isCopyrightOpen, setIsCopyrightOpen] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState(null);

  // Top Questions Bank state (Diya)
  const [isTopQuestionsOpen, setIsTopQuestionsOpen] = useState(false);
  const [questionsInitialCompany, setQuestionsInitialCompany] = useState('All');

  const handleOpenQuestions = useCallback((companyName = 'All') => {
    setQuestionsInitialCompany(companyName);
    setIsTopQuestionsOpen(true);
  }, []);

  // Auth User state (Himanshu login-portal)
  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem('iitb_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = useCallback(
    (user) => {
      setAuthUser(user);
      try {
        localStorage.setItem('iitb_auth_user', JSON.stringify(user));
      } catch {}
      navigate('/');
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    setAuthUser(null);
    try {
      localStorage.removeItem('iitb_auth_user');
    } catch {}
  }, []);

  // Theme toggle state (Himanshu theme system)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('iitb_portal_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('iitb_portal_theme', next);
      } catch {}
      document.documentElement.setAttribute('data-theme', next);
      document.documentElement.classList.toggle('light-theme', next === 'light');
      return next;
    });
  }, []);

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('light-theme', theme === 'light');
  }, [theme]);

  // Toast notifications
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
  }, []);

  // Shortlisted companies
  const [shortlisted, setShortlisted] = useState(() => {
    try {
      const saved = localStorage.getItem('iitb_shortlisted_recruiters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('iitb_shortlisted_recruiters', JSON.stringify(shortlisted));
    } catch {}
  }, [shortlisted]);

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

  // Smooth section scrolling and hash sync
  const scrollToTargetSection = useCallback((targetTabId) => {
    const targetElement =
      document.getElementById(targetTabId) ||
      document.querySelector(`[data-tab-section="${targetTabId}"]`) ||
      document.getElementById('main-portal-content') ||
      document.querySelector('.main-portal-content');

    if (!targetElement) return;

    try {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      const top = targetElement.getBoundingClientRect().top + window.pageYOffset - 88;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const handleTabSelect = useCallback(
    (targetTabId, shouldScroll = true) => {
      setActiveTab(targetTabId);

      if (typeof window !== 'undefined') {
        try {
          if (window.location.hash !== `#${targetTabId}`) {
            window.history.pushState(null, '', `#${targetTabId}`);
          }
        } catch {
          window.location.hash = targetTabId;
        }
      }

      if (shouldScroll) {
        setTimeout(() => {
          scrollToTargetSection(targetTabId);
        }, 30);
      }
    },
    [scrollToTargetSection]
  );

  // Hash listener for deep links
  useEffect(() => {
    const handleHashChange = () => {
      const newHashTab = getTabFromHash(window.location.hash);
      if (newHashTab) {
        setActiveTab(newHashTab);
        setTimeout(() => {
          scrollToTargetSection(newHashTab);
        }, 50);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [scrollToTargetSection]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (
        ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName) ||
        activeModalCompany ||
        isCopyrightOpen ||
        comingSoonModal ||
        isTopQuestionsOpen
      ) {
        return;
      }

      if (e.key >= '1' && e.key <= '3') {
        const tabIdx = parseInt(e.key, 10) - 1;
        if (TAB_CONFIG[tabIdx]) {
          handleTabSelect(TAB_CONFIG[tabIdx].id);
          showToast(`Switched to ${TAB_CONFIG[tabIdx].label}`, 'info');
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeModalCompany, isCopyrightOpen, comingSoonModal, isTopQuestionsOpen, handleTabSelect, showToast]);

  return (
    <Routes>
      {/* Dedicated Login & Account Creation Route */}
      <Route
        path="/login"
        element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
      />

      {/* Main Placement Portal Route */}
      <Route
        path="/"
        element={
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
              onTabSelect={handleTabSelect}
              shortlistedCount={shortlisted.length}
              user={authUser}
              onLogout={handleLogout}
              theme={theme}
              onToggleTheme={handleToggleTheme}
              onOpenQuestions={() => handleOpenQuestions('All')}
              onChangeCollege={() =>
                setComingSoonModal({
                  title: 'Change College',
                  description: 'The ability to switch between partner colleges is currently under development. Stay tuned for multi-campus support!',
                  badge: 'Multi-Campus',
                  emoji: '🏛️',
                })
              }
              onLogin={() => navigate('/login')}
              tabs={TAB_CONFIG}
            />

            <HeroSection
              onExploreRecruiters={() => handleTabSelect('recruiters')}
              onSelectBranch={() => handleTabSelect('branches')}
              onOpenQuestions={handleOpenQuestions}
            />

            <ScrollShowcase
              onExploreRecruiters={() => handleTabSelect('recruiters')}
              onSelectBranch={() => handleTabSelect('branches')}
            />

            <main id="main-portal-content" className="main-portal-content" role="main">
              {activeTab === 'recruiters' && (
                <PlacementTable
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filterType={filterType}
                  setFilterType={setFilterType}
                  shortlisted={shortlisted}
                  onToggleShortlist={toggleShortlist}
                  showToast={showToast}
                  onSelectCompany={setActiveModalCompany}
                  onOpenQuestions={handleOpenQuestions}
                />
              )}

              {activeTab === 'branches' && <BranchWise />}

              {activeTab === 'insights' && (
                <PlacementInsights
                  onSelectCompany={setActiveModalCompany}
                  onOpenQuestions={handleOpenQuestions}
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
                onOpenAllQuestions={handleOpenQuestions}
                showToast={showToast}
              />
            )}

            {isTopQuestionsOpen && (
              <TopQuestionsModal
                isOpen={isTopQuestionsOpen}
                initialCompany={questionsInitialCompany}
                onClose={() => setIsTopQuestionsOpen(false)}
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
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
