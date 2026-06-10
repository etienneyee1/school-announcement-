<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-box">
      <div class="modal-header">
        <div class="modal-title">{{ editingAnn ? 'Edit Announcement' : 'New Announcement' }}</div>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Title *</label>
          <input class="form-input" v-model="newAnn.title" placeholder="Announcement title..." />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Type</label>
            <select class="form-input form-select" v-model="newAnn.type">
              <option value="general">General</option>
              <option value="academic">Academic</option>
              <option value="event">Event</option>
              <option value="urgent">Urgent</option>
              <option value="holiday">Holiday</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select class="form-input form-select" v-model="newAnn.status">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Short Description *</label>
          <textarea class="form-textarea" v-model="newAnn.excerpt" placeholder="Brief summary..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Full Content</label>
          <textarea class="form-textarea" style="min-height:140px" v-model="newAnn.body" placeholder="Full announcement content..."></textarea>
        </div>
        <div class="form-group" style="display:flex;align-items:center;gap:10px">
          <input type="checkbox" id="pinned" v-model="newAnn.pinned" style="width:16px;height:16px;cursor:pointer" />
          <label for="pinned" class="form-label" style="margin:0;cursor:pointer">Pin this announcement to top</label>
        </div>
        <div class="form-actions">
          <button class="btn-ghost" @click="$emit('close')">Cancel</button>
          <button class="btn-primary" @click="handleSave">{{ editingAnn ? 'Update' : 'Publish' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { saveAnnouncement } from '../store'

const props = defineProps({
  editingAnn: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const newAnn = ref({ title: '', type: 'general', excerpt: '', body: '', pinned: false, status: 'published' })

watch(() => props.editingAnn, (val) => {
  if (val) {
    newAnn.value = { ...val }
  } else {
    newAnn.value = { title: '', type: 'general', excerpt: '', body: '', pinned: false, status: 'published' }
  }
}, { immediate: true })

function handleSave() {
  if (!newAnn.value.title || !newAnn.value.excerpt) return;
  saveAnnouncement(newAnn.value, !!props.editingAnn)
  emit('close')
}
</script>
