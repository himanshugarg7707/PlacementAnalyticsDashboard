import { collegeInfo } from '../data/placementData';

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-badge">
        <span className="pulse-dot" aria-hidden="true"></span>
        Placement Season {collegeInfo.session} — Live Data
      </div>
      <h2 id="hero-heading">
        Campus <span className="gradient-text">Placement Records</span>
      </h2>
      <p className="subtitle">
        Real-time recruitment data, company-wise hiring statistics, branch-wise 
        placement analysis, and most asked interview questions for{' '}
        <span className="session-tag">{collegeInfo.shortName}</span>
      </p>
    </section>
  );
}
