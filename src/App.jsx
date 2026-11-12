// Contributors: Himanshu Garg (UI Aesthetics, Theme System, Scroll Showcase & Login Portal), Diya Arora (Top Questions Bank, Navigation & Anchors), Yuvraj Yadav (Branch Roadmap & Toast), Alankrit Narang (Insights & Foundation)
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PlacementTable from './components/PlacementTable';
import BranchWise from './components/BranchWise';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CompanyDetailModal from './components/CompanyDetailModal';
import CopyrightModal from './components/CopyrightModal';
import ChangeCollegeModal from './components/ChangeCollegeModal';
import TopQuestionsModal from './components/TopQuestionsModal';
import LoginPage from './components/LoginPage';
import PlacementInsights from './components/insights/PlacementInsights';
import { companies } from './data/placementData';
import { clearSavedUser, getSavedUser, saveUser } from './services/authStorage';
import { getSavedTheme, getShortlist, saveShortlist, saveTheme } from './services/portalStorage';
import './flatDark.css';

const TAB_CONFIG = [
  { id: 'recruiters', label: 'Recruiters Directory', icon: '🏢', shortcut: '1' },
  { id: 'branches', label: 'Branch Analytics', icon: '🎓', shortcut: '2' },
  { id: 'insights', label: 'Placement Insights', icon: '📊', shortcut: '3' },
];


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
  const [authUser, setAuthUser] = useState(getSavedUser);

  const handleLoginSuccess = useCallback(
    (user) => {
      setAuthUser(user);
      saveUser(user);
      navigate('/');
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    setAuthUser(null);
    clearSavedUser();
  }, []);

  // Theme toggle state (Himanshu theme system)
  const [theme, setTheme] = useState(getSavedTheme);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      saveTheme(next);
      return next;
    });
  }, []);

  // Synchronize theme across document and body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    if (document.body) {
      document.body.setAttribute('data-theme', theme);
      document.body.classList.toggle('light-theme', theme === 'light');
    }
  }, [theme]);

  // Toast notifications
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
  }, []);

  // Shortlisted companies
  const [shortlisted, setShortlisted] = useState(getShortlist);

  useEffect(() => {
    saveShortlist(shortlisted);
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
          <div
            className={`portal-container theme-${theme}`}
            data-theme={theme}
            style={{
              backgroundColor: theme === 'light' ? '#f4f5f3' : '#111315',
              color: theme === 'light' ? '#202522' : '#f0f1ef',
              colorScheme: theme,
            }}
          >
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

            <HeroSection />

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
