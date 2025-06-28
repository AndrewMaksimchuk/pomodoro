<script setup lang="ts">
import type { HistoryItem } from '../../history'
import { ElContainer, ElHeader, ElMain, ElPagination, ElTable, ElTableColumn } from 'element-plus'
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'

const data = ref<HistoryItem[]>([])
const pageSize = ref(15)
const pageSizes = [15, 30, 50, 100]
const pageCurrent = ref(1)
const maxHeight = ref(800)
const scale = 0.8

function setData(value: HistoryItem[]) {
  data.value = value.reverse()
}

function requestData() {
  window?.historyAPI?.getData()
}

const dataOnPage = computed(() => {
  const end = pageCurrent.value * pageSize.value
  const start = end - pageSize.value
  return data.value.slice(start, end)
})

function computeTableMaxHeight(innerHeight: number) {
  maxHeight.value = Math.round(innerHeight * scale)
}

function onWindowResize() {
  computeTableMaxHeight(window.innerHeight)
}

watch(() => window.innerHeight, computeTableMaxHeight)

onMounted(() => {
  window?.historyAPI?.onHistorySendData(setData)
  requestData()
  window.addEventListener('resize', onWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
})
</script>

<template>
  <ElContainer>
    <ElHeader>
      <h1>History of user actions</h1>
    </ElHeader>
    <ElMain>
      <ElPagination
        background
        layout="total, sizes, prev, pager, next"
        :total="data.length"
        :page-sizes="pageSizes"
        v-model:page-size="pageSize"
        v-model:current-page="pageCurrent"
        class="history-paggination"
      />
      <ElTable :data="dataOnPage" :max-height="maxHeight">
        <ElTableColumn prop="date" label="Date" sortable="true" />
        <ElTableColumn prop="time" label="Time" sortable="true" />
        <ElTableColumn prop="event" label="Event" sortable="true" />
        <ElTableColumn prop="message" label="Message" sortable="true" />
      </ElTable>
    </ElMain>
  </ElContainer>
</template>

<style>
.el-table .el-table__cell {
  padding: 3px 0;
}
</style>

<style scoped>
.history-paggination {
  margin-bottom: 1rem;
}
</style>
