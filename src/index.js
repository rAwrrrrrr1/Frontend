//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../src/views/Login.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../src/views/Home.vue')
    },
    {
        path: '/jadwal',
        name: 'jadwal',
        component: () => import('../src/views/Jadwal.vue')
    },
    {
        path: '/transaksi',
        name: 'transaksi',
        component: () => import('../src/views/Transaksi.vue')
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router