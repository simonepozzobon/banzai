<script setup>
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { reactive, ref } from 'vue';
import { useTasks } from '../queries/tasks';
import FormInput from './FormInput.vue';
import { INPUT_COMPONENTS } from '../constants/input-types';

const errors = ref({});
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
      },
    }
  );
};
</script>

<template>
  <form class="task-form" @submit.prevent="handleAddTask">
    <h2 class="task-form__title">Create New Task</h2>
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
</template>

<style scoped>
.task-form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: var(--color-bg-card);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.task-form__title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  text-align: left;
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
