<script setup>
import Modal from './Modal.vue';
import Task from './Task.vue';
import { ref } from 'vue';
import { useTasks } from '../queries/tasks';

const { tasks, isFetching, deleteTask } = useTasks();

const isOpenDeleteModal = ref(false);
const taskToDelete = ref(null);

const showDeleteModal = (task) => {
  isOpenDeleteModal.value = true;
  taskToDelete.value = task;
};

const handleDeleteTask = () => {
  deleteTask(taskToDelete.value.uuid, {
    onSuccess: () => {
      isOpenDeleteModal.value = false;
      taskToDelete.value = null;
    },
    onError: () => {
      isOpenDeleteModal.value = false;
      taskToDelete.value = null;
    },
  });
};
</script>

<template>
  <section class="task-section">
    <h1 class="task-section__header">Tasks</h1>
    <div class="task-section__content">
      <p v-if="Boolean(isFetching)" class="task-section__loading">Loading tasks...</p>
      <p v-if="!Boolean(tasks?.length > 0)" class="task-section__empty">
        No tasks found. Create your first task below.
      </p>
      <ul v-else class="task-list">
        <li v-for="task in tasks" :key="task.uuid" class="task-list__item">
          <Task v-bind="task" @on-delete-task="() => showDeleteModal(task)" />
        </li>
      </ul>
      <Modal v-if="Boolean(taskToDelete)" v-model="isOpenDeleteModal" title="Delete Task">
        <p class="modal__message">Are you sure you want to delete "{{ taskToDelete?.title }}"?</p>
        <template #footer>
          <button class="modal__btn modal__btn--secondary" @click="isOpenDeleteModal = false">Cancel</button>
          <button class="modal__btn modal__btn--danger" @click="handleDeleteTask">Delete</button>
        </template>
      </Modal>
    </div>
  </section>
</template>

<style scoped>
.task-section {
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
}

.task-section__header {
  position: sticky;
  top: 0;
  background-color: var(--color-bg);
  margin: 0;
  padding: 1.25rem;
  z-index: 10;
  box-shadow: var(--shadow-sm);
  text-align: left;
}

.task-section__content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.task-section__loading,
.task-section__empty {
  text-align: center;
  color: var(--color-text-muted);
  margin: 2rem 0;
}

.task-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-list__item {
  margin: 0;
}
</style>
