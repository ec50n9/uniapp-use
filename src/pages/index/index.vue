<script setup>
import { ref } from "vue";
import { useRequest } from "@/share/hooks/use-request";
import CustomTitleBar from "@/components/custom-title-bar.vue";

const title = ref("你好，世界");
const { data, fetch, loading } = useRequest({
  url: "/api/index",
  defaultValue: [],
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
    </view>
  </view>
</template>
