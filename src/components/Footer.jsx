// Contributor: Alankrit Narang - Footer Component
export default function Footer({ onOpenLegal }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-glow-line" aria-hidden="true" />

      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo-text">IIT Bombay</span>
          <span className="footer-divider">|</span>
          <span className="footer-subtitle">Placement Analytics</span>
        </div>

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
