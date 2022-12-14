<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const address = "@/../public/song.mp3"

const gif = ref<HTMLElement | null>(null)
onMounted(()=>{
    const { isFullscreen, enter, exit, toggle } = useFullscreen(gif)
    toggle()
})
</script>
<template>
  
  <div  class="flex overflow-hidden  flex-col justify-center items-center min-h-screen w-full">
    <audio
    class="fixed bottom-2 right-2"  
    :src=address
    controls
    ref=""
    autoplay="true"
    :hidden=true
  ></audio>
    <img ref="gif" src="@/assets/gif.gif" class="min-h-screen"/>
  </div>
</template>

<style></style>
