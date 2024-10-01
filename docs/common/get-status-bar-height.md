# getStatusBarHeight

```js
/** 获取状态栏高度 */
export const getStatusBarHeight = () =>
  uni.getSystemInfoSync().safeArea?.top || 0;
```
