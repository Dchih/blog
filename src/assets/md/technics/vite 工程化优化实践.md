# vite 工程化优化实践

## 1，首页资源加载

### ① vite 解析

问：“Vite 解析 `<script type="module" src="...">` ，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的 `<script type="module">` 和引用 CSS 的 `<link href>` 也能利用 Vite 特有的功能被解析”，vite如何解析？特有的功能是指什么？

答：

> 源码中的绝对 URL 路径将以项目的 “根” 作为基础来解析 