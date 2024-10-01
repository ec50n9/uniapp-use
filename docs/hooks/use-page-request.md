# usePageRequest

快速创建一个分页请求，并取得响应结果、加载状态等变量。

```js
/** 分页请求 */
export const usePageRequest = (option = {}) => {
  const {
    currentPage: currentPageOption = 1,
    pageSize: pageSizeOption = 20,
    currentPageKey = "page",
    pageSizeKey = "limit",
  } = option;

  const currentPage = ref(currentPageOption);
  const lastPage = ref(0);
  const pageSize = ref(pageSizeOption);

  const { data, loading, fetch } = useRequest({
    ...option,
    data: () => ({
      ...(typeof option.data === "function"
        ? option.data()
        : option.data || {}),
      [currentPageKey]: currentPage.value,
      [pageSizeKey]: pageSize.value,
    }),
    defaultData: [],
    preHandler: (resData) => {
      currentPage.value = resData.current_page;
      lastPage.value = resData.last_page;
      return [...data.value, ...resData.data];
    },
  });
  const loadMoreStatus = computed(() => {
    if (loading.value) return "loading";
    if (currentPage.value === lastPage.value || lastPage.value === 0)
      return "nomore";
    return "more";
  });
  const handleLoadMore = () => {
    if (loadMoreStatus.value === "more") {
      currentPage.value++;
      fetch();
    }
  };
  const handleRefresh = () => {
    currentPage.value = 1;
    data.value = [];
    fetch();
  };
  return {
    data,
    loading,
    fetch,
    loadMoreStatus,
    currentPage,
    lastPage,
    pageSize,
    handleLoadMore,
    handleRefresh,
  };
};
```
