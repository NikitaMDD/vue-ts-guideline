<template>
  <div class="dropdown">
    <div class="dropdown__name">{{ label }}</div>
    <div
        :style="selectedItem ? 'padding: 0 15px; height: 39px; justify-content: space-between' : 'padding: 0 15px; height: 39px; justify-content: end;'"
        :class="isOpen ? 'dropdown-menu dropdown-menu_active' : 'dropdown-menu'"
        @click="toggleDropdown"
    >
      <div class="dropdown-menu__selected-item">{{ selectedItem }}</div>
      <img
          class="dropdown-menu__img"
          :style="isOpen ? 'transform: rotate(180deg); transition: transform 0.3s ease-in-out;' : 'transform: rotate(0deg); transition: transform 0.3s ease-in-out;'"
          src="../assets/dropdown-btn.svg"
          alt="dropdown-button"
      >
    </div>
    <div
        class="dropdown__list"
        :class="{ 'dropdown__list_open': isOpen, 'dropdown__list_scroll': hasScroll }"
        :style="isOpen ? { maxHeight: '200px', opacity: 1, overflow: items.length > 5 ? 'auto' : 'hidden' } : { maxHeight: '0', opacity: 0, overflow: 'hidden' }"
    >
      <div
          class="dropdown__item"
          v-for="item in items"
          :key="item"
          @click="selectItem(item)"
          :style="selectedItem === item ? 'background: #dddddd; cursor: default' : ''"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps<{
  label: string;
  selectedItem: string;
  items: string[];
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:selectedItem', value: string): void;
  (e: 'toggleDropdown'): void;
}>();

const toggleDropdown = () => {
  emit('toggleDropdown');
};

const selectItem = (item: string) => {
  emit('update:selectedItem', item);
  emit('toggleDropdown');
};

const hasScroll = ref(false);

watch(() => props.items.length, (newLength) => {
  hasScroll.value = newLength > 5;
});
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown__name {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px;
  line-height: 17px;
  color: #2B3033;
}

.dropdown-menu {
  display: flex;
  align-items: center;
  background: #EAEAEB;
  border-radius: 8px;
  border: 1px solid #D6D7D8;
  cursor: pointer;
  transition: border-radius 0.3s ease-in-out;
}

.dropdown-menu_active {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  transition: border-radius 0.3s ease-in-out;
}

.dropdown__list {
  position: absolute;
  left: 0;
  width: 100%;
  max-height: 0;
  opacity: 0;
  overflow-y: auto;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 1;
}

.dropdown__item {
  background: #EAEAEB;
  border: 1px solid #D6D7D8;
  border-bottom: 0;
  padding: 0 15px;
  height: 39px;
  transition: background 0.3s ease-in-out;
  display: flex;
  align-items: center;
}

.dropdown__item:hover {
  cursor: pointer;
  background: #EFFE7D;
  transition: background 0.3s ease-in-out;
}

.dropdown__item:first-child {
  border-top: none;
}

.dropdown__item:last-child {
  border-bottom: 1px solid #D6D7D8;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
