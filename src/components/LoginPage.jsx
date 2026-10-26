// Contributors: Himanshu Garg & Placement Team
// Feature: Clean Authentication Gateway for IIT Bombay Placement Portal
// Hooks: useState, useEffect, useRef, useNavigate

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const USERS_STORAGE_KEY = 'iitb_portal_registered_users';
const SESSION_STORAGE_KEY = 'iitb_placement_auth_session';

export default function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  // Mode: 'login' | 'register'
  const [mode, setMode] = useState('login');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student',
    department: 'Computer Science & Engineering',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Refs
  const primaryInputRef = useRef(null);
  const formCardRef = useRef(null);

  // 1. useEffect: Document title update & auto-focus input
  useEffect(() => {
    document.title = mode === 'login'
      ? 'Sign In | IIT Bombay Placement Records'
      : 'Create Account | IIT Bombay Placement Records';

    const timer = setTimeout(() => {
      primaryInputRef.current?.focus();
    }, 50);
 
    return () => clearTimeout(timer);
  }, [mode]);

  // 2. useEffect: Escape key shortcut to return to dashboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const getStoredUsers = () => {
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (statusMessage) {
      setStatusMessage(null);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setStatusMessage(null);
  };

  const validateForm = () => {
    const errs = {};
    const emailKey = formData.email.trim().toLowerCase();

    if (mode === 'register') {
      if (!formData.name.trim()) {
        errs.name = 'Full name is required';
      }
    }

    if (!emailKey) {
      errs.email = 'Email or Roll Number is required';
    } else if (emailKey.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailKey)) {
      errs.email = 'Please enter a valid email format';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 4) {
      errs.password = 'Password must be at least 4 characters';
    }

    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        errs.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (formCardRef.current) {
        formCardRef.current.classList.remove('portal-shake');
        void formCardRef.current.offsetWidth;
        formCardRef.current.classList.add('portal-shake');
      }
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const emailKey = formData.email.trim().toLowerCase();
    const storedUsers = getStoredUsers();

    setTimeout(() => {
      setIsSubmitting(false);

      if (mode === 'register') {
        const existing = storedUsers.find((u) => u.email === emailKey);
        if (existing) {
          setErrors({ email: 'An account with this email/roll number already exists.' });
          setStatusMessage({
            type: 'error',
            text: 'Account already registered. Please sign in with your credentials.',
          });
          return;
        }

        const newUser = {
          name: formData.name.trim(),
          email: emailKey,
          role: formData.role,
          department: formData.department,
          password: formData.password,
          createdAt: new Date().toISOString(),
        };

        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

        setStatusMessage({
          type: 'success',
          text: 'Account created successfully! You can now sign in below.',
        });

        setMode('login');
        setFormData((prev) => ({
          ...prev,
          password: '',
          confirmPassword: '',
        }));
      } else {
        const matchedUser = storedUsers.find(
          (u) => u.email === emailKey && u.password === formData.password
        );

        if (!matchedUser) {
          const emailExists = storedUsers.some((u) => u.email === emailKey);
          if (emailExists) {
            setErrors({ password: 'Incorrect password. Please try again.' });
            setStatusMessage({ type: 'error', text: 'Incorrect password for this account.' });
          } else {
            setErrors({ email: 'No account found with this email or roll number.' });
            setStatusMessage({
              type: 'error',
              text: 'No account found. Please click "Create Account" first.',
            });
          }
          return;
        }

        const authSession = {
          name: matchedUser.name,
          email: matchedUser.email,
          role: matchedUser.role,
          department: matchedUser.department,
          loggedInAt: new Date().toISOString(),
        };

        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authSession));

        if (onLoginSuccess) {
          onLoginSuccess(authSession);
        }

        setStatusMessage({
          type: 'success',
          text: `Welcome back, ${matchedUser.name}! Authorizing access...`,
        });

        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    }, 400);
  };

  return (
    <div className="login-viewport">
      {/* Top Navbar */}
      <header className="login-top-bar">
        <div className="login-bar-brand" onClick={() => navigate('/')}>
          <div className="login-bar-logo font-mono">IITB</div>
          <div className="login-bar-title-group">
            <span className="login-bar-title">IIT Bombay</span>
            <span className="login-bar-sub">Placement Records 2024–25</span>
          </div>
        </div>

        <button
          type="button"
          className="login-bar-back-btn"
          onClick={() => navigate('/')}
        >
          ← Return to Dashboard
        </button>
      </header>

      {/* Main Authentication Card */}
      <main className="login-main-stage">
        <div className="login-showcase-card" ref={formCardRef}>
          {/* Glowing Pill Badge */}
          <div className="login-pill-badge-wrap">
            <div className="login-pill-badge">
              <span>Campus Placements 2024–25 — Verified Records</span>
              <span className="login-pill-chevron">›</span>
            </div>
          </div>

          {/* Editorial Serif Headline */}
          <h1 className="login-showcase-title">
            Making Placement<br />Intelligence Accessible
          </h1>

          <p className="login-showcase-subtitle">
            Secure verification gateway for students, recruiters, and T&amp;P coordinators
            to access recruitment records and CTC package statistics.
          </p>

          {/* Form Card */}
          <div className="login-form-box">
            {/* Tab Switcher */}
            <div className="login-tab-pills">
              <button
                type="button"
                className={`login-tab-pill ${mode === 'login' ? 'active' : ''}`}
                onClick={() => switchMode('login')}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`login-tab-pill ${mode === 'register' ? 'active' : ''}`}
                onClick={() => switchMode('register')}
              >
                Create Account
              </button>
            </div>

            {/* Alert Status */}
            {statusMessage && (
              <div className={`login-status-banner ${statusMessage.type}`}>
                <span>{statusMessage.type === 'success' ? '✓' : '⚠️'}</span>
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form className="login-actual-form" onSubmit={handleSubmit} noValidate>
              {mode === 'register' && (
                <>
                  <div className="login-input-group">
                    <label htmlFor="regName">Full Name</label>
                    <input
                      ref={primaryInputRef}
                      id="regName"
                      type="text"
                      placeholder="e.g. Himanshu Garg"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={errors.name ? 'input-error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.name && <span className="login-field-error">{errors.name}</span>}
                  </div>

                  <div className="login-input-row">
                    <div className="login-input-group">
                      <label htmlFor="regRole">Role</label>
                      <select
                        id="regRole"
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        disabled={isSubmitting}
                      >
                        <option value="Student">Student</option>
                        <option value="Recruiter">Recruiter</option>
                        <option value="Coordinator">T&P Officer</option>
                      </select>
                    </div>

                    <div className="login-input-group">
                      <label htmlFor="regDept">Department</label>
                      <select
                        id="regDept"
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        disabled={isSubmitting}
                      >
                        <option value="Computer Science & Engineering">CSE</option>
                        <option value="Electrical Engineering">Electrical (EE)</option>
                        <option value="Mechanical Engineering">Mechanical (ME)</option>
                        <option value="Civil Engineering">Civil (CE)</option>
                        <option value="Data Science & AI">DS & AI</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="login-input-group">
                <label htmlFor="authEmail">Email or Roll Number</label>
                <input
                  ref={mode === 'login' ? primaryInputRef : null}
                  id="authEmail"
                  type="text"
                  placeholder={mode === 'login' ? 'Enter your email or roll number' : 'e.g. 210050012@iitb.ac.in'}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'input-error' : ''}
                  autoComplete="username"
                  disabled={isSubmitting}
                />
                {errors.email && <span className="login-field-error">{errors.email}</span>}
              </div>

              <div className="login-input-group">
                <div className="login-label-row">
                  <label htmlFor="authPassword">Password</label>
                  <button
                    type="button"
                    className="login-toggle-pwd"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  id="authPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={errors.password ? 'input-error' : ''}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  disabled={isSubmitting}
                />
                {errors.password && <span className="login-field-error">{errors.password}</span>}
              </div>

              {mode === 'register' && (
                <div className="login-input-group">
                  <label htmlFor="authConfirmPassword">Confirm Password</label>
                  <input
                    id="authConfirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={errors.confirmPassword ? 'input-error' : ''}
                    autoComplete="new-password"
                    disabled={isSubmitting}
                  />
                  {errors.confirmPassword && (
                    <span className="login-field-error">{errors.confirmPassword}</span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="login-action-buttons">
                <button
                  type="submit"
                  className="login-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? (mode === 'login' ? 'Verifying...' : 'Creating Account...')
                    : (mode === 'login' ? 'Sign In to Portal' : 'Create Account')}
                </button>

                <button
                  type="button"
                  className="login-btn-secondary"
                  onClick={() => navigate('/')}
                >
                  ← Back to Portal
                </button>
              </div>
            </form>

            <div className="login-bottom-note">
              Indian Institute of Technology Bombay • Training &amp; Placement Cell
            </div>
          </div>

          {/* Atmospheric Dusk Sunset Horizon Glow at the bottom of the card */}
          <div className="login-sunset-horizon-glow" />
        </div>
      </main>
    </div>
  );
}
