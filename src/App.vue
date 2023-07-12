<script setup lang="ts">
  
</script>

<template>
  <div class="flex justify-center pt-200px custom-height">
    <section class="text-lg">
      <p>你好，</p>
      <p>很高兴认识你。</p>
      <p>这里是一个写笔记，写故事的地方。</p>
      <p>或许，也会记一些无聊的事。</p>
    </section>
  </div>
  <footer class="h-430px w-full"></footer>
</template>

<style scoped>
footer {
  background-image: url("./assets/icons/waves.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0;
}
.custom-height {
  height: calc(100% - 430px);
  padding-bottom: 430px;
}
</style>
