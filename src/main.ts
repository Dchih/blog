import "@/assets/common.css";
import "@/assets/animations.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "virtual:uno.css";
import "unocss";

import hljs from "highlight.js"; // 高亮
import "highlight.js/styles/atom-one-dark.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

// vue3
app.directive("highlight", function (el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach((block: HTMLElement) => {
    hljs.highlightBlock(block);
  });
});
