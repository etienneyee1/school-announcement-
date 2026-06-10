<template>
  <main v-if="ann" class="page-content">
    <div class="detail-wrap">
      <router-link to="/app/announcements" class="detail-back">← Back to Announcements</router-link>
      <div class="detail-card">
        <div class="detail-banner" :class="ann.type"></div>
        <div class="detail-inner">
          <div class="detail-header-tags">
            <span class="ann-type-badge" :class="typeBadgeClass(ann.type)">{{ typeLabel(ann.type) }}</span>
            <span v-if="ann.pinned" class="pinned-badge">📌 Pinned</span>
          </div>
          <div class="detail-title">{{ ann.title }}</div>
          <div class="detail-meta-row">
            <div class="detail-meta-item">👤 {{ ann.author }}</div>
            <div class="detail-meta-item">🏷 {{ ann.role }}</div>
            <div class="detail-meta-item">📅 {{ fmtDate(ann.date) }}</div>
            <div class="detail-meta-item">👁 {{ ann.views }} views</div>
            <div class="detail-meta-item">💬 {{ ann.comments.length }} comments</div>
          </div>
          <div class="detail-body" v-html="ann.body || '<p>'+ann.excerpt+'</p>'"></div>
          <div class="detail-actions">
            <button class="btn-ghost">🔗 Share</button>
            <button class="btn-ghost">📥 Download PDF</button>
            <button v-if="isAdmin" class="btn-ghost" @click="$emit('open-new-ann', ann)">✏️ Edit</button>
            <button v-if="isAdmin" class="btn-danger" @click="handleDelete">🗑 Delete</button>
          </div>
          <div class="detail-comments">
            <div class="card-title" style="margin-bottom:16px">💬 Comments ({{ ann.comments.length }})</div>
            <div v-if="ann.comments.length===0" class="text-muted" style="padding:20px 0">No comments yet. Be the first to respond.</div>
            <div v-for="c in ann.comments" :key="c.id" class="comment-item">
              <div class="mini-avatar" style="width:32px;height:32px;font-size:11px;flex-shrink:0">{{ c.initials }}</div>
              <div class="comment-body">
                <div class="comment-author">{{ c.author }}</div>
                <div class="comment-text">{{ c.text }}</div>
                <div class="comment-time">{{ c.time }}</div>
              </div>
            </div>
            <div class="comment-input-wrap">
              <div class="mini-avatar" style="width:36px;height:36px;font-size:12px;flex-shrink:0;background:var(--navy);color:var(--gold)">{{ store.currentUser.initials }}</div>
              <input class="comment-input" v-model="newComment" placeholder="Add a comment..." @keyup.enter="postComment" />
              <button class="comment-send" @click="postComment">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store, isAdmin, deleteAnnouncement, addComment } from '../store'
import { typeBadgeClass, typeLabel, fmtDate } from '../utils'

const route = useRoute()
const router = useRouter()

const ann = computed(() => {
  return store.announcements.find(a => a.id === Number(route.params.id))
})

const newComment = ref('')

onMounted(() => {
  if (ann.value) {
    ann.value.views++
  }
})

function handleDelete() {
  if (ann.value) {
    deleteAnnouncement(ann.value.id)
    router.push('/app/announcements')
  }
}

function postComment() {
  if (newComment.value.trim() && ann.value) {
    addComment(ann.value.id, newComment.value)
    newComment.value = ''
  }
}
</script>
