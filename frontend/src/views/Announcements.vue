<template>
  <main class="page-content">
    <div class="page-header">
      <div>
        <div class="page-header-title">Announcements</div>
        <div class="page-header-sub">{{ filteredAnn.length }} notices found</div>
      </div>
    </div>
    <div class="filter-bar">
      <button class="filter-btn" :class="{active: filterType==='all'}" @click="filterType='all'">All</button>
      <button class="filter-btn" :class="{active: filterType==='urgent'}" @click="filterType='urgent'">⚡ Urgent</button>
      <button class="filter-btn" :class="{active: filterType==='academic'}" @click="filterType='academic'">📚 Academic</button>
      <button class="filter-btn" :class="{active: filterType==='event'}" @click="filterType='event'">📅 Events</button>
      <button class="filter-btn" :class="{active: filterType==='holiday'}" @click="filterType='holiday'">🎉 Holidays</button>
      <button class="filter-btn" :class="{active: filterType==='general'}" @click="filterType='general'">📢 General</button>
    </div>
    <div v-if="filteredAnn.length === 0" class="empty-state">
      <div class="empty-icon">📭</div>
      <div class="empty-text">No announcements found</div>
      <div class="empty-sub">Try changing your filters or search term.</div>
    </div>
    <div class="ann-grid">
      <div v-for="ann in filteredAnn" :key="ann.id" class="ann-card" @click="viewAnn(ann)">
        <div class="ann-card-top" :class="ann.type"></div>
        <div class="ann-card-body">
          <div class="ann-card-tags">
            <span class="ann-type-badge" :class="typeBadgeClass(ann.type)">{{ typeLabel(ann.type) }}</span>
            <span v-if="ann.pinned" class="pinned-badge">📌 Pinned</span>
          </div>
          <div class="ann-card-title">{{ ann.title }}</div>
          <div class="ann-card-excerpt">{{ ann.excerpt }}</div>
          <div class="ann-card-footer">
            <div class="ann-card-author">
              <div class="mini-avatar">{{ ann.authorInitials }}</div>
              {{ ann.author }}
            </div>
            <span>{{ fmtDate(ann.date) }} · {{ ann.views }} views</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { typeBadgeClass, typeLabel, fmtDate } from '../utils'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const filterType = ref('all')

const filteredAnn = computed(() => {
  let list = store.announcements
  if (filterType.value !== 'all') {
    list = list.filter(a => a.type === filterType.value)
  }
  if (props.searchQuery) {
    const q = props.searchQuery.toLowerCase()
    list = list.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
  }
  return list
})

function viewAnn(ann) {
  router.push('/app/announcements/' + ann.id)
}
</script>
