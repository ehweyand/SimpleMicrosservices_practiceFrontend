<template>
  <div class="flex" :style="computedStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  maxWidth: {
    type: String,
    default: '1200'
  }
});

const computedStyle = computed(() => {
  return {
    'max-width': props.maxWidth + 'px',
    'margin': '0 auto'
  }
})

</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
</style>

<!-- 
Autor: Evandro H. Weyand

Instruções de uso
Para a utilização do componente, é necessário definir o tamanho de cada
flex-item.
-->
