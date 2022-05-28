<template>
  <div class="Recite">
    <el-card :body-style="{ padding: '0px', height: '100%' }">
      <template #header>
        <div class="card-header">
          <span class="title">背单词</span>
        </div>
      </template>
      <div class="tab">
        <span
          v-if="
            wordIndex >= 0 &&
            wordIndex < words.length &&
            finished.length < words.length
          "
        >
          进度：{{ words[wordIndex].prog }}&nbsp;%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          录入日期：{{ words[wordIndex].date }}</span
        >
      </div>
      <div class="background"></div>
      <div class="content">
        <div class="English">
          <span
            v-if="
              wordIndex >= 0 &&
              wordIndex < words.length &&
              finished.length < words.length
            "
            class="English"
            >{{ words[wordIndex].en }}</span
          >
          <span
            v-if="wordIndex >= 0 && words.length == finished.length"
            class="English"
          >
            你的单词已经全部学会了
          </span>
          <span v-if="wordIndex == -1" class="English">
            你的单词本还是空的
          </span>
          <div
            v-if="
              wordIndex >= 0 &&
              wordIndex < words.length &&
              finished.length < words.length
            "
          >
            <br />
            <span v-if="zhDisplay" class="Chinese">{{
              words[wordIndex].zh
            }}</span>
          </div>
          <div
            v-if="wordIndex >= 0 && words.length == finished.length"
            class="English"
          >
            <br />
            <span class="Chinese"> 赶紧添加新的单词吧！</span>
          </div>
          <div v-if="wordIndex == -1">
            <br />
            <span class="Chinese"> 前往单词本添加单词或批量导入吧 </span>
          </div>
        </div>
      </div>
      <div
        v-if="
          wordIndex >= 0 &&
          wordIndex < words.length &&
          finished.length < words.length
        "
        class="bottom"
        style="padding: 14px"
      >
        <el-row>
          <el-col :span="8">
            <el-button v-if="!zhDisplay" type="primary" @click="BTN(1)"
              >我记得</el-button
            >
            <el-button
              v-else-if="preBtn == 1"
              type="success"
              @click="Remembered"
              >下一个</el-button
            >
          </el-col>
          <el-col :span="8">
            <el-button v-if="!zhDisplay" @click="BTN(2)">查看译意</el-button>
            <el-button v-else-if="preBtn == 2" @click="Misremembered"
              >下一个</el-button
            >
          </el-col>
          <el-col :span="8">
            <el-button v-if="!zhDisplay" type="warning" @click="BTN(3)"
              >不记得</el-button
            >
            <el-button
              v-else-if="preBtn == 3"
              type="danger"
              @click="Misremembered"
              >下一个</el-button
            >
            <el-button
              v-else-if="preBtn == 1"
              type="danger"
              @click="Misremembered"
              >记错了</el-button
            >
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref } from "vue";
const backSrc = require("../assets/images/word_bg.jpg");
interface Word {
  prog: number;
  en: string;
  zh: string;
  date: string;
}
const PROG = ref(50);
const finished = ref(new Array<number>());
const zhDisplay = ref(false);
const wordIndex = ref(-1);
const words = ref(new Array<Word>());
const preBtn = ref(-1);
const WordsSet = () => {
  localStorage.setItem("WordsTable", JSON.stringify(words.value));
};
const WordsLoad = () => {
  let storage = localStorage.getItem("WordsTable");
  if (storage != null) {
    words.value = JSON.parse(storage);
  }
};
const BTN = (btn: number) => {
  preBtn.value = btn;
  showCN();
};
const Remembered = () => {
  words.value[wordIndex.value].prog += PROG.value;
  if (words.value[wordIndex.value].prog > 100) {
    words.value[wordIndex.value].prog = 100;
  }
  WordsSet();
  NextWord();
};
const Misremembered = () => {
  words.value[wordIndex.value].prog -= PROG.value;
  if (words.value[wordIndex.value].prog < 0) {
    words.value[wordIndex.value].prog = 0;
  }
  WordsSet();
  NextWord();
};
const showCN = () => {
  zhDisplay.value = true;
};
const NextWord = () => {
  zhDisplay.value = false;
  if (words.value.length == 0) {
    return;
  }
  let preIndex = wordIndex.value;
  let func = () => {
    wordIndex.value +=
      1 +
      Math.floor(
        Math.random() * (words.value.length - finished.value.length) * 0.1
      );
    while (wordIndex.value >= words.value.length) {
      wordIndex.value -= words.value.length;
    }
    if (words.value[wordIndex.value].prog >= 100) {
      if (finished.value.indexOf(wordIndex.value) == -1) {
        finished.value.push(wordIndex.value);
      }
      if (finished.value.length < words.value.length) {
        func();
      }
    }
  };
  while (
    words.value.length - finished.value.length > 1 &&
    preIndex == wordIndex.value
  ) {
    func();
  }
};
WordsLoad();
NextWord();
</script>
<style lang="stylus" scoped>
.Recite
  height 100%
  width 100%
.title
  font-size 36px
  font-weight 600
  margin-bottom 10px
.el-card
  height 100%
.time
  font-size 13px
  color #999
.button
  padding 0
  min-height auto
.background
  width 100%
  height 50%
  position relative
  background url('../assets/images/word_bg.jpg') no-repeat fixed
  background-size cover
  box-sizing border-box
  z-index 0
.background:after
  content ''
  width 100%
  height 100%
  position absolute
  left 0
  top 0
  background inherit
  filter blur(5px)
  z-index -1
.content
  display flex
  flex-wrap wrap
  align-items center
  transform translate(0%, -100%)
  width 100%
  height 50%
  line-height 30px
  text-align center
  background-color rgba(0, 0, 0, 0)
  color white
.English
  width 100%
  font-size 48px
  font-weight 600
  text-shadow 5px 5px 5px black
.Chinese
  width 100%
  font-size 24px
  font-weight 300
  text-shadow 3px 3px 3px black
.tab
  text-align right
  position fixed
  padding 20px
  color var(--W1)
  text-shadow 2px 2px 2px black
  z-index 100
.bottom
  margin-top 20px
  transform translate(0%, -100%)
  width 100%
  height 50%
  & button
    margin-top 50%
</style>
