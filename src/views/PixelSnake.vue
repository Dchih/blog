<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 游戏配置
const GRID_SIZE = 20 // 每个格子的像素大小
const GAME_SPEED = 150 // 移动间隔(ms)

// Canvas 引用
const canvasRef = ref<HTMLCanvasElement | null>(null)

// 游戏状态
let snake: { x: number; y: number }[] = []
let food = { x: 0, y: 0 }
let direction = { x: 1, y: 0 }
let nextDirection = { x: 1, y: 0 }
let gridWidth = 0
let gridHeight = 0
let gameLoop: number | null = null
let ctx: CanvasRenderingContext2D | null = null
let isUserControlled = false
let autoMoveTimer: number | null = null

// 颜色配置 - 像素风格
const COLORS = {
  snakeHead: '#00ff41',
  snakeBody: '#00cc33',
  snakeGlow: 'rgba(0, 255, 65, 0.3)',
  food: '#ff006e',
  foodGlow: 'rgba(255, 0, 110, 0.4)',
  grid: 'rgba(0, 255, 65, 0.03)'
}

// 初始化游戏
function initGame() {
  if (!canvasRef.value) return
  
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  
  // 设置 canvas 尺寸为窗口大小
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  gridWidth = Math.floor(canvas.width / GRID_SIZE)
  gridHeight = Math.floor(canvas.height / GRID_SIZE)
  
  // 初始化蛇 - 从屏幕中间开始
  const startX = Math.floor(gridWidth / 2)
  const startY = Math.floor(gridHeight / 2)
  snake = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
    { x: startX - 3, y: startY },
    { x: startX - 4, y: startY }
  ]
  
  direction = { x: 1, y: 0 }
  nextDirection = { x: 1, y: 0 }
  
  spawnFood()
  startGameLoop()
}

// 生成食物
function spawnFood() {
  let newFood: { x: number; y: number }
  do {
    newFood = {
      x: Math.floor(Math.random() * gridWidth),
      y: Math.floor(Math.random() * gridHeight)
    }
  } while (snake.some(seg => seg.x === newFood.x && seg.y === newFood.y))
  
  food = newFood
}

// AI 自动移动逻辑
function getAutoDirection() {
  const head = snake[0]
  
  // 简单 AI：朝食物方向移动，但避开自身
  const possibleDirs = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ].filter(d => {
    // 不能反向
    if (d.x === -direction.x && d.y === -direction.y) return false
    
    // 检查是否会撞到自己
    const newX = (head.x + d.x + gridWidth) % gridWidth
    const newY = (head.y + d.y + gridHeight) % gridHeight
    return !snake.slice(0, -1).some(seg => seg.x === newX && seg.y === newY)
  })
  
  if (possibleDirs.length === 0) return direction
  
  // 优先选择朝食物方向的
  const toFood = possibleDirs.find(d => {
    if (d.x !== 0) {
      return (food.x > head.x && d.x > 0) || (food.x < head.x && d.x < 0)
    }
    if (d.y !== 0) {
      return (food.y > head.y && d.y > 0) || (food.y < head.y && d.y < 0)
    }
    return false
  })
  
  // 有时随机选择，让移动更自然
  if (toFood && Math.random() > 0.2) {
    return toFood
  }
  
  return possibleDirs[Math.floor(Math.random() * possibleDirs.length)]
}

// 更新游戏状态
function update() {
  // 如果不是用户控制，使用 AI
  if (!isUserControlled) {
    const autoDir = getAutoDirection()
    nextDirection = autoDir
  }
  
  direction = nextDirection
  
  // 计算新头部位置（穿墙）
  const head = snake[0]
  const newHead = {
    x: (head.x + direction.x + gridWidth) % gridWidth,
    y: (head.y + direction.y + gridHeight) % gridHeight
  }
  
  // 检查是否吃到食物
  if (newHead.x === food.x && newHead.y === food.y) {
    snake.unshift(newHead)
    spawnFood()
  } else {
    snake.unshift(newHead)
    snake.pop()
  }
  
  // 检查是否撞到自己 - 如果撞到就重置
  if (snake.slice(1).some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
    // 重置蛇
    const startX = Math.floor(gridWidth / 2)
    const startY = Math.floor(gridHeight / 2)
    snake = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY }
    ]
    direction = { x: 1, y: 0 }
    nextDirection = { x: 1, y: 0 }
  }
}

// 绘制像素方块
function drawPixelBlock(x: number, y: number, color: string, glowColor?: string) {
  if (!ctx) return
  
  const px = x * GRID_SIZE
  const py = y * GRID_SIZE
  const size = GRID_SIZE - 2
  
  // 发光效果
  if (glowColor) {
    ctx.shadowColor = glowColor
    ctx.shadowBlur = 10
  }
  
  // 主体
  ctx.fillStyle = color
  ctx.fillRect(px + 1, py + 1, size, size)
  
  // 像素高光（左上角）
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.fillRect(px + 2, py + 2, 4, 4)
  
  // 像素阴影（右下角）
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
  ctx.fillRect(px + size - 3, py + size - 3, 4, 4)
  
  ctx.shadowBlur = 0
}

// 绘制食物（带闪烁效果）
function drawFood() {
  if (!ctx) return
  
  const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7
  
  ctx.globalAlpha = pulse
  drawPixelBlock(food.x, food.y, COLORS.food, COLORS.foodGlow)
  ctx.globalAlpha = 1
}

// 渲染
function render() {
  if (!ctx || !canvasRef.value) return
  
  const canvas = canvasRef.value
  
  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // 绘制网格（非常淡）
  ctx.strokeStyle = COLORS.grid
  ctx.lineWidth = 1
  for (let x = 0; x <= gridWidth; x++) {
    ctx.beginPath()
    ctx.moveTo(x * GRID_SIZE, 0)
    ctx.lineTo(x * GRID_SIZE, canvas.height)
    ctx.stroke()
  }
  for (let y = 0; y <= gridHeight; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * GRID_SIZE)
    ctx.lineTo(canvas.width, y * GRID_SIZE)
    ctx.stroke()
  }
  
  // 绘制蛇身体
  snake.forEach((segment, index) => {
    const isHead = index === 0
    const color = isHead ? COLORS.snakeHead : COLORS.snakeBody
    const alpha = 1 - (index / snake.length) * 0.5 // 渐变透明度
    
    ctx!.globalAlpha = alpha * 0.8 // 整体半透明，不遮挡内容
    drawPixelBlock(segment.x, segment.y, color, isHead ? COLORS.snakeGlow : undefined)
  })
  
  ctx.globalAlpha = 0.8
  
  // 绘制食物
  drawFood()
  
  ctx.globalAlpha = 1
}

// 游戏主循环
function gameStep() {
  update()
  render()
}

function startGameLoop() {
  if (gameLoop) cancelAnimationFrame(gameLoop)
  
  let lastTime = 0
  
  function loop(timestamp: number) {
    if (timestamp - lastTime >= GAME_SPEED) {
      gameStep()
      lastTime = timestamp
    }
    gameLoop = requestAnimationFrame(loop)
  }
  
  gameLoop = requestAnimationFrame(loop)
}

// 键盘控制
function handleKeydown(e: KeyboardEvent) {
  const key = e.key
  
  // 方向键控制
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(key)) {
    e.preventDefault()
    isUserControlled = true
    
    // 重置自动控制计时器
    if (autoMoveTimer) clearTimeout(autoMoveTimer)
    autoMoveTimer = window.setTimeout(() => {
      isUserControlled = false
    }, 5000) // 5秒无操作后恢复自动
    
    switch (key) {
      case 'ArrowUp':
      case 'w':
        if (direction.y !== 1) nextDirection = { x: 0, y: -1 }
        break
      case 'ArrowDown':
      case 's':
        if (direction.y !== -1) nextDirection = { x: 0, y: 1 }
        break
      case 'ArrowLeft':
      case 'a':
        if (direction.x !== 1) nextDirection = { x: -1, y: 0 }
        break
      case 'ArrowRight':
      case 'd':
        if (direction.x !== -1) nextDirection = { x: 1, y: 0 }
        break
    }
  }
}

// 窗口大小变化
function handleResize() {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
  gridWidth = Math.floor(canvasRef.value.width / GRID_SIZE)
  gridHeight = Math.floor(canvasRef.value.height / GRID_SIZE)
}

onMounted(() => {
  initGame()
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (gameLoop) cancelAnimationFrame(gameLoop)
  if (autoMoveTimer) clearTimeout(autoMoveTimer)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <canvas 
    ref="canvasRef" 
    class="pixel-snake-bg"
  />
</template>

<style scoped>
.pixel-snake-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
