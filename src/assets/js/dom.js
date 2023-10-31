/**
 * 元素上添加类名
 * @param {*} el DOM 元素
 * @param {*} className 类名
 */
export function addClass (el, className) {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}
/**
 * 元素上删除类名
 * @param {*} el DOM 元素
 * @param {*} className 类名
 */
export function removeClass (el, className) {
  el.classList.remove(className)
}
