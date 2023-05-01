<template>
    <div class="container">
        <router-link class="" :to="{ name: 'Login' }">Logar na sua conta</router-link>

        <div class="form-container animate__animated animate__fadeInLeft">
            <form>
                <label for="name">Nome:</label>
                <input type="text" id="name" name="name" v-model="user.name" required>

                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" v-model="user.email" required>

                <label for="password">Senha:</label>
                <input type="password" id="password" name="password" v-model="user.password" required>

                <input type="submit" value="Registrar">
            </form>
        </div>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "../store";

const router = useRouter();
const user = {
    name: "",
    email: "",
    password: "",
}

const loading = ref(false); // começa com false
const errors = ref({});

function register(ev) {
    ev.preventDefault();
    loading.value = true;

    store.dispatch("register", user).then(() => {
        loading.value = false;
        router.push({
            name: "Home",
        })
    }).catch((error) => {
        loading.value = false;
        if (error.response.status === 422) {
            errors.value = error.response.data.erros;
        }
    });
}

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
  font-family: 'Helvetica Neue', sans-serif;
}

.form-container {
  background-color: #fff;
  padding: 2% 5%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

input[type="submit"] {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #4285f4;
  color: #fff;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

input[type="submit"]:hover {
  background-color: #2d72d9;
}

a {
  color: #4285f4;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
  padding-bottom: 30px;
}

a:hover {
  color: #000000;
}

</style>