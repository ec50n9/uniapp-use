# formatPrice

```js
/** 将以分为单位的数字转换为保留两位小数的字符串 */
export const formatPrice = (num, isCent = false) => {
  const value = isCent ? +num / 100 : +num;
  return value.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
};
```
