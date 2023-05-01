<template>
    <nav-bar></nav-bar>
    <div class="container animate__animated animate__fadeInLeft">
        <!-- <div v-if="events.loading" class="flex justify-center">Loading...</div> -->
        <div v-if="events.data.length">
            <div class="event-container" v-for="(event, i) in events.data" :key="event.id">
                <span>Identificador: {{ event.id }}</span>
                <h3>{{ event.description }}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eos aliquid consequuntur vitae
                    explicabo laudantium quam officia soluta molestias eum iusto provident odio, ducimus, adipisci
                    distinctio modi ipsa! Delectus, hic.</p>
                <h4>{{ formatDate(event.event_date) }}</h4>
                <a @click="signup(event.id)">Inscrever-se</a>

            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
    store.dispatch("getUser");
    store.dispatch("getEvents");
});

const events = computed(() => store.state.events);
const usuario = ref(store.state.user.data);

function signup(eventId) {
  const signupData = { eventId: eventId, userId: usuario.value.id };
  store.dispatch("signUpInEvent", signupData).then(() => {
      alert('Inscrição realizada para o usuário de código: ' + signupData.userId)
  });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const day = utcDate.getDate().toString().padStart(2, '0');
    const month = (utcDate.getMonth() + 1).toString().padStart(2, '0');
    const year = utcDate.getFullYear();
    return `${day}/${month}/${year}`;
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

.event-container {
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

.event-container span {
    margin-right: auto;
}

.event-container h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.event-container p {
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
    margin-left: auto;
}

a:hover {
    background-color: #064ab1;
}
</style>