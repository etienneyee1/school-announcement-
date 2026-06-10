<template>
  <main class="page-content">
    <div class="admin-tabs">
      <button class="admin-tab" :class="{active: adminTab==='announcements'}" @click="adminTab='announcements'">📢 Announcements</button>
      <button class="admin-tab" :class="{active: adminTab==='users'}" @click="adminTab='users'">👥 Users</button>
      <button class="admin-tab" :class="{active: adminTab==='analytics'}" @click="adminTab='analytics'">📊 Analytics</button>
    </div>
    <div v-if="adminTab==='announcements'" class="card">
      <div style="overflow-x:auto">
        <table class="admin-table">
          <thead><tr><th>Title</th><th>Type</th><th>Author</th><th>Date</th><th>Views</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr v-for="ann in store.announcements" :key="ann.id">
              <td style="max-width:240px;font-weight:500;color:var(--navy)">{{ ann.title }}</td>
              <td><span class="ann-type-badge" :class="typeBadgeClass(ann.type)">{{ ann.type }}</span></td>
              <td>{{ ann.author }}</td>
              <td>{{ fmtDate(ann.date) }}</td>
              <td>{{ ann.views }}</td>
              <td><span class="status-pill" :class="'status-'+ann.status">{{ ann.status }}</span></td>
              <td>
                <button class="table-action edit" @click="$emit('open-new-ann', ann)">Edit</button>
                <button class="table-action delete" @click="handleDelete(ann.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="adminTab==='users'" class="card">
      <div style="overflow-x:auto">
        <table class="admin-table">
          <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr v-for="user in store.users" :key="user.id">
              <td>
                <div style="display:flex;align-items:center;gap:10px">
                  <div class="mini-avatar" style="width:30px;height:30px;font-size:10px">{{ user.initials }}</div>
                  <span style="font-weight:500;color:var(--navy)">{{ user.name }}</span>
                </div>
              </td>
              <td>{{ user.email }}</td>
              <td><span class="ann-type-badge" :class="user.role==='admin'?'badge-urgent':user.role==='teacher'?'badge-event':'badge-academic'">{{ user.role }}</span></td>
              <td><span class="status-pill" :class="'status-'+user.status">{{ user.status }}</span></td>
              <td>
                <button class="table-action edit">Edit</button>
                <button class="table-action delete" v-if="user.id!==store.currentUser.id">Deactivate</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="adminTab==='analytics'">
      <div class="stats-grid">
        <div class="stat-card blue"><div class="stat-label">Total Views</div><div class="stat-value">{{ totalViews.toLocaleString() }}</div><div class="stat-sub">All announcements</div></div>
        <div class="stat-card gold"><div class="stat-label">Avg. Views / Post</div><div class="stat-value">{{ Math.round(totalViews/store.announcements.length) || 0 }}</div><div class="stat-sub">Engagement rate</div></div>
        <div class="stat-card green"><div class="stat-label">Total Comments</div><div class="stat-value">{{ store.announcements.reduce((s,a)=>s+a.comments.length,0) }}</div><div class="stat-sub">Community interaction</div></div>
        <div class="stat-card red"><div class="stat-label">Pinned Notices</div><div class="stat-value">{{ store.announcements.filter(a=>a.pinned).length }}</div><div class="stat-sub">High priority</div></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Announcement Performance</div></div>
        <div class="card-body">
          <div v-for="ann in [...store.announcements].sort((a,b)=>b.views-a.views)" :key="ann.id" style="display:flex;align-items:center;gap:16px;padding:10px 0;border-bottom:1px solid var(--border)">
            <span class="ann-type-badge" :class="typeBadgeClass(ann.type)" style="flex-shrink:0">{{ ann.type }}</span>
            <div style="flex:1;min-width:0;font-size:13px;font-weight:500;color:var(--navy);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ ann.title }}</div>
            <div style="width:200px;background:var(--cream-dark);border-radius:20px;height:8px;overflow:hidden">
              <div :style="'width:'+Math.round(ann.views/1240*100)+'%;height:100%;background:var(--gold);border-radius:20px'"></div>
            </div>
            <span style="font-size:13px;color:var(--text-muted);min-width:60px;text-align:right">{{ ann.views }} views</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store, deleteAnnouncement } from '../store'
import { typeBadgeClass, fmtDate } from '../utils'

const adminTab = ref('announcements')

const totalViews = computed(() => store.announcements.reduce((s, a) => s + a.views, 0))

function handleDelete(id) {
  deleteAnnouncement(id)
}
</script>
