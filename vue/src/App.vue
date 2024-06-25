<script setup lang="ts">
import { RouterView } from 'vue-router'
import { supabase } from './lib/supabaseClient'
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
