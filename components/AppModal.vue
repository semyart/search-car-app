<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'

  defineProps<{
    title?: string
  }>()

  const emit = defineEmits<{
    (e: 'confirm'): void
  }>()
  </script>

  <template>
    <VueFinalModal
      class="app-modal"
      content-class="app-modal__content"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
    >
      <h1 class="app-modal__title">{{ title }}</h1>
      <slot />
      <button class="app-modal__button" @click="emit('confirm')">
        Закрыть
      </button>
    </VueFinalModal>
  </template>

<style lang="scss">
.app-modal {
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: $white;
    border-radius: 0.5rem;
  }

  &__title {
    font-size: 1.375rem;
  }

  &__button {
    margin: 0.25rem 0 0 auto;
    padding: 5px 10px;
    width: 40%;
    border: none;
    border-radius: 4px;
    background-color: $blue;
    font-size: 16px;
    color: $white;
    cursor: pointer;
  }

  &__text {
    margin-bottom: 10px;
  }

  &__img {
    max-height: 400px;
    margin-bottom: 20px;
  }
}
</style>