import { useEffect, useState } from 'react';

/**
 * CopyrightModal Component
 *
 * Clean, dark-themed copyright, legal terms, and institutional placement charter.
 * Contains the complete codified placement regulations, recruiter guidelines,
 * student code of conduct, telemetry privacy policy, and statutory disclaimers.
 *
 * Indian Institute of Technology Bombay • Training & Placement Cell
 * Main Building, Powai, Mumbai 400076, Maharashtra, India.
 *
 * @param {Object} props
 * @param {Function} props.onClose - Modal dismissal callback
 * @param {Function} [props.showToast] - Global toast notification callback
 * @returns {JSX.Element}
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
    const text = `© ${new Date().getFullYear()} Indian Institute of Technology Bombay. Training & Placement Cell, Powai, Mumbai 400076. Official Placement Records and Terms of Service.`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    if (showToast) {
      showToast('Copyright & Terms notice copied to clipboard', 'info');
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
        style={{ maxWidth: '840px', width: '94%', maxHeight: '90vh' }}
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
              Terms &amp; Conditions • Institutional Placement Charter
            </h2>
            <p className="simple-legal-sub">
              IIT Bombay • Training &amp; Placement Cell • Official Legal Code
            </p>
          </div>
        </div>

        {/* Modal Body with Full Written Content */}
        <div className="simple-legal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          
          {/* SECTION 1 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">1. Statutory Authority, Preamble &amp; Institutional Scope</h3>
            <p>
              1.1. The Indian Institute of Technology Bombay (hereinafter designated as &quot;IIT Bombay&quot; or the &quot;Institute&quot;) is an autonomous statutory institution of national importance established by the Parliament of India under the Institutes of Technology Act, 1961 (Act No. 59 of 1961), and the Statutes framed thereunder.
            </p>
            <p className="text-secondary">
              1.2. The Training &amp; Placement Cell (T&amp;P Cell) functions as the authorized executive body under the aegis of the Senate and Board of Governors of IIT Bombay to facilitate, supervise, regulate, and archive all campus recruitment, summer internship, and corporate interface operations across all degree programs.
            </p>
            <p className="text-secondary">
              1.3. The Placement Analytics Portal (the &quot;Portal&quot;) serves as an official institutional repository and analytical interface. Its primary mandate is to provide authenticated, empirical, aggregated, and auditable data regarding corporate recruitment drives, compensation packages, branch-level placement trajectories, and recruiter engagements.
            </p>
            <p className="text-secondary">
              1.4. These Terms and Conditions, Institutional Placement Regulations, and Legal Disclaimers (collectively, the &quot;Terms&quot;) govern all access to, interactions with, and utilization of the Placement Analytics Portal and all associated sub-domains, APIs, data feeds, and institutional records maintained by IIT Bombay.
            </p>
            <p className="text-secondary">
              1.5. By accessing, browsing, querying, downloading, exporting, or otherwise interacting with any dataset, chart, table, or asset hosted on this Portal, the user acknowledges having read, understood, and unconditionally agreed to be bound by these Terms, the Student Code of Conduct, the Recruiter Policy Guidelines, and applicable Indian laws.
            </p>
            <p className="text-secondary">
              1.6. If you do not accept these Terms in their entirety, you are strictly prohibited from accessing or utilizing this Portal. Continued utilization following publication constitutes irrevocable acceptance of the modified Terms.
            </p>
            <p className="text-secondary">
              1.7. The Training &amp; Placement Cell reserves the explicit and unilateral prerogative to revise, amend, supplement, or supersede any provision of these Terms or the operational placement policies at any time, subject to ratification by the Standing Placement Advisory Committee (SPAC).
            </p>
            <p className="text-secondary">
              1.8. In the event of any interpretive ambiguity or conflict between these Terms and other Institute documents, the final and binding interpretation rendered by the Professor-in-Charge (PIC) and the Placement Advisory Committee shall govern.
            </p>
            <p className="text-secondary">
              1.9. These regulations apply without exception across both Phase I (December recruitment drive) and Phase II (January through June rolling recruitment) of every academic placement cycle.
            </p>
            <p className="text-secondary">
              1.10. All official communications, notices, slot allocations, and policy circulars published on this portal carry statutory institutional standing and are admissible in official Institute proceedings.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">2. Comprehensive Definitions &amp; Analytical Nomenclature</h3>
            <p>
              For the purpose of institutional reporting, dashboard telemetry, and placement governance, the following terms shall carry the precise meanings assigned below:
            </p>
            <p className="text-secondary">
              2.1. <strong>Cost to Company (CTC):</strong> For the purpose of institutional reporting and comparative analytics on this Portal, &quot;Cost to Company&quot; (CTC) represents the total gross financial outlay declared by the recruiting entity in the officially attested Job Notification Form (JNF) for the initial twelve (12) months of full-time employment. CTC is denominated in Lakhs Per Annum (LPA, INR) for domestic placements or standard international currency equivalents (USD, EUR, GBP, JPY, SGD) converted at the prevailing Reserve Bank of India (RBI) reference exchange rate on the date of offer clearance.
            </p>
            <p className="text-secondary">
              2.2. <strong>Fixed Base Salary:</strong> The guaranteed, non-contingent gross monthly salary disbursed to an employee, exclusive of annual variable bonuses, performance milestones, retention allowances, employer statutory contributions, and equity stock vesting.
            </p>
            <p className="text-secondary">
              2.3. <strong>Variable Compensation &amp; Performance Incentives:</strong> Performance-contingent remuneration, annual profitability bonuses, and milestone incentives payable based on corporate review cycles and individual employee KPI evaluations.
            </p>
            <p className="text-secondary">
              2.4. <strong>Long-Term Equity &amp; ESOPs:</strong> Employee Stock Ownership Plans, Stock Options, or Restricted Stock Units (RSUs) granted under corporate compensation packages, evaluated based on their annualized value across standard four-year (4-year) graded vesting horizons.
            </p>
            <p className="text-secondary">
              2.5. <strong>Pre-Placement Offer (PPO):</strong> An irrevocable offer of permanent graduate employment extended by an organization to a student upon successful completion of an approved summer internship arranged under the institutional internship program.
            </p>
            <p className="text-secondary">
              2.6. <strong>Regular / Standard Tier:</strong> Job opportunities offering an attested gross CTC below 10.00 Lakhs Per Annum (LPA).
            </p>
            <p className="text-secondary">
              2.7. <strong>Dream Tier:</strong> Job opportunities offering an attested gross CTC ranging between 10.00 LPA and 19.99 LPA.
            </p>
            <p className="text-secondary">
              2.8. <strong>Super Dream Tier:</strong> Premier recruitment opportunities offering an attested gross CTC between 20.00 LPA and 39.99 LPA.
            </p>
            <p className="text-secondary">
              2.9. <strong>Marquee / Apex Tier:</strong> Elite recruitment profiles offering an attested gross CTC equal to or exceeding 40.00 LPA or premier global quantitative algorithmic research positions.
            </p>
            <p className="text-secondary">
              2.10. <strong>Job Notification Form (JNF):</strong> The mandatory, legally binding declaration document submitted by a participating recruiter specifying job descriptions, salary breakdowns, bond requirements, locations, and hiring criteria.
            </p>
            <p className="text-secondary">
              2.11. <strong>Registered Candidate:</strong> A bonafide graduating student of IIT Bombay who has satisfied academic eligibility criteria, completed registration formalities, and submitted verified master resumes through the central placement portal.
            </p>
            <p className="text-secondary">
              2.12. <strong>Placed Candidate:</strong> A registered candidate who has received and formally accepted an institutional campus placement offer or an approved Pre-Placement Offer (PPO) verified by the T&amp;P Cell.
            </p>
            <p className="text-secondary">
              2.13. <strong>Department Placement Coordinator (DPC):</strong> The elected student representative from an academic department responsible for verifying peer resumes, coordinating branch interviews, and interfacing with company panels.
            </p>
            <p className="text-secondary">
              2.14. <strong>Company Coordinator (CC):</strong> A designated member of the placement team assigned to manage logistics, schedule assessments, and maintain liaisons with a specific corporate recruiter.
            </p>
            <p className="text-secondary">
              2.15. <strong>All IIT Placement Committee (AIPC):</strong> The apex national consortium of Placement Chairpersons from all Indian Institutes of Technology responsible for harmonizing recruitment schedules and enforcing nationwide recruiter sanctions.
            </p>
          </section>

          {/* SECTION 3 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">3. Student Eligibility, Verification &amp; Master Dossier</h3>
            <p>
              3.1. <strong>Academic Eligibility Requirements:</strong> All students registered for campus recruitment must be bonafide degree candidates of IIT Bombay in their final graduating year (B.Tech, B.S., Dual Degree, M.Tech, M.S., M.Des, M.B.A., M.Sc., Ph.D.). A candidate must maintain the minimum CPI stipulated in the respective company&apos;s JNF with zero unresolved institutional backlogs or disciplinary sanctions at the time of shortlisting, written assessments, and final interviews.
            </p>
            <p className="text-secondary">
              3.2. <strong>Master Curriculum Vitae (CV) Attestation Protocol:</strong> Students are permitted to generate up to three (3) standardized master CVs through the central placement portal. Every claim regarding academic percentages, project experience, published papers, conference proceedings, internships, positions of responsibility (PoR), and extracurricular accolades must be verified and attested by designated Department Placement Coordinators (DPCs) and Company Coordinators (CCs) against certified primary documents before being released to corporate recruiters.
            </p>
            <p className="text-secondary">
              3.3. <strong>Strict Prohibition of Resume Fraud &amp; Falsification:</strong> Any intentional falsification, exaggeration, fabrication, or fraudulent misrepresentation of CGPA, technical skills, previous employer designations, or academic achievements shall constitute a catastrophic Tier-1 Disciplinary Offense. Disciplinary consequences include immediate and irrevocable debarment from the entire placement season, cancellation of all secured offers, and referral to the Institute Disciplinary Action Committee (IDAC) for academic suspension.
            </p>
            <p className="text-secondary">
              3.4. <strong>Mandatory Attendance at Pre-Placement Talks (PPTs):</strong> Attendance at corporate Pre-Placement Talks (PPTs), orientation sessions, and technical symposiums is mandatory for all students who submit an application for the corresponding opening. Unexcused absence from a scheduled PPT without prior written dispensation from the Professor-in-Charge (PIC) results in automatic disqualification from that company&apos;s selection process and an institutional warning penalty.
            </p>
            <p className="text-secondary">
              3.5. <strong>Medical Clearance and Identity Verification:</strong> Candidates must produce their valid IIT Bombay smart identity card at every physical or virtual interview room. All candidates must fulfill general medical fitness criteria as declared by the recruiting organization, including standard vision, occupational health, and background verification (BGV) requirements.
            </p>
            <p className="text-secondary">
              3.6. <strong>Dual Degree &amp; Post-Graduate Academic Standing:</strong> Post-graduate and Dual Degree students must have completed their comprehensive coursework credits and submitted satisfactory interim thesis evaluation reports from their faculty guides before sitting for December Phase I interviews.
            </p>
          </section>

          {/* SECTION 4 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">4. The Universal One-Student-One-Offer Doctrine</h3>
            <p>
              4.1. <strong>Prime Directive of Equal Opportunity:</strong> To ensure maximum employment opportunities across the entire graduating cohort, IIT Bombay strictly enforces the &quot;One-Student-One-Offer&quot; rule. The moment a registered student is extended a formal job offer that is cleared and ratified by the T&amp;P Cell, that student is deemed placed and is immediately withdrawn from all subsequent recruitment processes, assessments, and interview rosters across all sectors.
            </p>
            <p className="text-secondary">
              4.2. <strong>Instant Offer Acceptance and Portal Freezing:</strong> Upon notification of selection by a recruiting company during any active placement slot, the candidate must formally communicate acceptance or record their decision within the stipulated slot transition window (typically 60 to 120 minutes). If a candidate receives multiple concurrent offers within the exact same recruitment slot, the candidate is granted the prerogative to choose one offer; upon selection, the unselected offers are immediately reallocated to waitlisted candidates.
            </p>
            <p className="text-secondary">
              4.3. <strong>Dream &amp; Super-Dream Upgradation Pathways:</strong> As an exception to § 4.1, a student who has secured an offer in the Standard Tier or Dream Tier may be permitted a single, highly regulated opportunity to apply for designated &quot;Super-Dream&quot; or &quot;Marquee&quot; companies subject to strict conditions: (a) the compensation differential must exceed 100% of the initial offer; (b) the candidate must have obtained prior written consent from the T&amp;P Cell; (c) only one successful upgradation is permitted per student across the entire academic year.
            </p>
            <p className="text-secondary">
              4.4. <strong>Post-Upgradation Obligations &amp; Release Protocol:</strong> Upon securing an approved Super-Dream upgrade, the student is instantly and irrevocably released from the prior company&apos;s roster. The T&amp;P Cell shall formally notify the primary recruiter within twelve (12) hours and initiate the immediate elevation of the highest-ranked waitlisted candidate to ensure zero net seat wastage for the recruiting partner.
            </p>
            <p className="text-secondary">
              4.5. <strong>Prohibition of Multiple Active Acceptances:</strong> Holding more than one active placement offer at any juncture is strictly forbidden under institutional law. Any student discovered attempting to conceal an offer, execute parallel external acceptance letters, or circumvent portal freezing mechanisms shall face immediate termination of all campus offers and an endorsement of conduct violation on their official transcript.
            </p>
            <p className="text-secondary">
              4.6. <strong>Voluntary De-Registration:</strong> A candidate may voluntarily de-register from the placement process prior to receiving an offer by submitting a formal declaration endorsed by their faculty advisor. Once de-registered, re-entry in the same season is prohibited.
            </p>
          </section>

          {/* SECTION 5 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">5. Assessment Integrity &amp; Anti-Cheating Directives</h3>
            <p>
              5.1. <strong>Proctored Assessment Ethics:</strong> Candidates must conduct themselves with absolute integrity, professionalism, and decorum across all written tests, online coding assessments, group discussions, and technical/HR interviews.
            </p>
            <p className="text-secondary">
              5.2. <strong>Ban on Unauthorized Aids &amp; Generative AI:</strong> Any usage of unapproved aids, communication devices, parallel collaborative screen-sharing, unauthorized proxy assistance, or Large Language Model (LLM) generation tools during closed proctored assessments constitutes gross academic dishonesty.
            </p>
            <p className="text-secondary">
              5.3. <strong>Anti-Collusion Protocols:</strong> Sharing assessment questions, test testcases, interview prompts, or technical challenge details on social media, messaging channels, or discussion boards during active placement slots constitutes gross ethical misconduct.
            </p>
            <p className="text-secondary">
              5.4. <strong>Electronic Device Restrictions:</strong> Possession of unauthorized smartwatches, bluetooth transmitters, or unapproved communication peripherals inside examination venues will result in immediate disqualification and confiscation.
            </p>
            <p className="text-secondary">
              5.5. <strong>Automated Plagiarism &amp; Code Forensics:</strong> All coding submissions are processed through automated source code similarity detectors. Submissions exhibiting plagiarism or synchronized algorithmic patterns will be referred for disciplinary action.
            </p>
          </section>

          {/* SECTION 6 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">6. Disciplinary Sanctions, Penalties &amp; Appeals</h3>
            <p>
              6.1. <strong>Tiered Penalty Schedule:</strong> Placement offenses are categorized under a three-tiered punitive framework:
            </p>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '1.6' }}>
              <li><strong>Tier-1 (Catastrophic Offenses):</strong> Resume falsification, assessment cheating, proxy impersonation, or post-acceptance offer reneging. Penalty: Immediate permanent debarment from placements, offer cancellation, and referral to Senate IDAC for academic suspension.</li>
              <li><strong>Tier-2 (Severe Offenses):</strong> Unexcused interview absence, unprofessional behavior toward recruiters, or false medical claims. Penalty: De-prioritization by 3 recruitment slots and loss of Dream upgradation privileges.</li>
              <li><strong>Tier-3 (Moderate Offenses):</strong> Missed PPTs, late document submissions, or minor scheduling delays. Penalty: Formal written warning and accumulation of placement penalty points.</li>
            </ul>
            <p className="text-secondary">
              6.2. <strong>Appellate Procedure:</strong> A penalized student has the right to file a formal appeal within 72 hours of notification to the Standing Disciplinary Action Committee (SDAC), chaired by the Dean of Student Affairs. The appellate decision rendered by the SDAC is final and binding across the Institute.
            </p>
            <p className="text-secondary">
              6.3. <strong>Post-Offer Reneging Sanctions:</strong> Reneging on an accepted offer harms institutional goodwill and deprives batchmates of opportunities. A reneging candidate faces blacklisting from alumni career networks and formal transcript endorsement.
            </p>
          </section>

          {/* SECTION 7 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">7. Corporate Recruiter Accreditation &amp; JNF Standards</h3>
            <p>
              7.1. <strong>Mandatory Job Notification Form (JNF) Clearance:</strong> Every participating corporate recruiter must submit a detailed, legally binding Job Notification Form (JNF) through the official recruiter portal at least fourteen (14) calendar days prior to scheduled assessment dates. The JNF must explicitly disclose job designations, place of posting, gross CTC, fixed base salary component, variable bonuses, bond/service agreements (if any), probation terms, and exact academic eligibility filters.
            </p>
            <p className="text-secondary">
              7.2. <strong>Absolute Transparency in Compensation Disclosures:</strong> Recruiting entities are strictly prohibited from misrepresenting compensation structures or inflating headline CTC metrics by including speculative incentives, unvested multi-year retention bonuses, employer statutory overheads, or reimbursable operational expenses. The T&amp;P Cell conducts an exhaustive financial audit of every JNF prior to publishing verified figures on the institutional dashboard.
            </p>
            <p className="text-secondary">
              7.3. <strong>Prohibition of Exploding Offers and Undue Coercion:</strong> Recruiters participating in on-campus placements agree not to issue exploding offers (offers requiring acceptance within unreasonable durations under 24 hours during rolling phases or outside scheduled slotting mechanisms) or exert improper coercion upon candidates. All offers must be channeled formally through the T&amp;P Cell executive desk.
            </p>
            <p className="text-secondary">
              7.4. <strong>Equal Opportunity, Non-Discrimination &amp; Workplace Safety:</strong> All participating organizations must abide by international non-discrimination norms, the Constitution of India, and institutional diversity policies. Recruitment assessment processes, interview questioning, and hiring evaluations must be conducted strictly on professional merit without discrimination on grounds of gender, caste, race, religion, sexual orientation, disability, regional origin, or socio-economic background.
            </p>
            <p className="text-secondary">
              7.5. <strong>Recruiter Sanctions, Blacklisting &amp; Legal Remedies:</strong> Any corporate organization that revokes a formal offer post-selection without substantiated institutional misconduct, substantially degrades compensation packages post-onboarding, defers joining dates beyond six (6) months without adequate financial stipend compensation, or violates interview integrity standards shall be subject to immediate disciplinary blacklisting from all Indian Institutes of Technology through the All IIT Placement Committee (AIPC) consortium for a period of up to three (3) consecutive academic cycles.
            </p>
            <p className="text-secondary">
              7.6. <strong>Bond &amp; Service Agreement Disclosures:</strong> Any service agreement, training cost reimbursement clause, or mandatory minimum service period must be clearly declared in the JNF. Unannounced post-selection bonds will be deemed null and void by the Institute.
            </p>
          </section>

          {/* SECTION 8 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">8. Slot Allocation &amp; Day 0 Scheduling Matrix</h3>
            <p>
              8.1. <strong>Algorithmic Slotting Index:</strong> The scheduling sequence of recruiting companies (Day 0, Day 1, Slot 1.1, Slot 1.2, Day 2, etc.) is determined through an objective, algorithmic slotting index approved by SPAC.
            </p>
            <p className="text-secondary">
              8.2. <strong>Evaluation Parameters:</strong> The slotting formula assigns weighted scores to: (a) gross fixed base compensation; (b) total historical hiring volume at IIT Bombay; (c) student preference survey voting; (d) past compliance with offer release deadlines; (e) career progression feedback from alumni networks.
            </p>
            <p className="text-secondary">
              8.3. <strong>Concurrent Slot Decision Protocol:</strong> If a candidate receives offers from multiple recruiters during the same interview slot, the candidate is given a standard decision window (60 to 90 minutes) to select their preferred offer. The unselected offer is immediately elevated to the first waitlisted candidate in the other firm.
            </p>
            <p className="text-secondary">
              8.4. <strong>Interview Slot Discipline:</strong> Corporate panels must adhere strictly to assigned interview time windows. Extending interviews beyond designated slots without T&amp;P Cell approval disrupts subsequent slot allocations.
            </p>
          </section>

          {/* SECTION 9 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">9. Summer Internships &amp; Pre-Placement Offers (PPOs)</h3>
            <p>
              9.1. <strong>Mandatory Disclosure of Summer Internship Conversions:</strong> Any student who receives a Pre-Placement Offer (PPO) or an Intent-to-Hire commitment arising from an institutional summer internship must formally register and declare the offer, including full compensation details and official letter copy, to the T&amp;P Cell within forty-eight (48) hours of receipt or before the announced institutional PPO declaration deadline, whichever is earlier.
            </p>
            <p className="text-secondary">
              9.2. <strong>Binding PPO Decision Window Prior to Phase I Placements:</strong> All students holding active PPOs must record their definitive decision (Acceptance or Rejection) on the central placement portal prior to the institutional deadline (traditionally mid-October). If a student accepts their PPO, they are immediately classified as placed and are ineligible to sit for Phase I or Phase II campus recruitment.
            </p>
            <p className="text-secondary">
              9.3. <strong>Consequences of PPO Rejection and Seasonal Risk:</strong> A student who formally declines a PPO is fully entitled to participate in the general campus placement drive. However, the student does so at their own professional risk; the declined PPO cannot subsequently be reclaimed, and the Institute bears zero liability if the candidate fails to secure a comparable offer in general placement slots.
            </p>
            <p className="text-secondary">
              9.4. <strong>Corporate Notification of Direct PPO Extensions:</strong> Corporate partners extending PPOs directly to students without notifying the T&amp;P Cell commit an institutional breach. Direct off-portal offers that circumvent central tracking shall not be recognized in official transcripts and may jeopardize the recruiter&apos;s future slot allocation priority.
            </p>
          </section>

          {/* SECTION 10 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">10. Department-Specific Regulations &amp; Degree Cohorts</h3>
            <p>
              10.1. <strong>Undergraduate Engineering Programs (B.Tech &amp; B.S.):</strong> Four-year undergraduate candidates in Computer Science, Electrical, Mechanical, Chemical, Civil, Aerospace, Metallurgical, and Energy Engineering are eligible for core, non-core, consulting, finance, and software profiles provided they satisfy individual JNF criteria.
            </p>
            <p className="text-secondary">
              10.2. <strong>Dual Degree (B.Tech + M.Tech) Scholars:</strong> Five-year Dual Degree students participate in placements during their final fifth academic year. Master&apos;s project thesis (DDP) commitments must be completed satisfactorily prior to corporate onboarding.
            </p>
            <p className="text-secondary">
              10.3. <strong>Postgraduate Engineering (M.Tech &amp; M.S. by Research):</strong> Postgraduate scholars are encouraged to prioritize core engineering, research and development (R&amp;D), and specialized technology leadership profiles matching their specific thesis specializations.
            </p>
            <p className="text-secondary">
              10.4. <strong>Industrial Design Centre (IDC School of Design - M.Des &amp; B.Des):</strong> Design scholars must submit certified digital design portfolios verified by IDC faculty coordinators. Proprietary corporate work created during internships requires appropriate client redaction before public exhibition.
            </p>
            <p className="text-secondary">
              10.5. <strong>Shailesh J. Mehta School of Management (SJMSOM - M.B.A.):</strong> Management candidates participate in dedicated management recruitment windows focusing on strategy, operations, investment banking, product management, and supply chain consulting.
            </p>
            <p className="text-secondary">
              10.6. <strong>Doctoral Candidates (Ph.D. Scholars):</strong> Ph.D. scholars who have submitted their doctoral synopsis and obtained a clearance certificate from their Principal Research Advisor (Guide) are eligible to register for high-tier industrial research, semiconductor, quantitative modeling, and university faculty positions.
            </p>
          </section>

          {/* SECTION 11 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">11. Public Sector Undertakings (PSUs) &amp; Research Labs</h3>
            <p>
              11.1. <strong>Priority Allocation for Government Agencies:</strong> In national interest, Public Sector Undertakings (e.g., IOCL, ONGC, BPCL, HPCL, BHEL, GAIL) and premier national research organizations (ISRO, DRDO, BARC, C-DAC) are granted specialized early recruitment slots and customized assessment frameworks.
            </p>
            <p className="text-secondary">
              11.2. <strong>GATE Score Alignment:</strong> Candidates applying for PSU openings must ensure their valid Graduate Aptitude Test in Engineering (GATE) scores and category certificates (SC/ST/OBC-NCL/EWS/PwD) are officially attested by Institute authorities.
            </p>
            <p className="text-secondary">
              11.3. <strong>National Security Clearances:</strong> Selection in defense and atomic research laboratories is contingent upon security vetting by government agencies. The Institute facilitates prompt official document attestation.
            </p>
          </section>

          {/* SECTION 12 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">12. International Placements &amp; Overseas Postings</h3>
            <p>
              12.1. <strong>Visa &amp; Work Authorization Compliance:</strong> For international placements in the United States, Japan, Europe, Singapore, United Kingdom, and the Middle East, the recruiting company bears full responsibility for sponsoring work visas, immigration documentation, and relocation airfares.
            </p>
            <p className="text-secondary">
              12.2. <strong>Currency Parity &amp; Cost of Living:</strong> International packages are published with local currency designations (e.g., USD, JPY, EUR) alongside converted INR metrics. The Institute advises candidates to evaluate local purchasing power parity (PPP) and taxation structures.
            </p>
            <p className="text-secondary">
              12.3. <strong>Repatriation Covenants:</strong> In the event of visa denial or regulatory geopolitical restrictions preventing international deployment, recruiters are expected to offer equivalent domestic roles where feasible.
            </p>
          </section>

          {/* SECTION 13 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">13. Startups &amp; High-Growth Venture Recruitment Policy</h3>
            <p>
              13.1. <strong>Startup Due Diligence &amp; Accreditation:</strong> Early-stage startups (less than 3 years of operation or Series A funding stage) must undergo a rigorous institutional accreditation check. The company must provide certified documentation of venture capital funding, current financial runway (minimum 18 months), investor backing, and audited balance sheets.
            </p>
            <p className="text-secondary">
              13.2. <strong>ESOP Valuation Standards in Startups:</strong> Stock options offered by unlisted startups must be clearly categorized as paper equity. Startups cannot represent illiquid ESOP estimates as guaranteed cash components in headline CTC metrics.
            </p>
            <p className="text-secondary">
              13.3. <strong>Founder Interaction &amp; Role Clarity:</strong> Startup founders must conduct dedicated briefing sessions detailing technical stacks, engineering roadmaps, and equity dilution policies before shortlisting students.
            </p>
          </section>

          {/* SECTION 14 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">14. Remote, Hybrid &amp; Distributed Workplace Guidelines</h3>
            <p>
              14.1. <strong>Hardware &amp; Infrastructure Support:</strong> Organizations offering full-time remote or hybrid employment must provide corporate-grade hardware (laptops, monitors, security tokens), home office setup stipends, and monthly internet reimbursements.
            </p>
            <p className="text-secondary">
              14.2. <strong>Cybersecurity &amp; IP Protection:</strong> Candidates working remotely agree to adhere to corporate data encryption, VPN protocols, and confidential intellectual property guidelines without unauthorized local data replication.
            </p>
            <p className="text-secondary">
              14.3. <strong>Tax Residency &amp; Compliance:</strong> For remote roles executed from India for overseas corporate entities, the employer must ensure compliance with Indian withholding tax (TDS) and Foreign Exchange Management Act (FEMA) regulations.
            </p>
          </section>

          {/* SECTION 15 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">15. Higher Studies &amp; Competitive Exam De-Registration</h3>
            <p>
              15.1. <strong>Direct Admissions to Ph.D./MS Programs:</strong> Candidates who receive verified admission offers with graduate teaching/research assistantships from accredited global universities must formally notify the T&amp;P Cell to obtain official de-registration.
            </p>
            <p className="text-secondary">
              15.2. <strong>Civil Services &amp; Public Examinations:</strong> Scholars opting to pursue UPSC Civil Services, state administrative examinations, or national research fellowships are permitted to withdraw without penalty before Phase I commencement.
            </p>
          </section>

          {/* SECTION 16 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">16. Data Governance &amp; DPDP Act, 2023 Compliance</h3>
            <p>
              16.1. <strong>Statutory Data Fiduciary Obligations:</strong> IIT Bombay manages candidate, academic, and recruitment telemetry in strict conformity with the Digital Personal Data Protection Act, 2023 (DPDP Act, Act No. 22 of 2023), the Information Technology Act, 2000, and institutional cybersecurity frameworks.
            </p>
            <p className="text-secondary">
              16.2. <strong>Complete Anonymization of Public Dashboards:</strong> All visual charts, sector distribution heatmaps, compensation histograms, branch averages, and hiring trends displayed on this public portal are compiled using strictly anonymized and aggregated datasets. No personally identifiable information (PII)—such as student names, roll numbers, personal emails, or individual salary figures—is ever published publicly.
            </p>
            <p className="text-secondary">
              16.3. <strong>Client Telemetry Collection:</strong> The portal logs minimal, anonymized client telemetry (browser type, screen resolution, request latency, and search filter parameters) solely to optimize server performance, ensure system security, and enhance user experience. Telemetry records are purged every ninety (90) days and are never monetized or shared with third parties.
            </p>
            <p className="text-secondary">
              16.4. <strong>Ban on Automated Scraping:</strong> Automated scraping, harvesting, crawling, or programmatic extraction of data, company directories, CTC metrics, or charts from this portal using bots, spiders, or scrapers without prior written consent from the Professor-in-Charge is strictly prohibited under Sections 43 and 66 of the Information Technology Act, 2000.
            </p>
            <p className="text-secondary">
              16.5. <strong>Data Subject Rights:</strong> Registered candidates have the right to review their profile telemetry, inspect attested resume versions, and petition the Data Protection Officer for rectification of factual errors prior to official report sealing.
            </p>
          </section>

          {/* SECTION 17 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">17. Intellectual Property, Trademarks &amp; Copyright</h3>
            <p>
              17.1. <strong>Institutional Trademark Ownership:</strong> The official crest, seal, name, logo, and motto (&quot;ज्ञानं परमं बलम्&quot;) of the Indian Institute of Technology Bombay are registered trademarks and intellectual property of IIT Bombay protected under the Trade Marks Act, 1999, and the Emblems and Names (Prevention of Improper Use) Act, 1950. Unauthorized commercial utilization is strictly illegal.
            </p>
            <p className="text-secondary">
              17.2. <strong>Fair Use of Recruiter Brand Logos:</strong> All corporate brand logos, trademarks, and company names displayed across this portal are the intellectual property of their respective corporate owners. They are displayed here under the doctrine of nominative fair use solely for informational, non-commercial, and historical placement record reporting.
            </p>
            <p className="text-secondary">
              17.3. <strong>Software Codebase &amp; Analytics Copyright:</strong> The complete software architecture, codebase, interactive React components, visual styling, color palette systems, chart rendering pipelines, and analytical data structures of this Placement Analytics Dashboard are protected under the Copyright Act, 1957. © {new Date().getFullYear()} Indian Institute of Technology Bombay. All rights reserved.
            </p>
            <p className="text-secondary">
              17.4. <strong>Media Citation Guidelines:</strong> Journalists, educational analysts, and researchers citing figures or graphs from this portal must provide explicit attribution: &quot;Source: Training &amp; Placement Cell, IIT Bombay Placement Analytics Dashboard [placements.iitb.ac.in]&quot;.
            </p>
          </section>

          {/* SECTION 18 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">18. Disclaimer of Warranties &amp; Limitation of Liability</h3>
            <p>
              18.1. <strong>Disclaimer of Employment Guarantee:</strong> While IIT Bombay makes comprehensive efforts to invite leading global and domestic recruiters, registration with the Training &amp; Placement Cell does not constitute a guarantee, warranty, or contractual assurance of guaranteed employment or specific salary packages. Final selection rests exclusively upon candidate merit and corporate employer discretion.
            </p>
            <p className="text-secondary">
              18.2. <strong>Market Downturns &amp; Corporate Restructuring:</strong> The Institute exercises no control over macroeconomic cycles, business reorganizations, or industry downturns. In the event of corporate downsizing or onboarding delays, the T&amp;P Cell undertakes good-faith institutional mediation but assumes zero financial or legal liability for corporate defaults.
            </p>
            <p className="text-secondary">
              18.3. <strong>Portal &quot;As-Is&quot; Provision:</strong> This Placement Analytics Dashboard and all rendered metrics are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. The Institute disclaims all implied warranties of merchantability, fitness for a particular purpose, and uninterrupted digital access.
            </p>
            <p className="text-secondary">
              18.4. <strong>Limitation of Liability:</strong> Under no circumstances shall IIT Bombay, its Director, Deans, Placement Officers, student coordinators, or technical staff be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of or inability to use this portal.
            </p>
            <p className="text-secondary">
              18.5. <strong>Force Majeure:</strong> The Institute bears no liability for delays, cancellations, or slot modifications caused by natural disasters, pandemic emergencies, government orders, or telecommunication network failures.
            </p>
          </section>

          {/* SECTION 19 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">19. Dispute Resolution, Arbitration &amp; Jurisdiction</h3>
            <p>
              19.1. <strong>Mandatory Amicable Conciliation:</strong> In the event of any dispute, claim, or grievance arising from campus placements, registration policies, or portal analytics, the parties shall first attempt in good faith to resolve the matter through amicable conciliation before the Professor-in-Charge of Placements.
            </p>
            <p className="text-secondary">
              19.2. <strong>Institutional Arbitration:</strong> Any dispute that remains unresolved through conciliation within thirty (30) days shall be referred to institutional arbitration before a three-member panel appointed by the Standing Placement Advisory Committee (SPAC) of IIT Bombay in accordance with the Arbitration and Conciliation Act, 1996.
            </p>
            <p className="text-secondary">
              19.3. <strong>Governing Law &amp; Exclusive Mumbai Jurisdiction:</strong> These Terms and all placement operations shall be governed by and construed in accordance with the laws of the Republic of India. The competent Courts of jurisdiction in Mumbai, Maharashtra, shall have exclusive territorial and subject-matter jurisdiction.
            </p>
          </section>

          {/* SECTION 20 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">20. Placement Sanctions &amp; Disciplinary Penalty Matrix</h3>
            <p>
              The following standardized schedule of penalties is enforced by the Standing Disciplinary Action Committee (SDAC) for infractions committed during active placement and internship cycles:
            </p>
            <p className="text-secondary">
              20.1. <strong>Offense: Falsification of Academic Grades, CPI or Work Experience (Tier-1 Catastrophic):</strong> Immediate and permanent debarment from all campus placement drives, revocation of all secured offers, formal letter to Senate IDAC for academic suspension of one (1) semester, and permanent endorsement in student disciplinary records.
            </p>
            <p className="text-secondary">
              20.2. <strong>Offense: Assessment Cheating, Proxy Test-Taking or AI Usage (Tier-1 Catastrophic):</strong> Complete debarment from Phase I and Phase II recruitment cycles, disqualification from internship conversions, and forfeiture of institutional recommendation letters.
            </p>
            <p className="text-secondary">
              20.3. <strong>Offense: Post-Acceptance Offer Reneging (Tier-1 Catastrophic):</strong> Lifetime debarment from IIT Bombay Alumni Career Services, cancellation of T&amp;P verification credentials, and formal communication to the reneged employer and academic registrar.
            </p>
            <p className="text-secondary">
              20.4. <strong>Offense: Unexcused Absence from Scheduled Corporate Interviews (Tier-2 Severe):</strong> De-prioritization by three (3) subsequent recruitment slots, forfeiture of Super-Dream upgradation rights, and imposition of 50 placement penalty points.
            </p>
            <p className="text-secondary">
              20.5. <strong>Offense: Unexcused Absence from Pre-Placement Talks (PPTs) (Tier-3 Moderate):</strong> Immediate cancellation of application for that specific company and issuance of an official written warning.
            </p>
          </section>

          {/* SECTION 21 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">21. Equal Opportunity, Diversity &amp; Anti-Harassment Safeguards</h3>
            <p>
              21.1. <strong>Affirmative Equality of Opportunity:</strong> IIT Bombay is committed to affirmative non-discrimination. Every registered candidate is entitled to equal access to placement resources regardless of gender, social category, economic background, or physical ability.
            </p>
            <p className="text-secondary">
              21.2. <strong>Prevention of Sexual Harassment (POSH Act Compliance):</strong> In accordance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, all physical and virtual interview spaces are monitored. Any misconduct by recruiter panels or candidates is referred to the Institute Internal Complaints Committee (ICC).
            </p>
            <p className="text-secondary">
              21.3. <strong>Accommodations for Candidates with Disabilities (PwD):</strong> The T&amp;P Cell ensures full accessibility, specialized assistive peripherals, screen readers, and ground-floor interview accommodations in conformity with the Rights of Persons with Disabilities Act, 2016.
            </p>
          </section>

          {/* SECTION 22 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">22. Anti-Ragging &amp; Placement Decorum</h3>
            <p>
              22.1. <strong>Strict Anti-Ragging Policy:</strong> Ragging, harassment, intimidation, or coercion of junior placement coordinators or fellow candidates is strictly prohibited under the Institutes of Technology Act and Supreme Court directives.
            </p>
            <p className="text-secondary">
              22.2. <strong>Professional Conduct:</strong> Candidates must maintain a high standard of professional decorum, adhere to formal business attire during interviews, and respect recruitment panel members and student volunteers at all times.
            </p>
          </section>

          {/* SECTION 23 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">23. Whistleblower Safeguards &amp; Ombudsman Reporting</h3>
            <p>
              23.1. <strong>Confidential Malpractice Reporting:</strong> Any candidate, recruiter, or coordinator who discovers unethical practices, test leaks, unfair slot allocations, or extortion is urged to report directly through the confidential T&amp;P Ombudsman channel.
            </p>
            <p className="text-secondary">
              23.2. <strong>Non-Retaliation Protection:</strong> The Institute guarantees absolute confidentiality and protection against academic, career, or disciplinary retaliation for any bonafide whistleblower.
            </p>
          </section>

          {/* SECTION 24 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">24. Frequently Asked Questions &amp; Placement Directives (Part I)</h3>
            <p>
              <strong>Q1: How are CTC metrics verified before being displayed on this dashboard?</strong><br />
              <span className="text-secondary">Every CTC figure undergoes a rigorous audit by the T&amp;P Data Team. Corporate recruiters must submit a certified Job Notification Form (JNF) detailing base salary, variable incentives, ESOP vesting schedules, and joining bonuses. These figures are cross-referenced with final offer letters to remove inflated or speculative metrics before publishing.</span>
            </p>
            <p>
              <strong>Q2: Why are individual student names and roll numbers omitted from the public portal?</strong><br />
              <span className="text-secondary">In strict compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and institutional privacy guidelines, student identities are protected. Displaying individual student names alongside compensation figures creates privacy risks and unsolicited solicitations. All public metrics are strictly aggregated.</span>
            </p>
            <p>
              <strong>Q3: What is the institutional rationale for the &quot;One-Student-One-Offer&quot; rule?</strong><br />
              <span className="text-secondary">The primary objective is to maximize employment across the entire graduating batch of over 2,000 students. Without this policy, top candidates could hold multiple parallel offers, depriving their peers of opportunities and causing seat wastage for recruiters. Once placed, a student&apos;s profile is locked.</span>
            </p>
            <p>
              <strong>Q4: Under what conditions is an offer upgrade permitted?</strong><br />
              <span className="text-secondary">An eligible candidate placed in the Standard Tier or Dream Tier may apply for an upgrade to a designated &quot;Super-Dream&quot; or &quot;Marquee&quot; opening only if the target company offers a CTC differential of at least 100% above their current offer. Only one successful upgrade is permitted per student per academic year.</span>
            </p>
            <p>
              <strong>Q5: How does the Institute handle corporate offer revocations or onboarding deferrals?</strong><br />
              <span className="text-secondary">The Institute implements severe safeguards. Companies that revoke confirmed offers without cause are reported to the All IIT Placement Committee (AIPC) for multi-year blacklisting across all 23 IITs. Concurrently, affected candidates are given priority re-registration for Phase II placement drives.</span>
            </p>
            <p>
              <strong>Q6: Are Pre-Placement Offers (PPOs) legally binding on students and companies?</strong><br />
              <span className="text-secondary">Yes. Once a student accepts a PPO through the portal, it is treated as a fully executed, binding placement contract. The student is registered as placed and withdrawn from subsequent campus drives.</span>
            </p>
            <p>
              <strong>Q7: How are international salary packages converted into Indian Rupees (INR / LPA)?</strong><br />
              <span className="text-secondary">International compensation offers (USD, EUR, GBP, JPY, SGD) are converted into Indian Rupees using the official Reserve Bank of India (RBI) reference exchange rate prevailing on the date the recruitment slot concluded.</span>
            </p>
            <p>
              <strong>Q8: What constitutes a Tier-1 Disciplinary Misconduct in campus recruitment?</strong><br />
              <span className="text-secondary">Tier-1 offenses represent severe ethical breaches: (a) fabricating CPI, grades, or project experience on resumes; (b) impersonation or cheating during assessments; (c) using generative AI during proctored tests; (d) reneging on an accepted campus offer. Tier-1 offenses result in immediate debarment and referral to Senate IDAC.</span>
            </p>
            <p>
              <strong>Q9: Are company brand logos displayed on this portal endorsed by those corporations?</strong><br />
              <span className="text-secondary">No. The display of corporate logos is strictly nominative fair use under Indian trademark law for factual identification, educational reference, and historical placement record reporting. It implies no commercial endorsement.</span>
            </p>
            <p>
              <strong>Q10: Can external commercial agencies scrape datasets from this portal?</strong><br />
              <span className="text-secondary">No. Automated scraping or data-mining of this portal using bots, spiders, or scripts without prior written permission from the Professor-in-Charge is strictly prohibited under the Information Technology Act, 2000.</span>
            </p>
            <p>
              <strong>Q11: How are Day 0 and Day 1 recruitment slots allocated to companies?</strong><br />
              <span className="text-secondary">Slot allocation is governed by an objective algorithmic slotting index evaluating fixed base pay, hiring volume, student preference survey scores, offer release compliance, and alumni feedback.</span>
            </p>
            <p>
              <strong>Q12: What accommodations are provided for Candidates with Disabilities (PwD)?</strong><br />
              <span className="text-secondary">In accordance with the Rights of Persons with Disabilities Act, 2016, the T&amp;P Cell provides accessible ground-floor interview suites, specialized assistive hardware, screen readers, and extended assessment time allocations.</span>
            </p>
            <p>
              <strong>Q13: What is the procedure for appealing a placement penalty?</strong><br />
              <span className="text-secondary">A student may submit a written appeal within 72 hours of notice to the Standing Disciplinary Action Committee (SDAC), chaired by the Dean of Student Affairs. The committee conducts an impartial inquiry and delivers a binding decision within 7 business days.</span>
            </p>
            <p>
              <strong>Q14: What is the difference between Phase I and Phase II placement drives?</strong><br />
              <span className="text-secondary">Phase I (December) features intensive multi-slot recruitment focusing on major corporate recruiters, MNCs, core engineering firms, and top finance/tech enterprises. Phase II (January–June) operates on a rolling schedule catering to PSUs, government labs (ISRO, DRDO), and specialized startups.</span>
            </p>
            <p>
              <strong>Q15: What is the governing jurisdiction for unresolved legal disputes?</strong><br />
              <span className="text-secondary">All legal claims and arbitrations concerning the IIT Bombay Training &amp; Placement Cell, campus recruitment policies, or portal analytics are governed by Indian law and fall under the exclusive jurisdiction of the competent Courts in Mumbai, Maharashtra.</span>
            </p>
          </section>

          {/* SECTION 25 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">25. Pre-Employment Screening &amp; Background Verification (BGV)</h3>
            <p>
              25.1. <strong>Mandatory Academic Background Verification:</strong> All campus recruitment offers are provisional, contingent upon the candidate successfully completing their degree program without active backlogs and clearing corporate background screening.
            </p>
            <p className="text-secondary">
              25.2. <strong>Institutional Verification Transcripts:</strong> The Academic Office and T&amp;P Cell provide authenticated grade transcripts and degree completion certificates directly to corporate verification agencies upon formal candidate authorization.
            </p>
            <p className="text-secondary">
              25.3. <strong>Revocation upon Disciplinary Finding:</strong> If a third-party background audit reveals suppressed disciplinary records, police records, or falsified prior internship certificates, the recruiting firm holds full contractual rights to rescind the offer immediately.
            </p>
          </section>

          {/* SECTION 26 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">26. Pre-Season Career Development &amp; Alumni Mentorship</h3>
            <p>
              26.1. <strong>Institutional Preparation Modules:</strong> The T&amp;P Cell conducts compulsory orientation bootcamps covering interview communications, case interview frameworks, algorithmic coding challenges, and financial valuation concepts for all registered candidates.
            </p>
            <p className="text-secondary">
              26.2. <strong>Alumni Mentorship Network:</strong> Graduating scholars are paired with distinguished alumni working across target industry sectors for resume critique, technical guidance, and career trajectory counseling under strict non-commercial guidelines.
            </p>
            <p className="text-secondary">
              26.3. <strong>Mock Technical Assessments:</strong> Candidates must participate in at least two (2) Institute-organized mock diagnostic assessments to calibrate algorithmic readiness before Phase I shortlisting commences.
            </p>
          </section>

          {/* SECTION 27 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">27. Academic Degree Requirements &amp; Thesis Clearance</h3>
            <p>
              27.1. <strong>Degree Completion Requirement:</strong> A student must complete all curricular requirements, credits, laboratory clearances, and thesis defenses stipulated by their academic department to be eligible for corporate onboarding.
            </p>
            <p className="text-secondary">
              27.2. <strong>Thesis Submission Timelines:</strong> Dual Degree and Master&apos;s project dissertations must be defended prior to the official Institute convocation date. Failure to submit thesis work on time may result in deferred joining dates.
            </p>
            <p className="text-secondary">
              27.3. <strong>No Dues Certificate:</strong> Placed candidates must obtain a formal &quot;No Dues Certificate&quot; from the Central Library, academic departments, hostels, and T&amp;P Cell prior to receiving their degree certificates.
            </p>
          </section>

          {/* SECTION 28 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">28. Placement Calendar, Milestones &amp; Operational Phases</h3>
            <p>
              28.1. <strong>Phase I (December Intensive Drive):</strong> Phase I placements commence annually on December 1st and operate across structured morning and evening slots focusing on premier multinational firms, technology conglomerates, core engineering leaders, and finance institutions.
            </p>
            <p className="text-secondary">
              28.2. <strong>Phase II (Rolling Recruitment Drive):</strong> Phase II operates from early January through late June, providing continuous rolling interview opportunities with startups, Public Sector Undertakings (PSUs), government research agencies, and emerging corporate enterprises.
            </p>
            <p className="text-secondary">
              28.3. <strong>Slot Transition Discipline:</strong> Strict silence and confidentiality must be maintained in waiting lounges and virtual break-out rooms during slot transitions to ensure smooth scheduling for all candidates.
            </p>
          </section>

          {/* SECTION 29 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">29. Statutory Archival &amp; Right to Information (RTI Act, 2005)</h3>
            <p>
              29.1. <strong>Public Information Disclosure:</strong> Aggregate placement records, overall branch statistics, sector-wise offer distributions, and institutional salary metrics are archived and made available in accordance with the Right to Information Act, 2005 (RTI Act).
            </p>
            <p className="text-secondary">
              29.2. <strong>Exemption of Personal Telemetry:</strong> In conformity with Section 8(1)(j) of the RTI Act and the Digital Personal Data Protection Act, 2023, individual candidate personal identifiable information (PII) and personal compensation agreements are exempt from public disclosure to protect individual privacy.
            </p>
          </section>

          {/* SECTION 30 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">30. Policy Directives &amp; FAQ Matrix (Part II)</h3>
            <p>
              <strong>Q16: How are employee stock options (ESOPs) evaluated in CTC calculations?</strong><br />
              <span className="text-secondary">ESOPs and RSUs are evaluated based on their annualized four-year vesting breakdown as submitted in the corporate JNF. Speculative unvested options or projected market valuations are normalized by the T&amp;P audit team.</span>
            </p>
            <p>
              <strong>Q17: What are the obligations regarding off-campus job offers?</strong><br />
              <span className="text-secondary">Students receiving external off-campus employment offers must formally inform the T&amp;P Cell within seven (7) days so that placement registers and institutional statistical indices can be updated accurately.</span>
            </p>
            <p>
              <strong>Q18: What confidentiality rules apply to interview questions and technical tasks?</strong><br />
              <span className="text-secondary">Corporate assessment challenges, system design prompts, and proprietary interview case studies are shared under non-disclosure conditions. Candidates are strictly prohibited from publishing or selling interview logs online.</span>
            </p>
            <p>
              <strong>Q19: What is the dress code and decorum required during in-person interviews?</strong><br />
              <span className="text-secondary">Candidates must appear in formal corporate business attire (formal suit, blazer, or formal shirt and trousers with formal footwear) for all in-person interviews and video conferences. Informal attire may result in disqualification by the panel.</span>
            </p>
            <p>
              <strong>Q20: How can students access career counseling and mock interview support?</strong><br />
              <span className="text-secondary">The T&amp;P Cell organizes pre-season resume clinics, alumni mentorship circles, and technical mock coding tests from August through November. Students can schedule one-on-one sessions through the placement portal helpdesk.</span>
            </p>
            <p>
              <strong>Q21: Are service bonds and non-compete agreements recognized by the Institute?</strong><br />
              <span className="text-secondary">Recruiters imposing service bonds or financial indemnity agreements must disclose all terms upfront in the JNF. The Institute discourages excessive multi-year bonds; service bonds exceeding two (2) years are subject to special review and must be highlighted to candidates before shortlisting.</span>
            </p>
            <p>
              <strong>Q22: How does the Institute handle multiple concurrent offers in the same interview slot?</strong><br />
              <span className="text-secondary">If a student is selected by more than one recruiter during the same operational interview slot (e.g., Slot 1.1), the student is notified immediately and granted a decision window (usually 60 to 90 minutes) to accept one preferred offer. The unselected offer is instantly passed to the first waitlisted candidate in the second company.</span>
            </p>
            <p>
              <strong>Q23: Who oversees policy decisions and rule changes in the T&amp;P Cell?</strong><br />
              <span className="text-secondary">All major policy formulations, tier adjustments, and disciplinary frameworks are governed by the Standing Placement Advisory Committee (SPAC), comprising the Professor-in-Charge, Dean of Academic Programmes, Dean of Student Affairs, faculty representatives from all engineering/science departments, and student placement secretaries.</span>
            </p>
            <p>
              <strong>Q24: Can an alumnus access historical placement records for academic research?</strong><br />
              <span className="text-secondary">Yes. Bonafide alumni, academic researchers, and institutional policy researchers can submit a research data access request to the T&amp;P Analytics Desk. Anonymized statistical datasets may be provided subject to standard non-disclosure and academic citation agreements.</span>
            </p>
            <p>
              <strong>Q25: What measures are taken to ensure gender diversity and equal opportunity?</strong><br />
              <span className="text-secondary">The T&amp;P Cell mandates non-discriminatory interviewing practices. Corporate recruiters are encouraged to conduct unconscious bias training for panels. Specialized career mentorship programs, diversity hackathons, and affirmative talent drives are organized in partnership with industry leaders to foster balanced cohort hiring.</span>
            </p>
          </section>

          {/* SECTION 31 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">31. Startup Incubation (SINE IIT Bombay) &amp; Deferred Placement</h3>
            <p>
              31.1. <strong>Society for Innovation and Entrepreneurship (SINE) Policy:</strong> Graduating students founding venture-backed startups incubated through SINE IIT Bombay are granted special placement deferral rights for up to two (2) consecutive academic cycles.
            </p>
            <p className="text-secondary">
              31.2. <strong>Deferred Placement Re-Entry:</strong> If an incubated startup pivots or liquidates within 24 months, the founder may re-register for Phase I campus recruitment with unpenalized seniority, subject to SPAC approval.
            </p>
            <p className="text-secondary">
              31.3. <strong>Intellectual Property Separation:</strong> Startup founders recruiting campus peers must ensure strict separation between Institute laboratory equipment, sponsored research projects, and private corporate IP.
            </p>
          </section>

          {/* SECTION 32 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">32. Laboratory Work &amp; Sponsored Research Redaction</h3>
            <p>
              32.1. <strong>Confidentiality in Sponsored Research:</strong> Candidates working on defense, atomic, or industry-sponsored research projects must obtain formal clearance from their Principal Investigator (PI) before mentioning proprietary project details on placement resumes.
            </p>
            <p className="text-secondary">
              32.2. <strong>Redaction Mandates:</strong> Technical reports, schematics, and design documents shared during technical interviews must redact sensitive sponsor identities, proprietary chemical formulas, and confidential circuit topologies.
            </p>
          </section>

          {/* SECTION 33 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">33. Multi-Tier Grievance Redressal Mechanism</h3>
            <p>
              33.1. <strong>Tier-I: Department Placement Coordinator Conciliation:</strong> Initial scheduling queries, resume verification concerns, and interview slot conflicts are addressed directly by elected Department Placement Coordinators (DPCs).
            </p>
            <p className="text-secondary">
              33.2. <strong>Tier-II: Placement Managers &amp; Company Coordinators:</strong> Inter-company slot overlaps, offer letter discrepancies, and corporate JNF inquiries are escalated to the full-time administrative placement officers.
            </p>
            <p className="text-secondary">
              33.3. <strong>Tier-III: Standing Placement Advisory Committee (SPAC):</strong> Final policy appeals, recruiter blacklisting deliberations, and constitutional placement disputes are adjudicated by the SPAC, whose ruling is final.
            </p>
          </section>

          {/* SECTION 34 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">34. Emergency Health, Safety &amp; Virtual Interview Protocols</h3>
            <p>
              34.1. <strong>Health &amp; Medical Accommodations:</strong> In the event of medical emergencies during active recruitment days, candidates must present a certified medical note from the IIT Bombay Hospital (CMO) to obtain interview rescheduling assistance.
            </p>
            <p className="text-secondary">
              34.2. <strong>Virtual Infrastructure Contingency:</strong> For online video interviews, candidates are provided dedicated high-speed optical fiber terminals and backup uninterrupted power supplies (UPS) inside the central placement computer centre.
            </p>
            <p className="text-secondary">
              34.3. <strong>Bandwidth &amp; Technical Failure Protocols:</strong> If a technical disconnection occurs during an online corporate interview, the designated Company Coordinator will immediately contact the recruiter panel to reconnect via alternate teleconference lines within fifteen (15) minutes.
            </p>
          </section>

          {/* SECTION 35 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">35. Intellectual Property &amp; Patent Disclosures</h3>
            <p>
              35.1. <strong>Institute Patent Rights:</strong> Any patents, design registrations, or copyright protected code generated using Institute infrastructure remains governed by the IIT Bombay Intellectual Property Policy. Candidates cannot assign Institute owned patent rights to prospective employers during campus interviews.
            </p>
            <p className="text-secondary">
              35.2. <strong>Dual Commercialization:</strong> Corporate recruiters wishing to license candidate research inventions must initiate formal licensing discussions with the Industrial Research and Consultancy Centre (IRCC).
            </p>
          </section>

          {/* SECTION 36 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">36. Multi-Program Academic Registration &amp; Joint Degrees</h3>
            <p>
              36.1. <strong>Joint Degree Candidates:</strong> Students enrolled in joint degree initiatives with international partner institutions (e.g., Monash University, NUS) participate under dual accreditation placement guidelines.
            </p>
            <p className="text-secondary">
              36.2. <strong>Branch Flexibility:</strong> Candidates completing minor degree specializations or honors credits may apply for profiles matching their minor concentrations where authorized in the corporate JNF.
            </p>
          </section>

          {/* SECTION 37 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">37. Workplace Safety &amp; Industrial Hazards Induction</h3>
            <p>
              37.1. <strong>Heavy Engineering &amp; Chemical Site Protocols:</strong> Candidates accepted into manufacturing, chemical processing, oil &amp; gas exploration, or mining profiles must complete safety certification modules prior to site deployment.
            </p>
            <p className="text-secondary">
              37.2. <strong>Personal Protective Equipment (PPE):</strong> Recruiting entities must supply certified PPE and comprehensive health insurance coverage for candidates assigned to hazardous industrial zones.
            </p>
          </section>

          {/* SECTION 38 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">38. Alumni Career Transition &amp; Lateral Placement Services</h3>
            <p>
              38.1. <strong>Alumni Job Board:</strong> Graduating alumni seeking lateral career transitions or mid-level recruitment may access the dedicated IIT Bombay Alumni Placement Network after completion of one (1) year post-graduation.
            </p>
            <p className="text-secondary">
              38.2. <strong>Credential Verification:</strong> The Institute provides lifetime electronic degree credential verification for alumni through the National Academic Depository (NAD) DigiLocker integration.
            </p>
          </section>

          {/* SECTION 39 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">39. Corporate CSR, Diversity &amp; Campus Partnerships</h3>
            <p>
              39.1. <strong>Corporate Sponsorships:</strong> Corporate entities participating in campus recruitment may sponsor academic research labs, merit-cum-means scholarships, and student innovation clubs under Corporate Social Responsibility (CSR) provisions without influencing slotting priority.
            </p>
            <p className="text-secondary">
              39.2. <strong>Hackathons &amp; Technical Competitions:</strong> Pre-placement hackathons and algorithmic competitions organized by corporate sponsors must be open to all eligible students without exclusionary quotas.
            </p>
          </section>

          {/* SECTION 40 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">40. Comprehensive Institutional Policy FAQ (Part III)</h3>
            <p>
              <strong>Q26: What happens if a company delays joining beyond the declared JNF timeline?</strong><br />
              <span className="text-secondary">If a recruiter defers onboarding by more than three (3) months beyond the JNF date, the company must provide an interim monthly stipend to the candidate. Delays exceeding six (6) months are reported to the AIPC for institutional blacklisting.</span>
            </p>
            <p>
              <strong>Q27: Can students apply for positions located in overseas subsidiaries?</strong><br />
              <span className="text-secondary">Yes, provided the recruiting company submits an international JNF explicitly guaranteeing work authorization, visa sponsorship, and standard international relocation packages.</span>
            </p>
            <p>
              <strong>Q28: How does the T&amp;P Cell prevent interview scheduling conflicts during Phase I?</strong><br />
              <span className="text-secondary">An automated real-time scheduling algorithm assigns candidate interview slots and dynamically coordinates with Company Coordinators to ensure students shortlisted by multiple firms in the same slot receive sequential time allocations without disqualification.</span>
            </p>
            <p>
              <strong>Q29: Are candidates allowed to negotiate compensation packages post-selection?</strong><br />
              <span className="text-secondary">No. Candidates agree to accept the exact terms declared in the approved JNF. Direct independent salary negotiations that deviate from the institutional JNF are strictly prohibited.</span>
            </p>
            <p>
              <strong>Q30: What support is provided to students who remain unplaced at the end of Phase I?</strong><br />
              <span className="text-secondary">Unplaced candidates receive dedicated resume review clinics, specialized technical upskilling bootcamps, and priority shortlisting in Phase II rolling recruitment drives running from January through June.</span>
            </p>
          </section>

          {/* SECTION 41 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">41. Standing Disciplinary Committee Hearing Bylaws</h3>
            <p>
              41.1. <strong>Principles of Natural Justice:</strong> Every candidate accused of a placement infraction is entitled to formal notice, disclosure of evidence, and an opportunity to present an oral defense before the Standing Disciplinary Action Committee (SDAC).
            </p>
            <p className="text-secondary">
              41.2. <strong>Time-Bound Adjudication:</strong> All disciplinary hearings must be concluded within seven (7) business days of notice issuance, ensuring speedy resolution during active placement cycles.
            </p>
          </section>

          {/* SECTION 42 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">42. Business Continuity, Force Majeure &amp; Epidemic Protocols</h3>
            <p>
              42.1. <strong>Emergency Transition to Virtual Modalities:</strong> In the event of unforeseen disruptions (extreme weather, regional lockdowns, or public health emergencies), the T&amp;P Cell will seamlessly migrate physical interview slots to secure, proctored virtual video suites within twenty-four (24) hours.
            </p>
            <p className="text-secondary">
              42.2. <strong>Data Backup &amp; High Availability:</strong> All placement records, candidate shortlists, and offer confirmations are redundantly backed up across geographically distributed server nodes to prevent loss of critical telemetry.
            </p>
          </section>

          {/* SECTION 43 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">43. Annual Placement Broadsheet Archival Norms</h3>
            <p>
              43.1. <strong>Statistical Broadsheet Publication:</strong> At the conclusion of Phase II, the T&amp;P Cell compiles the official Annual Placement Report and Broadsheet, presenting verified sector-wise compensation averages, median percentiles, branch placement percentages, and international hiring indices.
            </p>
            <p className="text-secondary">
              43.2. <strong>Audited Record Retention:</strong> Physical and digital records of JNFs, candidate acceptance slips, and corporate offer letters are archived securely for a statutory duration of ten (10) academic years for institutional accreditation compliance.
            </p>
          </section>

          {/* SECTION 44 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">44. Summary of Disciplinary Penalty Tariff Points</h3>
            <p>
              44.1. <strong>Infraction 1 (Resume Exaggeration / Misrepresentation):</strong> 100 Penalty Points, immediate cancellation of all applications, debarment from Phase I and Phase II drives.
            </p>
            <p className="text-secondary">
              44.2. <strong>Infraction 2 (Assessment Malpractice / AI Prompting):</strong> 100 Penalty Points, permanent placement debarment, and referral to Senate IDAC for semester suspension.
            </p>
            <p className="text-secondary">
              44.3. <strong>Infraction 3 (Offer Reneging):</strong> 100 Penalty Points, loss of alumni career access, transcript endorsement.
            </p>
            <p className="text-secondary">
              44.4. <strong>Infraction 4 (Unexcused Interview Absence):</strong> 50 Penalty Points, loss of 3 consecutive slot privileges, forfeiture of Super-Dream eligibility.
            </p>
            <p className="text-secondary">
              44.5. <strong>Infraction 5 (Unexcused PPT Absence):</strong> 20 Penalty Points, cancellation of application for target company, formal warning.
            </p>
          </section>

          {/* SECTION 45 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">45. Candidate Health Insurance &amp; Overseas Travel Protection</h3>
            <p>
              45.1. <strong>Mandatory International Health Insurance:</strong> For students selected for overseas internships or full-time international postings, the recruiting company must provide comprehensive global medical insurance with emergency evacuation coverage before departure.
            </p>
            <p className="text-secondary">
              45.2. <strong>Domestic Occupational Health Standards:</strong> Domestic employers agree to provide statutory employee state insurance (ESIC) or equivalent corporate group medical insurance covering hospitalization expenses from the first day of active employment.
            </p>
          </section>

          {/* SECTION 46 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">46. Quantitative Finance &amp; Algorithmic Research Test Protocols</h3>
            <p>
              46.1. <strong>Specialized Assessment Security:</strong> Quantitative algorithmic trading, mathematical finance, and high-frequency trading (HFT) firms conduct assessments in isolated offline examination environments to protect proprietary test sets and ensure equal candidate conditions.
            </p>
            <p className="text-secondary">
              46.2. <strong>Calculators and Mathematical Peripherals:</strong> Only standard scientific calculators or approved terminal calculators embedded within the proctoring environment are permitted during quantitative testing rounds.
            </p>
          </section>

          {/* SECTION 47 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">47. Student Placement Volunteer Charter &amp; Ethical Oath</h3>
            <p>
              47.1. <strong>Ethical Non-Interference Undertaking:</strong> All student placement managers, Department Placement Coordinators (DPCs), and Company Coordinators (CCs) must execute a legally binding non-disclosure and non-interference undertaking.
            </p>
            <p className="text-secondary">
              47.2. <strong>Zero Preference Rule:</strong> Placement volunteers are strictly barred from utilizing their administrative access to gain scheduling preferences, early interview slots, or confidential recruiter shortlist information for personal benefit.
            </p>
            <p className="text-secondary">
              47.3. <strong>Sanctions for Breach:</strong> Any volunteer detected leaking shortlist records or manipulating interview queues faces immediate removal from office and referral to IDAC.
            </p>
          </section>

          {/* SECTION 48 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">48. Multi-Sector Analytics &amp; Benchmark Reporting Directives</h3>
            <p>
              48.1. <strong>Analytical Methodology:</strong> Dashboard compensation percentiles (25th, 50th/Median, 75th, 90th) are computed using standard statistical interpolation across verified JNF base datasets.
            </p>
            <p className="text-secondary">
              48.2. <strong>Sector Groupings:</strong> Placement sectors are classified under standard taxonomy: Information Technology, Core Engineering, Financial Services &amp; Quantitative Analytics, Management Consulting, FMCG &amp; Operations, Healthcare &amp; Biotechnology, Public Sector Undertakings (PSUs), and Educational Research.
            </p>
          </section>

          {/* SECTION 49 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">49. Executive Summary of Candidate Responsibilities</h3>
            <p>
              49.1. Maintain absolute honesty across all master resume versions and academic declarations.
            </p>
            <p className="text-secondary">
              49.2. Respect the &quot;One-Student-One-Offer&quot; rule to preserve peer opportunities.
            </p>
            <p className="text-secondary">
              49.3. Adhere strictly to formal interview dress codes and scheduled slot timetables.
            </p>
            <p className="text-secondary">
              49.4. Disclose all summer internship Pre-Placement Offers (PPOs) within 48 hours of receipt.
            </p>
            <p className="text-secondary">
              49.5. Uphold the institutional reputation and goodwill of IIT Bombay throughout all professional interactions.
            </p>
          </section>

          {/* SECTION 50 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">50. Defense Sponsored Candidates &amp; Armed Forces Officers</h3>
            <p>
              50.1. <strong>Sponsored Candidate Protocols:</strong> Candidates sponsored by the Indian Army, Navy, Air Force, DRDO, or defense establishments for post-graduate degrees are bound by service deputation bonds and are not eligible for general corporate campus placements.
            </p>
            <p className="text-secondary">
              50.2. <strong>NOC Requisites:</strong> Armed forces personnel seeking release must submit formal discharge certificates and No Objection Certificates (NOC) from their respective service headquarters before registering with the T&amp;P Cell.
            </p>
          </section>

          {/* SECTION 51 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">51. International Tax Treaties &amp; Double Taxation Relief (DTAA)</h3>
            <p>
              51.1. <strong>DTAA Awareness:</strong> Candidates accepting international employment postings are advised to review the Double Tax Avoidance Agreement (DTAA) between India and the host country to understand cross-border tax withholding and foreign tax credit mechanics.
            </p>
            <p className="text-secondary">
              51.2. <strong>Repatriation of Savings:</strong> All foreign currency remittances to Indian bank accounts must comply with the Foreign Exchange Management Act (FEMA) guidelines issued by the Reserve Bank of India.
            </p>
          </section>

          {/* SECTION 52 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">52. Corporate Feedback Loops &amp; Recruiter Audit</h3>
            <p>
              52.1. <strong>Annual Recruiter Survey:</strong> Corporate recruiters provide structured post-placement feedback on candidate technical proficiency, domain knowledge, problem-solving skills, and communication decorum to assist academic departments in curriculum updates.
            </p>
            <p className="text-secondary">
              52.2. <strong>Candidate Experience Audits:</strong> Placed and unplaced candidates participate in anonymous season feedback surveys to evaluate the fairness, transparency, and logistical efficiency of the T&amp;P Cell operations.
            </p>
          </section>

          {/* SECTION 53 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">53. High-Performance Computing (HPC) &amp; Computational Infrastructure</h3>
            <p>
              53.1. <strong>Cluster Computing Access:</strong> Candidates executing high-performance computational workloads, artificial intelligence training pipelines, or finite element simulations for recruitment tests are provisioned dedicated compute nodes on the central Spastra cluster.
            </p>
            <p className="text-secondary">
              53.2. <strong>Fair Use Computing Quotas:</strong> Resource utilization is monitored to prevent resource exhaustion during active placement cycles. Commercial cryptocurrency mining or unapproved distributed compute jobs will result in immediate compute access suspension.
            </p>
          </section>

          {/* SECTION 54 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">54. Non-Disclosure Agreements (NDAs) &amp; Test Security</h3>
            <p>
              54.1. <strong>Confidentiality Undertaking:</strong> All assessment challenges, architectural case studies, and quantitative test repositories presented by corporate recruiters are proprietary intellectual property covered by institutional non-disclosure covenants.
            </p>
            <p className="text-secondary">
              54.2. <strong>Prohibition on Public Disclosure:</strong> Candidates who publish, record, redistribute, or monetize test items, challenge solutions, or interviewer conversations on public repositories (GitHub, LeetCode, Telegram) shall be liable for immediate disciplinary sanctions and corporate civil claims.
            </p>
          </section>

          {/* SECTION 55 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">55. Multi-Stage Technical Interview Protocols &amp; Debriefings</h3>
            <p>
              55.1. <strong>Standard Round Sequencing:</strong> Corporate recruitment drives typically proceed through: (a) initial coding/aptitude screening; (b) technical domain round 1; (c) system design/live coding round 2; (d) managerial/HR fitment evaluation.
            </p>
            <p className="text-secondary">
              55.2. <strong>Candidate Debriefing Assistance:</strong> Department Placement Coordinators conduct confidential debriefings for candidates eliminated in final rounds to identify improvement areas for upcoming recruitment slots.
            </p>
          </section>

          {/* SECTION 56 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">56. Electronic Document Security &amp; Digital Signatures</h3>
            <p>
              56.1. <strong>Cryptographic Validation:</strong> Official offer letters, verification dossiers, and No Objection Certificates issued by the Training &amp; Placement Cell are digitally signed with cryptographic timestamps verifiable through the institutional public key portal.
            </p>
            <p className="text-secondary">
              56.2. <strong>Tamper Detection:</strong> Any modification, redaction, or alteration of digital certificate signatures invalidates the document automatically.
            </p>
          </section>

          {/* SECTION 57 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">57. Data Subject Access Requests (DSAR) &amp; Privacy Procedures</h3>
            <p>
              57.1. <strong>Privacy Redressal:</strong> Registered candidates may submit a formal Data Subject Access Request (DSAR) to the Data Protection Officer to inspect the specific telemetry categories processed during recruitment cycles.
            </p>
            <p className="text-secondary">
              57.2. <strong>Rectification Workflow:</strong> Corrections to academic grade notations or branch designations are executed within forty-eight (48) hours upon verification with the Academic Office.
            </p>
          </section>

          {/* SECTION 58 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">58. Comprehensive Institutional Policy FAQ (Part IV)</h3>
            <p>
              <strong>Q31: Are pre-final year students allowed to participate in Phase I full-time placements?</strong><br />
              <span className="text-secondary">No. Phase I and Phase II full-time placement drives are exclusively reserved for students graduating in the current academic year. Pre-final year students participate exclusively in the summer internship recruitment drive.</span>
            </p>
            <p>
              <strong>Q32: What is the procedure if a candidate falls ill on Day 0 of placements?</strong><br />
              <span className="text-secondary">The candidate or their hostel representative must notify the T&amp;P Emergency Helpdesk and obtain a certified medical slip from the IIT Bombay Hospital. The Company Coordinators will liaise with recruiting firms to schedule virtual slots or deferred interview windows where feasible.</span>
            </p>
            <p>
              <strong>Q33: Can a candidate request an extension to decide on a Super-Dream upgrade?</strong><br />
              <span className="text-secondary">No. Due to the rapid pace of placement slots and the imperative to release vacant positions to waitlisted batchmates, decisions on upgrades must be recorded within the standard slot transition window (60 to 90 minutes).</span>
            </p>
            <p>
              <strong>Q34: How are non-engineering disciplines (Design, Management, Pure Sciences) supported?</strong><br />
              <span className="text-secondary">Dedicated placement coordinators and specialized recruitment weeks are organized for IDC (School of Design), SJMSOM (Management), and the School of Physical &amp; Chemical Sciences, ensuring custom interview formats and industry-specific profiles.</span>
            </p>
            <p>
              <strong>Q35: What should a student do if an interviewer asks improper or discriminatory questions?</strong><br />
              <span className="text-secondary">The student should immediately conclude the interview politely and report the incident directly to the Professor-in-Charge or the T&amp;P Ombudsman Desk. The Institute takes immediate action, up to suspending the interviewer panel.</span>
            </p>
          </section>

          {/* SECTION 59 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">59. Master Placement Checklist for Registered Candidates</h3>
            <p>
              59.1. Ensure all master resume entries have been attested by your Department Placement Coordinator (DPC).
            </p>
            <p className="text-secondary">
              59.2. Confirm that your Cumulative Performance Index (CPI) is synchronized with the Academic Office database.
            </p>
            <p className="text-secondary">
              59.3. Keep physical and digital copies of your IIT Bombay ID card, official transcripts, and internship certificates ready.
            </p>
            <p className="text-secondary">
              59.4. Review company JNF salary breakdowns, location postings, and bond clauses carefully prior to applying.
            </p>
            <p className="text-secondary">
              59.5. Maintain strict communication discipline and respect slot call deadlines during active recruitment drives.
            </p>
          </section>

          {/* SECTION 60 */}
          <section className="simple-legal-section">
            <h3 className="simple-legal-label">60. Institutional Directorate, Standing Officers &amp; Physical Address</h3>
            <div className="simple-legal-contact-row">
              <span>Training &amp; Placement Cell, 4th Floor, Main Building, Indian Institute of Technology Bombay, Powai, Mumbai 400076, Maharashtra, India.</span>
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
                <span className="dot-sep">•</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Data Protection Officer: <span className="font-mono">dpo@iitb.ac.in</span>
                </span>
                <span className="dot-sep">•</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Placement Control Desk: <span className="font-mono">+91 (22) 2576 7096 / 7097</span>
                </span>
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
