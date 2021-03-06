import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import VistaInicioSesion from '@/views/VistaInicioSesion.vue'
import VistaRegistro from '@/views/VistaRegistro.vue'
import VistaPaginaPrincipal from '@/views/VistaPaginaPrincipal.vue'
import VistaAmigos from '@/views/VistaAmigos.vue'
import VistaContacto from '@/views/VistaContacto.vue'
import VistaGrupos from '@/views/VistaGrupos.vue'
import VistaGrupo from '@/views/VistaGrupo.vue'
import VistaMensajes from '@/views/VistaMensajes.vue'
import VistaPerfilUsuario from '@/views/VistaPerfilUsuario.vue'
import VistaSuscripcion from '@/views/VistaSuscripcion.vue'
import VistaPost from '@/views/VistaPost.vue'
import VistaUsuario from '@/views/VistaUsuario.vue'
import VistaAdminLogin from '@/views/VistaAdminLogin.vue'
import VistaSoporte from '@/views/VistaSoporte.vue'
import VistaListaUsuario from '@/views/VistaListaUsuario.vue'
import VistaNuevoUsuario from '@/views/VistaNuevoUsuario.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'AstraVita'
        }
    },
    {
        path: '/login',
        name: 'InicioSesion',
        component: VistaInicioSesion,
        meta: {
            title: 'Inicio Sesión - AstraVita'
        }
    },
    {
        path: '/registro',
        name: 'Registro',
        component: VistaRegistro,
        meta: {
            title: 'Registro - AstraVita'
        }
    },
    {
        path: '/inicio',
        name: 'Inicio',
        component: VistaPaginaPrincipal,
        meta: {
            title: 'Inicio - AstraVita'
        }
    },
    {
        path: '/inicio/:status',
        name: 'InicioSuscrito',
        component: VistaPaginaPrincipal,
        meta: {
            title: 'Inicio - AstraVita'
        }
    },
    {
        path: '/amigos',
        name: 'MisAmigos',
        component: VistaAmigos,
        meta: {
            title: 'Mis Amigos - AstraVita'
        }
    },
    {
        path: '/contacto',
        name: 'Contacto',
        component: VistaContacto,
        meta: {
            title: 'Contacto - AstraVita'
        }
    },
    {
        path: '/grupo/publicacion/:id',
        name: 'Publicacion',
        component: VistaPost,
    },
    {
        path: '/grupo/:id',
        name: 'Grupo',
        component: VistaGrupo,
    },
    {
        path: '/grupos',
        name: 'Grupos',
        component: VistaGrupos,
        meta: {
            title: 'Grupos - AstraVita'
        }
    },
    {
        path: '/mensajes',
        name: 'Mensajes',
        component: VistaMensajes,
        meta: {
            title: 'Mensajes - AstraVita'
        }
    },
    {
        path: '/miPerfil',
        name: 'PerfilUsuario',
        component: VistaPerfilUsuario,
        meta: {
            title: 'Mi Perfil - AstraVita'
        }
    },
    {
        path: '/miPerfil/:id',
        name: 'PerfilUsuarioInicio',
        component: VistaPerfilUsuario,
        meta: {
            title: 'Mi Perfil - AstraVita'
        }
    },
    {
        path: '/suscribite',
        name: 'Suscripcion',
        component: VistaSuscripcion,
        meta: {
            title: 'Suscribete - AstraVita'
        }
    },
    {
        path: '/perfil/:idUsuario',
        name: 'Perfil',
        component: VistaUsuario,
    },
    {
        path: '/adminlogin',
        name: 'AdminIniciarSesion',
        component: VistaAdminLogin,
        meta: {
            title: 'Panel Administrador Astravita',
        }
    },
    {
        path: '/adminSoporte',
        name: 'Soporte',
        component: VistaSoporte,
        meta: {
            title: 'Panel Administrador Astravita',
        }
    },
    {
        path: '/adminUsuarios',
        name: 'ListaUsuarios',
        component: VistaListaUsuario,
        meta: {
            title: 'Panel Administrador Astravita',
        }
    }, 
    {
        path: '/adminNuevoUsuario',
        name: 'NuevoUsuario',
        component: VistaNuevoUsuario,
        meta: {
            title: 'Panel Administrador Astravita',
        }
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

// ...

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
    // `/nested`'s will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title;
    } else if (previousNearestWithMeta) {
        document.title = previousNearestWithMeta.meta.title;
    }

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
    })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));

    next();
});

// ...

export default router
