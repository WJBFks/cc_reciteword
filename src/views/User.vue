<template>
  <div class="user">
    <div class="container" v-if="user.tel != ''">
      <div class="title">用户</div>
      <el-row>
        <el-col :span="7" class="tip"> 用户名 </el-col>
        <el-col :span="1"> </el-col>
        <el-col :span="16" class="content">{{ user.name }} </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" class="tip"> 手机号 </el-col>
        <el-col :span="1"> </el-col>
        <el-col :span="16" class="content">{{ user.tel }} </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" class="tip"> 电子邮箱 </el-col>
        <el-col :span="1"> </el-col>
        <el-col :span="16" class="content">{{ user.email }} </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="wordsUpdate" plain
            >上传单词表</el-button
          >
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="wordsLoad" plain
            >下载单词表</el-button
          ></el-col
        >
      </el-row>
      <el-button type="primary" style="margin-top: 64px" @click="logout">
        注销
      </el-button>
    </div>
    <div class="container" v-else>
      <div class="title unlog">你还没有登录</div>
      <el-button type="primary" @click="toLog">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";
import { GetInfo, bus, request } from "./../scripts/tools";
const loginStateChange = () => {
  bus.emit("login-state-change");
};
const user = ref({
  name: "",
  tel: "",
  email: "",
  words: "",
});
const getUser = () => {
  GetInfo().then((res) => {
    user.value = res.data.user;
  });
};
const toLog = () => {
  router.push("/login?mode=login");
};
const logout = () => {
  localStorage.removeItem("userToken");
  loginStateChange();
  router.push("/");
};
const wordsUpdate = () => {
  let storage = localStorage.getItem("WordsTable");
  if (storage != null) {
    request("/user/words", "post", false, {
      tel: user.value.tel,
      words: storage,
    }).then((res) => {
      console.log(res);
    });
  } else {
    console.log("单词表为空");
  }
};
const wordsLoad = () => {
  localStorage.setItem("WordsTable", user.value.words);
};
getUser();
</script>

<style scoped lang="stylus">
.container
  margin 0 auto
  width 100%
  max-width 720px
  font-size 24px
.title
  width 100%
  text-align center
  font-size 50px
  margin 20px 0
  font-weight 600
  &.unlog
    margin-bottom 64px
.tip
  text-align right
  font-weight 600
.content
  text-align left
</style>
