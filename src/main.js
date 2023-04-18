import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far}  from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

import VueApexCharts from "vue3-apexcharts";

import vuetify from "@/plugins/vuetify";

import './assets/main.css'
import './assets/global.css'

const app = createApp(App)

library.add(fas, far, fab);

app.use(router);
app.use(store);
app.use(VueApexCharts);
app.use(vuetify);

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
