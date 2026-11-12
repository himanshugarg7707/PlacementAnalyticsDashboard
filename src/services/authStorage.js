const USERS_KEY = 'iitb_portal_registered_users';
const SESSION_KEY = 'iitb_auth_user';

export function getRegisteredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveRegisteredUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Keep browser storage in one place so every screen uses the same session.
export function getSavedUser() {
  try {
    const savedUser = localStorage.getItem(SESSION_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

export function saveUser(user) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    // The app can still be used when browser storage is unavailable.
  }
}

export function clearSavedUser() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // The app can still be used when browser storage is unavailable.
  }
}

