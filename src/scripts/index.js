import 'regenerator-runtime';
import '../styles/main.scss';
import App from './views/app';
import swRegister from './utils/sw-register';
import '../scripts/views/component/app-bar';
import '../scripts/views/component/hero-bar';
import '../scripts/views/component/footer-bar';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#hamburger-menu'),
  drawer: document.querySelector('.navbar-nav'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});