# getCompatibleMenuButtonRect

```js
/** 获取兼容的菜单按钮（胶囊按钮）的位置信息 */
export const getCompatibleMenuButtonRect = () => {
  // 首先尝试使用 uni.getMenuButtonBoundingClientRect()
  if (typeof uni?.getMenuButtonBoundingClientRect === "function")
    return uni.getMenuButtonBoundingClientRect();

  // 如果在H5环境或上述方法失败，返回一个模拟的位置
  const screenWidth =
    window?.innerWidth ||
    document?.documentElement?.clientWidth ||
    document?.body?.clientWidth;

  return {
    width: 0,
    height: 0,
    top: 0,
    right: screenWidth,
    bottom: 0,
    left: screenWidth,
  };
};
```
