/**
 * Footer Component
 * 
 * Minimal, dark-themed institutional footer with copyright and disclaimer links.
 * 
 * @param {Object} props
 * @param {Function} [props.onOpenLegal] - Callback to open the copyright modal
 * @returns {JSX.Element}
 */
export default function Footer({ onOpenLegal }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-minimal" role="contentinfo">
      <div className="footer-inner-clean">
        {/* Left Side: Brand and Address */}
        <div className="footer-left">
          <div className="footer-brand-title">
            <span>IIT Bombay • Placement Portal</span>
          </div>
          <p className="footer-sub">
            Training &amp; Placement Cell, Indian Institute of Technology Bombay, Powai, Mumbai 400076.
          </p>
        </div>

        {/* Right Side: Tags and External Link */}
        <div className="footer-right">
          <span className="footer-tag font-mono">Autonomous Institute</span>
          <span className="footer-tag font-mono">Batch 2021–25</span>
          <a
            href="https://www.iitb.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-tag footer-tag-link font-mono"
          >
            iitb.ac.in ↗
          </a>
        </div>
      </div>

      {/* Clean Copyright & Disclaimers Row */}
      <div className="footer-copy-clean font-mono">
        <div className="footer-copy-row">
          <span>© {currentYear} Indian Institute of Technology Bombay.</span>
          <span className="dot-sep">•</span>
          <button
            type="button"
            className="footer-legal-btn"
            onClick={() => onOpenLegal && onOpenLegal()}
          >
            Copyright &amp; Disclaimers
          </button>
          <span className="dot-sep">•</span>
          <a
            href="https://placements.iitb.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Placement Cell ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
