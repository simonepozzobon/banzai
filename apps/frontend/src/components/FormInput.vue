<script setup>
import { computed } from 'vue';
import { INPUT_COMPONENTS } from '../constants/input-types';

const props = defineProps({
  label: {
    type: String,
    default: undefined,
  },
  error: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  component: {
    type: String,
    required: false,
    default: INPUT_COMPONENTS.INPUT,
  },
});

const value = defineModel({
  type: String,
  required: true,
});

const inputId = computed(() => `form-input-${props.name}`);
const hasError = computed(() => Boolean(props.error));
</script>

<template>
  <div class="form-field" :class="{ 'form-field--error': hasError }">
    <div v-if="label" class="form-field__header">
      <label :for="inputId" class="form-field__label">{{ label }}</label>
      <span v-if="error" class="form-field__error-text" aria-live="polite">{{ error }}</span>
    </div>

    <input
      v-if="component === INPUT_COMPONENTS.INPUT"
      :id="inputId"
      v-model="value"
      type="text"
      :name="name"
      :placeholder="placeholder"
      :aria-invalid="hasError"
      class="form-field__input"
    />

    <textarea
      v-else-if="component === INPUT_COMPONENTS.TEXTAREA"
      :id="inputId"
      v-model="value"
      :name="name"
      :placeholder="placeholder"
      :aria-invalid="hasError"
      class="form-field__textarea"
    ></textarea>

    <div v-else class="form-field__error-message">Invalid component type</div>

    <span v-if="error && !label" class="form-field__error-text" aria-live="polite">{{ error }}</span>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.form-field__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  text-align: left;
}

.form-field__input,
.form-field__textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-input);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-field__textarea {
  min-height: 100px;
  resize: vertical;
}

.form-field__input:focus,
.form-field__textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(108, 190, 69, 0.2);
}

.form-field--error .form-field__input,
.form-field--error .form-field__textarea {
  border-color: var(--color-danger);
}

.form-field--error .form-field__input:focus,
.form-field--error .form-field__textarea:focus {
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2);
}

.form-field__error-text {
  color: var(--color-danger);
  font-size: 0.75rem;
}

.form-field__error-message {
  color: var(--color-danger);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
