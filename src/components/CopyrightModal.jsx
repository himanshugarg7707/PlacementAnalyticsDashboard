import { useEffect, useState } from 'react';

/**
 * CopyrightModal Component
 *
 * Clean, dark-themed copyright and legal notice modal.
 */
export default function CopyrightModal({ onClose, showToast }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleCopyNotice = () => {
    const text = `© ${new Date().getFullYear()} Indian Institute of Technology Bombay. Training & Placement Cell, Powai, Mumbai 400076. Official Placement Records.`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    if (showToast) {
      showToast('Copyright notice copied', 'info');
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="copyright-title"
    >
      <div
        className="modal-content simple-legal-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="simple-legal-header">
          <div className="simple-legal-icon">🏛️</div>
          <div>
            <h2 id="copyright-title" className="simple-legal-title">
              Copyright &amp; Disclaimers
            </h2>
            <p className="simple-legal-sub">
              IIT Bombay • Training &amp; Placement Cell
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="simple-legal-body">
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">Copyright Notice</h3>
            <p>
              © {new Date().getFullYear()} Indian Institute of Technology Bombay. All rights reserved.
            </p>
            <p className="text-secondary">
              Placement statistics, sector analyses, and dashboard assets are compiled and maintained by the Training &amp; Placement Cell for institutional reporting and student reference.
            </p>
          </section>

          <section className="simple-legal-section">
            <h3 className="simple-legal-label">Trademarks &amp; Brand Logos</h3>
            <p className="text-secondary">
              Company logos, trademarks, and brand names displayed across this portal are the property of their respective corporate owners. They are used here solely for informational and historical placement record purposes.
            </p>
          </section>

          <section className="simple-legal-section">
            <h3 className="simple-legal-label">Data &amp; CTC Disclaimer</h3>
            <p className="text-secondary">
              Package values (CTC / LPA) reflect figures submitted during campus recruitment drives. Individual student identifiers are omitted to protect privacy. For official verifications or transcripts, contact the Placement Office directly.
            </p>
          </section>

          <section className="simple-legal-section">
            <h3 className="simple-legal-label">Office &amp; Contact</h3>
            <div className="simple-legal-contact-row">
              <span>Training &amp; Placement Cell, 4th Floor, Main Building, IIT Bombay, Powai, Mumbai 400076</span>
              <div className="simple-legal-links">
                <a
                  href="https://placements.iitb.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="simple-link"
                >
                  placements.iitb.ac.in ↗
                </a>
                <span className="dot-sep">•</span>
                <a
                  href="https://www.iitb.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="simple-link"
                >
                  iitb.ac.in ↗
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="simple-legal-footer">
          <button
            type="button"
            className="btn-secondary btn-sm"
            onClick={handleCopyNotice}
          >
            {copied ? '✓ Copied' : 'Copy Notice'}
          </button>
          <button
            type="button"
            className="btn-primary btn-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
