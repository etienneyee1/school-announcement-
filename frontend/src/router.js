import { createRouter, createWebHistory } from 'vue-router'
import { store } from './store'

import Landing from './views/Landing.vue'
import Auth from './views/Auth.vue'
import MainLayout from './views/MainLayout.vue'
import Dashboard from './views/Dashboard.vue'
import Announcements from './views/Announcements.vue'
import AnnouncementDetail from './views/AnnouncementDetail.vue'
import Admin from './views/Admin.vue'
import Profile from './views/Profile.vue'
import Settings from './views/Settings.vue'

const routes = [
  { path: '/', component: Landing, name: 'Landing' },
  { path: '/auth', component: Auth, name: 'Auth' },
  {
    path: '/app',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/app/dashboard' },
      { path: 'dashboard', component: Dashboard, name: 'Dashboard' },
      { path: 'announcements', component: Announcements, name: 'Announcements' },
      { path: 'announcements/:id', component: AnnouncementDetail, name: 'AnnouncementDetail' },
      { path: 'admin', component: Admin, name: 'Admin', meta: { requiresAdmin: true } },
      { path: 'profile', component: Profile, name: 'Profile' },
      { path: 'settings', component: Settings, name: 'Settings' }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.currentUser) {
    next({ name: 'Auth' })
  } else if (to.meta.requiresAdmin && store.currentUser?.role !== 'admin') {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
