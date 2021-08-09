/*
 * @Description: 
 * @Author: 幺五六
 * @Date: 2020-07-30 15:26:02
 * @LastEditors: 幺五六
 * @LastEditTime: 2020-12-02 17:31:18
 */ 

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}


/**
 * 查询url参数值
 * @param {string} name 参数名称
 */
export function queryUrlParam(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) return unescape(r[2]);
  return null;
}


/**
 * 打平数组 -> 等效ES6 Array.prototype.flat()
 * @param {array} arr 
 */
export function flat(arr) {
  return arr.reduce((pre, curr) => {
    return pre.concat(Array.isArray(curr)? flat(curr) : curr);
  }, [])
}