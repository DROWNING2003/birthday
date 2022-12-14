<script setup lang="ts">
import "quarkd/lib/field";
import { useStore as useLetterStore } from "@/store/letter";
const letterStore = useLetterStore();

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  close: {
    type: Function,
    default: (fun: () => any) => fun(),
  },
});
const emit = defineEmits(["update:show"]);
const user = reactive({
  name: "",
  birthday: "",
});
const handleClose = () => {
    emit("update:show", false);
};

function send() {
  if (user.name=="朱舟" || user.birthday=="11-21") {
    letterStore.login=true
    return true
  }else{
    alert("验证失败")
    return false
  }
}
</script>

<template>
  <div v-if="show" class="dialog-mask flex-center">
    <div class="dialog-box p-4">
      <div class="dialog-header">{{ title }}</div>
      <slot
        >
        <div class="mb-3 xl:w-[90%]">
          <label
            for="exampleFormControlInpu3"
            class="form-label inline-block mb-2 text-gray-700"
            >名字</label
          >
          <input
            type="text"
            class="form-control w-full block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput3"
            v-model="user.name"
            placeholder="名字"
          />
        </div>
        <div class="mb-3 xl:w-[90%]">
          <label
            for="exampleFormControlInpu3"
            class="form-label inline-block mb-2 text-gray-700"
            >生日</label
          >
          <input
            type="text"
            class="form-control w-full block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput3"
            v-model="user.birthday"
            placeholder="例:11-11"
          />
        </div>
      </slot>
      <div class="dialog-footer">
        <button class="button dialog-confirm" @click='send() ? close(handleClose):null'>验证</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[number] {
  font: 14px normal normal uppercase helvetica, arial, serif;
  color: #7c7873;
  background: none;
  width: 3rem;
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
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.dialog-box {
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
}

.dialog-header {
  padding-top: 20px;
  font-weight: bold;
  text-align: center;
}

.dialog-content {
  padding: 5px 20px 20px 20px;
  font-size: 12px;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.dialog-footer {
  display: flex;
  overflow: hidden;
  user-select: none;
  border-top: 1px solid #ebedf0;
}

.button {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  line-height: 40px;
  background-color: #fff;
}
.button:active {
  background-color: #f2f3f5;
}
.dialog-confirm {
  color: #409eff;
}
</style>
