<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
const dialogVisible = ref(false);
const emit = defineEmits<{
  "update:close": [status: boolean];
}>();
const handleClose = () => {
  emit("update:close", false);
};

let innerCheck: Ref<any> = ref(null);
const startCheck = () => {
  if (!innerCheck.value) {
    innerCheck.value = setInterval(() => {
      checkVersion();
    }, 15000);
  }
};

const endCheck = () => {
  clearInterval(innerCheck.value!);
  innerCheck.value = null;
};

const checkVersion = async () => {
  // 对比 import.meta.env.VERSION_TIME 与 public/VERSION_TIME.json.data
  const publicVersion = await fetch(
    location.origin + `/version.json?t=` + Date.now(),
    {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "-1",
      },
    }
  );
  const data = await publicVersion.json()
  const NEW_VERSION_TIME = data.VERSION_TIME; // json保存的时间
  const VERSION_TIME = import.meta.env.VERSION_TIME; // vite.config.ts 中的时间

  console.log(NEW_VERSION_TIME, "import.meta.env.VERSION_TIME: ", VERSION_TIME);

  if (import.meta.env.DEV) {
    endCheck();
    return;
  }
  if (NEW_VERSION_TIME && new Date(NEW_VERSION_TIME) > new Date(VERSION_TIME)) {
    endCheck();
    updateVersion();
  }
};

const count = ref(10);
const updateVersion = () => {
  count.value = 10;
  dialogVisible.value = true;
  let timer: any = setInterval(() => {
    count.value--;
    if (count.value < 1) {
      clearInterval(timer!);
      timer = null;
      location.reload();
    }
  }, 1000);
};

const manualUpdateVersion = () => {
  location.reload();
};

onMounted(() => {
  startCheck();
});
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="更新"
    width="500"
    :before-close="handleClose"
  >
    <span>检测到新版本：为保证数据一致性，{{ count }}秒后将自动更新</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="manualUpdateVersion">
          手动刷新
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
