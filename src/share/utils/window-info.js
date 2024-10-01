let windowInfo = null;

export const getWindowInfo = () => {
  if (!windowInfo) {
    windowInfo = {
      statusBarHeight: getStatusBarHeight(),
      titleBarHeight: getTitleBarHeight(),
      menuButtonRect: getCompatibleMenuButtonRect(),
    };
  }
  return windowInfo;
};

/** 获取状态栏高度 */
const getStatusBarHeight = () => uni.getSystemInfoSync().safeArea?.top || 0;

/** 获取标题栏高度 */
const getTitleBarHeight = () => {
  const { statusBarHeight } = uni.getSystemInfoSync();
  const { height: menuBtnHeight, top: menuBtnTop } =
    getCompatibleMenuButtonRect();
  if (menuBtnHeight === 0) return 48;
  return menuBtnHeight + (menuBtnTop - statusBarHeight) * 2;
};

/** 获取兼容的菜单按钮（胶囊按钮）的位置信息 */
const getCompatibleMenuButtonRect = () => {
  if (typeof uni?.getMenuButtonBoundingClientRect === "function")
    return uni.getMenuButtonBoundingClientRect();

  // 如果在H5环境或上述方法失败，返回一个模拟的位置
  const screenWidth =
    window?.innerWidth ||
    document?.documentElement?.clientWidth ||
    document?.body?.clientWidth;

  return {
    width: 0,
    height: 0,
    top: 0,
    right: screenWidth,
    bottom: 0,
    left: screenWidth,
  };
};
