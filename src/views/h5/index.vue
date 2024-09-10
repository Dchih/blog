<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import BuildItem from './build.vue';
import type { BuildProps } from './build.vue';
import { showDialog } from 'vant';
const value = ref('');

const onSearch = (value: string) => {
  console.log(value);
};
const onClickButton = () => {
  console.log('click');
};

// Function to generate 15 instances of Ref<BuildProps>
function generateBuildProps(): BuildProps[] {
  const buildPropsArray: BuildProps[] = [];
  for (let i = 0; i < 15; i++) {
    buildPropsArray.push({
      address: `第${i + 1}单元`,
      number: i + '',
      register_number: i * 10 + '',
      leave: i + '',
    });
  }
  return buildPropsArray;
}

const list: Ref<BuildProps[]> = ref(generateBuildProps());


const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 5, 1)
const currentDate = ref(['2021', '01', '01']);
const onConfirm = (value: string) => {
  console.log(value);
  const regExp = /^[a-zA-Z]+(?=\d{3})$`/
  const str = '123abaAc123'
  if(regExp.test(str)) {
    console.log('匹配成功')
  } else {
    console.log('匹配失败!')
  }
};

const platform = detectPlatform();

const addUser = () => {
  console.log('add user');
  new Date("2023-03-03")
  showDialog({
    title: '时间是否正确',
    message: '请确认时间是否正确: ' + platform,
  }).then(() => {
    // on close
  });
};

function detectPlatform() {
    const ua = navigator.userAgent.toLowerCase();
    if (/micromessenger/.test(ua)) {
        if (typeof (window as any).wx !== 'undefined' && (window as any).wx.miniProgram) {
            return 'WeChatMiniProgram';
        }
        return 'WeChat';
    }
    if (/android/.test(ua)) {
        return 'Android';
    }
    if (/iphone|ipad|ipod/.test(ua)) {
        return 'iOS';
    }
    return 'Unknown Platform';
}
</script>

<template>
  <div class="page-wrap">
    <header v-if="platform !== 'WeChatMiniProgram'">
      <img src="@/assets/h5/back.svg" alt="返回">
      <span>住户管理</span>
    </header>
    <div class="btns-group">
      <van-button class="btn" @click="addUser">
        <span class="btn-display">
          <img src="@/assets/h5/add.svg" alt="">
          添加住户
        </span>
      </van-button>
      <van-button class="btn">
        <span class="btn-display">
          <img src="@/assets/h5/delete.svg" alt="">
          批量删除
        </span>
      </van-button>
      <van-button class="btn">
        <span class="btn-display">
          <img src="@/assets/h5/unsign.svg" alt="">
          未实名住户
        </span>
      </van-button>
    </div>
    <div class="search-btn">
      <van-search
          v-model="value"
          show-action
          label="地址"
          placeholder="请输入搜索关键词"
          @search="onSearch"
        >
          <template #action>
            <div @click="onClickButton">搜索</div>
          </template>
        </van-search>
    </div>
    <div class="build-list">
      <BuildItem v-for="item in list" :key="item.number"
        :address="item.address"
        :leave="item.leave"
        :register_number="item.register_number"
        :number="item.number"
      />
    </div>
    <div class="test">
      <van-date-picker
        v-model="currentDate"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
    </div> 
  </div>
</template>

<style scoped>
.build-list {
  margin: 12px;
  box-shadow: 0px 0px 4px 3px rgba(229,233,242,0.5);
  border-radius: 12px;
  background-color: #fff;
}
.page-wrap {
  background-color: #F6F8FB;
  height: 100vh;
}
header {
  height: 54px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
header img {
  position: absolute;
  top: 0;
  left: 12px;
  bottom: 0;
  margin: auto;
}
.btns-group {
  margin-top: 12px;
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin: 12px;
}
.btn {
  flex: 1;
  min-width: 112px;
  height: 60px;
  box-shadow: 0px 0px 4px 3px rgba(229,233,242,0.5);
  border-radius: 7px;
}
.btn-display {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 15px;
  color: #4C90F5;
  line-height: 22px;
}
</style>