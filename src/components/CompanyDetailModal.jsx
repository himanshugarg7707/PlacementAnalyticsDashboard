import { useEffect } from 'react';
import { interviewQuestions } from '../data/placementData';
import CompanyLogo from './CompanyLogo';

export default function CompanyDetailModal({ company, onClose }) {
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

  const companyQuestions = interviewQuestions ? interviewQuestions[company.name] : null;

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
              <h2 id="modal-title" className="modal-company-name">{company.name}</h2>
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
          {/* Key Metrics Grid */}
          <div className="modal-stats-grid">
            <div className="modal-stat-box">
              <span className="m-label">CTC Package</span>
              <span className="m-value font-mono highlight-ctc">₹{company.ctc.toFixed(1)} LPA</span>
              <span className="m-sub">Gross CTC</span>
            </div>
            <div className="modal-stat-box">
              <span className="m-label">Students Placed</span>
              <span className="m-value font-mono">{company.studentsHired}</span>
              <span className="m-sub">Job Offers</span>
            </div>
            <div className="modal-stat-box">
              <span className="m-label">Recruiter Tier</span>
              <span className="m-value">{company.type}</span>
              <span className="m-sub">{company.ctc >= 20 ? '> 20 LPA' : company.ctc >= 10 ? '10 - 20 LPA' : '< 10 LPA'}</span>
            </div>
          </div>

          {/* Eligible Branches */}
          <div className="modal-section">
            <h4 className="modal-section-title">Eligible Branches</h4>
            <div className="modal-branch-tags">
              {company.branches.map((b) => (
                <span className="modal-branch-pill font-mono" key={b}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Interview Questions / Hiring Process */}
          {companyQuestions && (
            <div className="modal-section">
              <h4 className="modal-section-title">Interview Questions &amp; Focus Areas</h4>
              <div className="questions-list">
                {companyQuestions.rounds && (
                  <div className="rounds-timeline">
                    <span className="rounds-label">Hiring Stages:</span>
                    <span className="rounds-value">{companyQuestions.rounds.join(' → ')}</span>
                  </div>
                )}
                {companyQuestions.questions && companyQuestions.questions.map((q, idx) => (
                  <div className="question-item" key={idx}>
                    <span className="q-num">Q{idx + 1}</span>
                    <p className="q-text">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placement Notice */}
          <div className="modal-notice">
            <div className="notice-icon">🏛️</div>
            <div className="notice-text">
              <strong>Official Drive:</strong> Selection was conducted on campus under the official placement policy of NIT Kurukshetra.
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button 
            className="btn-primary"
            onClick={() => {
              const infoText = `${company.name} | CTC: ₹${company.ctc} LPA | Sector: ${company.sector} | Offers: ${company.studentsHired} | Branches: ${company.branches.join(', ')}`;
              navigator.clipboard.writeText(infoText);
              alert(`Copied summary for ${company.name}!`);
            }}
          >
            📋 Copy Info
          </button>
        </div>
      </div>
    </div>
  );
}
