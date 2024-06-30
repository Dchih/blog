# HTML,CSS,JS如何变成页面？

## 渲染流水线

### 构建DOM树

### 构建CSSOM树，计算样式

### 布局

### 分层

### 绘制

### 栅格化

### 合成

## 渲染相关概念及优化策略

### 重排

### 重绘

### 合成

### 优化策略

1. 使用 class 操作样式，而不是频繁操作 style 
2. 避免使用 table 布局 
3. 批量dom 操作，例如 createDocumentFragment，或者使用框架，例如 React 
4. Debounce window resize 事件 
5. 对 dom 属性的读写要分离  
6. will-change: transform 做优化