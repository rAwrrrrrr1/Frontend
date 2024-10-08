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
        component: () => import('../src/components/Home.vue'),

        children:[
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
            {
                path: '/system',
                name: 'system',
                component: () => import('../src/views/System.vue')
            },
            {
                path: '/badminton',
                name: 'badminton',
                component: () => import('../src/views/Badminton/Badminton.vue')
            },
            {
                path: '/futsal',
                name: 'futsal',
                component: () => import('../src/views/Futsal/Futsal.vue')
            },
            {
                path: '/minisoccer',
                name: 'minisoccer',
                component: () => import('../src/views/MiniSoccer/MiniSoccer.vue')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../src/views/User.vue')
            },
            // Route untuk halaman EditBadminton
            {
                path: '/editbadminton/:id',
                name: 'EditBadminton',
                component: () => import('../src/views/Badminton/EditBadminton.vue')
            },
            {
                path: '/editfutsal/:id',
                name: 'EditFutsal',
                component: () => import('../src/views/Futsal/EditFutsal.vue')
            },
            {
                path: '/editMinisoccer/:id',
                name: 'EditMinisoccer',
                component: () => import('../src/views/MiniSoccer/EditMiniSoccer.vue')
            },
            // Route untuk halaman AddBadminton
            {
                path: '/addbadminton',
                name: 'AddBadminton',
                component: () => import('../src/views/Badminton/AddBadminton.vue')
            },
            {
                path: '/addfutsal',
                name: 'AddFutsal',
                component: () => import('../src/views/Futsal/AddFutsal.vue')
            },
            {
                path: '/addminisoccer',
                name: 'AddMiniSoccer',
                component: () => import('../src/views/MiniSoccer/AddMiniSoccer.vue')
            },
        ],
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
