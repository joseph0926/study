import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Entry } from './app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Entry />
  </StrictMode>,
);
