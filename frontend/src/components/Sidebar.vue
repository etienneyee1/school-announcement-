<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="logo-mark">EduAnnounce</div>
      <div class="logo-sub">EduBright Academy</div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section-label">Main</div>
      <router-link to="/app/dashboard" class="nav-item">
        <span class="nav-icon">⊞</span> Dashboard
      </router-link>
      <router-link to="/app/announcements" class="nav-item" :class="{ active: $route.name === 'AnnouncementDetail' }">
        <span class="nav-icon">📢</span> Announcements
        <span class="nav-badge">{{ unreadCount }}</span>
      </router-link>
      <router-link to="/app/profile" class="nav-item">
        <span class="nav-icon">👤</span> My Profile
      </router-link>
      
      <div v-if="isAdmin">
        <div class="nav-section-label">Administration</div>
        <router-link to="/app/admin" class="nav-item">
          <span class="nav-icon">🛡</span> Admin Panel
        </router-link>
      </div>
      
      <div class="nav-section-label">Account</div>
      <router-link to="/app/settings" class="nav-item">
        <span class="nav-icon">⚙</span> Settings
      </router-link>
      <button class="nav-item" @click="handleLogout" style="color:rgba(255,100,100,0.7)">
        <span class="nav-icon">↩</span> Sign Out
      </button>
    </nav>
    <div class="sidebar-profile" @click="$router.push('/app/profile')">
      <div class="profile-card">
        <div class="avatar">{{ store.currentUser.initials }}</div>
        <div class="profile-info">
          <div class="profile-name">{{ store.currentUser.name }}</div>
          <div class="profile-role">{{ store.currentUser.role.charAt(0).toUpperCase() + store.currentUser.role.slice(1) }}</div>
        </div>
        <div class="profile-arrow">›</div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store, isAdmin, logout } from '../store'

const router = useRouter()

const unreadCount = computed(() => {
  return store.announcements.filter(a => a.status === 'published').length
})

function handleLogout() {
  logout()
  router.push('/')
}
</script>
