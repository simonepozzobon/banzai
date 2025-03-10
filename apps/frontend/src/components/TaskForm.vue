<script setup>
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { reactive, ref } from 'vue';
import { useTasks } from '../queries/tasks';
import FormInput from './FormInput.vue';
import { INPUT_COMPONENTS } from '../constants/input-types';

const errors = ref({});
const showPanel = ref(false);
const formData = reactive({ title: '', description: '' });

const { addTask } = useTasks();

const taskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
});

const validateForm = () => {
  errors.value = {};
  const result = taskSchema.safeParse(formData);
  if (!result.success) {
    errors.value = result.error.errors.reduce((acc, error) => {
      const key = error.path.join('_');
      acc[key] = error.message;
      return acc;
    }, {});
  }

  return result.data;
};

const handleAddTask = async () => {
  const data = validateForm();
  if (!data) {
    return;
  }

  const uuid = uuidv4();
  addTask(
    { uuid, ...data, completed: false, completedAt: null },
    {
      onSuccess: () => {
        formData.title = '';
        formData.description = '';
        showPanel.value = false;
      },
    }
  );
};
</script>

<template>
  <div class="task-form">
    <Transition name="slide">
      <button v-if="!showPanel" @click="showPanel = !showPanel" class="task-form__toggle-btn">
        {{ showPanel ? 'Close' : 'Add Task' }}
      </button>
      <form v-else class="task-form__form" @submit.prevent="handleAddTask">
        <header class="task-form__header">
          <h2 class="task-form__title">Create New Task</h2>
          <button
            type="button"
            class="task-form__close-btn"
            aria-label="Close task form"
            @click="showPanel = !showPanel"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>
        <FormInput
          v-model="formData.title"
          name="title"
          label="Title"
          :error="errors.title"
          placeholder="Enter task title"
          :component="INPUT_COMPONENTS.INPUT"
        />
        <FormInput
          v-model="formData.description"
          name="description"
          label="Description"
          :error="errors.description"
          placeholder="Enter task description"
          :component="INPUT_COMPONENTS.TEXTAREA"
        />
        <button type="submit" class="task-form__submit-btn">Add Task</button>
      </form>
    </Transition>
  </div>
</template>

<style scoped>
.task-form__form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-bg-card);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.task-form__title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.task-form__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-form__toggle-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.task-form__close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.task-form__submit-btn {
  align-self: flex-end;
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.task-form__submit-btn:hover {
  background-color: var(--color-primary-dark);
  border-color: transparent;
}
</style>
