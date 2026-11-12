// Contributor: Himanshu Garg & Placement Team
// Feature: Scroll-Driven Interactive Showcase with Parallax & Stagger Reveals
// Each section triggers on scroll with different motion directions

import { useState, useEffect, useRef, useCallback } from 'react';
import './ScrollShowcase.css';

// Utility: Intersection Observer hook for scroll-reveal
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export default function ScrollShowcase({ onExploreRecruiters, onSelectBranch }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth scroll offset tracking for parallax
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const wh = window.innerHeight;
    const progress = (wh - rect.top) / (wh + rect.height);
    setScrollProgress(Math.max(-0.5, Math.min(1.5, progress)));
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  // Individual section reveal hooks
  const [headerRef, headerVisible] = useReveal(0.2);
  const [col1Ref, col1Visible] = useReveal(0.12);
  const [col2Ref, col2Visible] = useReveal(0.12);
  const [col3Ref, col3Visible] = useReveal(0.12);
  const [ctaRef, ctaVisible] = useReveal(0.3);

  // Parallax offset calculations
  const drift = scrollProgress - 0.5;
  const parallax1 = drift * -40;
  const parallax2 = drift * 28;
  const parallax3 = drift * -50;

  return (
    <section className="scroll-showcase-section" ref={containerRef} aria-label="Placement Features Showcase">
      {/* Section Header with reveal */}
      <div
        ref={headerRef}
        className={`showcase-section-header ${headerVisible ? 'reveal-in' : ''}`}
      >
        <span className="showcase-overline">How it works</span>
        <h2 className="showcase-main-title">
          Intelligence at every<br />stage of the placement cycle
        </h2>
        <p className="showcase-main-sub">
          Real-time offer streams, branch eligibility mapping, and data-backed strategy recommendations — 
          verified across IIT Bombay's 2024–25 recruitment season.
        </p>
      </div>

      <div className="scroll-showcase-container">
        {/* 3-Column Grid */}
        <div className="scroll-showcase-grid">

          {/* COLUMN 1: "Stay in the loop" — slides in from LEFT */}
          <div
            ref={col1Ref}
            className={`showcase-col col-1 ${col1Visible ? 'col-reveal col-reveal-left' : ''}`}
          >
            <div className="showcase-visual-area">
              <div
                className="parallax-wrapper"
                style={{ transform: `translateY(${parallax1}px)` }}
              >
                {/* Floating cards stack */}
                <div className="float-card float-card-top">
                  <div className="card-user-row">
                    <div className="avatar-circle avatar-blue">G</div>
                    <div className="user-text">
                      <span className="user-name">Google University Hiring</span>
                      <span className="user-sub">14 SDE Offers Released • ₹54.2 LPA</span>
                    </div>
                    <span className="card-check-badge">✓</span>
                  </div>
                </div>

                <div className="float-card float-card-mid">
                  <div className="card-user-row">
                    <div className="avatar-circle avatar-green">M</div>
                    <div className="user-text">
                      <span className="user-name">Microsoft IDC</span>
                      <span className="user-sub">Slot-1 Shortlist Confirmed (CSE &amp; EE)</span>
                    </div>
                  </div>
                </div>

                <div className="float-card float-card-bottom">
                  <div className="card-user-row">
                    <div className="avatar-icon-square">⚡</div>
                    <div className="user-text">
                      <span className="user-name">Quant Analytics Update</span>
                      <span className="user-sub">₹1.2 Cr Peak CTC Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="showcase-text-area">
              <h3 className="showcase-headline">Stay in the loop</h3>
              <p className="showcase-description">
                A live activity stream of every offer, interview schedule, and verified compensation
                benchmark across 2,140+ candidates — see what just changed at a glance.
              </p>
            </div>
          </div>

          {/* COLUMN 2: "Plug into your department" — slides up from BOTTOM */}
          <div
            ref={col2Ref}
            className={`showcase-col col-2 ${col2Visible ? 'col-reveal col-reveal-up' : ''}`}
          >
            <div className="showcase-visual-area">
              <div
                className="parallax-wrapper"
                style={{ transform: `translateY(${parallax2}px)` }}
              >
                <div className="float-popup-card">
                  <div className="popup-header-row">
                    <div className="popup-title-group">
                      <span className="popup-brand-badge">IITB ERP</span>
                      <div className="popup-titles">
                        <span className="popup-title">Central T&amp;P Console</span>
                        <span className="popup-subtitle">Academic cohort synchronization active</span>
                      </div>
                    </div>
                  </div>

                  <div className="popup-dept-chips">
                    <span className="dept-chip active">Computer Science (98.4%)</span>
                    <span className="dept-chip">Electrical Engg (94.1%)</span>
                    <span className="dept-chip">Mechanical Engg (89.2%)</span>
                  </div>

                  <button
                    type="button"
                    className="popup-manage-btn"
                    onClick={onSelectBranch}
                  >
                    <span>⚙️</span> Manage Branch Cutoffs
                  </button>
                </div>
              </div>
            </div>

            <div className="showcase-text-area">
              <h3 className="showcase-headline">Plug into your department</h3>
              <p className="showcase-description">
                CSE, Electrical, Mechanical, and Data Science — seamlessly cross-reference
                academic eligibility criteria, branch cutoffs, and GPA requirements.
              </p>
            </div>
          </div>

          {/* COLUMN 3: "Formulate the next step" — slides in from RIGHT */}
          <div
            ref={col3Ref}
            className={`showcase-col col-3 ${col3Visible ? 'col-reveal col-reveal-right' : ''}`}
          >
            <div className="showcase-visual-area">
              <div
                className="parallax-wrapper"
                style={{ transform: `translateY(${parallax3}px)` }}
              >
                <div className="float-strategy-card">
                  <div className="strategy-meta-row">
                    <span className="strategy-tag">Target Recruiter Strategy</span>
                    <div className="avatar-stack">
                      <span className="mini-avatar">A</span>
                      <span className="mini-avatar">D</span>
                      <span className="mini-avatar mini-more">+3</span>
                    </div>
                  </div>

                  <div className="strategy-content">
                    <span className="strategy-company-name">Graviton Research Capital</span>
                    <p className="strategy-snippet">
                      Super Dream Tier • Systems &amp; Low-Latency Algorithms
                    </p>
                  </div>

                  <div className="strategy-suggested-action">
                    <span className="action-icon">↳</span>
                    <span className="action-text">Review Core DSA &amp; Architecture syllabus</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="showcase-text-area">
              <h3 className="showcase-headline">Formulate the next step</h3>
              <p className="showcase-description">
                Evaluate historical CTC trends, recruiter hiring volumes, and sector distributions
                grounded in verified placement data — review, target, succeed.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom CTA bar */}
        <div
          ref={ctaRef}
          className={`showcase-cta-strip ${ctaVisible ? 'reveal-in' : ''}`}
        >
          <p className="cta-strip-text">
            Ready to explore? Dive into verified recruiter records and branch analytics.
          </p>
          <button
            type="button"
            className="cta-strip-btn"
            onClick={onExploreRecruiters}
          >
            Explore Recruiters →
          </button>
        </div>
      </div>
    </section>
  );
}
