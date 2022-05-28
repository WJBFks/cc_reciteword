<template>
  <div class="login">
    <div class="container">
      <div class="logo">
        <el-image :src="require('../assets/logo.png')"></el-image>
        <div class="title">CC背单词</div>
      </div>
      <el-form
        :model="logForm"
        :rules="logRules"
        ref="logFormss"
        label-width="100px"
        :class="{ log: true, show: $route.query.mode == 'login' }"
      >
        <el-form-item>
          <div class="title">登录</div>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="logForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="logForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="logSubmit"
            >登 录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="toReg">没有账号？点击注册</el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="regForm"
        :rules="regRules"
        ref="regFormss"
        label-width="100px"
        :class="{ reg: true, show: $route.query.mode == 'register' }"
      >
        <el-form-item>
          <div class="title">注册</div>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="regForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="regForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm">
          <el-input v-model="regForm.confirm" show-password></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="regForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="regForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="regSubmit"
            >注 册</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="toLog">已有账号？点击登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import router from "@/router";
import { request, bus } from "@/scripts/tools";
import { reactive, ref, unref } from "vue";
require("../assets/images/word_bg.jpg");
const loginStateChange = () => {
  bus.emit("login-state-change");
};
const toLog = () => {
  router.push("/login?mode=login");
};
const toReg = () => {
  router.push("/login?mode=register");
};
// 登录
const logFormss = ref(null);
const logForm = reactive({
  tel: "",
  password: "",
});
const checkTel = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入11位手机号"));
  }
  setTimeout(() => {
    if (value.length == 11) {
      callback();
    } else {
      return callback(new Error("请输入11位手机号"));
    }
  }, 100);
};
const checkLogPass = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("密码不能为空"));
  }
  setTimeout(() => {
    if (value) {
      callback();
    }
  }, 100);
};
const logRules = {
  tel: [{ validator: checkTel, trigger: "blur" }],
  password: [{ validator: checkLogPass, trigger: "blur" }],
};
const logSubmit = async () => {
  const form = unref(logFormss);
  if (!form) return;
  try {
    await (form as any).validate();
    const { tel, password } = logForm;
    request("/user/login", "post", false, {
      userTel: tel,
      userPassword: password,
    })
      .then((res) => {
        console.log(res);
        if ((res as any).data.code != 200) {
          alert((res as any).data.msg);
          return;
        }
        localStorage.setItem("userToken", (res as any).data.token);
        router.push("/");
        loginStateChange();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    return;
  }
};
// 注册
const regFormss = ref(null);
const regForm = reactive({
  tel: "",
  password: "",
  confirm: "",
  name: "",
  email: "",
});

const checkRegPass = (rule: any, v: string, callback: any) => {
  if (!v) {
    return callback(new Error("密码不能为空"));
  }
  setTimeout(() => {
    let num = 0;
    let lower = 0;
    let upper = 0;
    let special = 0;
    for (let i = 0; i < v.length; i++) {
      if (v[i] >= "0" && v[i] <= "1") {
        num = 1;
      } else if (v[i] >= "a" && v[i] <= "z") {
        lower = 1;
      } else if (v[i] >= "A" && v[i] <= "Z") {
        upper = 1;
      } else {
        special = 1;
      }
    }
    if (v.length < 6) {
      callback(new Error("密码不得小于6位"));
    } else if (v.length > 20) {
      callback(new Error("密码不得大于20位"));
    } else if (num + lower + upper + special < 3) {
      callback(
        new Error("密码必须至少包括数字、大写字母、小写字母、特殊字符中的三种")
      );
    } else {
      callback();
    }
  }, 100);
};
const checkRegConfirm = (rule: any, value: any, callback: any) => {
  if (!regForm.password) {
    return callback(new Error("请先设置密码"));
  }
  setTimeout(() => {
    if (value == regForm.password) {
      callback();
    } else {
      return callback(new Error("确认密码与设置的密码不一致"));
    }
  }, 100);
};
const checkRegName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("用户名不能为空"));
  }
  setTimeout(() => {
    if (value) {
      callback();
    }
  }, 100);
};
const checkRegEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("邮箱不能为空"));
  }
  setTimeout(() => {
    var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (!verify.test(value)) {
      return callback(new Error("电子邮箱格式错误"));
    } else {
      callback();
    }
  }, 100);
};
const regRules = {
  tel: [{ validator: checkTel, trigger: "blur" }],
  password: [{ validator: checkRegPass, trigger: "blur" }],
  confirm: [{ validator: checkRegConfirm, trigger: "blur" }],
  name: [{ validator: checkRegName, trigger: "blur" }],
  email: [{ validator: checkRegEmail, trigger: "blur" }],
};
const regSubmit = async () => {
  const form = unref(regFormss);
  if (!form) return;
  try {
    await (form as any).validate();
    const { tel, password, name, email } = regForm;
    request("/user/register", "post", false, {
      userName: name,
      userTel: tel,
      userEmail: email,
      userPassword: password,
    }).then((res) => {
      if ((res as any).data.code != 200) {
        alert((res as any).data.msg);
        return;
      }
      localStorage.setItem("userToken", (res as any).data.token);
      router.push("/");
      loginStateChange();
    });
  } catch (error) {
    return;
  }
};
</script>

<style scoped lang="stylus">
.container
  margin 0 auto
  width 100%
  max-width 720px
.title
  width 100%
  text-align center
  font-size 50px
  margin 20px 0
  font-weight 600
.log, .reg
  float left
  width 100%
  max-width 720px
  transition margin-left 0.5s
.log
  margin-left -100vw
  &.show
    margin-left 0
.reg
  margin-left 100vw
  &.show
    margin-left 0
.logo
  margin-left 150px
  display flex
  justify-items center
  & .title
    margin-top 25px
    margin-left -50px
    text-align center
    color #006EFF
    font-size 64px
</style>
