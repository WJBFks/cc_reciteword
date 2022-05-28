<template>
  <div class="navigation">
    <div class="logo-cover" @click="toHome">
      <div class="logo"></div>
      <div>CC背单词</div>
    </div>
    <div class="mid"></div>
    <div v-if="user.tel == ''" class="user">
      <el-button type="primary" round @click="toLogin('login')">登录</el-button>
      <el-button type="primary" plain round @click="toLogin('register')"
        >注册</el-button
      >
    </div>
    <div v-else class="user">
      <el-button @click="toUser">{{ user.name }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onUnmounted, ref } from "vue";
import { GetInfo, bus } from "./../scripts/tools";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface User {
  tel: string;
  email: string;
  name: string;
}
const user = ref({
  tel: "",
  email: "",
  name: "",
} as User);
const toHome = () => {
  router.push("/");
};
const toLogin = (mode: "login" | "register") => {
  if (mode == "login") {
    router.push("/login?mode=login");
  } else {
    router.push("/login?mode=register");
  }
};
const toUser = () => {
  router.push("/user");
};
const loginState = () => {
  GetInfo()
    .then((res) => {
      if ((res.data.user as User).tel) {
        user.value = res.data.user as User;
      }
    })
    .catch(() => {
      user.value = {
        tel: "",
        email: "",
        name: "",
      } as User;
    });
};
// bus绑定
const loginStateChange = () => {
  loginState();
};
bus.on("login-state-change", loginStateChange);
onUnmounted(() => {
  console.log("onUnmounted");
  bus.off("login-state-change", loginStateChange);
});
// start
loginState();
</script>

<style scoped lang="stylus">
.navigation
  padding 0
  height 100%
  width 100%
  background-color var(--D3)
  display flex
.logo-cover
  display flex
  color white
  cursor pointer
  & .logo
    height 50px
    width 100px
    margin-left 10px
    margin-top 8px
    background-image url('../assets/logo_white.png')
    background-size contain
    background-repeat no-repeat
  & div
    margin-left 10px
    margin-top 2px
    font-size 40px
.mid
  flex 1
.user
  padding 10px
  color var(--W1)
</style>
