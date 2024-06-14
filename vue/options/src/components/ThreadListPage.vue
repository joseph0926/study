<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>
      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <RouterLink :to="'/thread/' + thread.id">{{
              thread.title
            }}</RouterLink>
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{ getUser(thread).username }}</a
            >, {{ thread.publishedAt }}
          </p>
        </div>
        <div class="activity">
          <p class="replies-count">{{ thread.posts.length }}</p>
          <img
            class="avatar-medium"
            :src="getUser(thread).avatar"
            :alt="getUser(thread).username"
          />
          <div>
            <p class="text-xsmall">
              <a href="#">{{ getUser(thread).username }}</a>
            </p>
            <p class="text-xsmall text-faded">{{ thread.publishedAt }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DUMMY_DATA from '@/data.json';

export default {
  data() {
    return {
      threads: DUMMY_DATA.threads,
      users: DUMMY_DATA.users
    };
  },
  methods: {
    getUser(thread) {
      return this.users.find((user) => user.id === thread.userId);
    }
  }
};
</script>

<style scoped>
.thread-list {
  padding: 0;
  background-color: white;
}

.thread-list .thread {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0 5px 20px;
  min-height: 45px;
}

.thread-list .thread:nth-child(odd) {
  background: rgba(73, 89, 96, 0.06);
  border-bottom-left-radius: 20px;
}

.thread-list .thread:last-child {
  border-bottom-left-radius: 0;
}

.thread-list .thread .replies-count {
  flex-basis: 35%;
}

.thread-list .thread .activity {
  flex-basis: 35%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.thread-list .thread .activity .avatar-medium {
  margin-right: 10px;
}
</style>
