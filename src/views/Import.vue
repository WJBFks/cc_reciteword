<template>
  <div class="import">
    <div class="title">批量导入</div>
    <el-row style="height: 100%">
      <div class="importText">
        <el-input
          v-model="importInput"
          :rows="10"
          type="textarea"
          placeholder="Please input"
          resize="vertical"
        />
        <el-button class="importButton" type="primary" @click="importWords"
          >导入</el-button
        >
      </div>
      <el-table
        class="wordsTable"
        height="calc(100% - 50px)"
        :data="importOutput"
      >
        <el-table-column prop="en" label="英文" />
        <el-table-column prop="zh" label="中文" />
      </el-table>
    </el-row>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref } from "vue";
import { trans, getDate } from "./../scripts/tools";
interface Word {
  prog: number;
  en: string;
  zh: string;
  date: string;
}
const importPre = ref("");
const importInput = ref("");
const importOutput = ref(new Array<Word>());
const preview = () => {
  if (importPre.value != importInput.value) {
    importOutput.value = new Array<Word>();
    let word = {
      en: "",
      zh: "",
    } as Word;
    let words = importInput.value;
    let isEN = true;
    for (let i = 0; i < words.length; i++) {
      if (words[i] == "\t") {
        isEN = false;
      } else if (words[i] == "\n") {
        isEN = true;
        importOutput.value = importOutput.value.concat({
          prog: 0,
          en: word.en,
          zh: word.zh,
          date: getDate(),
        });
        word.en = "";
        word.zh = "";
      } else if (isEN) {
        word.en += words[i];
      } else {
        word.zh += words[i];
      }
    }
  }
  importPre.value = importInput.value;
};
const previewAuto = () => {
  preview();
  setTimeout(() => {
    previewAuto();
  }, 1000);
};
const importWords = () => {
  let sto = localStorage.getItem("WordsTable");
  if (sto != null) {
    let words = JSON.parse(sto) as Array<Word>;
    for (let i = words.length - 1; i >= 0; i--) {
      for (let j = 0; j < importOutput.value.length; j++) {
        if (words[i].en == importOutput.value[j].en) {
          words.splice(i, 1);
          break;
        }
      }
    }
    words = words.concat(importOutput.value);
    localStorage.setItem("WordsTable", JSON.stringify(words));
  } else {
    localStorage.setItem("WordsTable", JSON.stringify(importOutput.value));
  }
};
previewAuto();
</script>
<style lang="stylus" scoped>
.import
  height 100%
.title
  font-size 36px
  font-weight 600
  margin-bottom 10px
.importText
  width calc(50% - 10px)
  height calc(100% - 50px)
.importButton
  margin 20px 0
  width 100%
  bottom 0
.wordsTable
  width calc(50% - 10px)
  margin-left 20px
</style>
