<script setup lang="ts">
import { onMounted, ref } from "vue";


const currentHTML = ref("");

onMounted(async () => {
  
});
</script>

<template>
  <div class="header">以后会在这里加些动效</div>
  <div class="wrap">
    <div class="content shadow">
      <div v-html="currentHTML"></div>
    </div>
    <div class="menu">
      
    </div>
  </div>
</template>

<style scoped>
.header {
  height: 64px;
  box-shadow: 0px 15px 15px -3px rgba(0, 0, 0, 0.1);
}
.wrap {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 20px;
}
.wrap .content {
  width: 70rem;
}
.wrap .menu {
  width: 20rem;
  border: 1px solid #efefef;
  height: 60vh;
  overflow-y: auto;
}
.shadow {
  box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 60px;
}
ul,
li {
  text-decoration: none;
  list-style: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
