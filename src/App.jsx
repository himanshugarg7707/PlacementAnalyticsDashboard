import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PlacementTable from './components/PlacementTable';
import BranchWise from './components/BranchWise';
import Footer from './components/Footer';
import { companies } from './data/placementData';

export default function App() {
  const [activeTab, setActiveTab] = useState('recruiters'); // 'recruiters' | 'branches'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const handleExportCSV = () => {
    const headers = ['Company', 'Sector', 'CTC (LPA)', 'Offers', 'Tier', 'Branches', 'Status'];
    const rows = companies.map((c) => [
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
    link.setAttribute('download', 'NIT_Kurukshetra_Placement_Records_2024-25.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="portal-container">
      {/* Background Subtle Ambient Glow */}
      <div className="ambient-glow glow-top"></div>
      <div className="ambient-glow glow-bottom"></div>

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportCSV={handleExportCSV}
      />
      
      {/* Full Hero Section with Campus Background */}
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      <main className="main-portal-content" role="main">
        {activeTab === 'recruiters' ? (
          <PlacementTable
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        ) : (
          <BranchWise />
        )}
      </main>

      <Footer />
    </div>
  );
}
