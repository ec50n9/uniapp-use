import { ref } from "vue";

// TODO: 基础 url
const BASE_URL = "";
// TODO: 成功的响应码
const SUCCESS_CODE = 1;

// TODO: 当响应码不正确时，检查状态码
const checkResAndThrow = (data) => {
  // 跳转登录页面
  if (data.code === 401) toLogin();
  throw new Error(data.msg);
};

// TODO: 获取 token, 报错或返回 token
const getToken = () => {};

// TODO: 跳转登录页面
const toLogin = () => {};

export const useRequest = (option = {}) => {
  const { defaultData } = option;
  const _data = ref(defaultData);
  const loading = ref(false);
  const error = ref(null);

  const fetch = (newOption = {}) => {
    const {
      baseUrl = BASE_URL,
      url,
      method = "GET",
      timeout = 60000,
      needToken = true,
      headers = {},
      data = {},
      preHandler = (v) => v,

      showLoading = false,
      loadingText = "加载中...",

      showError = true,
      beforeError,

      ...rest
    } = { ...option, ...newOption };

    let token;
    if (needToken) {
      try {
        token = getToken();
        if (!token) throw new Error("获取token失败");
      } catch (e) {
        toLogin();
        throw e;
      }
    }

    loading.value = true;
    if (showLoading) {
      uni.showLoading({
        title: loadingText,
        mask: true,
      });
    }

    return uni
      .request({
        url: baseUrl + calcIfFunction(url),
        method,
        header: {
          token,
          ...calcIfFunction(headers),
        },
        data: calcIfFunction(data),
        timeout,
        ...rest,
      })
      .then((res) => {
        if (res.data.code === SUCCESS_CODE) {
          _data.value = preHandler(res.data.data);
          return _data.value;
        }
        checkResAndThrow(res.data);
      })
      .catch((e) => {
        error.value = beforeError?.(e) || e.message;
        showError &&
          uni.showToast({
            title: e.message,
            icon: "none",
            duration: 1500,
          });
        throw e;
      })
      .finally(() => {
        loading.value = false;

        if (showLoading) uni.hideLoading();
      });
  };

  return {
    data: _data,
    loading,
    fetch,
    error,
  };
};

/** 如果参数是函数，则执行函数，否则直接返回参数 */
const calcIfFunction = (v) => (typeof v === "function" ? v() : v);
