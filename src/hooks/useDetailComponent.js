
import { onBeforeMount, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { processSongs } from '@/service/song'
import storage from 'good-storage'

export default function useDetailComponent (props, key, fetch) {
  const route = useRoute()
  const router = useRouter()
  const songs = ref([])
  const loading = ref(true)

  const computedData = computed(() => {
    let ret = null
    if (props.data) {
      ret = props.data
    } else {
      const singer = storage.session.get(key)
      if (singer && singer.mid === route.params.id) {
        ret = singer
      }
    }
    return ret
  })
  const pic = computed(() => {
    const data = computedData.value
    return data && data.pic
  })
  const title = computed(() => {
    const data = computedData.value
    return data && (data.name || data.title)
  })
  onBeforeMount(async () => {
    const data = computedData.value
    // url 地址参数被直接在地址栏修改时
    if (!data) {
      const path = route.matched[0].path
      router.push({
        path
      })
      return
    }
    const result = await fetch(data)
    songs.value = await processSongs(result.songs)
    loading.value = false
  })

  return {
    pic,
    title,
    songs,
    loading
  }
}
