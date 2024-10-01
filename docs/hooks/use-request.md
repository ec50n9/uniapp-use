# useRequest

快速创建一个请求，并取得响应结果、加载状态等变量。

```js
export const useRequest = (option = {}) => {
  const {
    baseUrl = Common.baseUrl,
    needToken = true,
    defaultData = null,
  } = option;

  const _data = ref(defaultData);
  const loading = ref(false);

  const request = (newOption = {}) => {
    const {
      url,
      method = "GET",
      data = {},
      header = {},
      preHandler = (v) => v,

      showLoading = false,
      loadingText = "加载中...",

      showError = true,
      beforeError,
    } = {
      ...option,
      ...newOption,
    };

    const token = needToken ? getTokenOrLogin() : undefined;

    if (showLoading) {
      uni.showLoading({
        title: loadingText,
        mask: true,
      });
    }
    loading.value = true;

    // 获取 url
    let _url;
    if (typeof url === "function") {
      _url = url();
    } else {
      _url = url;
    }

    // 获取 data
    let bodyData;
    if (typeof data === "function") {
      bodyData = data();
    } else {
      bodyData = data;
    }

    return uni
      .request({
        url: baseUrl + _url,
        method,
        header: {
          token,
          ...header,
        },
        data: bodyData,
      })
      .then((res) => {
        if (res.data.code === 1) {
          _data.value = preHandler(res.data.data);
          return _data.value;
        }
        // 跳转登录页面
        // if (res.data.code === 401) {
        //   uni.redirectTo({
        //     url: "/path/to/login",
        //   });
        // }
        throw new Error(res.data.msg);
      })
      .catch((e) => {
        showError &&
          uni.showToast({
            title: e.message,
            icon: "none",
            duration: 1500,
          });
        beforeError?.(e.code, e.message);
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
    data: _data,
    loading,
    fetch: request,
  };
};
```
