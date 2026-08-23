import { useEffect } from 'react';

/**
 * ChangeCollegeModal / ComingSoonModal Component
 *
 * Contributor: Alankrit Narang (narangalankrit123@gmail.com)
 *
 * Minimal, clean popup modal that informs the user that the
 * requested feature (e.g. Change College, Login) is coming soon.
 *
 * @param {Object} props
 * @param {string} [props.title='Feature Coming Soon'] - Modal title
 * @param {string} [props.description] - Description text
 * @param {string} [props.badge='Coming Soon'] - Badge pill text
 * @param {string} [props.emoji='✨'] - Emoji icon
 * @param {Function} props.onClose - Modal close handler
 * @returns {JSX.Element}
 */
export default function ChangeCollegeModal({
  title = 'Feature Coming Soon',
  description = 'This feature is currently under development. Stay tuned for future updates!',
  badge = 'Coming Soon',
  emoji = '✨',
  onClose,
}) {
  // Close modal on Escape key press and manage body scroll lock
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

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
    >
      <div
        className="modal-content simple-coming-soon-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="simple-coming-soon-body">
          <div className="coming-soon-icon-ring">
            <span className="coming-soon-emoji">{emoji}</span>
          </div>

          <span className="coming-soon-badge">{badge}</span>

          <h2 id="coming-soon-title" className="simple-coming-soon-heading">
            {title}
          </h2>

          <p className="simple-coming-soon-text">
            {description}
          </p>

          <button
            type="button"
            className="btn-primary simple-coming-soon-btn"
            onClick={onClose}
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
