/**
 * @Description: 
 * @Author: Libra
 * @GitHub: https://github.com/Libra-Lei
 * @Date: 2021-08-06 16:10:43
 * @LastEditors: Libra
 * @LastEditTime: 2021-08-06 17:19:42
 */

const getters = {
  themePrimaryColor: state => state.app.themePrimaryColor,
  bodyOverlay: state => state.app.bodyOverlay,
  mainLayoutType: state => state.app.mainLayoutType,
  reduceButton: state => state.app.reduceButton,
  routerTransition: state => state.app.routerTransition,
  theme: state => state.app.theme,
  windowWidth: state => state.app.windowWidth,
  navbarSearchAndPinList: state => state.app.navbarSearchAndPinList,
  scrollY: state => state.app.scrollY,
  verticalNavMenuWidth: state => state.app.verticalNavMenuWidth,
  starredPages: state => state.app.starredPages,
  isVerticalNavMenuActive: state => state.app.isVerticalNavMenuActive,
  verticalNavMenuItemsMin: state => state.app.verticalNavMenuItemsMin,
  navbarType: state => state.app.navbarType,

  AppActiveUser: state => {
    const stateInfo = state.user.AppActiveUser;
    if (!stateInfo.userName) {
      const storageInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!storageInfo || !storageInfo.userName) {
        return stateInfo;
      } else {
        return storageInfo;
      }
    }
    return stateInfo;
  },
  token: state => {
    if (typeof(state.user.token) === 'string') {
      try {
        return JSON.parse(state.user.token);
      } catch(e) {
        return undefined;
      }
    }
    return state.user.token
  },

  windowBreakPoint: state => {
    // This should be same as tailwind. So, it stays in sync with tailwind utility classes
    if (state.windowWidth >= 1200) return "xl"
    else if (state.windowWidth >= 992) return "lg"
    else if (state.windowWidth >= 768) return "md"
    else if (state.windowWidth >= 576) return "sm"
    else return "xs"
  }
}

export default getters
