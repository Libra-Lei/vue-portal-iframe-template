/**
 * @Description: 
 * @Author: Libra
 * @GitHub: https://github.com/Libra-Lei
 * @Date: 2021-08-06 16:10:43
 * @LastEditors: Libra
 * @LastEditTime: 2021-08-09 10:34:03
 */
/**
 * 导航菜单
 */
export function navMeuns() {
  return [
    {
      url: "/index",
      name: "首页",
      slug: "home",
      icon: "HomeIcon",
    },
    {
      url: "/warehouse",
      name: "Page 2",
      slug: "page2",
      icon: "FileIcon",
    },
  ]
}

/**
 * 场站切换菜单
 */
export function siteMenus() {
  const siteGroup = [];
  const menus = siteGroup.map(x => {
    return {
      level: 2,
      url: null,
      name: x.proName,
      groupId: x.proCode,
      submenu: x.windFarms.map(y => {
        return {
          level: 3,
          id: y.windFarm,
          groupId: x.proCode,
          url: '',
          name: y.windFarmTitle
        }
      })
    }
  });

  return [{
    level: 1,
    url: null,
    name: "",
    icon: 'true',
    submenu: menus
  }];
}
