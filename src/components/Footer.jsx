/**
 * Footer Component
 * 
 * Sleek single-strip footer with gradient accent, inline tags, and copyright.
 * 
 * @param {Object} props
 * @param {Function} [props.onOpenLegal] - Callback to open the copyright modal
 * @returns {JSX.Element}
 */
export default function Footer({ onOpenLegal }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Gradient accent line */}
      <div className="footer-glow-line" aria-hidden="true" />

      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <span className="footer-logo-text">IIT Bombay</span>
          <span className="footer-divider">|</span>
          <span className="footer-subtitle">Placement Analytics</span>
        </div>

        {/* Chips */}
        <div className="footer-chips">
          <span className="footer-chip">Batch 2021–25</span>
          <span className="footer-chip">Autonomous Institute</span>
          <a
            href="https://www.iitb.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-chip footer-chip--link"
          >
            iitb.ac.in ↗
          </a>
        </div>

        {/* Copyright row */}
        <div className="footer-copy font-mono">
          <span>© {currentYear} IIT Bombay</span>
          <span className="footer-dot">·</span>
          <button
            type="button"
            className="footer-legal-trigger"
            onClick={() => onOpenLegal && onOpenLegal()}
          >
            Copyright &amp; Disclaimers
          </button>
          <span className="footer-dot">·</span>
          <a
            href="https://placements.iitb.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ext-link"
          >
            Placement Cell ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
