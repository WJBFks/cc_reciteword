<template>
  <h5>CC背单词</h5>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="1">
      <el-icon><icon-menu /></el-icon>
      <span>主页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>主页</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Location, Document, Setting } from "@element-plus/icons";
const handleOpen = (key: any, keyPath: any) => {
  return;
};
const handleClose = (key: any, keyPath: any) => {
  return;
};
</script>

<style scoped lang="stylus">
.el-menu-vertical-demo:not(.el-menu--collapse)
  width 100%
.el-menu-item.is-active
  background-color var(--el-color-primary-light-3)
</style>
