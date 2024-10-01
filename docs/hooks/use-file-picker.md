# useFilePicker

```js
const useFilePicker = (option = {}) => {
  const { uploadOption = {} } = option;

  const fileList = ref([]);

  const uploadFiles = async (tempFilePaths) => {
    while (tempFilePaths.length > 0) {
      const tempFilePath = tempFilePaths.shift();
      await uploadFile(tempFilePath);
    }

    // 刷新数据
    await nextTick();
    fileList.value = [...fileList.value];
  };
  const uploadFile = async (filePath) => {
    const uploadResult = await useUpload({
      filePath,
      showLoading: true,
      ...uploadOption,
    }).fetch();

    const fileInfo = url2FileInfo(uploadResult.fullurl);
    fileList.value.push(fileInfo);
  };

  const handleAdd = () => {
    uni.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        uploadFiles(res.tempFiles.map((item) => item.path));
      },
    });
  };
  const handleSelect = (res) => {
    uploadFiles(res.tempFilePaths);
  };
  const handleDelete = (index) => {
    fileList.value.splice(index, 1);
    fileList.value = [...fileList.value];
  };

  return {
    fileList,
    handleAdd,
    handleSelect,
    handleDelete,
  };
};

/* 解析 url 获取文件名称、扩展名、完整路径 */
const url2FileInfo = (url) => {
  const lastSlashIndex = url.lastIndexOf("/");
  const fileName = url.slice(lastSlashIndex + 1);
  const fileNameParts = fileName.split(".");
  const extname = fileNameParts.length > 1 ? fileNameParts.pop() : "";
  const name = fileNameParts.join(".");

  return {
    name,
    extname,
    url,
  };
};
```
