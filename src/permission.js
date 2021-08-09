/**
 * @Description: 
 * @Author: Libra
 * @GitHub: https://github.com/Libra-Lei
 * @Date: 2021-08-06 16:10:42
 * @LastEditors: Libra
 * @LastEditTime: 2021-08-06 18:13:01
 */
import router from '@/routes'

router.beforeEach(async (to, from, next) => {
  next();
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})
