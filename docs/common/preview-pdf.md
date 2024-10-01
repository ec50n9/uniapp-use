# 预览 pdf

```js
//  预览文件
export const previewPdf = (url) => {
  const { osName, uniPlatform } = uni.getSystemInfoSync();
  console.log("osName", osName);
  console.log("uniPlatform", uniPlatform);

  // ios 的 app 和 web 直接跳转预览
  if (osName === "ios" && ["app", "web"].includes(uniPlatform)) {
    console.log("跳转到pdfView并预览pdf文档。");
    //跳转到pdfView并预览pdf文档。
    uni.navigateTo({
      url: `/pages-sub/pdfViewer/pdfViewer?url=${encodeURIComponent(url)}`,
    });
    return;
  }

  // ios 小程序、安卓小程序、安卓 app、安卓 h5 需要先下载
  uni.showLoading({
    title: "正在下载",
    mask: true,
  });
  uni.downloadFile({
    //需要预览的文件地址
    url,
    success: (res) => {
      if (res.statusCode === 200) {
        //下载成功，得到文件临时地址
        console.log("下载成功", res.tempFilePath);

        if (uniPlatform === "mp-weixin") {
          // 小程序通过自身打开
          uni.openDocument({
            filePath: res.tempFilePath,
          });
          return;
        }

        let localUrl;
        if (uniPlatform === "web") {
          localUrl = res.tempFilePath;
        } else if (uniPlatform === "app") {
          localUrl = plus.io.convertLocalFileSystemURL(res.tempFilePath);
        }
        uni.navigateTo({
          url: `/pages-sub/pdfViewer/pdfViewer?url=${encodeURIComponent(localUrl)}`,
        });
      }
    },
    complete: () => {
      uni.hideLoading();
    },
  });
};
```
