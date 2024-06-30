<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="content">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.content {
  background-color: #fff;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
