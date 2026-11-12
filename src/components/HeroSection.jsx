import { companies, collegeInfo } from '../data/placementData';

const summaryStats = [
  { label: 'Highest package', value: `₹${collegeInfo.highestPackage} LPA` },
  { label: 'Average package', value: `₹${collegeInfo.averagePackage} LPA` },
  { label: 'Total offers', value: collegeInfo.totalOffers.toLocaleString() },
  { label: 'Recruiters', value: collegeInfo.totalCompanies.toLocaleString() },
];

export default function HeroSection() {
  return (
    <section className="portal-overview hero-section" aria-labelledby="portal-title">
      <img
        className="hero-background"
        src="/placement-growth-hero.png"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-content">
        <div className="portal-overview-heading">
          <div>
            <p className="portal-eyebrow">Campus recruiting data</p>
            <h1 id="portal-title">All Data One Place</h1>
            <p className="portal-description">
              Compare employers, compensation, branch results, and hiring trends in one place.
            </p>
          </div>
          <span className="data-period">IIT Bombay · {collegeInfo.session}</span>
        </div>

        <div className="overview-stats" aria-label="Career outcome summary">
          {summaryStats.map(({ label, value }) => (
            <div className="overview-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <p className="coverage-note">
          {companies.length} recruiter records · Summary figures are institute-wide totals.
        </p>
      </div>
    </section>
  );
}
