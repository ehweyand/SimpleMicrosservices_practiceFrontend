<template>
  <button v-if="!link">
    <slot></slot>
  </button>
  <router-link v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script setup>
const props = defineProps({
  link: {
    type: Boolean,
    required: false,
    default: false, // Button é padrão
  },
  to: {
    type: String,
    required: false,
    default: "/",
  },
});
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  width: 85%;
  background-color: #F8F8F8;
  border: 1px solid #F8F8F8;
  color: black;
  cursor: pointer;
  border-radius: 20px;
  margin: 0 auto;
  display: inline-block;
  text-align: center;
}
</style>
<!--
  Exemplo de uso:

  Botão comum:
  <base-button @click="action">Refresh</base-button>

  Botão com link para rota
  <base-button link to="/auth?redirect=register">Login</base-button>
-->
