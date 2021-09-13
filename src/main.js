import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import validation from './includes/validation'
import { supabase } from './includes/supabase'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css"

let app;

const user = supabase.auth.session();

if (!user) {
    if (!app) {
        app = createApp(App);
        app.use(store);
        app.use(router);
        app.use(validation);
        app.mount('#app');
    }
}

supabase.auth.onAuthStateChange(() => {
    if (!app) {
        app = createApp(App);
        app.use(store);
        app.use(router);
        app.use(validation);
        app.mount('#app');
    }
})

// app = createApp(App);
// app.use(store);
// app.use(router);
// app.use(validation);
// app.mount('#app');
