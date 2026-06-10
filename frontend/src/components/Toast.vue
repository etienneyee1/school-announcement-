<template>
  <div class="toast-wrap">
    <div v-for="t in store.toasts" :key="t.id" class="toast" :class="t.type">
      {{ t.msg }}
    </div>
  </div>
</template>

<script setup>
import { store } from '../store'
</script>
