import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import './assets/main.css';
import './index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { ObserveVisibility } from 'vue-observe-visibility';

import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ToastPlugin);
app.directive('observe-visibility', ObserveVisibility);

app.mount('#app');
