import { defineConfig, presetIcons } from "unocss";
import { presetUni } from "@uni-helper/unocss-preset-uni";

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        carbon: () =>
          import("@iconify-json/carbon/icons.json").then((i) => i.default),
      },
    }),
    presetUni({ attributify: true }),
  ],
  extendTheme: (theme) => ({
    ...theme,
    spacing: {
      ...theme.spacing,
      // 安全距离
      "safe-top": "env(safe-area-inset-top)",
      "safe-right": "env(safe-area-inset-right)",
      "safe-bottom": "env(safe-area-inset-bottom)",
      "safe-left": "env(safe-area-inset-left)",
      st: "env(safe-area-inset-top)",
      sr: "env(safe-area-inset-right)",
      sb: "env(safe-area-inset-bottom)",
      sl: "env(safe-area-inset-left)",
    },
  }),
  rules: [
    // 页面安全高度
    [
      "h-safe",
      { height: "calc(100vh - var(--window-top) - var(--window-bottom))" },
    ],
  ],
  shortcuts: [["p-safe", "pt-st pb-sb pr-sr pl-sl"]],
});
