// Contributor: Himanshu Garg - Branch-Wise Analytics Component
import { useState, useMemo } from 'react';
import { branches, yearWiseTrend, sectorWiseData } from '../data/placementData';

// Branch-specific roadmap data
const branchRoadmaps = {
  cse: {
    label: 'Computer Science & Engineering',
    icon: '💻',
    color: '#6366f1',
    phases: [
      {
        phase: 'Phase 1 — Foundation',
        semester: 'Sem 1–2',
        subjects: ['Programming in C/C++', 'Discrete Mathematics', 'Digital Logic Design', 'Data Structures'],
        skills: ['Problem Solving', 'Git Basics', 'Linux CLI'],
        resources: ['CLRS Book', 'CS50 Harvard', 'GeeksForGeeks'],
      },
      {
        phase: 'Phase 2 — Core CS',
        semester: 'Sem 3–4',
        subjects: ['Algorithms & Complexity', 'Operating Systems', 'Database Systems', 'Computer Networks', 'OOP (Java/Python)'],
        skills: ['SQL', 'REST APIs', 'System Design basics'],
        resources: ['Striver A-Z DSA Sheet', 'OSTEP (OS book)', 'Neetcode.io'],
      },
      {
        phase: 'Phase 3 — Specialisation',
        semester: 'Sem 5–6',
        subjects: ['Compiler Design', 'Computer Architecture', 'Machine Learning', 'Web Technologies', 'Cloud Computing'],
        skills: ['React/Node.js', 'ML with sklearn', 'Docker basics'],
        resources: ['Andrew Ng ML', 'The Odin Project', 'AWS Free Tier'],
      },
      {
        phase: 'Phase 4 — Placement Prep',
        semester: 'Sem 7–8',
        subjects: ['System Design', 'Advanced DBMS', 'Distributed Systems'],
        skills: ['LeetCode (300+ problems)', 'Mock Interviews', 'Behavioral Rounds', 'Resume Building'],
        resources: ['Grokking System Design', 'InterviewBit', 'Blind 75 List'],
      },
    ],
  },
  ece: {
    label: 'Electronics & Communication Engineering',
    icon: '📡',
    color: '#f59e0b',
    phases: [
      {
        phase: 'Phase 1 — Foundation',
        semester: 'Sem 1–2',
        subjects: ['Basic Electronics', 'Engineering Mathematics', 'Circuit Theory', 'Programming (C)'],
        skills: ['Circuit Simulation (Multisim)', 'Basic Python'],
        resources: ['Sedra/Smith Microelectronics', 'NPTEL Electronics'],
      },
      {
        phase: 'Phase 2 — Core ECE',
        semester: 'Sem 3–4',
        subjects: ['Signals & Systems', 'Analog Circuits', 'Digital Electronics', 'Electromagnetic Theory', 'Microprocessors'],
        skills: ['MATLAB', 'VHDL/Verilog basics', 'PCB Design'],
        resources: ['Oppenheim S&S', 'Razavi Circuits', 'NPTEL VLSI'],
      },
      {
        phase: 'Phase 3 — Specialisation',
        semester: 'Sem 5–6',
        subjects: ['Communication Systems', 'VLSI Design', 'Digital Signal Processing', 'Embedded Systems', 'Wireless Networks'],
        skills: ['FPGA Programming', 'Arduino/STM32', 'RF Design'],
        resources: ['Haykin Communication', 'Cormen DSP', 'Keil IDE'],
      },
      {
        phase: 'Phase 4 — Placement Prep',
        semester: 'Sem 7–8',
        subjects: ['IoT & Industry 4.0', 'VLSI Verification', 'Mixed Signal Design'],
        skills: ['Core ECE MCQs', 'Aptitude & Reasoning', 'Python/DSA for software roles', 'Cadence/Synopsys tools'],
        resources: ['GATEoverflow', 'Made Easy ECE', 'VLSI System Design courses'],
      },
    ],
  },
  me: {
    label: 'Mechanical Engineering',
    icon: '⚙️',
    color: '#ef4444',
    phases: [
      {
        phase: 'Phase 1 — Foundation',
        semester: 'Sem 1–2',
        subjects: ['Engineering Graphics', 'Engineering Mechanics', 'Thermodynamics', 'Mathematics'],
        skills: ['AutoCAD 2D', 'Excel', 'Basic programming'],
        resources: ['Shigley Machine Design', 'NPTEL ME'],
      },
      {
        phase: 'Phase 2 — Core ME',
        semester: 'Sem 3–4',
        subjects: ['Fluid Mechanics', 'Manufacturing Processes', 'Strength of Materials', 'Kinematics of Machines', 'Material Science'],
        skills: ['SolidWorks / CATIA', 'ANSYS FEA basics'],
        resources: ['R.K. Bansal FM', 'Khurmi Theory of Machines'],
      },
      {
        phase: 'Phase 3 — Specialisation',
        semester: 'Sem 5–6',
        subjects: ['Heat Transfer', 'IC Engines', 'Machine Design', 'Robotics', 'CAD/CAM'],
        skills: ['ANSYS Simulation', 'Python for Engineering', 'GD&T'],
        resources: ['Cengel Heat Transfer', 'Autodesk Fusion 360'],
      },
      {
        phase: 'Phase 4 — Placement Prep',
        semester: 'Sem 7–8',
        subjects: ['Industrial Engineering', 'Quality Control', 'Operations Research'],
        skills: ['Core ME Interview Prep', 'Six Sigma basics', 'Aptitude & Reasoning', 'GATE prep'],
        resources: ['Made Easy GATE ME', 'GATEOverflow', 'Coursera ME electives'],
      },
    ],
  },
  ee: {
    label: 'Electrical Engineering',
    icon: '⚡',
    color: '#10b981',
    phases: [
      {
        phase: 'Phase 1 — Foundation',
        semester: 'Sem 1–2',
        subjects: ['Electrical Circuits', 'Engineering Mathematics', 'Physics (Electricity)', 'Programming (C)'],
        skills: ['MATLAB basics', 'Circuit Lab'],
        resources: ['Hayt Engineering Circuits', 'NPTEL EE'],
      },
      {
        phase: 'Phase 2 — Core EE',
        semester: 'Sem 3–4',
        subjects: ['Electrical Machines', 'Power Systems', 'Control Systems', 'Signals & Systems', 'Electromagnetic Fields'],
        skills: ['MATLAB/Simulink', 'AutoCAD Electrical'],
        resources: ['Nagrath & Kothari', 'Ogata Control Sys'],
      },
      {
        phase: 'Phase 3 — Specialisation',
        semester: 'Sem 5–6',
        subjects: ['Power Electronics', 'High Voltage Engineering', 'Microcontrollers', 'Renewable Energy', 'Electric Drives'],
        skills: ['PLC Programming', 'MATLAB Simulink advanced', 'Proteus'],
        resources: ['Mohan Power Electronics', 'Arduino Projects'],
      },
      {
        phase: 'Phase 4 — Placement Prep',
        semester: 'Sem 7–8',
        subjects: ['Smart Grid Technology', 'Energy Management', 'EV Technology'],
        skills: ['Core EE Interview MCQs', 'GATE preparation', 'Aptitude', 'Python for Data Analysis'],
        resources: ['Made Easy GATE EE', 'IES Materials', 'Udemy PLC Courses'],
      },
    ],
  },
  ce: {
    label: 'Civil Engineering',
    icon: '🏗️',
    color: '#8b5cf6',
    phases: [
      {
        phase: 'Phase 1 — Foundation',
        semester: 'Sem 1–2',
        subjects: ['Engineering Drawing', 'Surveying', 'Building Materials', 'Fluid Mechanics basics'],
        skills: ['AutoCAD', 'SketchUp'],
        resources: ['IS Codes', 'NPTEL Civil'],
      },
      {
        phase: 'Phase 2 — Core CE',
        semester: 'Sem 3–4',
        subjects: ['Structural Analysis', 'Concrete Technology', 'Soil Mechanics', 'Transportation Engineering', 'Environmental Engineering'],
        skills: ['STAAD.Pro', 'ETABS basics'],
        resources: ['R.C. Hibbeler Structures', 'Gopal Ranjan Soil Mech'],
      },
      {
        phase: 'Phase 3 — Specialisation',
        semester: 'Sem 5–6',
        subjects: ['Foundation Engineering', 'Water Resources', 'Estimation & Costing', 'Construction Management', 'Pre-stressed Concrete'],
        skills: ['BIM / Revit', 'Primavera Project Planner', 'GIS basics'],
        resources: ['IS 456 for RCC', 'Autodesk Revit Tutorials'],
      },
      {
        phase: 'Phase 4 — Placement Prep',
        semester: 'Sem 7–8',
        subjects: ['Smart Infrastructure', 'Quality & Safety Management'],
        skills: ['GATE Civil prep', 'Core Interview MCQs', 'Aptitude', 'MS Project'],
        resources: ['Made Easy GATE CE', 'TNPSC / UPSC ESE prep', 'LinkedIn Learning PM'],
      },
    ],
  },
  it: {
    label: 'Information Technology',
    icon: '🌐',
    color: '#06b6d4',
    phases: [
      {
        phase: 'Phase 1 — Foundation',
        semester: 'Sem 1–2',
        subjects: ['Programming (Python/C)', 'Discrete Math', 'Digital Electronics', 'IT Fundamentals'],
        skills: ['Git & GitHub', 'HTML/CSS basics', 'Linux Shell'],
        resources: ['Automate with Python', 'The Odin Project'],
      },
      {
        phase: 'Phase 2 — Core IT',
        semester: 'Sem 3–4',
        subjects: ['Data Structures', 'DBMS', 'Computer Networks', 'Web Development', 'OOP'],
        skills: ['JavaScript', 'MySQL', 'REST API', 'React basics'],
        resources: ['Striver DSA Sheet', 'MDN Web Docs', 'freeCodeCamp'],
      },
      {
        phase: 'Phase 3 — Specialisation',
        semester: 'Sem 5–6',
        subjects: ['Cybersecurity', 'Cloud Computing (AWS/GCP)', 'Data Science', 'Mobile App Dev', 'DevOps'],
        skills: ['Docker & Kubernetes', 'TensorFlow basics', 'React Native'],
        resources: ['AWS Certified Solutions Architect', 'TryHackMe', 'Kaggle'],
      },
      {
        phase: 'Phase 4 — Placement Prep',
        semester: 'Sem 7–8',
        subjects: ['System Design', 'Advanced Algorithms', 'Microservices Architecture'],
        skills: ['LeetCode 300+', 'Mock Interviews', 'Full-Stack Project Portfolio', 'Behavioral STAR prep'],
        resources: ['Grokking System Design', 'Neetcode.io', 'Pramp Mock Interviews'],
      },
    ],
  },
};

// Fallback generic roadmap for branches without specific data
const genericRoadmap = (branchName) => ({
  label: branchName,
  icon: '📚',
  color: '#94a3b8',
  phases: [
    { phase: 'Phase 1 — Foundation', semester: 'Sem 1–2', subjects: ['Engineering Mathematics', 'Physics / Chemistry', 'Programming Basics', 'Communication Skills'], skills: ['MS Office', 'Report Writing'], resources: ['NPTEL Courses', 'Coursera Specializations'] },
    { phase: 'Phase 2 — Core Subjects', semester: 'Sem 3–4', subjects: ['Branch-Specific Core 1', 'Branch-Specific Core 2', 'Data Structures', 'Project Work I'], skills: ['Domain Software Tools', 'Python basics'], resources: ['Standard Textbooks', 'YouTube Lectures'] },
    { phase: 'Phase 3 — Specialisation', semester: 'Sem 5–6', subjects: ['Elective Specialisation', 'Lab Work', 'Mini Project', 'Internship'], skills: ['Industry Tools', 'Problem Solving'], resources: ['Research Papers', 'LinkedIn Learning'] },
    { phase: 'Phase 4 — Placement Prep', semester: 'Sem 7–8', subjects: ['Final Year Project', 'Seminar'], skills: ['Aptitude & Reasoning', 'Domain Core MCQs', 'Resume Building', 'Mock GDs & Interviews'], resources: ['Made Easy / Gate Materials', 'InterviewBit', 'Glassdoor Company Reviews'] },
  ],
});

export default function BranchWise() {
  const [activeSubTab, setActiveSubTab] = useState('departments');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rate');
  const [selectedRoadmapBranch, setSelectedRoadmapBranch] = useState('cse');

  const filteredBranches = useMemo(() => {
    let list = branches.filter(
      (b) =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    list.sort((a, b) => {
      if (sortBy === 'rate') {
        return b.placed / b.totalStudents - a.placed / a.totalStudents;
      }
      if (sortBy === 'avg') {
        return b.avgPackage - a.avgPackage;
      }
      if (sortBy === 'highest') {
        return b.highestPackage - a.highestPackage;
      }
      if (sortBy === 'total') {
        return b.totalStudents - a.totalStudents;
      }
      return a.shortName.localeCompare(b.shortName);
    });

    return list;
  }, [searchTerm, sortBy]);

  return (
    <section className="branch-section" aria-labelledby="branches-heading">
      <div className="insights-view-switcher">
        <button
          className={`insight-switch-btn ${activeSubTab === 'departments' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('departments')}
        >
          🎓 Engineering Departments
        </button>
        <button
          className={`insight-switch-btn ${activeSubTab === 'trends' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('trends')}
        >
          📈 5-Year Growth Trajectory
        </button>
        <button
          className={`insight-switch-btn ${activeSubTab === 'sectors' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('sectors')}
        >
          🌐 Sector-Wise Analytics
        </button>
        <button
          className={`insight-switch-btn ${activeSubTab === 'roadmap' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('roadmap')}
        >
          🗺️ Branch RoadMap
        </button>
      </div>

      {activeSubTab === 'departments' && (
        <div className="tab-pane-content">
          <div className="branch-header-row">
            <div>
              <div className="section-badge-pill">Departmental Analytics</div>
              <h2 id="branches-heading" className="branch-title">
                Branch-Wise Placement Breakdown
              </h2>
              <p className="branch-desc">
                Detailed placement rates, salary distribution, and cohort statistics across engineering departments.
              </p>
            </div>

            <div className="branch-controls">
              <div className="branch-search-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search branch (CSE, ECE)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="branch-search-input"
                />
              </div>

              <div className="branch-sort-pills">
                <button
                  className={`sort-pill ${sortBy === 'rate' ? 'active' : ''}`}
                  onClick={() => setSortBy('rate')}
                >
                  Placement %
                </button>
                <button
                  className={`sort-pill ${sortBy === 'avg' ? 'active' : ''}`}
                  onClick={() => setSortBy('avg')}
                >
                  Avg CTC
                </button>
                <button
                  className={`sort-pill ${sortBy === 'highest' ? 'active' : ''}`}
                  onClick={() => setSortBy('highest')}
                >
                  Highest CTC
                </button>
              </div>
            </div>
          </div>

          <div className="branch-grid-layout">
            {filteredBranches.map((b) => {
              const placementRate = ((b.placed / b.totalStudents) * 100).toFixed(1);
              return (
                <div className="branch-glass-card" key={b.id}>
                  <div className="branch-card-top">
                    <div className="branch-badge font-mono">{b.shortName}</div>
                    <div className="branch-rate-pill">
                      <span className="rate-num font-mono">{placementRate}%</span>
                      <span className="rate-label">Placed</span>
                    </div>
                  </div>

                  <h3 className="branch-name">{b.name}</h3>

                  <div className="branch-progress-labels">
                    <span>{b.placed} placed</span>
                    <span>{b.totalStudents} total students</span>
                  </div>

                  <div className="branch-metrics-grid">
                    <div className="branch-metric-cell highlight">
                      <span className="b-label">Avg Package</span>
                      <span className="b-val font-mono">₹{b.avgPackage} LPA</span>
                    </div>
                    <div className="branch-metric-cell">
                      <span className="b-label">Highest Package</span>
                      <span className="b-val font-mono" style={{ color: '#34d399' }}>
                        ₹{b.highestPackage} LPA
                      </span>
                    </div>
                    <div className="branch-metric-cell">
                      <span className="b-label">Median Package</span>
                      <span className="b-val font-mono">₹{b.medianPackage} LPA</span>
                    </div>
                    <div className="branch-metric-cell">
                      <span className="b-label">Placement Ratio</span>
                      <span className="b-val font-mono">{placementRate}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSubTab === 'trends' && (
        <div className="tab-pane-content">
          <div className="branch-header-row">
            <div>
              <div className="section-badge-pill">Historical Growth</div>
              <h2 className="branch-title">5-Year Institutional Placement Trend</h2>
              <p className="branch-desc">
                Consistent year-on-year expansion in recruiting partners, student placements, and peak compensation.
              </p>
            </div>
          </div>

          <div className="trends-grid-cards">
            {yearWiseTrend.map((t, idx) => {
              const prev = idx > 0 ? yearWiseTrend[idx - 1] : null;
              const growth = prev
                ? (((t.totalPlaced - prev.totalPlaced) / prev.totalPlaced) * 100).toFixed(1)
                : null;
              const isCurrent = idx === yearWiseTrend.length - 1;

              return (
                <div className={`trend-glass-card ${isCurrent ? 'current-year' : ''}`} key={t.year}>
                  <div className="trend-card-top">
                    <span className="trend-year font-mono">{t.year}</span>
                    {isCurrent ? (
                      <span className="trend-active-pill font-mono">Current Season</span>
                    ) : growth ? (
                      <span className="trend-growth-pill font-mono">+{growth}%</span>
                    ) : null}
                  </div>

                  <div className="trend-placed-stat">
                    <span className="trend-num font-mono">{t.totalPlaced}</span>
                    <span className="trend-num-label">Students Placed</span>
                  </div>

                  <div className="trend-meta-grid">
                    <div className="trend-meta-item">
                      <span className="t-meta-label">Avg Package</span>
                      <span className="t-meta-val font-mono">₹{t.avgPackage} LPA</span>
                    </div>
                    <div className="trend-meta-item">
                      <span className="t-meta-label">Highest Package</span>
                      <span className="t-meta-val font-mono highlight-ice-aqua">₹{t.highestPackage} LPA</span>
                    </div>
                    <div className="trend-meta-item">
                      <span className="t-meta-label">Companies</span>
                      <span className="t-meta-val font-mono">{t.companiesVisited}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSubTab === 'sectors' && (
        <div className="tab-pane-content">
          <div className="branch-header-row">
            <div>
              <div className="section-badge-pill">Market Sector Breakdown</div>
              <h2 className="branch-title">Industry Sector Distribution</h2>
              <p className="branch-desc">
                Hiring volume, company participation, and average package dynamics across primary industrial verticals.
              </p>
            </div>
          </div>

          <div className="sectors-grid-layout">
            {sectorWiseData.map((s) => {
              return (
                <div className="sector-glass-card" key={s.sector}>
                  <div className="sector-card-top">
                    <h3 className="sector-card-name">{s.sector}</h3>
                    <span className="sector-ctc-pill font-mono">
                      ₹{s.avgCTC.toFixed(1)} LPA Avg
                    </span>
                  </div>

                  <div className="sector-metrics-duo">
                    <div className="sector-m-cell">
                      <span className="s-m-label">Job Offers</span>
                      <span className="s-m-val font-mono">{s.offers}</span>
                    </div>
                    <div className="sector-m-cell">
                      <span className="s-m-label">Recruiters</span>
                      <span className="s-m-val font-mono">{s.companies}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSubTab === 'roadmap' && (() => {
        const roadmapBranches = branches.filter((b) =>
          ['cse', 'ece', 'me', 'ee', 'ce', 'it'].includes(b.id)
        );
        const allBranches = [
          ...roadmapBranches,
          ...branches.filter((b) => !['cse', 'ece', 'me', 'ee', 'ce', 'it'].includes(b.id)),
        ];
        const selected = branchRoadmaps[selectedRoadmapBranch];
        const branchMeta = branches.find((b) => b.id === selectedRoadmapBranch);
        const roadmapData = selected || genericRoadmap(branchMeta?.name || selectedRoadmapBranch.toUpperCase());
        return (
          <div className="tab-pane-content">
            <div className="branch-header-row">
              <div>
                <div className="section-badge-pill">Career Blueprint</div>
                <h2 className="branch-title">Branch-Wise Academic RoadMap</h2>
                <p className="branch-desc">
                  A phase-wise guide covering subjects, skills, and resources for each engineering branch to maximise placement outcomes.
                </p>
              </div>
            </div>

            {/* Branch Selector */}
            <div className="roadmap-branch-selector">
              {allBranches.map((b) => (
                <button
                  key={b.id}
                  className={`roadmap-branch-pill ${
                    selectedRoadmapBranch === b.id ? 'active' : ''
                  }`}
                  style={selectedRoadmapBranch === b.id ? { '--pill-color': b.color } : {}}
                  onClick={() => setSelectedRoadmapBranch(b.id)}
                >
                  <span className="roadmap-pill-dot" style={{ background: b.color }}></span>
                  {b.shortName}
                </button>
              ))}
            </div>

            {/* Roadmap Header */}
            <div className="roadmap-hero-bar" style={{ '--hero-color': roadmapData.color }}>
              <span className="roadmap-hero-icon">{roadmapData.icon}</span>
              <div>
                <div className="roadmap-hero-title">{roadmapData.label}</div>
                {branchMeta && (
                  <div className="roadmap-hero-stats">
                    <span>📊 Avg Package: <strong>₹{branchMeta.avgPackage} LPA</strong></span>
                    <span>🏆 Highest: <strong>₹{branchMeta.highestPackage} LPA</strong></span>
                    <span>👥 Students: <strong>{branchMeta.totalStudents}</strong></span>
                    <span>✅ Placed: <strong>{branchMeta.placed}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Phase Timeline */}
            <div className="roadmap-timeline">
              {roadmapData.phases.map((phase, idx) => (
                <div className="roadmap-phase-card" key={idx} style={{ '--phase-color': roadmapData.color }}>
                  <div className="roadmap-phase-connector">
                    <div className="roadmap-phase-node" style={{ background: roadmapData.color }}>
                      <span>{idx + 1}</span>
                    </div>
                    {idx < roadmapData.phases.length - 1 && (
                      <div className="roadmap-connector-line" style={{ background: `linear-gradient(to bottom, ${roadmapData.color}60, transparent)` }}></div>
                    )}
                  </div>

                  <div className="roadmap-phase-body">
                    <div className="roadmap-phase-header">
                      <div>
                        <h3 className="roadmap-phase-title">{phase.phase}</h3>
                        <span className="roadmap-semester-badge">{phase.semester}</span>
                      </div>
                    </div>

                    <div className="roadmap-phase-content-grid">
                      {/* Subjects */}
                      <div className="roadmap-content-block">
                        <div className="roadmap-block-heading">
                          <span className="roadmap-block-icon">📖</span> Core Subjects
                        </div>
                        <ul className="roadmap-subject-list">
                          {phase.subjects.map((s, si) => (
                            <li key={si} className="roadmap-subject-item">
                              <span className="roadmap-item-dot" style={{ background: roadmapData.color }}></span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div className="roadmap-content-block">
                        <div className="roadmap-block-heading">
                          <span className="roadmap-block-icon">🛠️</span> Skills to Build
                        </div>
                        <div className="roadmap-skills-tags">
                          {phase.skills.map((sk, ski) => (
                            <span key={ski} className="roadmap-skill-tag" style={{ '--tag-color': roadmapData.color }}>
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Resources */}
                      <div className="roadmap-content-block">
                        <div className="roadmap-block-heading">
                          <span className="roadmap-block-icon">🔗</span> Resources
                        </div>
                        <ul className="roadmap-subject-list">
                          {phase.resources.map((r, ri) => (
                            <li key={ri} className="roadmap-subject-item roadmap-resource-item">
                              <span className="roadmap-item-dot" style={{ background: '#34d399' }}></span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </section>
  );
}
