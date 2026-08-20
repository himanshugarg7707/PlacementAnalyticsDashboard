/**
 * Footer Component
 * 
 * Institutional footer for the IIT Bombay Placement Portal.
 * Displays institution branding, address, classification tags,
 * and copyright information.
 * 
 * Layout: Two-column flex layout with brand info on left
 * and classification tags on the right side.
 * 
 * @returns {JSX.Element} Footer section with institutional details
 */
export default function Footer() {
  return (
    <footer className="footer-minimal" role="contentinfo">
      <div className="footer-inner-clean">
        {/* Institution Brand and Address */}
        <div className="footer-left">
          <div className="footer-brand-title">IIT Bombay • Placement Portal</div>
          <p className="footer-sub">
            Training &amp; Placement Cell, Indian Institute of Technology Bombay, Powai, Mumbai, Maharashtra 400076, India.
          </p>
        </div>

        {/* Institution Classification Tags */}
        <div className="footer-right">
          <span className="footer-tag font-mono">Autonomous Institute</span>
          <span className="footer-tag font-mono">Institute of National Importance</span>
          <span className="footer-tag font-mono">Batch 2021–25</span>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="footer-copy-clean font-mono">
        © {new Date().getFullYear()} Indian Institute of Technology Bombay. Verified institutional placement records.
      </div>
    </footer>
  );
}
