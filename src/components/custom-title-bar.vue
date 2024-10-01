<script setup>
import { getWindowInfo } from "@/share/utils/window-info";

defineProps({
    extClass: String,
    statusBarClass: String,
    titleContentClass: String,
    menuBtnClass: String,
});

const { statusBarHeight, titleBarHeight, menuButtonRect } = getWindowInfo();

const menuButtonCenter = {
    left: menuButtonRect.left + menuButtonRect.width / 2,
    top: menuButtonRect.top + menuButtonRect.height / 2,
};
</script>

<template>
    <view class="relative" :class="[extClass]">
        <view
            class="of-hidden"
            :style="{ height: `${statusBarHeight}px` }"
            :class="[statusBarClass]"
        >
            <slot name="status-bar" />
        </view>
        <view class="of-hidden" :style="{ height: `${titleBarHeight}px` }">
            <view
                class="h-full"
                :style="{
                    width: menuButtonRect.width
                        ? `${menuButtonRect.left}px`
                        : '100%',
                }"
                :class="[titleContentClass]"
            >
                <slot />
            </view>
            <view
                v-if="menuButtonRect.width"
                class="absolute rd-full -translate-(x-1/2 y-1/2)"
                :class="[menuBtnClass]"
                :style="{
                    width: `${menuButtonRect.width}px`,
                    height: `${menuButtonRect.height}px`,
                    top: `${menuButtonCenter.top}px`,
                    left: `${menuButtonCenter.left}px`,
                }"
            />
        </view>
    </view>
</template>

<script>
export default {
    options: {
        virtualHost: true,
        styleIsolation: "shared",
    },
};
</script>
