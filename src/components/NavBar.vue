<!--<template>
    <div>
        NAVBAR
    </div>
</template>-->

<template>
    <div>
        <header>
            <div class="head_container">
                <div class="user">
                    <img :src="linkLogo" alt="Univates logo" />
                    <div class="info_user">
                        <span class="name">{{ user.name }} - Código: {{ user.id }}</span>
                        <span class="email">{{ user.email }}</span>
                    </div>
                </div>

                <div class="menu" id="myTopnav">
                    <ul>
                        <a style="font-size: 15px; color: #F8F8F8;" class="icon" @click="openNav()">&#9881;</a>
                        <li><strong><router-link :to="{ name: 'Home' }">Todos os Eventos</router-link></strong></li>
                        <li><strong><router-link :to="{ name: 'Subscriptions' }">Minhas inscrições</router-link></strong></li>
                        <li>Bem vindo {{ user.name }}</li>
                        <li><a @click="logout">Sair</a></li>
                    </ul>
                </div>
            </div>
        </header>
        <div id="mySidenav" class="sidenav" ref="sidenavRef">
            <a class="closebtn" @click="closeNav()">&times;</a>
            <a href="#">Home</a>
            <a href="#">About</a>
        </div>
    </div>
</template>
  
<script setup>
// imports
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// hooks - composables
const store = useStore();
const router = useRouter();

// Logo
const linkLogo = ref(
    "https://cdn.pixabay.com/photo/2022/02/22/20/38/tiger-7029549_1280.png"
);

// Configuração de responsividade do menu
const sidenavRef = ref(null);

function openNav() {
    sidenavRef.value.style.width = "250px";
}

function closeNav() {
    sidenavRef.value.style.width = "0";
}

// User
store.dispatch("getUser");
const user = computed(() => store.state.user.data);
const logout = () => {
    store.dispatch("logout").then(() => {
        router.push({
            name: "Login",
        });
    });
};
</script>
  
<style scoped>

.head_container {
    margin: -8px;
    padding: 20px;
    overflow: hidden;
    background-color: #041835;
    margin-bottom: 20px;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.logo {
    float: left;
    margin-left: 20px;
}

.logo img {
    height: 50px;
}

.user {
    display: flex;
    flex-direction: row;
    float: left;
}

.user img {
    height: 50px;
}

.user .info_user {
    display: flex;
    flex-direction: column;
}

.user .info_user {
    justify-content: center;
    margin: 15px;
}

.user .info_user span {
    color: #F8F8F8;
}

.user .info_user .name {
    color: #F8F8F8;
    font-size: 16px;
    font-weight: bold;
}

.menu {
    margin-top: 5px;
    float: right;
}

.menu ul {
    list-style-type: none;
    margin-right: 10px;
}

.menu li {
    display: inline;
    margin: 0 5px;
}

.menu a {
    text-decoration: none;
    font-weight: 500;
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
    color: white;
}

.menu a:hover {
    background: rgba(247, 202, 24, 0.1);
    border-top: #df8c0f;
    border-bottom: #df8c0f;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    transition: 200ms;
}

.icon {
    display: none;
}

menu.responsive {
    position: relative;
}

menu.responsive {
    float: none;
    display: block;
    text-align: left;
}

@media screen and (max-width: 835px) {
    .logo img {
        height: 40px;
    }

    ul>li:first-of-type {
        display: none;
    }

    .menu {
        margin: 0;
        display: contents;
    }
}

@media screen and (max-width: 690px) {
    .menu li {
        display: none;
    }

    .icon {
        font-weight: 900 !important;
        font-size: 27px !important;
        padding: 0;
        margin: 0;
        margin-top: -22px;
        float: right;
        display: flex;
    }

    .logo img {
        height: 40px;
    }
}

.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #fff;
    overflow-x: hidden;
    transition: 0.2s;
    padding-top: 87px;
    box-shadow: 2px 8px 20px rgba(0, 0, 0, 0.24);
}

.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #1c3664;
    display: block;
    transition: 0.3s;
}

.sidenav a:hover,
.offcanvas a:focus {
    color: #f7ca18;
}

.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}
</style>