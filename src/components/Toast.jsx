import { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast-floating-container" role="status" aria-live="polite">
      <div className={`toast-card toast-${type}`}>
        <span className="toast-icon">
          {type === 'success' ? '✓' : type === 'bookmark' ? '⭐' : 'ℹ️'}
        </span>
        <span className="toast-message">{message}</span>
        <button className="toast-close-btn" onClick={onClose} aria-label="Close notification">
          ✕
        </button>
      </div>
    </div>
  );
}
