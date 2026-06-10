<template>
  <main class="page-content">
    <div class="stats-grid">
      <div class="stat-card blue">
        <div class="stat-label">Total Announcements</div>
        <div class="stat-value">{{ store.announcements.length }}</div>
        <div class="stat-sub">All time</div>
        <span class="stat-icon">📢</span>
      </div>
      <div class="stat-card gold">
        <div class="stat-label">Published</div>
        <div class="stat-value">{{ publishedCount }}</div>
        <div class="stat-sub">Active notices</div>
        <span class="stat-icon">✅</span>
      </div>
      <div class="stat-card green">
        <div class="stat-label">Total Views</div>
        <div class="stat-value">{{ totalViews.toLocaleString() }}</div>
        <div class="stat-sub">Across all posts</div>
        <span class="stat-icon">👁</span>
      </div>
      <div class="stat-card red">
        <div class="stat-label">Urgent Notices</div>
        <div class="stat-value">{{ urgentCount }}</div>
        <div class="stat-sub">Require attention</div>
        <span class="stat-icon">⚡</span>
      </div>
    </div>
    <div class="dashboard-grid">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Recent Announcements</div>
          <router-link to="/app/announcements" class="card-action">View All →</router-link>
        </div>
        <div class="card-body">
          <div v-for="ann in recentAnnouncements" :key="ann.id" class="ann-item" @click="viewAnn(ann)">
            <span class="ann-type-badge" :class="typeBadgeClass(ann.type)">{{ ann.type }}</span>
            <div class="ann-content">
              <div class="ann-title">{{ ann.title }}</div>
              <div class="ann-meta">{{ ann.author }} · {{ fmtDate(ann.date) }} · {{ ann.views }} views</div>
            </div>
            <div v-if="ann.pinned" class="ann-unread"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="card" style="margin-bottom:16px">
          <div class="card-header"><div class="card-title">Quick Stats</div></div>
          <div class="card-body">
            <div class="quick-item"><span class="quick-label">Academic</span><span class="quick-val">{{ countByType('academic') }}</span></div>
            <div class="quick-item"><span class="quick-label">Events</span><span class="quick-val">{{ countByType('event') }}</span></div>
            <div class="quick-item"><span class="quick-label">Holidays</span><span class="quick-val">{{ countByType('holiday') }}</span></div>
            <div class="quick-item"><span class="quick-label">General</span><span class="quick-val">{{ countByType('general') }}</span></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Recent Activity</div></div>
          <div class="card-body">
            <div class="activity-item"><div class="activity-dot"></div><div><div>New urgent notice posted</div><div class="activity-time">2 hours ago</div></div></div>
            <div class="activity-item"><div class="activity-dot"></div><div><div>Exam timetable updated</div><div class="activity-time">1 day ago</div></div></div>
            <div class="activity-item"><div class="activity-dot"></div><div><div>Cultural Day reminder sent</div><div class="activity-time">3 days ago</div></div></div>
            <div class="activity-item"><div class="activity-dot"></div><div><div>Library hours extended</div><div class="activity-time">4 days ago</div></div></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { typeBadgeClass, fmtDate } from '../utils'

const router = useRouter()

const publishedCount = computed(() => store.announcements.filter(a => a.status === 'published').length)
const totalViews = computed(() => store.announcements.reduce((s, a) => s + a.views, 0))
const urgentCount = computed(() => store.announcements.filter(a => a.type === 'urgent').length)
const recentAnnouncements = computed(() => store.announcements.slice(0, 5))

function countByType(type) {
  return store.announcements.filter(a => a.type === type).length
}

function viewAnn(ann) {
  router.push('/app/announcements/' + ann.id)
}
</script>
