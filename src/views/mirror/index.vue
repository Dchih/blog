<script setup lang="ts">
import { onMounted } from 'vue';
// navigator.mediaDevices
//   .getUserMedia({video: true})
//   .then(function (stream) {
//     var video = document.querySelector('video')!;
//     video.srcObject = stream;
//     video.onloadedmetadata = function(e) {
//       video.play();
//     };
//     document.getElementById('capture')!.addEventListener('click', function() {
//       var canvas = document.getElementById('canvas') as HTMLCanvasElement;
//       var context = canvas!.getContext('2d');
//       context!.drawImage(video, 0, 0, canvas.width, canvas.height);
//     });
//   })
//   .catch(function (err) {
//     alert(err);
//   });

  onMounted(() => {
    const version = localStorage.getItem("version");
    const currentVersion = __APP_VERSION__;
    console.log(version, currentVersion.toString());
    if (version !== currentVersion.toString()) {
      localStorage.setItem("version", currentVersion);
      location.reload();
    }
  })
</script>

<template>
  <div class="delete-overflow">
    <video></video>
    <div id="capture">拍照</div>
    <canvas id="canvas"></canvas>
    <input type="file" accept="image/*">
    <input type="file" >
  </div>
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

.delete-overflow {
  overflow: hidden;
}
</style>