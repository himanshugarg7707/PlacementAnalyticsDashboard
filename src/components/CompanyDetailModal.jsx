import { useEffect } from 'react';
import CompanyLogo from './CompanyLogo';

/**
 * CompanyDetailModal Component
 *
 * A clean overlay modal placeholder when company details are opened.
 */
export default function CompanyDetailModal({
  company,
  onClose,
}) {
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

  if (!company) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-company-badge">
            <CompanyLogo company={company} size={52} />
            <div>
              <div className="modal-title-with-actions">
                <h2 id="modal-title" className="modal-company-name">{company.name}</h2>
              </div>
              <div className="modal-meta-row">
                <span className="modal-sector-tag">{company.sector}</span>
                <span className={`status-pill ${company.status.toLowerCase()}`}>
                  <span className="status-dot"></span>
                  {company.status}
                </span>
                <span className={`clean-badge ${company.type.toLowerCase().replace(' ', '-')}`}>
                  {company.type} Tier
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="coming-soon-card" style={{ textAlign: 'center', padding: '36px 20px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✨</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary, #ffffff)' }}>
              Feature Coming Soon
            </h3>
            <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '0.9rem', maxWidth: '360px', margin: '0 auto', lineHeight: '1.5' }}>
              Detailed company analytics, recruitment history, and interview insights for {company.name} will be available soon.
            </p>
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
