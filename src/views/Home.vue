<template>
  <div class="home">
    <div class="left">
      <div class="inputString">
        <button class="clear" @click="inputStringClear()">
          <el-icon size="24px"><close /></el-icon>
        </button>
        <textarea type="text" v-model="inputString" />
      </div>
      <div class="outputString">{{ outputString }}</div>
    </div>
    <div class="right">
      <el-button class="clearHis" @click="historiesClear()">清空历史</el-button>
      <div class="histories">
        <div class="history">
          <el-card
            class="box-card"
            v-for="(item, index) of histories"
            :key="item"
          >
            <template #header>
              <div class="card-header">
                <button class="button" @click="historiesDelete(index)">
                  <el-icon size="24px"><close /></el-icon>
                </button>
                {{ item.src }}
              </div>
            </template>
            <div class="card-body">
              {{ item.dst }}
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref } from "vue";
import { Close } from "@element-plus/icons";
import { trans } from "./../scripts/tools";
interface History {
  src: string;
  dst: string;
}
const inputString = ref("");
const inputPre = ref("");
const outputString = ref("");
const histories = ref(new Array<History>());

const auto = () => {
  if (inputPre.value != inputString.value && inputString.value != "") {
    inputPre.value = inputString.value;
    trans(inputString.value).then((res) => {
      console.log(res);

      outputString.value = res;
      setTimeout(() => {
        auto();
      }, 500);
    });
  } else {
    if (inputString.value == "") {
      if (inputString.value == "" && inputPre.value != "") {
        historiesInsert();
        inputPre.value = "";
      }
      outputString.value = "";
    }
    setTimeout(() => {
      auto();
    }, 500);
  }
};
const historiesInsert = () => {
  if (inputPre.value != "") {
    for (let i = 0; i < histories.value.length; i++) {
      if (inputPre.value == histories.value[i].src) {
        return;
      }
    }
    let OUT = outputString.value;
    const Insert = () => {
      histories.value.unshift({
        src: inputPre.value,
        dst: OUT,
      });
      localStorage.setItem("wordsHistories", JSON.stringify(histories.value));
    };
    if (OUT == "") {
      trans(inputString.value).then((res) => {
        OUT = res;
        Insert();
      });
    } else {
      Insert();
    }
  }
};
const historiesDelete = (index: number) => {
  if (index >= 0 && index < histories.value.length) {
    histories.value.splice(index, 1);
  }
  localStorage.setItem("wordsHistories", JSON.stringify(histories.value));
};
const historiesClear = () => {
  histories.value = [];
  localStorage.setItem("wordsHistories", JSON.stringify(histories.value));
};
const historiesStorage = () => {
  let his = localStorage.getItem("wordsHistories");
  if (his != null) {
    histories.value = JSON.parse(his);
  }
};
const inputStringClear = () => {
  inputPre.value = inputString.value;
  inputString.value = "";
  historiesInsert();
};

auto();
historiesStorage();
</script>
<style lang="stylus" scoped>
.home
  position relative
  margin auto
  top 50%
  transform translateY(-50%)
  height 80%
  width 90%
  & .left
    float left
    width 65%
    height 100%
    & .inputString
      width 100%
      height 60%
      & textarea
        width 100%
        height 100%
        box-sizing border-box
        resize none
        border-radius 0
        border #ccc solid 1px
        padding 10px
        font-size 32px
        font-weight 600
        &:focus
          outline none
          border var(--B3) solid 1px
        &:hover
          border var(--B3) solid 1px
      & .clear
        width 32px
        height 32px
        padding 4px
        border 0
        border-radius 50%
        position fixed
        margin-left calc(65% - 42px)
        margin-top 10px
        z-index 10000
        & .el-icon
          color var(--W3)
    & .outputString
      overflow-y auto
      width 100%
      max-width 100%
      height 40%
      background-color #f5f5f5
      font-size 32px
      text-align left
      padding 10px
      font-weight 600
      border-top 0
      box-sizing border-box
  & .right
    overflow hidden
    position relative
    background-color #fafafa
    float left
    width 35%
    height 100%
    & .histories
      height calc(100% - 48px)
      overflow-y auto
      & .box-card
        max-width 100%
    & .clearHis
      width 90%
      margin 8px 0
.box-card
  --el-card-padding 10px
  margin 5%
  max-width 90%
  flex-wrap wrap
  overflow-y auto
  & .card-header
    text-align left
    font-size 24px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  & .card-body
    word-break break-all
    text-overflow ellipsis
    overflow hidden
    display -webkit-box
    -webkit-line-clamp 2
    -webkit-box-orient vertical
  & button
    float right
    height 24px
    width 24px
    padding 0
    background-color var(--B3)
    border 0
    box-shadow 0px 0px 0px var(--B2)
    color white
    &:hover
      box-shadow 0px 0px 6px var(--B2)
    &:active
      background-color var(--B2)
      box-shadow 0px 0px 0px var(--B2)
</style>
