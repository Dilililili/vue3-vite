<!-- v-zhaoyanlin 2023/11/25 index.vue 主页面 -->
<template>
  <div class="index">
    <a-button type="primary" @click="countAdd">{{count}}++</a-button>
  </div>
</template>

<script setup>
import { Button as AButton } from "ant-design-vue"
import {ref} from "vue";

const count = ref(0)
const countAdd = () => {
  count.value++
}
</script>

<style lang="less" scoped>
.index{
  padding: 50px;
}
</style>