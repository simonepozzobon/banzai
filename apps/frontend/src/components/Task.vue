<script setup>
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { useTasks } from '../queries/tasks';
const { updateTask } = useTasks();

const props = defineProps({
  uuid: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['on-delete-task']);

const showDetails = ref(false);
const completedStatus = ref(props.completed);

const completedAtHumanReadable = computed(() =>
  props.completedAt ? dayjs(props.completedAt).format('YY-MM-DD HH:mm:ss') : ''
);

watch(completedStatus, (value) =>
  updateTask({
    ...props,
    completed: value,
    completedAt: value ? new Date().toISOString() : '',
  })
);

const handleDeleteTask = () => emit('on-delete-task');
</script>
<template>
  <article class="task-card" :class="{ 'task-card--expanded': showDetails }">
    <header class="task-card__header">
      <div class="task-card__checkbox-wrapper">
        <input
          :id="`task-${uuid}`"
          v-model="completedStatus"
          type="checkbox"
          class="task-card__checkbox visually-hidden"
          aria-label="Mark task as complete"
        />
        <label :for="`task-${uuid}`" class="task-card__checkbox-label">
          <svg viewBox="0 0 35.6 35.6" aria-hidden="true" class="task-card__checkbox-svg">
            <circle class="task-card__checkbox-bg" cx="17.8" cy="17.8" r="17.8" />
            <circle class="task-card__checkbox-stroke" cx="17.8" cy="17.8" r="14.37" />
            <polyline class="task-card__checkbox-check" points="11.78 18.12 15.55 22.23 25.17 12.87" />
          </svg>
          <span class="visually-hidden">{{ completedStatus ? 'Mark as incomplete' : 'Mark as complete' }}</span>
        </label>
      </div>

      <div class="task-card__title-wrapper">
        <h2 class="task-card__title" :class="{ 'task-card__title--completed': completedStatus }">{{ title }}</h2>
        <time v-if="completedAtHumanReadable" class="task-card__timestamp" datetime="props.completedAt">
          Completed: {{ completedAtHumanReadable }}
        </time>
      </div>

      <button
        class="task-card__toggle-btn"
        type="button"
        :aria-expanded="showDetails"
        :aria-controls="`task-details-${uuid}`"
        @click="showDetails = !showDetails"
      >
        <svg
          aria-hidden="true"
          class="task-card__toggle-icon"
          viewBox="0 0 407.437 407.437"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815" />
        </svg>
        <span class="visually-hidden">{{ showDetails ? 'Hide details' : 'Show details' }}</span>
      </button>
    </header>

    <section v-show="showDetails" :id="`task-details-${uuid}`" class="task-card__content">
      <p class="task-card__description">{{ description }}</p>
      <div class="task-card__actions">
        <button class="task-card__delete-btn" type="button" @click="handleDeleteTask">Delete</button>
      </div>
    </section>
  </article>
</template>

<style>
.task-card {
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-card);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.task-card:hover {
  box-shadow: var(--shadow-md);
}

.task-card--expanded {
  transform: translateY(-2px);
}

.task-card__header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.task-card__title-wrapper {
  flex: 1;
  min-width: 0;
}

.task-card__title {
  margin: 0;
  font-size: 1.1rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-card__title--completed {
  text-decoration: line-through;
  opacity: 0.7;
}

.task-card--expanded .task-card__title {
  white-space: normal;
  overflow: visible;
  word-wrap: break-word;
}

.task-card__timestamp {
  display: block;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-align: left;
}

.task-card__content {
  width: 100%;
  padding-top: var(--spacing-md);
  margin-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.task-card__description {
  margin: 0;
  text-align: left;
  line-height: 1.5;
}

.task-card__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--spacing-md);
}

.task-card__toggle-btn {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  padding: 0;
  background: none;
  border: none;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  position: relative;
  cursor: pointer;
}

.task-card__toggle-btn:hover {
  background-color: var(--color-bg-hover);
}

.task-card__toggle-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  transition: transform 0.3s ease;
}

.task-card--expanded .task-card__toggle-icon {
  transform: rotate(180deg);
}

.task-card__checkbox-wrapper {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.task-card__checkbox-label {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.task-card__checkbox-svg {
  width: 28px;
  height: 28px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.task-card__checkbox-bg {
  fill: var(--color-border);
  transition: var(--transition-default);
}

.task-card__checkbox-stroke {
  fill: none;
  stroke: var(--color-bg);
  stroke-miterlimit: 10;
  stroke-width: 2px;
  stroke-dashoffset: 100;
  stroke-dasharray: 100;
  transition: var(--transition-default);
}

.task-card__checkbox-check {
  fill: none;
  stroke: var(--color-bg);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
  stroke-dashoffset: 22;
  stroke-dasharray: 22;
  transition: var(--transition-default);
}

.task-card__checkbox-wrapper:hover .task-card__checkbox-check {
  stroke-dashoffset: 0;
}

input[type='checkbox'].task-card__checkbox:checked + label .task-card__checkbox-svg .task-card__checkbox-bg {
  fill: var(--color-primary);
}

input[type='checkbox'].task-card__checkbox:checked + label .task-card__checkbox-svg .task-card__checkbox-stroke {
  stroke-dashoffset: 0;
}

input[type='checkbox'].task-card__checkbox:checked + label .task-card__checkbox-svg .task-card__checkbox-check {
  stroke-dashoffset: 0;
}

@media (prefers-color-scheme: dark) {
  .task-card__checkbox-stroke {
    stroke: var(--color-text);
  }

  .task-card__checkbox-check {
    stroke: var(--color-text);
  }
}
</style>
