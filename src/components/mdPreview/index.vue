<script setup lang="ts">
import MarkdownPreview from "vue-meditor";
import { defineProps } from "vue";
const props = defineProps<{
  value: string;
}>();
</script>
<template>
  <div class="markdown">
    <MarkdownPreview :initialValue="props.value"></MarkdownPreview>
  </div>
</template>
<style lang="scss">
.markdown {
}
</style>
