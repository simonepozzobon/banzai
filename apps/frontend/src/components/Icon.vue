<script setup>
import { ICONS } from '../constants/icons';

defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <svg v-if="icon === ICONS.CHECK" viewBox="0 0 35.6 35.6" aria-hidden="true" class="task-card__checkbox-svg">
    <circle class="task-card__checkbox-bg" cx="17.8" cy="17.8" r="17.8" />
    <circle class="task-card__checkbox-stroke" cx="17.8" cy="17.8" r="14.37" />
    <polyline class="task-card__checkbox-check" points="11.78 18.12 15.55 22.23 25.17 12.87" />
  </svg>
  <svg
    v-else-if="icon === ICONS.CHEVRON"
    aria-hidden="true"
    class="task-card__toggle-icon"
    viewBox="0 0 407.437 407.437"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815" />
  </svg>
</template>
