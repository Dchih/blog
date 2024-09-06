<script setup lang="ts">
import { defineProps } from 'vue';
export interface BuildProps {
  address: string;
  number: string;
  register_number: string;
  leave: string;
}
const props = defineProps<BuildProps>();
</script>

<template>
  <div class="build-item">
    <img src="@/assets/h5/building.svg" alt="">
    <div class="content">
      <div class="address">{{ props.address }}</div>
      <div class="details">
        <span>房间：{{ props.number }}</span>
        <span>实名登记：{{ props.register_number }}（分析搬离：1）</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.build-item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  border-bottom: 1px solid #f7f7f7;
  height: 82px;
  min-width: 350px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.address {
  font-size: 18px;
  color: #333;
  font-weight: 500;
  line-height: 20px;
}

.details {
  display: flex;
  gap: 12px;
  font-weight: 400;
  font-size: 15px;
  color: #525252;
  line-height: 22px;
}
</style>