/**
 * Application DOM Entry Point
 * 
 * Contributor: Alankrit Narang (narangalankrit123@gmail.com)
 * 
 * Initializes React StrictMode, mounts root App component, and loads design tokens.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
