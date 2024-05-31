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
                path: '/badminton',
                name: 'badminton',
                component: () => import('../src/views/Badminton.vue')
              },
              {
                path: '/futsal',
                name: 'futsal',
                component: () => import('../src/views/Futsal.vue')
              },
              {
                path: '/minisoccer',
                name: 'minisoccer',
                component: () => import('../src/views/MiniSoccer.vue')
              }
              
        ],
    },
    
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router