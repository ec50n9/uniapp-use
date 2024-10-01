# useUpload

```js
/** 上传请求封装 */
export const useUpload = (option = {}) => {
  const { baseUrl = Common.baseUrl, filePath } = option;

  if (!filePath) {
    throw new Error("请传入文件路径");
  }

  const loading = ref(false);

  const request = (newOption = {}) => {
    const {
      header = {},
      preHandler = (v) => v,

      showLoading = false,
      loadingText = "上传中...",
    } = {
      ...option,
      ...newOption,
    };

    if (showLoading) {
      uni.showLoading({
        title: loadingText,
        mask: true,
      });
    }
    loading.value = true;

    return uni
      .uploadFile({
        url: `${baseUrl}common/upload`,
        filePath,
        name: "file",
        header: { token: getTokenOrLogin(), ...header },
      })
      .then((res) => {
        const _res = JSON.parse(res.data);
        if (_res.code === 1) {
          return preHandler(_res.data);
        }
        throw new Error(_res.msg);
      })
      .catch((e) => {
        uni.showToast({
          title: e.message,
          icon: "none",
          duration: 1500,
        });
        throw e;
      })
      .finally(() => {
        loading.value = false;

        if (showLoading) {
          uni.hideLoading();
        }
      });
  };

  return {
    loading,
    fetch: request,
  };
};
```
