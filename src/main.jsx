import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Импортируем Provider
import store from './store.js'; // Импортируем store
import App from './App.jsx';
import './index.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => console.log('Service Worker Registered'))
    .catch((error) => console.error('Service Worker Registration Failed:', error));
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Подключаем хранилище через Provider */}
      <App />
    </Provider>
  </StrictMode>,
);

