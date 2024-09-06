import "@/assets/common.css";
import "@/assets/animations.css";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { Button, Search, DatePicker, Dialog } from 'vant'
import 'vant/lib/index.css'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "virtual:uno.css";

const app = createApp(App);

app.use(Button)
app.use(Search)
app.use(DatePicker)
app.use(Dialog)
app.use(ElementPlus)
app.use(createPinia());
app.use(router);

app.mount("#app");
