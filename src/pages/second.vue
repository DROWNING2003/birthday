<script setup lang="ts">
import { ref } from "vue";
import { useStore as useLetterStore } from "@/store/letter";
import { onKeyStroke, useIntervalFn } from "@vueuse/core";
const router = useRouter();
const letterStore = useLetterStore();
const translateX = ref(0);
const translateY = ref(0);
const rotateY = ref(0);
const giftdom = ref(null as HTMLInputElement | null);
const role = ref(null as HTMLInputElement | null);
onKeyStroke(["a", "A", "ArrowLeft"], (e: KeyboardEvent) => {
  translateX.value -= 10;
  rotateY.value = 180;
});
onKeyStroke(["d", "D", "ArrowRight"], (e: KeyboardEvent) => {
  translateX.value += 10;
  rotateY.value = 0;
});
onMounted(() => {
  giftdom.value!.style.top = "0px";
  giftdom.value!.style.left = Math.floor(Math.random() * 1500)+"px";
    console.log(giftdom.value!.style.left)
  const { pause, resume, isActive } = useIntervalFn(() => {
    giftdom.value!.style.display = "block";
    let gemTop = giftdom.value!.style.top.split("px")[0];
    gemTop = eval(gemTop) + 10;
    giftdom.value!.style.top = gemTop + "px";
    // 宝石到达判定线
    console.log(role.value?.offsetLeft)
    if (giftdom.value!.offsetTop > 700) {
        alert("成功");
        to()
    //   if (isCatch(giftdom.value!)) {
        
    //   } else {
    //     alert("失败啦");
    //   }
    }
  }, 100);
});
// 判定是否接住宝石
function isCatch(gemEl: HTMLInputElement) {
  let gemLeft = gemEl.offsetLeft;
  let carLeft = role.value!.offsetLeft;

  if (
    gemLeft + 20 >= carLeft && // 最左侧判定
    gemLeft <= carLeft + 90 // 最右侧判定
  )
    return true;
  else return false;
}
function to() {
  letterStore.two=true
  router.push("/three")
}
</script>

<template>
  <div
    class="flex overflow-hidden flex-col justify-center items-center min-h-screen w-full inset-0 bg-[url(/img/grid.svg)] bg-top"
  >
    <div class="container border-base">
      <img
        id="gift"
        ref="giftdom"
        src="@/assets/gift.png"
        class="absolute w-[100px] h-[100px]"
      />
      <img
        ref="role"
        src="@/assets/role.png"
        :style="{
          transform: `translate(${translateX}px, ${translateY}px) rotateY(${rotateY}deg)`,
        }"
        class="inline ball bg select-none touch-none w-[100px] h-[100px]"
      />
    </div>
    <div class="text-center mt-4">使用A/D接住礼物</div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 830px;
  margin: auto;
  overflow: hidden;
  border: 4px solid #a1a1a130;
  border-radius: 5px;
}
.ball {
  position: absolute;
  bottom: 10px;
  background-image: url(@/assets/role.png);
}
</style>
