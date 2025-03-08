import './styles/main.css';
import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import electronApi from './lib/electron.js';

import App from './App.vue';

const vueInstance = createApp(App);
vueInstance.use(VueQueryPlugin);
vueInstance.provide('electron', electronApi);
vueInstance.mount('#app');
