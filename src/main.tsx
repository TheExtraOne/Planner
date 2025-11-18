import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'src/index.css';
import App from 'src/App.tsx';
import { Provider } from 'react-redux';
import { setupStore } from 'src/stores/app.store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </StrictMode>,
);
