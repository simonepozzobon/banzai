<script setup>
import TaskContainer from './components/TaskContainer.vue';
import TaskForm from './components/TaskForm.vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
  <main class="app-layout">
    <div class="app-layout__tasks">
      <TaskContainer />
    </div>
    <div class="app-layout__form">
      <TaskForm />
    </div>
    <VueQueryDevtools buttonPosition="bottom-left" />
  </main>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.app-layout__tasks {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
</style>
