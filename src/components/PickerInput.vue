<template>
  <div v-if="type === 'date'">
    <div class="field">
      <label for="date1">Выберите дату</label>
      <div class="js-calendar-picker_wrap"><input type="text" class="js-calendar-picker" name="date1" id="date1"><div class="icon"></div></div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps} from "vue";

const props = defineProps<{
  type: string;
}>();

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".js-calendar-picker").forEach(input => {
    // Кастомный календарь через класс js-calendar-picker
    new Picker(input, {
      format: 'DD.MM.YYYY',
      text: {
        title: 'Выберите дату',
      },
    });
  });
});

</script>

<style scoped>

</style>
