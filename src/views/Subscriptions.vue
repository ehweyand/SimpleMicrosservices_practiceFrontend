<template>
    <nav-bar></nav-bar>
    <div class="container animate__animated animate__fadeInLeft">

        <div class="subscription-container" v-for="(subscription, i) in subscriptions" :key="subscription.id">
            <h3>Código da Inscrição: {{ subscription.id }}</h3>
            <small>ID usuário: {{ subscription.users_id }}</small>
            <small>ID evento : {{ subscription.events_id }}</small>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt ipsam nam libero error, quibusdam ullam
                sit harum obcaecati animi, nihil consectetur aut. Culpa officia perferendis natus exercitationem incidunt
                vero dolorum.</p>
            <base-flex class="flex">
                <a @click="markAttendanceOnEvent(subscription.users_id, subscription.events_id)">Check-in</a>
                <a @click="generateCertificate(subscription.users_id, subscription.events_id)">Gerar Certificado</a>
            </base-flex>
        </div>

    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(async () => {
    await store.dispatch("getUser");
    await store.dispatch("getSubscriptionsByUser", store.state.user.data.id);
});

const subscriptions = computed(() => store.state.subscriptionsByUser);

const generateCertificate = (users_id, events_id) => {
    store.dispatch('generateCertificate', { users_id: users_id, events_id: events_id });
}

const markAttendanceOnEvent = (users_id, events_id) => {
    store.dispatch('markAttendance', { users_id: users_id, events_id: events_id });
}

</script>

<style scoped>
* {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.subscription-container {
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 20px;
    max-width: 600px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.subscription-container span {
    margin-right: auto;
}

.subscription-container h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.subscription-container p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
}

a {
    display: inline-block;
    background-color: #041835;
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    cursor: pointer;
}

a:hover {
    background-color: #064ab1;
}
</style>