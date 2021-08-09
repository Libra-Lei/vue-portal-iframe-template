import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList"
import themeConfig from "@/../themeConfig.js"
import colors from "@/../themeConfig.js"

const state = {
  bodyOverlay             : false,
  isVerticalNavMenuActive : true,
  mainLayoutType          : themeConfig.mainLayoutType || "vertical",
  navbarSearchAndPinList  : navbarSearchAndPinList,
  reduceButton            : themeConfig.sidebarCollapsed,
  verticalNavMenuWidth    : "default",
  verticalNavMenuItemsMin : false,
  scrollY                 : 0,
  starredPages            : navbarSearchAndPinList.data.filter((page) => page.highlightAction),
  theme                   : themeConfig.theme || "dark",
  themePrimaryColor       : colors.primary,
  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar & navbar component
  windowWidth: null,

  //自定义添加的，用于动态调整首页全屏高度
  navbarType: themeConfig.theme //  static / sticky / hidden
}

const mutations = {
  // Vertical NavMenu

  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
    state.isVerticalNavMenuActive = value
  },
  TOGGLE_REDUCE_BUTTON(state, val) {
    state.reduceButton = val
  },
  UPDATE_MAIN_LAYOUT_TYPE(state, val) {
    state.mainLayoutType = val
  },
  UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
    state.verticalNavMenuItemsMin = val
  },
  UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
    state.verticalNavMenuWidth = width
  },

  // VxAutoSuggest
  UPDATE_STARRED_PAGE(state, payload) {

    // find item index in search list state
    const index = state.navbarSearchAndPinList.data.findIndex((item) => item.index == payload.index)

    // update the main list
    state.navbarSearchAndPinList.data[index].highlightAction = payload.val

    // if val is true add it to starred else remove
    if (payload.val) {
      state.starredPages.push(state.navbarSearchAndPinList.data[index])
    }
    else {
      // find item index from starred pages
      const index = state.starredPages.findIndex((item) => item.index == payload.index)

      // remove item using index
      state.starredPages.splice(index, 1)
    }
  },

  // Navbar-Vertical
  ARRANGE_STARRED_PAGES_LIMITED(state, list) {
    const starredPagesMore = state.starredPages.slice(10)
    state.starredPages     = list.concat(starredPagesMore)
  },
  ARRANGE_STARRED_PAGES_MORE(state, list) {
    let downToUp                 = false
    let lastItemInStarredLimited = state.starredPages[10]
    const starredPagesLimited    = state.starredPages.slice(0, 10)
    state.starredPages           = starredPagesLimited.concat(list)

    state.starredPages.slice(0, 10).map((i) => {
      if (list.indexOf(i) > -1) downToUp = true
    })

    if (!downToUp) {
      state.starredPages.splice(10, 0, lastItemInStarredLimited)
    }
  },

  // ////////////////////////////////////////////
  // UI
  // ////////////////////////////////////////////

  TOGGLE_CONTENT_OVERLAY(state, val) { state.bodyOverlay       = val },
  UPDATE_PRIMARY_COLOR(state, val)   { state.themePrimaryColor = val },
  UPDATE_THEME(state, val)           { state.theme             = val },
  UPDATE_WINDOW_WIDTH(state, width)  { state.windowWidth       = width },
  UPDATE_WINDOW_SCROLL_Y(state, val) { state.scrollY = val },
  
  //自定义添加的，用于动态调整首页全屏高度
  UPDATE_NAVBAR_TYPE(state, val)     { state.navbarType = val }
}

const actions = {
  // Vertical NavMenu
  updateVerticalNavMenuWidth({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  // VxAutoSuggest
  updateStarredPage({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme({ commit }, val) {
    commit('UPDATE_THEME', val)
  },

  //自定义添加的，用于动态调整首页全屏高度
  updateNavbarType({ commit }, val) {
    commit('UPDATE_NAVBAR_TYPE', val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}