<template>
  <div class="words">
    <el-row class="selection">
      <el-col :span="12" style="text-align: left">
        <el-checkbox
          v-model="showFinished"
          label="Option1"
          border
          @click="showFinishedST"
          >显示已完成</el-checkbox
        >
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button
          type="danger"
          plain
          style="margin-top: -2px; display: inline-flex"
          @click="porpSub"
        >
          进度全减
        </el-button>
      </el-col>
    </el-row>
    <el-table
      class="wordsTable"
      height="calc(100% - 110px)"
      :data="showWords"
      lazy
      style="width: 100%"
    >
      <el-table-column label="进度" width="60">
        <template #default="scope">
          <el-progress
            v-if="scope.row.prog < 100"
            width="32"
            stroke-width="2"
            show-text="false"
            class="wordsProgress"
            type="circle"
            :percentage="scope.row.prog"
            >&nbsp;
          </el-progress>
          <el-progress
            v-else
            width="32"
            stroke-width="2"
            show-text="false"
            class="wordsProgress"
            type="circle"
            :percentage="100"
            status="success"
            >&nbsp;
          </el-progress>
        </template>
      </el-table-column>
      <el-table-column prop="en" label="英文" />
      <el-table-column prop="zh" label="中文" />
      <el-table-column prop="date" label="添加日期" width="130" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
            size="mini"
            type="warning"
            @click="handleReset(scope.$index, scope.row)"
            >重置</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-form :inline="true" :model="newWord" class="demo-form-inline wordsAdd">
      <el-form-item label="英文">
        <el-input
          v-model="newWord.en"
          placeholder="请输入英文"
          @focus="$event.target.select()"
        ></el-input>
      </el-form-item>
      <el-form-item label="中文">
        <el-input
          v-model="newWord.zh"
          :placeholder="zhDefault"
          @focus="$event.target.select()"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="newWordAdd">添加</el-button>
        <el-button type="primary" plain @click="more">批量导入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import router from "@/router";
import { computed, ref } from "vue";
import { trans, getDate } from "./../scripts/tools";
interface Word {
  prog: number;
  en: string;
  zh: string;
  date: string;
}
const words = ref(new Array<Word>());
const handleReset = (index: number, row: number) => {
  words.value[index].prog = 0;
  WordsTableST();
};
const handleDelete = (index: number, row: number) => {
  words.value.splice(index, 1);
  WordsTableST();
};

const newWord = ref({
  prog: 0,
  en: "",
  zh: "",
  date: "",
} as Word);
const WordsTableST = () => {
  localStorage.setItem("WordsTable", JSON.stringify(words.value));
};
const WordsTableLD = () => {
  let storage = localStorage.getItem("WordsTable");
  if (storage != null) {
    words.value = JSON.parse(storage);
  }
};
const newWordAdd = () => {
  let word = {
    prog: 0,
    en: newWord.value.en,
    zh: newWord.value.zh,
    date: "",
  } as Word;
  const Add = () => {
    word.date = getDate();
    for (let i = words.value.length - 1; i >= 0; i--) {
      if (words.value[i].en == word.en) {
        words.value.splice(i, 1);
        break;
      }
    }
    words.value = words.value.concat(word);
    WordsTableST();
  };
  if (word.zh == "") {
    trans(newWord.value.en).then((res) => {
      word.zh = res;
      Add();
    });
  } else {
    word.date = getDate();
    Add();
  }
};
const more = () => {
  router.push("/import");
};
const zhDefault = ref("请输入中文");
const zhDefaultUpdate = () => {
  if (newWord.value.en == "") {
    zhDefault.value = "请输入中文";
    setTimeout(() => {
      zhDefaultUpdate();
    }, 500);
  } else {
    trans(newWord.value.en).then((res) => {
      zhDefault.value = res;
      setTimeout(() => {
        zhDefaultUpdate();
      }, 500);
    });
  }
};
// 显示已完成
const showFinished = ref(true);
const showFinishedST = () => {
  setTimeout(() => {
    localStorage.setItem("showFinished", String(showFinished.value));
  }, 50);
};
const showFinishedLD = () => {
  let t = localStorage.getItem("showFinished") ?? "true";
  showFinished.value = Boolean(t);
};
// 单词展示
const showWords = computed(() => {
  if (showFinished.value) {
    return words.value;
  } else {
    let T: Array<Word> = [];
    for (let i = 0; i < words.value.length; i++) {
      let w = words.value[i];
      if (w.prog < 100) {
        T.push(w);
      }
    }
    return T;
  }
});
// 进度全减
const porpSub = () => {
  for (let i = 0; i < words.value.length; i++) {
    let w = words.value[i];
    w.prog -= 50;
    if (w.prog < 0) {
      w.prog = 0;
    }
  }
  WordsTableST();
};
zhDefaultUpdate();
WordsTableLD();
showFinishedLD();
</script>
<style lang="stylus" scoped>
.selection
  height 50px
  line-height 50px
.words
  height 100%
.wordsAdd
  position relative
  left 0
  right 0
  top 20px
</style>
