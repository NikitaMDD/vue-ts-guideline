<template>
  <div class="table-vue" v-if="props.mainElements.length <= 3">
    <div class="table-vue__header">
      <div class="table-vue__header-item" v-for="elem in headerElements" :key="elem">
        {{ elem }}
      </div>
    </div>
    <div class="table-vue__main">
      <div class="table-vue__row" v-for="elem in props.mainElements" data-toggle="modal" :data-target="modal" @click="openModal(elem)">
        <div class="table-vue__main-item" v-for="(data, key) in elem" :key="key">
          {{ data }}
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8" height="13">
            <path fill="#2B3033" fill-opacity="0.40000001"
                  d="M4.9497838 6.3639808L0 1.414211L1.414224 0L7.7781839 6.3639808L1.414224 12.727881L0 11.313681L4.9497838 6.3639808Z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="">
    <div class="" v-for="(elem, index) in props.mainElements">
      <div class="title">
        {{ headerElements[index] }}
      </div>
      <div>
        {{ elem }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import type {TableData} from "../interfaces/InterfacesTableMainItems.ts";


const props = defineProps<{
  headerElements: Array<string>,
  modal: string,
  mainElements: Array<TableData>,
  openModal: (data: TableData) => void,
}>();

function openModal(elem: TableData) {
  props.openModal(elem);
}

</script>

<style scoped>
.table-vue {
  border: 1px solid #C7C7C7;
  border-radius: 8px;
  background: #F3F3F3;
}

.table-vue__header {
  display: flex;
  justify-content: space-between;
  width: 99%;
  padding: 17px 19px;
  font-size: 16px;
  font-weight: 600;
}

.table-vue__row {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #DFDFE0;
  padding: 17px 19px;
  font-size: 14px;
  font-weight: 400;
  transition: background 0.3s ease-in-out;
}

.table-vue__row:last-child {
  padding: 17px 19px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}

.table-vue__header-item, .table-vue__main-item {
  flex: 1;
}

.table-vue__row:hover {
  background: #eaeaeb;
}

</style>
