<script setup lang="ts">
import Dialog from "@/components/Dialog"
import { useStore as useLetterStore } from "@/store/letter";
import { useMouse,useIntervalFn } from '@vueuse/core'
import { on } from "events";
const router = useRouter();
const letterStore = useLetterStore();
const buttondom = ref(null as HTMLInputElement|null);
function pointInsideCircle(point: number[], circle: number[], r: number) {  
        if (r===0) return false  
        var dx = circle[0] - point[0]  
        var dy = circle[1] - point[1]  
        return dx * dx + dy * dy <= r * r  
} 
const { x, y } = useMouse()

onMounted(() => {
  buttondom.value!.style.top=736+"px"
  buttondom.value!.style.left=883+"px"
  const { pause, resume, isActive } = useIntervalFn(() => {
    if (pointInsideCircle([x.value,y.value],[buttondom.value?.offsetLeft!+80,buttondom.value?.offsetTop!+25],100)){
      if ((buttondom.value?.offsetLeft! - (x.value-buttondom.value?.offsetLeft!))+80>window.innerWidth){
        buttondom.value!.style.left= (buttondom.value?.offsetLeft!-window.innerWidth - (x.value-buttondom.value?.offsetLeft!))+80+"px"
      }else if(buttondom.value?.offsetLeft!<0){
        buttondom.value!.style.left= (window.innerWidth -buttondom.value?.offsetLeft! - (x.value-buttondom.value?.offsetLeft!))-80+"px"
      }else{
        buttondom.value!.style.left=(buttondom.value?.offsetLeft! - (x.value-buttondom.value?.offsetLeft!))+80+"px"
      }
      if((buttondom.value?.offsetTop! - (y.value-buttondom.value?.offsetTop!))+25>window.innerHeight){
        buttondom.value!.style.top =(buttondom.value?.offsetTop! - window.innerHeight - (y.value-buttondom.value?.offsetTop!))+25+"px"
      }else if(buttondom.value?.offsetTop!<0){
        buttondom.value!.style.top= (window.innerHeight -buttondom.value?.offsetTop! - (y.value-buttondom.value?.offsetTop!))-25+"px"
      }else{
        buttondom.value!.style.top =(buttondom.value?.offsetTop! - (y.value-buttondom.value?.offsetTop!))+25+"px"
      }   
    }
  }, 60)
})



function to() {
  letterStore.one=true
  router.push("/two")
}

// Dialog('输入几天后发送', { title: '验证身份' });
const VERSION = import.meta.env.VITE_APP_VERSION;
const BUILD_DATE = import.meta.env.VITE_APP_BUILD_EPOCH
  ? new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH))
  : undefined;
const thisYear = new Date().getFullYear();
</script>
<template>
  
    <div
      class="flex overflow-hidden  flex-col justify-center items-center min-h-screen w-full inset-0 bg-[url(/img/grid.svg)] bg-top"
    >
    <h1 class="text-[50px] font-bold">生日快乐!!!🎂</h1>
    <img src="@/assets/cake.png" class="select-none touch-none w-[50%] h-[50%]">
    <button @click="to" ref="buttondom" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 absolute w-[150px] h-[50px]">进入</button>
    <footer class="py-6 text-sm text-center text-gray-700">
        <p>
          Birthday by
          <a class="underline" href="https://xn--1rwt7c.online/">@DROWNING</a>
          &copy; 2022-{{ thisYear }}.
          <template v-if="BUILD_DATE">
            Site built {{ BUILD_DATE.toLocaleDateString() }}.
          </template>
          <template v-else> Development mode. </template>
        </p>
      </footer>
  </div>
</template>

<style>
</style>