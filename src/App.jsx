import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsOverview from './components/StatsOverview';
import DashboardOverview from './components/DashboardOverview';
import CompanyTable from './components/CompanyTable';
import BranchWise from './components/BranchWise';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <HeroSection />
            <StatsOverview />
            <DashboardOverview />
          </>
        );
      case 'companies':
        return <CompanyTable />;
      case 'branches':
        return <BranchWise />;
      default:
        return (
          <>
            <HeroSection />
            <StatsOverview />
            <DashboardOverview />
          </>
        );
    }
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content" role="main">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}