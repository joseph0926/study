<template>
  <h1>Welcome to the Forum</h1>
  <ThreadListPage />
</template>

<script>
import ThreadListPage from '@/components/ThreadListPage.vue';

export default {
  name: 'Home',
  components: {
    ThreadListPage
  }
};
</script>

<style></style>
