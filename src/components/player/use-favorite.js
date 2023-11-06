import { usePlayStore } from '@/store/player'
import { computed } from 'vue'
import { remove, save } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'
export default function useFavorite () {
  const store = usePlayStore()
  const favoriteList = computed(() => store.favoriteList)
  // 最大长度限制
  const maxLen = 100

  function getFavoriteIcon (song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  function toggleFavorite (song) {
    let list
    if (isFavorite(song)) {
      // 移除
      list = remove(FAVORITE_KEY, compare)
    } else {
      // 添加
      list = save(song, FAVORITE_KEY, compare, maxLen)
    }
    store.setFavoriteList(list)
    function compare (item) {
      return item.id === song.id
    }
  }

  function isFavorite (song) {
    return favoriteList.value.findIndex(item => {
      return item.id === song.id
    }) > -1
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}
