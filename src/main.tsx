import '@radix-ui/themes/styles.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import GlobalLayout from './layout/GlobalLayout.tsx';
import { PeerProvider } from './context/PeerContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PeerProvider>
      <GlobalLayout />
    </PeerProvider>
  </React.StrictMode>,
);
