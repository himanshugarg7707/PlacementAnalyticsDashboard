import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PlacementTable from './components/PlacementTable';
import BranchWise from './components/BranchWise';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState('recruiters'); // 'recruiters' | 'branches'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Shortlist bookmark state persisted in localStorage
  const [shortlisted, setShortlisted] = useState(() => {
    try {
      const saved = localStorage.getItem('iitb_shortlisted_recruiters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const toggleShortlist = (companyId) => {
    setShortlisted((prev) => {
      let updated;
      if (prev.includes(companyId)) {
        updated = prev.filter((id) => id !== companyId);
        showToast('Removed from target shortlist', 'info');
      } else {
        updated = [...prev, companyId];
        showToast('Added to target shortlist! ⭐', 'bookmark');
      }
      try {
        localStorage.setItem('iitb_shortlisted_recruiters', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  return (
    <div className="portal-container">
      {/* Background Subtle Ambient Glow */}
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

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shortlistedCount={shortlisted.length}
      />

      {/* Full Hero Section */}
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        shortlistedCount={shortlisted.length}
      />

      <main className="main-portal-content" role="main">
        {activeTab === 'recruiters' ? (
          <PlacementTable
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            shortlisted={shortlisted}
            onToggleShortlist={toggleShortlist}
            showToast={showToast}
          />
        ) : (
          <BranchWise />
        )}
      </main>

      <Footer />
    </div>
  );
}