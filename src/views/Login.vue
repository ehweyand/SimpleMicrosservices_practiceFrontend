<template>
    <div class="container">
        <h2 class="animate__animated animate__backInDown">Login</h2>
        <div class="form-container animate__animated animate__fadeInLeft">
            <form @submit="login">
                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" v-model="user.email" required>
                <label for="password">Senha:</label>
                <input type="password" id="password" name="password" v-model="user.password" required>
                <button type="submit">Entrar</button>
            </form>
        </div>
        <div class="register-link">
            Ainda não possui uma conta? <router-link :to="{ name: 'Register' }">Crie uma agora!</router-link>
        </div>
    </div>
</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const user = {
    email: "",
    password: "",
};

let loading = ref(false);
let errorMsg = ref("");

function login(ev) {
    ev.preventDefault();

    loading.value = true;
    store
        .dispatch("login", user)
        .then(() => {
            loading.value = false;
            router.push({
                name: "Home",
            });
        })
        .catch((err) => {
            loading.value = false;
            errorMsg.value = err.response.data.error;
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

button[type="submit"] {
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
    margin-top: 20px;
}

button[type="submit"]:hover {
    background-color: #2d72d9;
}

a {
    color: #4285f4;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: #000000;
}

.register-link {
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
}

.register-link a {
    color: #4285f4;
    text-decoration: none;
}

.register-link a:hover {
    color: #000000;
}
</style>