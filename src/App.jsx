import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsOverview from './components/StatsOverview';
import DashboardOverview from './components/DashboardOverview';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content" role="main">
        <HeroSection />
        <StatsOverview />
        <DashboardOverview />
      </main>
      <Footer />
    </div>
  );
}
