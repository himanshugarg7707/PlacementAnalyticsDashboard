import { useEffect, useState } from 'react';
import { interviewQuestions } from '../data/placementData';
import CompanyLogo from './CompanyLogo';

export default function CompanyDetailModal({
  company,
  onClose,
  isShortlisted = false,
  onToggleShortlist,
  showToast,
}) {
  const [activeModalTab, setActiveModalTab] = useState('overview'); // 'overview' | 'interview'

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

  const handleCopySummary = () => {
    const infoText = `${company.name} | CTC: ₹${company.ctc} LPA | Sector: ${company.sector} | Offers: ${company.studentsHired} | Branches: ${company.branches.join(', ')}`;
    navigator.clipboard.writeText(infoText);
    if (showToast) {
      showToast(`Copied ${company.name} summary to clipboard!`, 'success');
    }
  };

  const handleCopyQuestions = () => {
    if (!companyQuestions?.questions) return;
    const qText = `${company.name} - Interview Questions:\n` + companyQuestions.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(qText);
    if (showToast) {
      showToast(`Copied ${company.name} interview questions!`, 'success');
    }
  };

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
                <button
                  className={`modal-star-btn ${isShortlisted ? 'active' : ''}`}
                  onClick={() => onToggleShortlist && onToggleShortlist(company.id)}
                  title={isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
                  aria-label="Toggle shortlist bookmark"
                >
                  {isShortlisted ? '⭐' : '☆'}
                </button>
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

        {/* Modal Internal Clean Tabs if questions exist */}
        {companyQuestions && (
          <div className="modal-sub-tabs">
            <button
              className={`modal-sub-tab-btn ${activeModalTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveModalTab('overview')}
            >
              📊 Drive &amp; Package Overview
            </button>
            <button
              className={`modal-sub-tab-btn ${activeModalTab === 'interview' ? 'active' : ''}`}
              onClick={() => setActiveModalTab('interview')}
            >
              🎯 Interview Prep &amp; Rounds
            </button>
          </div>
        )}

        <div className="modal-body">
          {activeModalTab === 'overview' ? (
            <>
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
                <div className="modal-section-header-row">
                  <h4 className="modal-section-title">Eligible Engineering Branches</h4>
                  <span className="modal-section-badge font-mono">{company.branches.length} Branches Open</span>
                </div>
                <div className="modal-branch-tags">
                  {company.branches.map((b) => (
                    <span className="modal-branch-pill font-mono" key={b}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Placement Notice */}
              <div className="modal-notice">
                <div className="notice-icon">🏛️</div>
                <div className="notice-text">
                  <strong>Official Drive:</strong> Selection was conducted on campus under the official placement policy of Indian Institute of Technology Bombay.
                </div>
              </div>
            </>
          ) : (
            /* Interview Preparation Tab */
            <div className="modal-section">
              <div className="modal-section-header-row">
                <h4 className="modal-section-title">Hiring Process &amp; Focus Areas</h4>
                {companyQuestions?.questions && (
                  <button className="minimal-copy-btn" onClick={handleCopyQuestions}>
                    📋 Copy Questions
                  </button>
                )}
              </div>

              <div className="questions-list">
                {companyQuestions?.rounds && (
                  <div className="rounds-timeline-card">
                    <span className="rounds-label font-mono">HIRING STAGES:</span>
                    <div className="rounds-steps-row">
                      {companyQuestions.rounds.map((round, idx) => (
                        <div className="round-step-item" key={idx}>
                          <span className="round-index-pill font-mono">{idx + 1}</span>
                          <span className="round-name-text">{round}</span>
                          {idx < companyQuestions.rounds.length - 1 && (
                            <span className="round-arrow">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {companyQuestions?.questions && (
                  <div className="questions-card-group">
                    <span className="questions-group-title">Frequently Asked Questions:</span>
                    {companyQuestions.questions.map((q, idx) => (
                      <div className="question-item" key={idx}>
                        <span className="q-num font-mono">Q{idx + 1}</span>
                        <p className="q-text">{q}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn-primary" onClick={handleCopySummary}>
            📋 Copy Summary
          </button>
        </div>
      </div>
    </div>
  );
}
