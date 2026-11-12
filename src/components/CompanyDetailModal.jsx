// Contributor: Himanshu Garg - Company Detail Modal & Interview Questions
import { useEffect, useState, useMemo } from 'react';
import CompanyLogo from './CompanyLogo';
import { collegeInfo, detailedRecruiterProfiles } from '../data/placementData';
import { TOP_COMPANY_QUESTIONS } from '../data/topCompanyQuestions';

const MASS_HIRING_OFFER_THRESHOLD = 25;

export default function CompanyDetailModal({
  company,
  onClose,
  isShortlisted = false,
  onToggleShortlist,
  onOpenAllQuestions,
  showToast,
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'questions' | 'rounds'
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

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

  // Find detailed recruiter profile if available
  const profile = useMemo(() => {
    if (!company) return null;
    return detailedRecruiterProfiles.find(
      (p) =>
        p.companyId === company.id ||
        p.name.toLowerCase().includes(company.name.toLowerCase()) ||
        company.name.toLowerCase().includes(p.name.toLowerCase())
    );
  }, [company]);

  // Find mostly asked questions for this company
  const companyQuestions = useMemo(() => {
    if (!company) return [];
    return TOP_COMPANY_QUESTIONS.filter(
      (q) =>
        q.company.toLowerCase() === company.name.toLowerCase() ||
        q.alsoAskedBy?.some((c) => c.toLowerCase() === company.name.toLowerCase())
    );
  }, [company]);

  if (!company) return null;

  const currentHiringStatus = company.currentHiringStatus ?? company.hiringStatus
    ?? profile?.currentHiringStatus ?? profile?.hiringStatus;
  const currentHiringLabel = currentHiringStatus === true
    ? 'Hiring'
    : currentHiringStatus === false
      ? 'Not hiring'
      : currentHiringStatus || 'Not tracked';
  const ceoName = company.ceoName || company.ceo || profile?.ceoName || profile?.ceo;
  const hrContactName = company.hrContactName || company.hrName
    || profile?.hrContactName || profile?.hrName || profile?.recruiterContact;
  const campusOffers = Number(company.studentsHired) || 0;
  const isMassRecruiter = campusOffers >= MASS_HIRING_OFFER_THRESHOLD;
  const hiringHistory = Object.entries(profile?.historicalHiring || {}).sort(
    ([firstYear], [secondYear]) => firstYear.localeCompare(secondYear)
  );
  const maxHistoricalOffers = Math.max(1, ...hiringHistory.map(([, data]) => data.offers || 0));
  const driveDate = company.visitDate
    ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(`${company.visitDate}T00:00:00`))
    : `Session ${collegeInfo.session}`;

  const defaultEvaluationStages = profile?.evaluationStages || [
    { round: 1, name: 'Online Coding / Technical Assessment', durationMins: 90, focus: 'Data Structures, Aptitude & CS Core MCQs' },
    { round: 2, name: 'Technical Interview 1 (DSA & Problem Solving)', durationMins: 60, focus: 'Algorithms, Data Structures & Live Whiteboard Coding' },
    { round: 3, name: 'Technical Interview 2 (System Architecture & LLD)', durationMins: 60, focus: 'Object-Oriented Design, Concurrency & Operating Systems' },
    { round: 4, name: 'HR & Leadership Behavioral Round', durationMins: 45, focus: 'Cultural Fit, Collaboration, Conflict Resolution' },
  ];

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-content company-detail-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-company-badge">
            <CompanyLogo company={company} size={52} />
            <div>
              <div className="modal-title-with-actions">
                <h2 id="modal-title" className="modal-company-name">
                  {company.name}
                </h2>
                {onToggleShortlist && (
                  <button
                    type="button"
                    className={`modal-star-btn ${isShortlisted ? 'active' : ''}`}
                    onClick={() => onToggleShortlist(company.id)}
                    title={isShortlisted ? 'Remove from target list' : 'Shortlist company'}
                    aria-label={`Shortlist ${company.name}`}
                  >
                    {isShortlisted ? '⭐' : '☆'}
                  </button>
                )}
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

        {/* Sub Navigation Tabs */}
        <div className="modal-sub-tabs" aria-label={`${company.name} information`}>
          <button
            type="button"
            aria-pressed={activeTab === 'overview'}
            className={`modal-sub-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Company Profile
          </button>
          <button
            type="button"
            aria-pressed={activeTab === 'questions'}
            className={`modal-sub-tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => setActiveTab('questions')}
          >
            🔥 Mostly Asked Questions ({companyQuestions.length})
          </button>
          <button
            type="button"
            aria-pressed={activeTab === 'rounds'}
            className={`modal-sub-tab-btn ${activeTab === 'rounds' ? 'active' : ''}`}
            onClick={() => setActiveTab('rounds')}
          >
            ⏱️ Hiring Rounds
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {activeTab === 'questions' && (
            <div className="company-modal-questions-group">
              <div className="modal-section-header-row">
                <div>
                  <h3 className="modal-section-title">
                    High-Frequency Interview Questions for {company.name}
                  </h3>
                  <span className="modal-section-badge">
                    Verified from IIT Bombay Placement Drives
                  </span>
                </div>

                {onOpenAllQuestions && (
                  <button
                    type="button"
                    className="minimal-copy-btn"
                    onClick={onOpenAllQuestions}
                  >
                    View All Companies ↗
                  </button>
                )}
              </div>

              {companyQuestions.length === 0 ? (
                <div className="minimal-empty-state" style={{ padding: '24px 16px' }}>
                  <span className="empty-state-icon">💡</span>
                  <p>
                    General core CS &amp; engineering questions apply for {company.name}.
                  </p>
                  {onOpenAllQuestions && (
                    <button
                      type="button"
                      className="reset-btn-pill"
                      onClick={onOpenAllQuestions}
                    >
                      Browse Master Question Bank
                    </button>
                  )}
                </div>
              ) : (
                <div className="questions-list">
                  {companyQuestions.map((q, idx) => {
                    const isExpanded = expandedQuestionId === q.id;
                    return (
                      <div key={q.id} className="company-q-item-card">
                        <div className="company-q-top-bar">
                          <div className="company-q-meta">
                            <span className="q-num font-mono">Q{idx + 1}.</span>
                            <span className="tq-category-tag">{q.category}</span>
                            <span className="tq-topic-name">{q.topic}</span>
                          </div>
                          <div className="company-q-badges">
                            <span className={`tq-diff-badge ${q.difficulty.toLowerCase()}`}>
                              {q.difficulty}
                            </span>
                            <span className="tq-freq-badge">🔥 {q.frequency}</span>
                          </div>
                        </div>

                        <p className="company-q-text">{q.question}</p>

                        <div className="company-q-concepts">
                          {q.keyConcepts.map((kc) => (
                            <span key={kc} className="tq-concept-pill">
                              {kc}
                            </span>
                          ))}
                        </div>

                        {isExpanded && (
                          <div className="tq-solution-framework-panel" style={{ marginTop: '10px' }}>
                            <div className="tq-guide-header">
                              <span className="tq-guide-icon">💡</span>
                              <span className="tq-guide-title">Answer Guide</span>
                            </div>
                            <pre className="tq-approach-text">{q.solutionGuide.approach}</pre>
                            <div className="tq-guide-meta-grid">
                              <div className="tq-g-meta-box">
                                <span className="tq-g-label">Complexity:</span>
                                <span className="tq-g-val font-mono">{q.solutionGuide.complexity}</span>
                              </div>
                              <div className="tq-g-meta-box pro-tip">
                                <span className="tq-g-label">Pro-Tip:</span>
                                <span className="tq-g-val">{q.solutionGuide.proTip}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="company-q-actions">
                          <button
                            type="button"
                            className="tq-action-btn guide-btn"
                            onClick={() =>
                              setExpandedQuestionId((prev) => (prev === q.id ? null : q.id))
                            }
                          >
                            {isExpanded ? 'Hide Guide ▲' : 'View Solution Approach ▼'}
                          </button>

                          <button
                            type="button"
                            className="minimal-copy-btn"
                            onClick={() => {
                              navigator.clipboard?.writeText(
                                `${q.question}\n\nApproach:\n${q.solutionGuide.approach}`
                              );
                              if (showToast) {
                                showToast(`Copied question for ${company.name}! 📋`, 'success');
                              }
                            }}
                          >
                            📋 Copy
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'rounds' && (
            <div className="company-modal-rounds-group">
              <h3 className="modal-section-title" style={{ marginBottom: '12px' }}>
                Recruitment Evaluation Pipeline ({defaultEvaluationStages.length} Stages)
              </h3>
              <div className="rounds-timeline-card">
                <span className="rounds-label">Hiring Stages Sequence:</span>
                <div className="rounds-steps-row" aria-label="Hiring stage order">
                  {defaultEvaluationStages.map((st, i) => (
                    <div key={st.round || i} className="round-step-item">
                      <span className="round-index-pill">{i + 1}</span>
                      <span className="round-name-text">{st.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounds-detail-list">
                {defaultEvaluationStages.map((st, i) => (
                  <div key={st.round || i} className="round-detail-box">
                    <div className="round-detail-header">
                      <span className="round-stage-pill font-mono">Stage {i + 1}</span>
                      <span className="round-stage-name">{st.name}</span>
                      {st.durationMins && (
                        <span className="round-duration font-mono">⏱️ {st.durationMins} mins</span>
                      )}
                    </div>
                    <p className="round-stage-focus">
                      <strong>Focus:</strong> {st.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="company-modal-overview-group">
              <div className="company-intel-grid">
                <div className="company-intel-card">
                  <span className="company-intel-label">Campus drive · {collegeInfo.session}</span>
                  <strong className="company-intel-value">{company.status || 'Not recorded'}</strong>
                  <small className="company-intel-note">{driveDate}</small>
                </div>
                <div className="company-intel-card">
                  <span className="company-intel-label">Current openings</span>
                  <strong className="company-intel-value">{currentHiringLabel}</strong>
                  <small className="company-intel-note">
                    {currentHiringStatus == null ? 'Live careers data is not connected.' : 'Status from the available company profile.'}
                  </small>
                </div>
                <div className="company-intel-card">
                  <span className="company-intel-label">Mass campus hiring</span>
                  <strong className={`company-intel-value ${isMassRecruiter ? 'positive' : ''}`}>
                    {isMassRecruiter ? 'Yes' : 'No'}
                  </strong>
                  <small className="company-intel-note">
                    Portal rule: {MASS_HIRING_OFFER_THRESHOLD}+ offers in {collegeInfo.session}.
                  </small>
                </div>
                <div className="company-intel-card">
                  <span className="company-intel-label">CEO</span>
                  <strong className="company-intel-value">{ceoName || 'Not listed'}</strong>
                  <small className="company-intel-note">No leadership contact in this dataset.</small>
                </div>
                <div className="company-intel-card">
                  <span className="company-intel-label">HR / recruiter contact</span>
                  <strong className="company-intel-value">{hrContactName || 'Not listed'}</strong>
                  <small className="company-intel-note">No recruiter contact in this dataset.</small>
                </div>
              </div>

              <section className="modal-section-card company-market-card">
                <div className="company-market-heading">
                  <h4 className="modal-section-title">Company &amp; sector snapshot</h4>
                  <span className="company-market-source">Placement profile</span>
                </div>
                <p className="company-market-summary">
                  {profile?.marketSummary || `${company.name} is listed in the ${company.sector} sector in the placement records.`}
                </p>
                <dl className="company-market-facts">
                  <div>
                    <dt>Sector</dt>
                    <dd>{company.sector || 'Not listed'}</dd>
                  </div>
                  <div>
                    <dt>Global headquarters</dt>
                    <dd>{profile?.globalHq || 'Not included in this dataset'}</dd>
                  </div>
                  <div>
                    <dt>India offices</dt>
                    <dd>{profile?.indiaOffices?.join(', ') || 'Not included in this dataset'}</dd>
                  </div>
                </dl>

                {profile?.primaryDomains?.length > 0 && (
                  <div className="company-market-domains">
                    <span className="company-intel-label">Business and technology areas</span>
                    <div className="modal-branch-tags">
                      {profile.primaryDomains.map((domain) => (
                        <span key={domain} className="modal-branch-pill">{domain}</span>
                      ))}
                    </div>
                  </div>
                )}

                {hiringHistory.length > 0 && (
                  <div className="company-hiring-history">
                    <h5>Historical campus hiring</h5>
                    {hiringHistory.map(([year, data]) => (
                      <div className="company-hiring-history-row" key={year}>
                        <span>{year}</span>
                        <div
                          className="company-hiring-history-track"
                          role="img"
                          aria-label={`${data.offers} offers in ${year}`}
                        >
                          <span style={{ width: `${((data.offers || 0) / maxHistoricalOffers) * 100}%` }} />
                        </div>
                        <strong>{data.offers || 0} offers</strong>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <div className="modal-stats-grid">
                <div className="modal-stat-box">
                  <span className="m-label">CTC Package</span>
                  <span className="m-value highlight-ctc font-mono">₹{company.ctc} LPA</span>
                  <span className="m-sub">{company.type} Tier</span>
                </div>
                <div className="modal-stat-box">
                  <span className="m-label">Campus Hires</span>
                  <span className="m-value font-mono">{campusOffers}</span>
                  <span className="m-sub">Total Offers Extended</span>
                </div>
                <div className="modal-stat-box">
                  <span className="m-label">Drive Date</span>
                  <span className="m-value font-mono" style={{ fontSize: '13px' }}>
                    {driveDate}
                  </span>
                  <span className="m-sub">{company.status}</span>
                </div>
              </div>

              <div className="modal-section-card">
                <h4 className="modal-section-title">Eligible Academic Branches</h4>
                <div className="modal-branch-tags" style={{ marginTop: '8px' }}>
                  {company.branches?.map((b) => (
                    <span key={b} className="modal-branch-pill font-mono">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            {onOpenAllQuestions && (
              <button
                type="button"
                className="tq-action-btn"
                style={{ background: 'var(--aqua-soft)', color: 'var(--aqua-primary)' }}
                onClick={() => {
                  onClose();
                  onOpenAllQuestions(company.name);
                }}
              >
                🔥 Explore All {company.name} Questions in Question Bank
              </button>
            )}
          </div>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
