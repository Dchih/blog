interface Point {
  x: number;
  y: number;
}

// WebGL 着色器程序
let glProgram: WebGLProgram | null = null;
let gl: WebGLRenderingContext | null = null;

// 顶点着色器
const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  uniform vec2 u_resolution;

  void main() {
    vec2 position = (a_position / u_resolution) * 2.0 - 1.0;
    position.y *= -1.0;
    gl_Position = vec4(position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

// 片元着色器 - 绘制梅花
const fragmentShaderSource = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform vec2 u_center;
  uniform float u_size;
  uniform vec3 u_petalColor;
  uniform float u_rotation;

  // 距离函数：计算到花瓣的距离
  float petalSDF(vec2 p, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    vec2 rotated = vec2(c * p.x - s * p.y, s * p.x + c * p.y);

    // 椭圆形花瓣
    vec2 scaled = rotated / vec2(0.8, 0.5);
    float dist = length(scaled) - 1.0;
    return dist;
  }

  // 5瓣梅花
  float flowerSDF(vec2 p) {
    float minDist = 10.0;
    float angleStep = 6.28318530718 / 5.0; // 2*PI / 5

    for (int i = 0; i < 5; i++) {
      float angle = angleStep * float(i) + u_rotation;
      vec2 petalCenter = vec2(cos(angle), sin(angle)) * 0.6;
      float dist = petalSDF(p - petalCenter, angle);
      minDist = min(minDist, dist);
    }

    return minDist;
  }

  void main() {
    vec2 p = (v_texCoord - 0.5) * 2.0;

    // 花瓣
    float flowerDist = flowerSDF(p);
    float petalAlpha = smoothstep(0.1, -0.05, flowerDist);

    // 花瓣边缘柔和渐变
    vec3 petalColorEdge = u_petalColor * 0.85;
    vec3 petalFinal = mix(petalColorEdge, u_petalColor, smoothstep(0.05, -0.1, flowerDist));

    // 花蕊中心
    float centerDist = length(p) - 0.35;
    float centerAlpha = smoothstep(0.05, -0.05, centerDist);

    // 花蕊渐变色
    vec3 stamenColor = mix(
      vec3(1.0, 0.97, 0.86),  // 浅黄
      vec3(1.0, 0.84, 0.0),   // 金黄
      smoothstep(0.0, 0.35, length(p))
    );

    // 花蕊小点点
    float stamenDots = 0.0;
    for (int i = 0; i < 12; i++) {
      float angle = 6.28318530718 * float(i) / 12.0;
      vec2 dotPos = vec2(cos(angle), sin(angle)) * 0.2;
      float dotDist = length(p - dotPos) - 0.04;
      stamenDots += smoothstep(0.02, -0.02, dotDist);
    }
    stamenDots = clamp(stamenDots, 0.0, 1.0);
    vec3 dotColor = vec3(0.82, 0.41, 0.12); // 棕色

    // 组合所有颜色
    vec3 color = petalFinal;
    color = mix(color, stamenColor, centerAlpha);
    color = mix(color, dotColor, stamenDots * 0.8);

    float alpha = max(petalAlpha, centerAlpha);
    gl_FragColor = vec4(color, alpha);
  }
`;

// 初始化 WebGL
export function initWebGL(canvas: HTMLCanvasElement) {
  gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: false
  });

  if (!gl) {
    console.warn('WebGL not supported, falling back to Canvas2D');
    return false;
  }

  // 创建着色器
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  if (!vertexShader || !fragmentShader) return false;

  // 创建程序
  glProgram = createProgram(gl, vertexShader, fragmentShader);
  if (!glProgram) return false;

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  return true;
}

// 创建着色器
function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// 创建程序
function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export function drawBranchSlowly(
  ctx: CanvasRenderingContext2D,
  start: { x: number; y: number },
  angle: number,
  lineWidth: number,
  length: number,
  progress: number = 0
) {
  // 递归终止条件：树枝太短时停止
  if (length < Math.random() * 20) {
    return;
  }

  const radian = transformAngleToRadian(angle);
  const { x, y } = start;
  const endX = x - length * Math.cos(radian);
  const endY = y - length * Math.sin(radian);

  // 绘制当前树枝
  drawBranch(ctx, start, { x: endX, y: endY }, lineWidth, progress);

  // 动画绘制：如果progress < 1，继续延长当前树枝
  if (progress < 1) {
    requestAnimationFrame(() => {
      drawBranchSlowly(ctx, start, angle, lineWidth, length, progress + 0.2);
    });
    return;
  }

  // 当前树枝绘制完成，生成花朵和子分支
  drawFlower(ctx, { x, y }, { x: endX, y: endY }, lineWidth);

  // 角度修正：防止角度过大或过小
  let adjustedAngle = angle;
  if (angle > 180) adjustedAngle = angle / 1.5;
  if (angle < 30) adjustedAngle = angle * 1.5;

  // 递归生成左右两个子分支
  const delay = 60;

  // 左分支
  setTimeout(() => {
    drawBranchSlowly(
      ctx,
      { x: endX, y: endY },
      adjustedAngle * 0.75,
      lineWidth * 0.6,
      length * (0.7 + Math.random() * 0.3)
    );
  }, delay);

  // 右分支
  setTimeout(() => {
    drawBranchSlowly(
      ctx,
      { x: endX, y: endY },
      adjustedAngle * 1.25,
      lineWidth * 0.6,
      length * (0.7 + Math.random() * 0.3)
    );
  }, delay);
}

function transformAngleToRadian(angle: number) {
  return angle * (Math.PI / 180);
}

// 使用 WebGL Shader 绘制花朵
function drawFlowerWithShader(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  size: number,
  colorVariation: number,
  rotation: number
) {
  if (!gl || !glProgram) return;

  gl.useProgram(glProgram);

  // 设置视口
  gl.viewport(0, 0, canvas.width, canvas.height);

  // 创建矩形顶点（两个三角形）
  const x1 = x - size;
  const y1 = y - size;
  const x2 = x + size;
  const y2 = y + size;

  const positions = new Float32Array([
    x1, y1,  x2, y1,  x1, y2,
    x1, y2,  x2, y1,  x2, y2,
  ]);

  const texCoords = new Float32Array([
    0, 0,  1, 0,  0, 1,
    0, 1,  1, 0,  1, 1,
  ]);

  // 位置缓冲区
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const positionLoc = gl.getAttribLocation(glProgram, 'a_position');
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  // 纹理坐标缓冲区
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

  const texCoordLoc = gl.getAttribLocation(glProgram, 'a_texCoord');
  gl.enableVertexAttribArray(texCoordLoc);
  gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

  // 设置 uniforms
  const resolutionLoc = gl.getUniformLocation(glProgram, 'u_resolution');
  gl.uniform2f(resolutionLoc, canvas.width, canvas.height);

  const rotationLoc = gl.getUniformLocation(glProgram, 'u_rotation');
  gl.uniform1f(rotationLoc, rotation);

  // 花瓣颜色
  let r = 1.0, g = 1.0, b = 1.0;
  if (colorVariation < 0.3) {
    // 深粉色
    r = 1.0;
    g = (150 + Math.random() * 50) / 255;
    b = (180 + Math.random() * 40) / 255;
  } else if (colorVariation < 0.7) {
    // 浅粉色
    r = 1.0;
    g = (200 + Math.random() * 40) / 255;
    b = (210 + Math.random() * 30) / 255;
  } else {
    // 白色带一点粉
    r = 1.0;
    g = (240 + Math.random() * 15) / 255;
    b = (245 + Math.random() * 10) / 255;
  }

  const colorLoc = gl.getUniformLocation(glProgram, 'u_petalColor');
  gl.uniform3f(colorLoc, r, g, b);

  // 绘制
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  // 清理
  gl.deleteBuffer(positionBuffer);
  gl.deleteBuffer(texCoordBuffer);
}

// Canvas2D 降级方案
function drawFlower(
  ctx: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  lineWidth: number
) {
  const { x, y } = start
  const { x: endX, y: endY } = end
  const xLength = endX - x;
  const yLength = endY - y;
  const random = Math.random() * 1;
  const randomX = x + xLength * random;
  const randomY = y + yLength * random;

  if (lineWidth > 3) return;
  const r = Math.random();
  if (r > 0.6) return;

  const flowerSize = 3 + Math.random() * 5;
  const rotation = Math.random() * Math.PI * 2;
  const colorVariation = Math.random();

  // 尝试使用 WebGL Shader 绘制
  const canvas = ctx.canvas;
  if (gl && glProgram) {
    drawFlowerWithShader(canvas, randomX, randomY, flowerSize, colorVariation, rotation);
    return;
  }

  // 降级到 Canvas2D（原有实现）
  const petalCount = 5;
  const angleStep = (Math.PI * 2) / petalCount;

  let petalColor;
  if (colorVariation < 0.3) {
    petalColor = `rgba(255, ${150 + Math.floor(Math.random() * 50)}, ${180 + Math.floor(Math.random() * 40)}, ${0.85 + Math.random() * 0.15})`;
  } else if (colorVariation < 0.7) {
    petalColor = `rgba(255, ${200 + Math.floor(Math.random() * 40)}, ${210 + Math.floor(Math.random() * 30)}, ${0.85 + Math.random() * 0.15})`;
  } else {
    petalColor = `rgba(255, ${240 + Math.floor(Math.random() * 15)}, ${245 + Math.floor(Math.random() * 10)}, ${0.9 + Math.random() * 0.1})`;
  }

  for (let i = 0; i < petalCount; i++) {
    const angle = angleStep * i + rotation;
    const petalX = randomX + Math.cos(angle) * flowerSize * 0.6;
    const petalY = randomY + Math.sin(angle) * flowerSize * 0.6;

    ctx.beginPath();
    ctx.ellipse(petalX, petalY, flowerSize * 0.8, flowerSize * 0.5, angle, 0, Math.PI * 2);
    ctx.fillStyle = petalColor;
    ctx.fill();
    ctx.closePath();
  }

  ctx.beginPath();
  ctx.arc(randomX, randomY, flowerSize * 0.35, 0, Math.PI * 2);
  const gradient = ctx.createRadialGradient(randomX, randomY, 0, randomX, randomY, flowerSize * 0.35);
  gradient.addColorStop(0, '#FFF8DC');
  gradient.addColorStop(0.5, '#FFD700');
  gradient.addColorStop(1, '#FFA500');
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();

  const stamenCount = 8 + Math.floor(Math.random() * 5);
  for (let i = 0; i < stamenCount; i++) {
    const stamenAngle = (Math.PI * 2 * i) / stamenCount + Math.random() * 0.3;
    const stamenDistance = flowerSize * 0.15 + Math.random() * flowerSize * 0.15;
    const stamenX = randomX + Math.cos(stamenAngle) * stamenDistance;
    const stamenY = randomY + Math.sin(stamenAngle) * stamenDistance;

    ctx.beginPath();
    ctx.arc(stamenX, stamenY, 0.5, 0, Math.PI * 2);
    ctx.fillStyle = '#D2691E';
    ctx.fill();
    ctx.closePath();
  }
}

function drawBranch(ctx: CanvasRenderingContext2D, start: Point,end: Point, lineWidth: number, progress: number) {
  const { x, y} = start
  const { x: endX, y: endY } = end
  ctx.beginPath();
  ctx.moveTo(x, y);
  const currentEndX = (x + (endX - x) * progress)
  const currentEndY = (y + (endY - y) * progress)
  ctx.lineTo(currentEndX, currentEndY);
  ctx.lineWidth = lineWidth;

  // 树枝颜色：深褐色渐变，带有一些变化
  const colorVariation = Math.floor(Math.random() * 30);
  const branchColor = `rgb(${61 + colorVariation}, ${31 + colorVariation}, ${7 + colorVariation})`;

  // 使用渐变色让树枝更自然
  const gradient = ctx.createLinearGradient(x, y, currentEndX, currentEndY);
  gradient.addColorStop(0, branchColor);
  gradient.addColorStop(1, `rgb(${51 + colorVariation}, ${26 + colorVariation}, ${5 + colorVariation})`);

  ctx.strokeStyle = gradient;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";  // 让分支连接更自然

  // 添加阴影效果
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;

  ctx.stroke();

  // 重置阴影
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}