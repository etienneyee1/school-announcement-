<template>
  <div class="auth-screen">
    <div class="auth-left">
      <div class="auth-logo">EduAnnounce</div>
      <p class="auth-tagline">The central hub for all school communications — fast, clear, and reliable.</p>
      <div class="auth-feature">
        <div class="auth-feature-item"><div class="auth-feature-dot"></div>Real-time announcements for students, teachers & parents</div>
        <div class="auth-feature-item"><div class="auth-feature-dot"></div>Admin panel with full CRUD control</div>
        <div class="auth-feature-item"><div class="auth-feature-dot"></div>Urgent alerts, events, academic notices</div>
        <div class="auth-feature-item"><div class="auth-feature-dot"></div>Comments, notifications & more</div>
      </div>
    </div>
    <div class="auth-right">
      <div class="auth-card">
        <button class="auth-back" @click="$router.push('/')">← Back to Home</button>
        <div class="auth-title">Welcome back</div>
        <p class="auth-subtitle">Sign in to your EduAnnounce account</p>
        <div v-if="loginError" class="auth-error">{{ loginError }}</div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input class="form-input" type="email" v-model="loginEmail" placeholder="your@email.com" @keyup.enter="handleLogin" />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input class="form-input" type="password" v-model="loginPassword" placeholder="••••••••" @keyup.enter="handleLogin" />
        </div>
        <button class="auth-btn" @click="handleLogin">Sign In →</button>
        <div class="auth-demo">
          <div class="auth-demo-title">Demo Credentials</div>
          <div class="auth-demo-row"><span>Admin</span><span>admin@edubright.rw / admin123</span></div>
          <div class="auth-demo-row"><span>Teacher</span><span>jean@edubright.rw / teacher123</span></div>
          <div class="auth-demo-row"><span>Student</span><span>amina@edubright.rw / student123</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../store'

const router = useRouter()
const loginEmail = ref('')
const loginPassword = ref('')
const loginError = ref('')

function handleLogin() {
  loginError.value = ''
  const success = login(loginEmail.value, loginPassword.value)
  if (success) {
    router.push('/app/dashboard')
  } else {
    loginError.value = 'Invalid email or password. Try the demo credentials below.'
  }
}
</script>
