// Contributor: Diya Arora & Placement Team - Hero Section Component
import { useState, useEffect } from 'react';
import { collegeInfo } from '../data/placementData';

export default function HeroSection({
  onExploreRecruiters,
  onSelectBranch,
}) {
  const [animatedHighest, setAnimatedHighest] = useState(0);
  const [animatedAvg, setAnimatedAvg] = useState(0);
  const [animatedOffers, setAnimatedOffers] = useState(0);
  const [animatedCompanies, setAnimatedCompanies] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setAnimatedHighest(Number((ease * collegeInfo.highestPackage).toFixed(1)));
      setAnimatedAvg(Number((ease * collegeInfo.averagePackage).toFixed(1)));
      setAnimatedOffers(Math.floor(ease * collegeInfo.totalOffers));
      setAnimatedCompanies(Math.floor(ease * collegeInfo.totalCompanies));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  return (
    <div className="hero-viewport-wrapper">
      {/* 1. Full-Width Campus Cover Fitted to Screen with Seamless Merge */}
      <div className="campus-screen-cover">
        <img
          src="/campus-bg.png"
          alt="IIT Bombay Main Campus Entrance"
          className="campus-screen-img"
          style={{
            objectPosition: 'center 25%',
            filter: 'blur(3.5px) brightness(0.97) saturate(1.05)',
          }}
        />
        <div className="campus-screen-vignette" />
        <div className="campus-screen-merge" />
      </div>

      {/* 2. Text Content Positioned Below the Image Focus Area */}
      <div className="hero-text-content">
        {/* Editorial Serif Headline */}
        <h1 className="hero-editorial-title">
          Making Placement<br />Intelligence Accessible
        </h1>

        <p className="hero-editorial-subtitle">
          Official recruitment directory, CTC package analytics, and branch eligibility database for{' '}
          <strong>Indian Institute of Technology Bombay</strong>.
        </p>

        {/* Elevated Glass Stats Bar */}
        <div className="hero-stats-capsule-bar">
          <div className="stat-item">
            <span className="stat-label">Peak Package</span>
            <span className="stat-val font-mono highlight-val">
              ₹{animatedHighest} <small>LPA</small>
            </span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-label">Average CTC</span>
            <span className="stat-val font-mono">
              ₹{animatedAvg} <small>LPA</small>
            </span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-label">Total Offers</span>
            <span className="stat-val font-mono">{animatedOffers.toLocaleString()}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-label">Recruiters</span>
            <span className="stat-val font-mono">{animatedCompanies}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hero-action-buttons">
          <button
            type="button"
            className="hero-btn-primary"
            onClick={onExploreRecruiters}
          >
            <span>Explore Recruiters Directory</span>
            <span className="btn-arrow">↓</span>
          </button>
          <button
            type="button"
            className="hero-btn-secondary"
            onClick={onSelectBranch}
          >
            <span>Branch Analytics &amp; Cutoffs</span>
          </button>
        </div>
      </div>
    </div>
  );
}
