<template>
    <view un-flex="~ col" justify-center items-center>
        <image un-size-10 src="/static/logo.png" />
        <view bg-red>
            <text>{{ title }}</text>
            <view i-carbon:close />
        </view>
    </view>
</template>

<script setup>
import { ref } from "vue";

const title = ref("你好，世界");
</script>
