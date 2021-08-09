/**
 * @Description: 
 * @Author: Libra
 * @GitHub: https://github.com/Libra-Lei
 * @Date: 2021-08-06 16:10:42
 * @LastEditors: Libra
 * @LastEditTime: 2021-08-06 16:25:51
 */
/**
 * 动态路由数据 （菜单内容）
 */
import service from "./service";
import { route as routeUrl } from "./url";

/**
 * 获取路由数据
 */
export function getRoutes() {
  return new Promise(resolve => {
    resolve(demoRoutes);
  });
}

/**
 * 没有后台数据时候临时充当
 */
const demoRoutes = {
  routes: [
    {
      path: "/",
      pathName: "Dashboard",
      redirect: "/index",
      hidden: 0,
      menuName: "首页",
      icon: "HomeIcon",
      address: "",
      sort: 1
    },
    {
      path: "/monitor",
      pathName: "Monitor",
      redirect: "/monitor/index",
      hidden: 0,
      menuName: "监控中心",
      icon: "AirplayIcon",
      address: "http://192.168.1.151:8101",
      sort: 2
    },
    {
      path: "/health",
      pathName: "Health",
      redirect: "/health/index",
      hidden: 0,
      menuName: "健康中心",
      icon: "DropletIcon",
      address: "http://192.168.1.151:8105",
      sort: 3
    },
    {
      path: "/pro",
      pathName: "Pro",
      redirect: "/pro/index",
      hidden: 0,
      menuName: "生产中心",
      icon: "CalendarIcon",
      address: "http://192.168.1.151:8103",
      sort: 4
    },
    {
      path: "/data",
      pathName: "Data",
      redirect: "/data/index",
      hidden: 0,
      menuName: "数据中心",
      icon: "ArchiveIcon",
      address: "http://192.168.1.151:5004/",
      sort: 5
    }
  ]
};