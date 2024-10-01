import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Uni App Use",
  description: "一些比较常用的 uni-app 工具函数",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "快速开始", link: "/" },
      { text: "示例", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "工具 hooks",
        items: [
          { text: "useRequest", link: "/hooks/use-request.md" },
          { text: "usePageRequest", link: "/hooks/use-page-request.md" },
          { text: "useUpload", link: "/hooks/use-upload.md" },
          { text: "useFilePicker", link: "/hooks/use-file-picker.md" },
        ],
      },
      {
        text: "公共函数",
        items: [
          { text: "获取状态栏高度", link: "/common/get-status-bar-height.md" },
          { text: "获取标题栏高度", link: "/common/get-title-bar-height.md" },
          {
            text: "获取菜单按钮（胶囊按钮）位置",
            link: "/common/get-compatible-menu-button-rect.md",
          },
          { text: "预览 pdf", link: "/common/preview-pdf.md" },
          { text: "格式化价格", link: "/common/format-price.md" },
        ],
      },
      {
        text: "公共配置",
        items: [{text: "unocss", link: "/config/unocss.md"}]
      },
      {
        text: "示例",
        items: [
          { text: "Markdown 示例", link: "/markdown-examples" },
          { text: "Runtime API 示例", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
