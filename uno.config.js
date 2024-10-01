import { defineConfig, presetIcons, transformerVariantGroup } from "unocss";
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
  transformers: [transformerVariantGroup()],
  extendTheme: (theme) => {
    return {
      ...theme,
      spacing: {
        ...theme.spacing,
        // 安全距离
        "safe-t": "env(safe-area-inset-top, 0px)",
        "safe-r": "env(safe-area-inset-right, 0px)",
        "safe-b": "env(safe-area-inset-bottom, 0px)",
        "safe-l": "env(safe-area-inset-left, 0px)",
      },
    };
  },
  rules: [
    // 页面安全高度
    [
      "h-safe",
      { height: "calc(100vh - var(--window-top) - var(--window-bottom))" },
    ],
  ],
  shortcuts: [["p-safe", "pt-st pb-sb pr-sr pl-sl"]],
});
