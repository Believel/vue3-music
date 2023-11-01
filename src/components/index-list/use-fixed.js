import { ref, watch, computed, nextTick } from 'vue'
export default function useFixed (props) {
  const groupRef = ref(null)
  // 所有标题模块的高度，累加计算的
  const listHeights = ref([])
  const currentIndex = ref(0)
  // 页面滚动的y坐标值
  const scrollY = ref(0)
  const distance = ref(0)

  const fixedTitle = computed(() => {
    const group = props.singers[currentIndex.value]
    return group ? group.title : ''
  })

  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < 30) ? distanceVal - 30 : 0
    return {
      transform: `translate3d(0, ${diff}px, 0)`
    }
  })

  // 监听 getter 函数
  watch(() => props.singers, async () => {
    await nextTick()
    calculate()
  })

  watch(scrollY, (newY) => {
    const listHeightVal = listHeights.value
    for (let i = 0; i < listHeightVal.length - 1; i++) {
      const heightTop = listHeightVal[i]
      const heightBottom = listHeightVal[i + 1]
      // 滚动 Y 值在两者之间
      if (newY >= heightTop && newY <= heightBottom) {
        // 得到当前滚动的索引列表项
        currentIndex.value = i
        distance.value = heightBottom - newY
        break
      }
    }
  })

  // 计算每个标题模块的高度区间
  function calculate () {
    // 获取所有列表项元素
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value
    let height = 0
    // 初始化数据
    listHeightsVal.length = 0
    listHeightsVal.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }
  // 暴露给外部使用的滚动事件函数
  function onScroll (pos) {
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle
  }
}
