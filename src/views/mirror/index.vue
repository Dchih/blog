<script setup lang="ts">
navigator.mediaDevices
  .getUserMedia({video: true})
  .then(function (stream) {
    var video = document.querySelector('video')!;
    video.srcObject = stream;
    video.onloadedmetadata = function(e) {
      video.play();
    };
    document.getElementById('capture')!.addEventListener('click', function() {
      var canvas = document.getElementById('canvas') as HTMLCanvasElement;
      var context = canvas!.getContext('2d');
      // 将当前视频帧绘制到 canvas 上，实现拍照功能
      context!.drawImage(video, 0, 0, canvas.width, canvas.height);
    });
  })
  .catch(function (err) {
    /* 处理 error */
    alert(err);
  });
</script>

<template>
  <video></video>
  <div id="capture">拍照</div>
  <canvas id="canvas"></canvas>
  <input type="file" accept="image/*">
</template>

<style lang="css">
video {
  width: 500px;
  height: auto;
}

canvas {
  margin-top: 20px;
  width: 500px;
}
</style>