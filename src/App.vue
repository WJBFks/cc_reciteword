<template>
  <div id="app">
    <el-container>
      <el-header><navigation></navigation></el-header>
      <el-container>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          router="true"
        >
          <el-menu-item class="title" index="0" disabled>
            <el-icon v-if="isCollapse"><icon-menu /></el-icon>
            <template v-if="!isCollapse" #title>选项</template>
          </el-menu-item>
          <el-menu-item index="/">
            <el-icon><home-filled /></el-icon>
            <template #title>翻译</template>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><collection /></el-icon>
              <span>单词</span>
            </template>
            <el-menu-item index="/recite">背单词</el-menu-item>
            <el-menu-item index="/words">单词本</el-menu-item>
            <el-menu-item index="/import">批量导入</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/user">
            <el-icon><avatar /></el-icon>
            <template #title>用户</template>
          </el-menu-item>
          <button
            class="collapseBTN"
            @click="
              () => {
                isCollapse = !isCollapse;
              }
            "
          >
            <el-icon v-if="isCollapse" size="42px"
              ><arrow-right-bold
            /></el-icon>
            <el-icon v-else size="42px"><arrow-left-bold /></el-icon>
          </button>
        </el-menu>
        <el-main style="overflow: hidden">
          <div :class="{ main_container: true, collapse: isCollapse }">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArrowLeftBold,
  ArrowRightBold,
  Collection,
  HomeFilled,
  Avatar,
} from "@element-plus/icons";
import Navigation from "./components/Navigation.vue";
import { ref } from "vue";
import router from "./router";
const sideChoose = ref(1);
const isCollapse = ref(false);
const handleOpen = (key: any, keyPath: any) => {
  sideChoose.value = key;
};
const handleClose = (key: any, keyPath: any) => {
  return;
};
const collapseChange = () => {
  isCollapse.value = !isCollapse.value;
};

const autoCollapse = () => {
  if (document.documentElement.clientWidth < 1280) {
    isCollapse.value = true;
  } else {
    isCollapse.value = false;
  }
};
autoCollapse();
window.addEventListener("resize", autoCollapse);
</script>

<style lang="stylus">
:root
  --D1 #151822 /* 深黑背景 */
  --D2 #1e222d /* Side背景 */
  --D3 #262f3e /* nav背景 */
  --D4 #344258 /* 黑色高亮 */
  --W1 #ffffff /* 纯白 */
  --W2 #c1c6c8 /* 文字 */
  --W3 #7c878e /* 图标 */
  --B2 #559eff /* 淡蓝 */
  --B3 #006eff /* 主题蓝 */
html
  overflow hidden
.horizontal-collapse-transition
  transition 0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out
body
  margin 0
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>

<style lang="stylus" scoped>
.el-header
  background-color #b3c0d1
  color var(--el-text-color-primary)
  text-align center
  padding 0
  height 60px
.el-main
  background-color #e9eef3
  color var(--el-text-color-primary)
  text-align center
  height calc(100vh - 60px)
.el-menu
  --el-menu-text-color var(--W2)
  --el-color-white var(--D2)
  --el-color-primary-light-9 var(--B3)
  --el-text-color-primary var(--W1)
  --el-menu-active-color var(--W2)
  background-color var(--D2)
  & .el-menu-item, el-sub-menu
    color var(--W2)
    &:hover
      background-color var(--D3)
    &.is-active
      background-color var(--B3)
      color var(--W1)
  & .title
    color var(--W2)
    font-weight 600
    font-size 36px
    height 68px
    opacity 1
    cursor default
    & .el-icon
      left -8px
      font-size 36px
.el-menu-vertical-demo:not(.el-menu--collapse)
  width 250px
.collapseBTN
  position absolute
  left calc(50% - 24px)
  bottom 10px
  height 48px
  width 48px
  padding 0
  background-color rgba(0, 0, 0, 0)
  border 0
  color var(--W3)
  --button-color rgba(0, 0, 0, 0)
  &:hover
    color var(--B3)
.main_container
  width calc(100vw - 290px)
  overflow hidden
  background-color #fff
  height 100%
  border-radius 10px
  box-shadow 0px 0px 5px rgba(50, 50, 50, 0.1)
  border #ccc 2px solid
  padding 20px
  box-sizing border-box
  transition 0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out
  &.collapse
    width calc(100vw - 103px)
</style>
