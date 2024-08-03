interface Point {
  x: number;
  y: number;
}

export function drawBranchSlowly(
  ctx: CanvasRenderingContext2D,
  start: { x: number; y: number },
  angle: number,
  lineWidth: number,
  length: number,
  progress: number = 0,
  callback?: () => void
) {

  if (length < Math.random() * 20) {
    if (callback) callback(); 
    return;
  }

  const radian = transformAngleToRadian(angle);
  const { x, y } = start;
  const endX = x - length * Math.cos(radian);
  const endY = y - length * Math.sin(radian);
  drawBranch(ctx, start, {x: endX, y: endY} , lineWidth, progress);

  if (progress < 1) {
    requestAnimationFrame(() => {
      drawBranchSlowly(
        ctx,
        start,
        angle,
        lineWidth,
        length,
        progress + 0.2,
        callback
      );
    });
  } else {
    // 角度修正
    if (angle > 180) angle /= 1.5;
    if (angle < 30) angle *= 1.5;
    setTimeout(() => {
      drawFlower(ctx, { x, y }, { x: endX, y: endY }, lineWidth);
      drawBranchSlowly(
        ctx,
        { x: endX, y: endY },
        angle * 0.75,
        lineWidth * 0.6,
        length * Math.random() * 1,
        0,
        () => {
          drawFlower(ctx,{x, y}, {x:endX, y:endY}, lineWidth);
          drawBranchSlowly(
            ctx,
            { x: endX, y: endY },
            angle * 1.2,
            lineWidth * 0.6,
            length * 0.8,
            0,
            callback
          );
        }
      );
    }, 60);
  }
}

function transformAngleToRadian(angle: number) {
  return angle * (Math.PI / 180);
}

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
  if (r > 0.5) return;
  ctx.beginPath();
  if (Math.random() > 0.5) {
    ctx.arc(randomX, randomY, r * 10, 0, Math.PI * 2);
  } else {
    const radiusX = r * 10;
    const radiusY = r * 5;
    const rotation = 0;
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    ctx.ellipse(
      randomX,
      randomY,
      radiusX,
      radiusY,
      rotation,
      startAngle,
      endAngle
    );
  }

  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x, y, r * 2, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
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
  ctx.strokeStyle = "#3D1F07";
  ctx.lineCap = "round";
  ctx.stroke();
}