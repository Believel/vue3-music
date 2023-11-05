import { addClass, removeClass } from './dom'
import { createApp } from 'vue'

const relativeCls = 'g-relative'

export default function createLoadingLikeDirective (Comp) {
  return {
    // 在绑定元素的父组件及它自己的所有子节点都挂载完成后调用
    mounted (el, binding) {
      // 一个应用可以创建多个 app
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div'))
      const name = Comp.name
      // 动态定义一个对象，是为了防止多个组件作用与同一个页面上值被替换掉
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance
      // 获取自定义参数 title 值
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }
      // 获取传递指令的值
      if (binding.value) {
        append(el)
      }
    },
    // 在绑定元素的父组件及他自己的所有子节点都更新后调用
    updated (el, binding) {
      const name = Comp.name
      const title = binding.arg
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }
  // 添加元素
  function append (el) {
    const name = Comp.name
    const style = getComputedStyle(el)
    // 防止页面元素没有设置此类属性值
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
      addClass(el, relativeCls)
    }
    el.appendChild(el[name].instance.$el)
  }
  // 删除元素
  function remove (el) {
    const name = Comp.name
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}
