<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import PixelSnake from './PixelSnake.vue';

const displayedText = ref('');
const showCursor = ref(true);
const welcomeText = 'WELCOME TO MY BLOG';

let typingIndex = 0;

// 键盘打字机效果
function typeText() {
  if (typingIndex < welcomeText.length) {
    displayedText.value += welcomeText[typingIndex];
    typingIndex++;

    // 随机打字速度 (80-150ms)
    const delay = Math.random() * 70 + 80;
    setTimeout(typeText, delay);
  }
  // 打字完成后光标继续闪动（不隐藏）
}

const goSBAddress = () => {
  window.open("http://beian.miit.gov.cn/");
}

onMounted(() => {
  // 页面加载后延迟开始打字效果
  setTimeout(() => {
    typeText();
  }, 500);

  document.body.style.background = '#0f0f23';
})
</script>

<template>
  <div class="pixel-home">
    <!-- 贪吃蛇背景 -->
    <PixelSnake />
    
    <!-- 像素风欢迎语容器 -->
    <div class="welcome-container">
      <div class="pixel-border">
        <!-- 石块边框层 -->
        <div class="stone-border stone-border-top"></div>
        <div class="stone-border stone-border-bottom"></div>
        <div class="stone-border stone-border-left"></div>
        <div class="stone-border stone-border-right"></div>
        
        <!-- 四角装饰 -->
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>

        <!-- 内容区域 -->
        <div class="content-area">
          <h1 class="pixel-text">
            {{ displayedText }}<span v-show="showCursor" class="cursor">█</span>
          </h1>
          <div class="menu-container">
            <div class="menu-item">
              <router-link to="/content/technics" class="pixel-link">
                <span class="arrow">></span> TECH_BLOG
              </router-link>
            </div>
            <div class="menu-item">
              <router-link to="/content/reflections" class="pixel-link">
                <span class="arrow">></span> THOUGHTS
              </router-link>
            </div>
            <div class="menu-item">
              <router-link to="content/boring-things" class="pixel-link">
                <span class="arrow">></span> CHAOS
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 操作提示 -->
      <div class="hint-text">
        Press arrow keys to play Snake
      </div>
    </div>

    <!-- 底部备案信息 -->
    <div class="footer-pixel" @click="goSBAddress">
      <span class="footer-text">备案号：粤ICP备2023083802号-1</span>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.pixel-home {
  min-height: 100vh;
  background: #0f0f23;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 添加扫描线效果 */
.pixel-home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 1;
}

/* 欢迎语容器 */
.welcome-container {
  position: relative;
  z-index: 2;
  animation: fadeIn 1s ease-in;
}

/* 像素边框容器 */
.pixel-border {
  position: relative;
  padding: 24px;
}

/* 内容区域 */
.content-area {
  background: rgba(15, 15, 35, 0.95);
  padding: 3rem 4rem;
  position: relative;
  z-index: 1;
}

/* 石块边框 - 使用 SVG 背景 */
.stone-border {
  position: absolute;
  background-repeat: repeat;
  image-rendering: pixelated;
  z-index: 2;
}

/* 石块图案 - 使用径向渐变模拟鹅卵石 */
.stone-border-top,
.stone-border-bottom {
  left: 20px;
  right: 20px;
  height: 24px;
  background-image: 
    /* 第一行大石块 */
    radial-gradient(ellipse 10px 8px at 6px 12px, #d4d4d4 60%, #a8a8a8 70%, transparent 71%),
    radial-gradient(ellipse 12px 9px at 22px 10px, #e8e8e8 60%, #b8b8b8 70%, transparent 71%),
    radial-gradient(ellipse 9px 7px at 38px 13px, #c8c8c8 60%, #a0a0a0 70%, transparent 71%),
    radial-gradient(ellipse 11px 8px at 54px 11px, #dcdcdc 60%, #acacac 70%, transparent 71%),
    radial-gradient(ellipse 10px 9px at 70px 12px, #d0d0d0 60%, #a4a4a4 70%, transparent 71%),
    radial-gradient(ellipse 13px 8px at 88px 10px, #e0e0e0 60%, #b0b0b0 70%, transparent 71%),
    radial-gradient(ellipse 9px 7px at 106px 13px, #cccccc 60%, #9c9c9c 70%, transparent 71%),
    radial-gradient(ellipse 11px 9px at 120px 11px, #d8d8d8 60%, #a8a8a8 70%, transparent 71%),
    /* 第二行填充小石块 */
    radial-gradient(ellipse 7px 5px at 14px 5px, #b8b8b8 60%, #888888 70%, transparent 71%),
    radial-gradient(ellipse 6px 5px at 30px 4px, #c4c4c4 60%, #949494 70%, transparent 71%),
    radial-gradient(ellipse 8px 5px at 46px 5px, #bcbcbc 60%, #8c8c8c 70%, transparent 71%),
    radial-gradient(ellipse 6px 4px at 62px 4px, #c0c0c0 60%, #909090 70%, transparent 71%),
    radial-gradient(ellipse 7px 5px at 78px 5px, #b4b4b4 60%, #848484 70%, transparent 71%),
    radial-gradient(ellipse 8px 5px at 96px 4px, #c8c8c8 60%, #989898 70%, transparent 71%),
    radial-gradient(ellipse 6px 5px at 112px 5px, #b0b0b0 60%, #808080 70%, transparent 71%);
  background-size: 128px 24px;
}

.stone-border-top {
  top: 0;
}

.stone-border-bottom {
  bottom: 0;
  transform: scaleY(-1);
}

.stone-border-left,
.stone-border-right {
  top: 20px;
  bottom: 20px;
  width: 24px;
  background-image: 
    /* 石块图案 - 垂直排列 */
    radial-gradient(ellipse 8px 10px at 12px 6px, #d4d4d4 60%, #a8a8a8 70%, transparent 71%),
    radial-gradient(ellipse 9px 12px at 10px 22px, #e8e8e8 60%, #b8b8b8 70%, transparent 71%),
    radial-gradient(ellipse 7px 9px at 13px 38px, #c8c8c8 60%, #a0a0a0 70%, transparent 71%),
    radial-gradient(ellipse 8px 11px at 11px 54px, #dcdcdc 60%, #acacac 70%, transparent 71%),
    radial-gradient(ellipse 9px 10px at 12px 70px, #d0d0d0 60%, #a4a4a4 70%, transparent 71%),
    radial-gradient(ellipse 8px 13px at 10px 88px, #e0e0e0 60%, #b0b0b0 70%, transparent 71%),
    radial-gradient(ellipse 7px 9px at 13px 106px, #cccccc 60%, #9c9c9c 70%, transparent 71%),
    radial-gradient(ellipse 9px 11px at 11px 120px, #d8d8d8 60%, #a8a8a8 70%, transparent 71%),
    /* 填充小石块 */
    radial-gradient(ellipse 5px 7px at 5px 14px, #b8b8b8 60%, #888888 70%, transparent 71%),
    radial-gradient(ellipse 5px 6px at 4px 30px, #c4c4c4 60%, #949494 70%, transparent 71%),
    radial-gradient(ellipse 5px 8px at 5px 46px, #bcbcbc 60%, #8c8c8c 70%, transparent 71%),
    radial-gradient(ellipse 4px 6px at 4px 62px, #c0c0c0 60%, #909090 70%, transparent 71%),
    radial-gradient(ellipse 5px 7px at 5px 78px, #b4b4b4 60%, #848484 70%, transparent 71%),
    radial-gradient(ellipse 5px 8px at 4px 96px, #c8c8c8 60%, #989898 70%, transparent 71%),
    radial-gradient(ellipse 5px 6px at 5px 112px, #b0b0b0 60%, #808080 70%, transparent 71%);
  background-size: 24px 128px;
}

.stone-border-left {
  left: 0;
}

.stone-border-right {
  right: 0;
  transform: scaleX(-1);
}

/* 四角石块装饰 */
.corner {
  position: absolute;
  width: 28px;
  height: 28px;
  z-index: 3;
  background-image: 
    radial-gradient(ellipse 12px 10px at 14px 14px, #e0e0e0 55%, #a8a8a8 65%, transparent 66%),
    radial-gradient(ellipse 8px 7px at 6px 8px, #d0d0d0 55%, #909090 65%, transparent 66%),
    radial-gradient(ellipse 7px 8px at 22px 8px, #c8c8c8 55%, #888888 65%, transparent 66%),
    radial-gradient(ellipse 8px 6px at 8px 22px, #d8d8d8 55%, #989898 65%, transparent 66%),
    radial-gradient(ellipse 6px 7px at 20px 20px, #c4c4c4 55%, #949494 65%, transparent 66%);
  image-rendering: pixelated;
}

.corner-tl {
  top: -2px;
  left: -2px;
}

.corner-tr {
  top: -2px;
  right: -2px;
  transform: scaleX(-1);
}

.corner-bl {
  bottom: -2px;
  left: -2px;
  transform: scaleY(-1);
}

.corner-br {
  bottom: -2px;
  right: -2px;
  transform: scale(-1, -1);
}

/* 主文字 */
.pixel-text {
  font-family: 'Press Start 2P', monospace, 'Courier New', monospace;
  font-size: 1.8rem;
  color: #00ff41;
  text-shadow:
    0 0 10px #00ff41,
    0 0 20px #00ff41,
    0 0 30px #00ff41;
  margin-bottom: 3rem;
  letter-spacing: 2px;
  white-space: nowrap;
}

/* 光标 */
.cursor {
  animation: blink 1s step-end infinite;
  color: #00ff41;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* 菜单容器 */
.menu-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

/* 菜单项 */
.menu-item {
  position: relative;
}

/* 像素链接 */
.pixel-link {
  font-family: 'Press Start 2P', monospace, 'Courier New', monospace;
  font-size: 1rem;
  color: #66d9ef;
  text-decoration: none;
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border: 2px solid #66d9ef;
  background: rgba(102, 217, 239, 0.1);
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
}

.pixel-link:hover {
  background: #66d9ef;
  color: #0f0f23;
  box-shadow: 0 0 15px #66d9ef;
  transform: translateX(8px);
}

.pixel-link .arrow {
  margin-right: 1rem;
  color: #ff006e;
  animation: arrowBlink 1.5s ease-in-out infinite;
}

.pixel-link:hover .arrow {
  animation: none;
  color: #0f0f23;
}

@keyframes arrowBlink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* 操作提示 */
.hint-text {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  color: rgba(0, 255, 65, 0.4);
  text-align: center;
  margin-top: 1.5rem;
  animation: hintPulse 2s ease-in-out infinite;
}

@keyframes hintPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}

/* 底部备案信息 */
.footer-pixel {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  cursor: pointer;
  background: rgba(15, 15, 35, 0.9);
  border: 2px solid #666;
  padding: 0.5rem 1.5rem;
}

.footer-text {
  font-family: 'Press Start 2P', monospace, 'Courier New', monospace;
  font-size: 0.6rem;
  color: #888;
  letter-spacing: 1px;
}

.footer-pixel:hover .footer-text {
  color: #00ff41;
}

/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .pixel-text {
    font-size: 1rem;
    white-space: normal;
    word-break: break-all;
  }

  .content-area {
    padding: 2rem;
  }

  .pixel-link {
    font-size: 0.7rem;
    padding: 0.6rem 1rem;
  }

  .footer-text {
    font-size: 0.4rem;
  }
  
  .hint-text {
    font-size: 0.5rem;
  }
}
</style>