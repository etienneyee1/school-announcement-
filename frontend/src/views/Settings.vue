<template>
  <main class="page-content">
    <div class="settings-layout">
      <div class="card settings-nav" style="padding:12px;height:fit-content">
        <button class="nav-item" :class="{active: settingsTab==='notifications'}" @click="settingsTab='notifications'">🔔 Notifications</button>
        <button class="nav-item" :class="{active: settingsTab==='display'}" @click="settingsTab='display'">🖥 Display</button>
        <button class="nav-item" :class="{active: settingsTab==='privacy'}" @click="settingsTab='privacy'">🔒 Privacy</button>
        <button class="nav-item" :class="{active: settingsTab==='language'}" @click="settingsTab='language'">🌐 Language</button>
      </div>
      <div>
        <div v-if="settingsTab==='notifications'" class="card">
          <div class="card-header"><div class="card-title">Notification Preferences</div></div>
          <div class="card-body">
            <div class="toggle-row"><div class="toggle-info"><div class="toggle-label">Email Notifications</div><div class="toggle-desc">Receive new announcements via email</div></div><label class="toggle"><input type="checkbox" v-model="store.settings.notifEmail"><span class="toggle-slider"></span></label></div>
            <div class="toggle-row"><div class="toggle-info"><div class="toggle-label">SMS Alerts</div><div class="toggle-desc">Get urgent notices via SMS</div></div><label class="toggle"><input type="checkbox" v-model="store.settings.notifSMS"><span class="toggle-slider"></span></label></div>
            <div class="toggle-row"><div class="toggle-info"><div class="toggle-label">Push Notifications</div><div class="toggle-desc">Browser push alerts for new posts</div></div><label class="toggle"><input type="checkbox" v-model="store.settings.notifPush"><span class="toggle-slider"></span></label></div>
          </div>
        </div>
        <div v-if="settingsTab==='display'" class="card">
          <div class="card-header"><div class="card-title">Display Settings</div></div>
          <div class="card-body">
            <div class="toggle-row"><div class="toggle-info"><div class="toggle-label">Compact View</div><div class="toggle-desc">Show more announcements per page</div></div><label class="toggle"><input type="checkbox" v-model="store.settings.compactView"><span class="toggle-slider"></span></label></div>
            <div class="toggle-row"><div class="toggle-info"><div class="toggle-label">Auto-mark as Read</div><div class="toggle-desc">Mark announcements as read on open</div></div><label class="toggle"><input type="checkbox" v-model="store.settings.autoRead"><span class="toggle-slider"></span></label></div>
          </div>
        </div>
        <div v-if="settingsTab==='privacy'" class="card">
          <div class="card-header"><div class="card-title">Privacy Settings</div></div>
          <div class="card-body">
            <div class="toggle-row"><div class="toggle-info"><div class="toggle-label">Show Author Name</div><div class="toggle-desc">Display your name on comments</div></div><label class="toggle"><input type="checkbox" v-model="store.settings.showAuthor"><span class="toggle-slider"></span></label></div>
            <div class="toggle-row"><div class="toggle-info"><div class="toggle-label">Allow Comments</div><div class="toggle-desc">Let others reply to your posts</div></div><label class="toggle"><input type="checkbox" v-model="store.settings.allowComments"><span class="toggle-slider"></span></label></div>
          </div>
        </div>
        <div v-if="settingsTab==='language'" class="card">
          <div class="card-header"><div class="card-title">Language & Region</div></div>
          <div class="card-body">
            <div class="form-group"><label class="form-label">Language</label><select class="form-input form-select"><option>English</option><option>Kinyarwanda</option><option>Français</option><option>Kiswahili</option></select></div>
            <div class="form-group"><label class="form-label">Time Zone</label><select class="form-input form-select"><option>Africa/Kigali (CAT, UTC+2)</option><option>UTC</option><option>Europe/London</option></select></div>
            <div class="form-group"><label class="form-label">Date Format</label><select class="form-input form-select"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></div>
            <div class="form-actions"><button class="btn-primary" @click="saveSettings">Save Preferences</button></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { store, toast } from '../store'

const settingsTab = ref('notifications')

function saveSettings() {
  toast('Settings saved!', 'success')
}
</script>
