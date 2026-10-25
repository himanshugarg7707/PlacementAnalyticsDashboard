// Contributor: Himanshu Garg - Top Companies Mostly Asked Questions Modal
import { useState, useMemo, useEffect } from 'react';
import {
  TOP_COMPANY_QUESTIONS,
  UNIQUE_QUESTION_COMPANIES,
  UNIQUE_QUESTION_CATEGORIES,
} from '../data/topCompanyQuestions';
import CompanyLogo from './CompanyLogo';

export default function TopQuestionsModal({
  isOpen = true,
  onClose,
  initialCompany = 'All',
  showToast,
}) {
  const [selectedCompany, setSelectedCompany] = useState(initialCompany);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (initialCompany) {
      setSelectedCompany(initialCompany);
    }
  }, [initialCompany]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCopy = (questionObj) => {
    const textToCopy = `${questionObj.company} Interview Question:\n${questionObj.question}\n\nApproach:\n${questionObj.solutionGuide.approach}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(questionObj.id);
    setTimeout(() => setCopiedId(null), 2000);
    if (showToast) {
      showToast(`Copied question for ${questionObj.company}`, 'success');
    }
  };

  const filteredQuestions = useMemo(() => {
    return TOP_COMPANY_QUESTIONS.filter((q) => {
      if (selectedCompany !== 'All') {
        const matchesMain = q.company.toLowerCase() === selectedCompany.toLowerCase();
        const matchesSecondary = q.alsoAskedBy?.some(
          (c) => c.toLowerCase() === selectedCompany.toLowerCase()
        );
        if (!matchesMain && !matchesSecondary) return false;
      }

      if (selectedCategory !== 'All' && q.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inTopic = q.topic.toLowerCase().includes(query);
        const inCompany = q.company.toLowerCase().includes(query);
        const inCategory = q.category.toLowerCase().includes(query);
        if (!inQuestion && !inTopic && !inCompany && !inCategory) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCompany, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay top-questions-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tq-title"
    >
      <div
        className="modal-content top-questions-modal-card clean-tq-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Clean, Simple Header */}
        <div className="clean-tq-header">
          <h2 id="tq-title" className="clean-tq-title">
            Top Companies Mostly Asked Questions
          </h2>
          <p className="clean-tq-subtitle">
            Frequently asked technical and conceptual questions from top recruiters.
          </p>
        </div>

        {/* Streamlined Search & Filters */}
        <div className="clean-tq-controls">
          <div className="clean-tq-search-box">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="search-icon-svg"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search questions, companies, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clean-tq-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="clean-tq-dropdown-wrap">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="clean-tq-select"
              aria-label="Filter by Topic"
            >
              <option value="All">All Topics</option>
              {UNIQUE_QUESTION_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Company Filter Tabs */}
        <div className="clean-tq-company-tabs" role="tablist">
          <button
            type="button"
            className={`clean-tq-company-chip ${selectedCompany === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedCompany('All')}
          >
            All Companies
          </button>
          {UNIQUE_QUESTION_COMPANIES.map((comp) => (
            <button
              key={comp}
              type="button"
              className={`clean-tq-company-chip ${selectedCompany === comp ? 'active' : ''}`}
              onClick={() => setSelectedCompany(comp)}
            >
              <CompanyLogo company={{ name: comp, sector: 'Technology' }} size={16} />
              <span>{comp}</span>
            </button>
          ))}
        </div>

        {/* Question List */}
        <div className="clean-tq-list">
          {filteredQuestions.length === 0 ? (
            <div className="minimal-empty-state" style={{ padding: '36px 16px' }}>
              <span className="empty-state-icon">🔍</span>
              <p>No questions found matching your search.</p>
              <button
                type="button"
                className="reset-btn-pill"
                onClick={() => {
                  setSelectedCompany('All');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Show All Questions
              </button>
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const isExpanded = expandedId === q.id;
              const isCopied = copiedId === q.id;

              return (
                <div key={q.id} className="clean-q-card">
                  <div className="clean-q-top">
                    <div className="clean-q-company-info">
                      <CompanyLogo company={{ name: q.company, sector: 'Technology' }} size={24} />
                      <span className="clean-q-company-name">{q.company}</span>
                    </div>

                    <div className="clean-q-meta">
                      <span className="clean-q-category">{q.category}</span>
                      <span className="clean-q-topic font-mono">{q.topic}</span>
                    </div>
                  </div>

                  <div className="clean-q-body">
                    <span className="clean-q-number font-mono">{idx + 1}.</span>
                    <p className="clean-q-statement">{q.question}</p>
                  </div>

                  {isExpanded && (
                    <div className="clean-q-answer-panel">
                      <div className="clean-q-answer-heading">Solution Approach:</div>
                      <p className="clean-q-approach">{q.solutionGuide.approach}</p>
                      {q.solutionGuide.complexity && (
                        <div className="clean-q-complexity font-mono">
                          {q.solutionGuide.complexity}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="clean-q-bottom">
                    <button
                      type="button"
                      className="clean-q-toggle-btn"
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    >
                      {isExpanded ? 'Hide Answer ▲' : 'View Answer / Approach ▼'}
                    </button>

                    <button
                      type="button"
                      className="clean-q-copy-btn"
                      onClick={() => handleCopy(q)}
                      title="Copy question to clipboard"
                    >
                      {isCopied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Clean, Simple Footer */}
        <div className="clean-tq-footer">
          <span className="clean-tq-count font-mono">
            {filteredQuestions.length} {filteredQuestions.length === 1 ? 'question' : 'questions'}
          </span>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
