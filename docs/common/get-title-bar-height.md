# getTitleBarHeight

```js
/** 获取标题栏高度 */
export const getTitleBarHeight = () => {
  const { statusBarHeight } = uni.getSystemInfoSync();
  const { height: menuBtnHeight, top: menuBtnTop } =
    getCompatibleMenuButtonRect();
  if (menuBtnHeight === 0) {
    return 48;
  }
  return menuBtnHeight + (menuBtnTop - statusBarHeight) * 2;
};
```
