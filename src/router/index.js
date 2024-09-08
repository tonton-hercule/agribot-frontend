import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        name: 'homepage',
        component: () => import("../App.vue"),
        meta: {
            title: `Accueil`
        },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // racourcir de `routes: routes`
})


export default router 
