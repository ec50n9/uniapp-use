<template>
    <view class="content">
        <image class="logo" src="/static/logo.png"></image>
        <view class="text-area">
            <text class="title">{{ title }}</text>
        </view>
    </view>
</template>

<script setup>
import { ref } from "vue";

const title = ref("你好，世界");
</script>
