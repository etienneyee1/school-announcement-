<template>
  <header class="topbar">
    <div class="topbar-title">
      {{ title }}
    </div>
    <div class="topbar-search">
      <span class="search-icon">🔍</span>
      <input type="text" v-model="searchQuery" placeholder="Search announcements..." @input="emitSearch" />
    </div>
    <div class="topbar-notif">🔔<span class="notif-dot"></span></div>
    <button v-if="isAdmin" class="topbar-action" @click="$emit('open-new-ann')">+ New Announcement</button>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { isAdmin } from '../store'

const route = useRoute()
const emit = defineEmits(['open-new-ann', 'search'])
const searchQuery = ref('')

const title = computed(() => {
  switch (route.name) {
    case 'Dashboard': return 'Dashboard'
    case 'Announcements': return 'Announcements'
    case 'AnnouncementDetail': return 'Announcement Detail'
    case 'Admin': return 'Admin Panel'
    case 'Profile': return 'My Profile'
    case 'Settings': return 'Settings'
    default: return 'EduAnnounce'
  }
})

function emitSearch() {
  emit('search', searchQuery.value)
}
</script>
