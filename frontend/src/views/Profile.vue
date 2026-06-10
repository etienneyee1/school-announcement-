<template>
  <main class="page-content">
    <div class="profile-wrap">
      <div class="profile-hero">
        <div class="avatar lg">{{ store.currentUser.initials }}</div>
        <div class="profile-hero-info">
          <h2>{{ store.currentUser.name }}</h2>
          <p>{{ store.currentUser.email }}</p>
          <div class="profile-badge">🏫 {{ store.currentUser.role.charAt(0).toUpperCase() + store.currentUser.role.slice(1) }}</div>
        </div>
      </div>
      <div class="card" style="margin-bottom:16px">
        <div class="card-header"><div class="card-title">Personal Information</div></div>
        <div class="card-body">
          <div class="form-row">
            <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" :value="store.currentUser.name" /></div>
            <div class="form-group"><label class="form-label">Email</label><input class="form-input" :value="store.currentUser.email" type="email" /></div>
            <div class="form-group"><label class="form-label">Role</label><input class="form-input" :value="store.currentUser.role" disabled style="opacity:0.6" /></div>
            <div class="form-group"><label class="form-label">School</label><input class="form-input" value="EduBright Academy, Kigali" /></div>
          </div>
          <div class="form-actions"><button class="btn-primary" @click="saveProfile">Save Changes</button></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Security</div></div>
        <div class="card-body">
          <div class="form-row">
            <div class="form-group"><label class="form-label">Current Password</label><input class="form-input" type="password" placeholder="••••••••" /></div>
            <div class="form-group"><label class="form-label">New Password</label><input class="form-input" type="password" placeholder="••••••••" /></div>
          </div>
          <div class="form-actions"><button class="btn-ghost" @click="changePassword">Change Password</button></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { store, toast } from '../store'

function saveProfile() {
  toast('Profile updated!', 'success')
}

function changePassword() {
  toast('Password updated!', 'success')
}
</script>
