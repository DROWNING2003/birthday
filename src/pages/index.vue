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

<style scoped>
#form_wrap {
  overflow: hidden;
  height: 470px;
  position: relative;
  top: 0px;
  -webkit-transition: all 1s ease-in-out 0.3s;
  -moz-transition: all 1s ease-in-out 0.3s;
  -o-transition: all 1s ease-in-out 0.3s;
  transition: all 1s ease-in-out 0.3s;
}

#form_wrap:before {
  content: "";
  position: absolute;
  box-sizing: content-box;
  bottom: 128px;
  /* left: 0px; */
  background-size: 100%;
  background: url("@/assets/before.png") center/100% auto no-repeat;
  width: 100%;
  height: 316px;
}
@media screen and (max-width: 650px) {
  #form_wrap:before {
    bottom: calc(100vw / 6);
  }
}
#form_wrap:after {
  content: "";
  position: absolute;
  bottom: 0px;
  background-size: 100%;
  background: url("@/assets/after.png") center/100% auto no-repeat;
  /* background: url("@/assets/after.png"); */
  width: 100%;
  height: 260px;
}

form {
  background: #f7f2ec url("@/assets/letter_bg.png");
  position: relative;
  top: 200px;
  overflow: hidden;
  height: 200px;
  width: 80%;
  margin: 0px auto;
  padding: 20px;
  border: 1px solid #fff;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  box-shadow: 0px 0px 3px #9d9d9d, inset 0px 0px 27px #fff;
  -moz-box-shadow: 0px 0px 3px #9d9d9d, inset 0px 0px 14px #fff;
  -webkit-box-shadow: 0px 0px 3px #9d9d9d, inset 0px 0px 27px #fff;
  -webkit-transition: all 1s ease-in-out 0.3s;
  -moz-transition: all 1s ease-in-out 0.3s;
  -o-transition: all 1s ease-in-out 0.3s;
  transition: all 1s ease-in-out 0.3s;
}

#form_wrap:hover form {
  height: 530px;
}

label {
  margin: 11px 20px 0 0;
  font-size: 16px;
  color: #b3aba1;
  text-transform: uppercase;
  text-shadow: 0px 1px 0px #fff;
}

input[type="text"],
textarea {
  font: 14px normal normal uppercase helvetica, arial, serif;
  color: #7c7873;
  background: none;
  width: 380px;
  height: 36px;
  padding: 0px 10px;
  margin: 0 0 10px 0;
  border: 1px solid #f8f5f1;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-box-shadow: inset 0px 0px 1px #726959;
  -webkit-box-shadow: inset 0px 0px 1px #b3a895;
  box-shadow: inset 0px 0px 1px #b3a895;
}

textarea {
  height: 80px;
  padding-top: 14px;
}

textarea:focus,
input[type="text"]:focus {
  background: rgba(255, 255, 255, 0.35);
}

#form_wrap input[type="submit"] {
  position: relative;
  font-family: "YanoneKaffeesatzRegular";
  font-size: 24px;
  color: #7c7873;
  text-shadow: 0 1px 0 #fff;
  width: 100%;
  text-align: center;
  opacity: 0;
  background: none;
  cursor: pointer;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transition: opacity 0.6s ease-in-out 0s;
  -moz-transition: opacity 0.6s ease-in-out 0s;
  -o-transition: opacity 0.6s ease-in-out 0s;
  transition: opacity 0.6s ease-in-out 0s;
}

#form_wrap:hover input[type="submit"] {
  z-index: 1;
  opacity: 1;
  -webkit-transition: opacity 0.5s ease-in-out 1.3s;
  -moz-transition: opacity 0.5s ease-in-out 1.3s;
  -o-transition: opacity 0.5s ease-in-out 1.3s;
  transition: opacity 0.5s ease-in-out 1.3s;
}

#form_wrap:hover input:hover[type="submit"] {
  color: #435c70;
}
</style>
