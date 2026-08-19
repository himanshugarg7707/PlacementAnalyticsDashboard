import { collegeInfo } from '../data/placementData';

export default function HeroSection() {
  return (
    <section className="hero-master-wrapper" aria-labelledby="hero-heading">
      {/* Campus Photo Showcase */}
      <div className="campus-showcase-card">
        <div className="campus-image-container">
          <img
            className="campus-hero-img"
            src="/campus-bg.png"
            alt="NIT Kurukshetra Campus"
            loading="eager"
          />
          <div className="campus-image-fade" />
          <div className="campus-photo-caption">
            <span className="caption-dot" aria-hidden="true"></span>
            NIT Kurukshetra — Est. 1963
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="hero-content-section">
        <div className="hero-badge">
          <span className="badge-pulse" aria-hidden="true"></span>
          Placement Season {collegeInfo.session} — Live Data
        </div>
        <h2 id="hero-heading" className="hero-title">
          Campus <span className="hero-title-accent">Placement Records</span>
        </h2>
        <p className="hero-subtitle">
          Real-time recruitment data, company-wise hiring statistics, branch-wise
          placement analysis, and most asked interview questions for{' '}
          <strong>{collegeInfo.shortName}</strong>
        </p>
      </div>
    </section>
  );
}
