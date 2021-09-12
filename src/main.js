import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import validation from './includes/validation'
import './includes/supabase'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css"


const app = createApp(App);
app.use(store);
app.use(router);
app.use(validation);
app.mount('#app');
