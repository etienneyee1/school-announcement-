<template>
  <div class="app-layout">
    <Sidebar />
    <div class="main-wrap">
      <Topbar @open-new-ann="openNewAnn" @search="handleSearch" />
      <router-view :search-query="searchQuery" @open-new-ann="openNewAnn" />
    </div>
    
    <AnnouncementModal v-if="showNewAnnModal" :editing-ann="editingAnn" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'
import AnnouncementModal from '../components/AnnouncementModal.vue'

const showNewAnnModal = ref(false)
const editingAnn = ref(null)
const searchQuery = ref('')

function openNewAnn(ann = null) {
  editingAnn.value = ann
  showNewAnnModal.value = true
}

function closeModal() {
  showNewAnnModal.value = false
  editingAnn.value = null
}

function handleSearch(query) {
  searchQuery.value = query
}
</script>
