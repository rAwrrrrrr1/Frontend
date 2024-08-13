//import createApp from Vue
import { createApp } from 'vue';

//import component App
import App from './App.vue';

//import config router
import router from './';

import 'chart.js/auto';

import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
// import Toast from 'vue-toastification';
// import 'vue-toastification/dist/index.css';
//create App Vue
const app = createApp(App);

//gunakan "router" di Vue dengan plugin "use"
app.use(router);

app.mount('#app');