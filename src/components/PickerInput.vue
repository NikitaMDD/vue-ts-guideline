<template>
  <div v-if="type === 'date'">
    <div class="field">
      <label for="date1">Выберите дату</label>
      <div class="js-calendar-picker_wrap">
        <input type="text" class="js-calendar-picker" name="date1" id="date1" />
        <div class="icon"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="field">
      <label for="time-picker">Выберите время</label>
      <input
          type="text"
          class="form-control js-time-picker picker-is-time"
          name="time-picker"
          id="time-picker"
          value="02:56"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['date', 'time'].includes(value),
  },
})

onMounted(() => {
  if (props.type === 'date') {
    document.querySelectorAll('.js-calendar-picker').forEach((input) => {
      new Picker(input, {
        format: 'DD.MM.YYYY',
        text: {
          title: 'Выберите дату',
        },
      })
    })
  }

  if (props.type === 'time') {
    const timeInput = document.querySelector('.js-time-picker')
    if (timeInput) {
      const customBlock = document.createElement('div')
      customBlock.className = 'custom-block'

      const picker = new Picker(timeInput, {
        format: 'HH:mm',
        text: {
          title: 'Выберите время',
        },
        close: function () {
          const dialogContainer = this.picker
          if (dialogContainer) {
            dialogContainer.classList.add('closing')
            setTimeout(() => {
              dialogContainer.classList.remove('picker-opened', 'closing')
            }, 800)
          }
        },
      })

      const pickerContainer = picker.picker

      const confirmBtn = pickerContainer.querySelector('.picker-confirm')
      const cancelBtn = pickerContainer.querySelector('.picker-cancel')
      if (confirmBtn) confirmBtn.innerText = 'Выбрать'
      if (cancelBtn) cancelBtn.innerText = 'Отмена'

      const checkPickerState = () => {
        const bodyContainer = pickerContainer.querySelector('.picker-body')
        const isOpened = pickerContainer.classList.contains('picker-opened')

        if (isOpened) {
          if (!customBlock.parentNode) {
            customBlock.classList.remove('fade-out')
            bodyContainer.appendChild(customBlock)
          }
        } else {
          if (customBlock.parentNode) {
            customBlock.classList.add('fade-out')
            setTimeout(() => {
              if (customBlock.parentNode) {
                bodyContainer.removeChild(customBlock)
              }
            }, 300)
          }
        }
      }

      const observer = new MutationObserver(checkPickerState)
      const config = {
        attributes: true,
        childList: false,
        subtree: false,
      }

      if (pickerContainer) {
        observer.observe(pickerContainer, config)
      }
    }
  }
})
</script>

<style scoped>
.custom-block {
  transition: opacity 0.3s ease, visibility 0.3s ease;
  opacity: 1;
  visibility: visible;
}
.custom-block.fade-out {
  opacity: 0;
  visibility: hidden;
}
</style>
