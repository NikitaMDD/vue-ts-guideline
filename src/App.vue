<template>
  <div class="main-block">
    <div class="container">
      <div class="page-title">Vue Guideline</div>
      <Input :is-error="isError" :is-type="InputType.Text" :label="'Наименование поля'" :model-value="modelName"
             @update:modelValue="updateModelName" @update:isError="isError = false"/>
      <Input :is-error="isErrorPhone" :is-type="InputType.Phone" :label="'Телефон'" :model-value="modelNamePhone"
             @update:modelValue="updateModelNamePhone" @update:isError="isErrorPhone = false"/>
      <Input :is-error="isErrorMail" :is-type="InputType.Email" :label="'Почта'" :model-value="modelNameMail"
             @update:modelValue="updateModelNameMail" @update:isError="isErrorMail = false"/>
      <div class="service-main_button" style="margin-bottom: 50px" @click="sendRequest">Отправить</div>
      <DropdownMenu
          :selected-item="selectedItem"
          :items="dropdownItems"
          :is-open="isDropdownOpen"
          @update:selectedItem="selectedItem = $event"
          @toggleDropdown="isDropdownOpen = !isDropdownOpen"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from "./components/Input.vue";
import DropdownMenu from "./components/DropdownMenu.vue";
import useInput from "./use/input";
import { watch } from "vue"; //, ref
import { InputType } from "./enums/InputType.ts";
import { validateRequired, validateEmail, validatePhone } from './use/validators.ts';
import useDropdown from "./use/dropdown.ts";

// Для полей ввода
const { isError, modelInput: modelName, validate: validateNameFn } = useInput(validateRequired, false);
const { isError: isErrorPhone, modelInput: modelNamePhone, validate: validatePhoneFn } = useInput(validatePhone, true);
const { isError: isErrorMail, modelInput: modelNameMail, validate: validateEmailFn } = useInput(validateEmail, true);

// Данные для выпадающего списка
const { selectedItem, isDropdownOpen } = useDropdown();
const dropdownItems: string[] = [
  'Элемент списка 1',
  'Элемент списка 2',
  'Элемент списка 3',
  // 'Элемент списка 4',
  // 'Элемент списка 5',
  // 'Элемент списка 6',
  // 'Элемент списка 7',
];

// Функционал

// Смотрим как заполняется данные использовалось для тестирования
watch(modelName, (newValue) => {
  console.log(newValue);
});

// Для обновления нужного значения в инпутах
function updateModelName(newValue: string) {
  modelName.value = newValue;
}

// Для обновления нужного значения в инпутах
function updateModelNamePhone(newValuePhone: string) {
  modelNamePhone.value = newValuePhone;
}

// Для обновления нужного значения в инпутах
function updateModelNameMail(newValueMail: string) {
  modelNameMail.value = newValueMail;
}

// Тестовая отправка данных на бек
function sendRequest() {
  const isNameValid = validateNameFn(modelName.value);
  const isMailValid = validateEmailFn(modelNameMail.value);
  const isPhoneValid = validatePhoneFn(modelNamePhone.value);

  if (!isNameValid || !isMailValid || !isPhoneValid) {
    isError.value = !isNameValid;
    isErrorMail.value = !isMailValid;
    isErrorPhone.value = !isPhoneValid;
    return;
  }

  console.log("Данные успешно отправлены:", {
    name: modelName.value,
    email: modelNameMail.value,
    phone: modelNamePhone.value,
  });
}
</script>

<style scoped>

</style>
