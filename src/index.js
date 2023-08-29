import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n
  .use(initReactI18next) // react-i18next'i kullanımı etkinleştir
  .init({
    resources: {
      en: {
        translation: require('./enTranslation.json')
      },
      tr: {
        translation: require('./trTranslation.json')
      },
      // Diğer diller...
    },
    lng: 'tr', // Varsayılan dil
    fallbackLng: 'tr', // Varsayılan dil yedeği
    interpolation: {
      escapeValue: false // HTML veya diğer özelleştirilmiş içerikler için kaçış işlemini devre dışı bırak
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
