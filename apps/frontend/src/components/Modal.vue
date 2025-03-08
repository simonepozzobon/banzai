<script setup>
const show = defineModel({
  type: Boolean,
  default: false,
});

defineProps({
  title: {
    type: String,
    default: '',
  },
});

const handleClose = () => {
  show.value = false;
};

// Close modal on escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    handleClose();
  }
};
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="modal" role="dialog" aria-modal="true" @keydown="handleKeydown">
      <div class="modal__backdrop" @click="handleClose"></div>
      <div class="modal__container">
        <div class="modal__content">
          <header class="modal__header" aria-labelledby="delete-dialog-title">
            <h3 class="modal__title">{{ title }}</h3>
            <button type="button" class="modal__close-btn" aria-label="Close dialog" @click="handleClose">
              <span aria-hidden="true">&times;</span>
            </button>
          </header>

          <div class="modal__body">
            <slot></slot>
          </div>

          <footer class="modal__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.2s ease-out;
}

.modal__container {
  position: relative;
  z-index: 1;
  width: 90%;
  max-width: 500px;
  animation: slideIn 0.3s ease-out;
}

.modal__content {
  background-color: var(--color-bg-card);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 1.5rem;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal__close-btn {
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

.modal__close-btn:hover {
  background-color: var(--color-bg-hover);
}

.modal__body {
  margin-bottom: 1.5rem;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.modal__btn--secondary {
  background-color: var(--color-bg-alt);
  border: 1px solid var(--color-border);
}

.modal__btn--secondary:hover {
  border-color: var(--color-text-muted);
}

.modal__btn--danger {
  background-color: var(--color-danger);
  color: white;
}

.modal__btn--danger:hover {
  background-color: var(--color-danger-dark);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
