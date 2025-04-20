<template>
  <div class="file-uploader">
    <div class="file-uploader__add-form" @click="isOpen = !isOpen">
      <p>Добавьте {{ filesName }}</p>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">
        <path fill="#2B3033" fill-opacity="0.40000001" d="M6 6L6 0L8 0L8 6L14 6L14 8L8 8L8 14L6 14L6 8L0 8L0 6L6 6Z"/>
      </svg>
    </div>
    <div class="file-uploader__form"
         :style="{ maxHeight: isOpen ? '500px' : '0', margin: isOpen ? '20px 0 0' : '0', opacity: isOpen ? '1' : '0', overflow: 'hidden', transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out, margin 0.5s ease-in-out' }">
      <Input :is-error="isError" :is-type="InputType.Text" :label="'Название файла'" :model-value="modelName"
             @update:modelValue="updateModelName" @update:isError="isError = false"/>
      <Input :is-error="isErrorDate" :is-type="InputType.Date" :label="'Дата выдачи документа'" :model-value="modelDate"
             @update:modelValue="updateModelDate" @update:isError="isErrorDate = false"/>
      <div class="file-uploader__custom-input">
        <label for="avatar" class="custom-file-label">{{ selectedFileName || 'Выберите файл' }}</label>
        <input class="input-add-file" type="file" id="avatar" name="avatar" @change="handleFileChange">
        <svg v-if="selectedFileName" @click="removeFile"
             :style="selectedFileName ? 'opacity: 1;' : 'opacity: 0; transition: opacity 0.3s easy-in-out;'"
             class="remove-file-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             width="17" height="17">
          <path fill="red" transform="matrix(0.707107 0.707107 -0.707107 0.707107 14.8147 0.00186825)"
                d="M0 0L1.6761049 0L1.6761049 20.951311L0 20.951311L0 0Z"/>
          <path fill="red" transform="matrix(0.707107 -0.707107 0.707107 0.707107 -9.10759e-05 1.18705)"
                d="M0 0L1.6761049 0L1.6761049 20.951311L0 20.951311L0 0Z"/>
        </svg>
      </div>
      <div @click="selectedFileName ? addFile() : ''" :class="selectedFileName ? 'service-main_button' : 'service-main_button service-main_button_disabled'">
        Загрузить
      </div>
    </div>
  </div>
  <div class="file-tables">
    <div v-show="filesArray.length !== 0" class="file-tables__header">
      <div>Загруженный файл</div>
    </div>
    <div class="file-tables__main">
      <div v-if="filesArray.length === 0" class="file-tables__element file-tables__element_empty">
        Файлов пока нет
      </div>
      <div class="file-tables__element" v-else v-for="(file, index) in filesArray" :key="index">
        <div class="file-tables__data">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="20">
            <path fill="#2B3033"
                  d="M8.5 2L2.125 2L2.125 18L14.875 18L14.875 8.5L10.625 8.5C9.4513998 8.5 8.5 7.6045699 8.5 6.5L8.5 2ZM14.526 6.5L10.625 2.8284299L10.625 6.5L14.526 6.5ZM0 1L0 19C0 19.552299 0.47569999 20 1.0625 20L15.9375 20C16.5243 20 17 19.552299 17 19L17 6.4142098C17 6.1490002 16.8881 5.89464 16.688801 5.7071099L10.9362 0.29289001C10.7369 0.10536 10.4667 0 10.1849 0L1.0625 0C0.47569999 0 0 0.44771999 0 1ZM4.78125 12L4.78125 10L12.2188 10L12.2188 12L4.78125 12ZM4.78125 16L10.0938 16L10.0938 14L4.78125 14L4.78125 16Z"
                  fill-rule="evenodd"/>
          </svg>
          <div class="file-tables__column">
            <div class="file-tables__date">{{ file.date }}</div>
            <div class="file-tables__file-name">
              <a :href="file.link ? file.link : generateTemporaryLink(file.name)"
                 :download="file.name">{{ file.name }}</a>
            </div>
          </div>
        </div>
        <div class="file-tables__remove-btn" @click="removeFileFromTable(index)">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
            <path fill="#2B3033" fill-opacity="0.40000001"
                  d="M15 4L20 4L20 6L18 6L18 19C18 19.552299 17.552299 20 17 20L3 20C2.4477201 20 2 19.552299 2 19L2 6L0 6L0 4L5 4L5 1C5 0.44771999 5.4477201 0 6 0L14 0C14.5523 0 15 0.44771999 15 1L15 4ZM16 6L4 6L4 18L16 18L16 6ZM7 9L9 9L9 15L7 15L7 9ZM11 9L13 9L13 15L11 15L11 9ZM7 2L7 4L13 4L13 2L7 2Z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from 'vue';
import Input from './Input.vue';
import useInput from '../use/input';
import {validateDate, validateRequired} from "../use/validators.ts";
import {InputType} from "../enums/InputType.ts";
import type {FileObject} from '../types/FileObject.ts';

const props = defineProps<{
  filesName: string;
  filesArray: FileObject[];
}>();

// Состояние для открытия формы
const isOpen = ref<boolean>(false);

const selectedFileName = ref<string | null>(null);

// Добавление файла в загрузчик
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFileName.value = target.files[0].name;
  }
};

// Удаление файла из загрузчика
const removeFile = () => {
  selectedFileName.value = null;
  const fileInput = document.getElementById('avatar') as HTMLInputElement;
  fileInput.value = '';
};

// Добавляем инпуты
const {isError, modelInput: modelName, validate: validateNameFn} = useInput(validateRequired, true);
const {isError: isErrorDate, modelInput: modelDate, validate: validateDateFn} = useInput(validateDate, true);

// Обновление текста в инпутах
function updateModelName(newValue: string) {
  modelName.value = newValue;
}

function updateModelDate(newValue: string) {
  modelDate.value = newValue;
}

// // Тип для объектов файлов
// type FileObject = {
//   date: string,
//   name: string,
//   link?: string,
// };

// const files = ref<FileObject[]>([
//   {
//     date: "20.04.2025",
//     name: "testFile",
//     link: "http://testfile.org/",
//   },
//   {
//     date: "20.04.2025",
//     name: "testFile",
//   },
// ]);

function addFile() {
  const isNameValid = validateNameFn(modelName.value);
  const isDateValid = validateDateFn(modelDate.value);

  console.log(isNameValid, isDateValid);

  if (!isNameValid || !isDateValid) {
    isError.value = !isNameValid;
    isErrorDate.value = !isDateValid;
    return;
  }

  let newFile: FileObject = {
    date: modelDate.value,
    name: modelName.value,
    link: modelName.value,
  }

  props.filesArray.push(newFile);
  isOpen.value = false;
  modelDate.value = '';
  modelName.value = '';
  removeFile();
}

function removeFileFromTable(indexOfFile:number) {
  props.filesArray.splice(indexOfFile, 1);
}

const generateTemporaryLink = (fileName: string):string => {
  return `http://testfile.org/${fileName}`;
}

</script>

<style scoped>
.file-uploader {
  margin: 30px 0 0;
}

.file-uploader__add-form {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.file-uploader__add-form p {
  margin: 0 9px 0 0;
}

.file-tables {
  max-width: 765px;
  background: #F3F3F3;
  border-radius: 8px;
  border: 1px solid #C7C7C7;
  padding: 16px 21px;
  margin: 28px 0 0;
}

.file-tables__header {
  font-size: 16px;
  font-weight: 600;
  padding: 0 21px 15px;
  border-bottom: 1px solid #C7C7C7;
}

.file-tables__element {
  display: flex;
  align-items: center;
  padding: 18px 21px 17px;
  justify-content: space-between;
  border-bottom: 1px solid #C7C7C7;
}

.file-tables__element:last-child {
  border-bottom: none;
  padding: 18px 21px 0;
}

.file-tables__element_empty {
  margin: 0 21px;
  justify-content: center;
  padding: 0 !important;
}

.file-tables__data {
  display: flex;
  align-items: center;
}

.file-tables__column {
  margin: 0 0 0 18px;
}

.file-tables__date {
  font-size: 12px;
  font-weight: 500;
  color: #2B3033;
  opacity: 0.6;
}

.file-tables__file-name {
  font-size: 16px;
  font-weight: 500;
  color: #2B3033;
}

.file-tables__remove-btn {
  cursor: pointer;
}

.file-tables__file-name a {
  text-decoration: none;
}

.file-tables__file-name a:hover {
  color: #2B3033;
}

.file-uploader__custom-input {
  display: flex;
  align-items: center;
}

.custom-file-label {
  color: #1480c0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}

.input-add-file {
  display: none;
}

.remove-file-button {
  margin: 0 0 0 17px;
  cursor: pointer;
}

.service-main_button {
  width: 220px !important;
  height: 46px;
}

.service-main_button_disabled {
  background: #D3D9D7 !important;
  cursor: not-allowed;
}

</style>
