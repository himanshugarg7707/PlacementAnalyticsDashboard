// Contributor: Alankrit Narang - Change College Modal
import { useEffect } from 'react';

export default function ChangeCollegeModal({
  title = 'Feature Coming Soon',
  description = 'This feature is currently under development. Stay tuned for future updates!',
  badge = 'Coming Soon',
  emoji = '✨',
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
