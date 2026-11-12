const THEME_KEY = 'iitb_portal_theme';
const SHORTLIST_KEY = 'iitb_shortlisted_recruiters';

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

export function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'dark';
  } catch {
    return 'dark';
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Theme still works for the current page when storage is unavailable.
  }
}

export function getShortlist() {
  return readJson(SHORTLIST_KEY, []);
}

export function saveShortlist(companyIds) {
  try {
    localStorage.setItem(SHORTLIST_KEY, JSON.stringify(companyIds));
  } catch {
    // Shortlisting still works until the page is refreshed.
  }
}
