<script setup>
import { ref } from "vue";
import { useRequest } from "@/share/hooks/use-request";
import CustomTitleBar from "@/components/custom-title-bar.vue";
import { onLoad } from "@dcloudio/uni-app";

const title = ref("你好，世界");
const { data, loading, error, fetch } = useRequest({
  url: "/demo/hello",
  defaultValue: [],
  needToken: false,
});

const createPostReq = useRequest({
  url: "/demo/posts",
  method: "POST",
  defaultValue: [],
  needToken: false,
  data: {
    title: "测试标题",
    content: "测试内容",
  },
});

onLoad(() => {
  console.log("on index page load");
});
</script>

<template>
  <view class="h-screen bg-red-50 of-auto">
    <custom-title-bar
      status-bar-class="bg-red-5"
      title-content-class="bg-blue-3"
      menu-btn-class="b-(2 solid blue-5)"
    >
      <template #status-bar> hello, world!! </template>
      uni-app
    </custom-title-bar>
    <image class="size-10" src="/static/logo.png" />
    <view>
      <text>{{ title }}</text>
      <view i-carbon:close />
      <button
        :disabled="createPostReq.loading.value"
        :loading="createPostReq.loading.value"
        hover-class="button-hover"
        @click="createPostReq.fetch"
      >
        请求
      </button>
      <view>数据：{{ createPostReq.data }}</view>
      <view>错误：{{ createPostReq.error }}</view>
    </view>
  </view>
</template>
