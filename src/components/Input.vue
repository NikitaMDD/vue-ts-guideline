<template>
  <div class="field req">
    <label for="name_field">{{ label }}</label>
    <input
        id="name_field"
        type="text"
        v-model="localModelName"
        name="name_field"
        class="service-form__input input-reset"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        :class="{'input-focused': isFocused}"
        :style="props.isError ? 'border-color: #ff6767 !important;' : 'border-color: auto'"
    />
    <div class="field__error" :style="props.isError ? 'display: block !important' : 'display: none !important'">Пожалуйста, заполните поле корректно.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { InputType } from "../enums/InputType.ts";

const props = defineProps<{
  label: string;
  modelValue: string;
  isError: boolean;
  isType: InputType;
}>();

const isFocused = ref<boolean>(false);
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:isError', value: boolean): void;
}>();

const localModelName = ref<string>('');
const masks: Record<InputType, string> = {
  [InputType.Text]: '',
  [InputType.Phone]: '+7 (___) ___-__-__',
  [InputType.Email]: 'example@gmail.com',
  [InputType.Date]: '__.__.____',
  [InputType.Card]: '____-____-____-____',
};

localModelName.value = masks[props.isType];

const updateModelName = () => {
  emit('update:modelValue', localModelName.value);
};

const formatPhoneNumber = () => {
  const digits: string = localModelName.value.replace(/\D/g, "");
  const limitedDigits: string = digits.slice(0, 11);

  if (limitedDigits.length === 11) {
    localModelName.value = `+7 (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(4, 7)}-${limitedDigits.slice(7, 9)}-${limitedDigits.slice(9, 11)}`;
  } else if (limitedDigits.length > 7) {
    localModelName.value = `+7 (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(4, 7)}-${limitedDigits.slice(7)}`;
  } else if (limitedDigits.length > 4) {
    localModelName.value = `+7 (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(4)}`;
  } else if (limitedDigits.length > 1) {
    localModelName.value = `+7 (${limitedDigits.slice(1)}`;
  } else {
    localModelName.value = "+7";
  }
};

const formatDate = () => {
  const digits = localModelName.value.replace(/\D/g, "").slice(0, 8);

  if (!digits.length) {
    localModelName.value = '';
    return;
  }

  let formatted = '';

  for (let i = 0; i < digits.length; i++) {
    if (i === 2 || i === 4) formatted += '.';
    formatted += digits[i];
  }

  localModelName.value = formatted;
};

const handleFocus = () => {
  isFocused.value = true;
  if (localModelName.value === masks[props.isType]) {
    localModelName.value = '';
  }
};

const handleBlur = () => {
  isFocused.value = false;
  if (localModelName.value === '') {
    localModelName.value = masks[props.isType];
  } else if (props.isType === InputType.Phone) {
    formatPhoneNumber();
  } else if (props.isType === InputType.Date) {
    formatDate();
  }
};

const handleInput = () => {
  if (props.isType === InputType.Phone) {
    formatPhoneNumber();
  } else if (props.isType === InputType.Date) {
    formatDate();
  }
  updateModelName();

  if (props.isError) {
    emit('update:isError', false);
  }
};

watch(() => props.modelValue, (newValue) => {
  localModelName.value = newValue;
});
</script>

<style scoped>
.input-focused {
  border-color: #EFFE7D !important;
}
</style>
