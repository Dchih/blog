<script setup lang="ts">
import { onMounted, ref } from "vue";
// import MDPreview from "@/components/mdPreview/index.vue";
import { html } from "../../assets/md/technics/document.md";
const files = import.meta.glob("@/assets/md/**/*.md");
const markdownHTML = ref([]);

const regExp = /^<h1>(.+)<\/h1>/;

const currentHTML = ref("");

const switchArticle = (index) => {
  currentHTML.value = markdownHTML.value[index].html;
};

onMounted(async () => {
  for (const path in files) {
    const module = await files[path]();
    const html = module.html;
    const header = html.match(regExp);

    markdownHTML.value.push({
      title: header ? header[1] : "",
      html,
    });
  }
  if (markdownHTML.value.length > 0) {
    currentHTML.value = markdownHTML.value[0].html;
  }
});
</script>

<template>
  <div class="header">以后会在这里加些动效</div>
  <div class="wrap">
    <div class="content shadow">
      <div v-html="currentHTML" v-highlight></div>
    </div>
    <div class="menu">
      <ul>
        <li
          v-for="(markdown, index) in markdownHTML"
          :title="markdown.title"
          @click="switchArticle(index)"
        >
          {{ index + 1 }}，{{ markdown.title }}
        </li>
      </ul>
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
