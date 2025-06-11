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
          :label="'Выпадающий список'"
          :selected-item="selectedItem"
          :items="dropdownItems"
          :is-open="isDropdownOpen"
          @update:selectedItem="selectedItem = $event"
          @toggleDropdown="isDropdownOpen = !isDropdownOpen"/>
      <FileUploader :files-name="'файлы'" :files-array="filesArray"/>
      <Table
          :modal="'#testModal'"
          style="margin: 30px 0 0"
          :header-elements="tryHeaderElements"
          :main-elements="mainElements"
          :open-modal="openModal"/>
      <PickerInput style="margin: 24px 0 0" :type="'date'"/>
      <PickerInput :type="'time'"/>
    </div>
  </div>
  <div class="modal fade newDesignModal cur_modal" id="testModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Изменение данных</h5>
          <button type="button" class="modal-close" data-dismiss="modal">
          </button>
        </div>
        <div class="modal-body">
          <form class="service-form" action="" method="post" enctype="multipart/form-data" name="service-form">
            <input type="text" name="ID" id="ID" value="" style="display: none; opacity: 0;">
            <div class="field req">
              <label for="RECORD_DATE">Дата</label>
              <input type="text" name="RECORD_DATE" id="RECORD_DATE" class="service-form__input" v-model="recordDate">
              <div class="field__error">Пожалуйста, заполните поле.</div>
            </div>
            <div class="field req">
              <label for="NAME">Имя</label>
              <input type="text" name="NAME" id="NAME" class="service-form__input" placeholder="" inputmode="numeric"
                     v-model="recordName">
              <div class="field__error">Пожалуйста, заполните поле.</div>
            </div>
            <div class="field req">
              <label for="VALUE">Значение</label>
              <input type="text" name="VALUE" id="VALUE" class="service-form__input" placeholder="" inputmode="numeric"
                     v-model="recordValue">
              <div class="field__error">Пожалуйста, заполните поле.</div>
            </div>
          </form>
          <div class="service-main_button" @click="saveChanges">
            Сохранить изменения
          </div>
          <div class="service-form__delete_link" data-el_id="51" data-toggle="modal" data-dismiss="modal"
               data-target="#delElement">Удалить запись
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from "./components/Input.vue";
import DropdownMenu from "./components/DropdownMenu.vue";
import Table from "./components/Table.vue";
import useInput from "./use/input";
import {watch, ref} from "vue";
import {InputType} from "./enums/InputType.ts";
import {validateRequired, validateEmail, validatePhone} from './use/validators.ts';
import useDropdown from "./use/dropdown.ts";
import FileUploader from "./components/FileUploader.vue";
import useFiles from "./use/files.ts";
import PickerInput from "./components/PickerInput.vue";
import type {TableData} from "./interfaces/InterfacesTableMainItems.ts";

// Для массива файлов
const {arrayOfFiles: filesArray} = useFiles();

// Для полей ввода
const {isError, modelInput: modelName, validate: validateNameFn} = useInput(validateRequired, false);
const {isError: isErrorPhone, modelInput: modelNamePhone, validate: validatePhoneFn} = useInput(validatePhone, true);
const {isError: isErrorMail, modelInput: modelNameMail, validate: validateEmailFn} = useInput(validateEmail, true);

const tryHeaderElements: string[] = [
  "Имя",
  "Дата",
  "Значение",
  // "Четвертый заголовок",
]

// Данные для выпадающего списка
const {selectedItem, isDropdownOpen} = useDropdown();
const dropdownItems: string[] = [
  'Элемент списка 1',
  'Элемент списка 2',
  'Элемент списка 3',
  // 'Элемент списка 4',
  // 'Элемент списка 5',
  // 'Элемент списка 6',
  // 'Элемент списка 7',
];

// Пример данных с использованием индексной сигнатуры
const mainElements: TableData[] = [
  {
    name: "Table",
    data: "21.04.2025",
    value: "value test",
  },
  {
    name: "Table 2",
    data: "21.04.2025",
    value: "value test",
  },
  {
    name: "Table 3",
    data: "21.04.2025",
    value: "value test",
  },
];

// Функционал

const recordDate = ref('');
const recordName = ref('');
const recordValue = ref('');

function openModal(data: TableData) {

  console.log(data);

  recordDate.value = data.data;
  recordName.value = data.name;
  recordValue.value = data.value;

}

function saveChanges() {
  console.log("Данные сохранены:", {
    date: recordDate.value,
    value: recordValue.value,
    name: recordName.value,
  });
}

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
