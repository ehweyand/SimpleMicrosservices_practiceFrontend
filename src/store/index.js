import { createStore } from "vuex";
import { axiosUsers, axiosCertificates, axiosEvents } from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    events: {
      loading: false,
      data: [],
    },
    subscriptionsByUser: {
      loading: false,
      data: [],
    },
    currentEvent: {
      data: {},
      loading: false,
    },
    notification: {
      show: false,
      type: "success",
      message: "",
    },
  },
  getters: {},
  actions: {
    // registra um usuário
    register({ commit }, user) {
      return axiosUsers.post("/register", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
      });
    },
    // loga um usuário
    login({ commit }, user) {
      return axiosUsers.post("/login", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
      });
    },
    // desloga o usuário
    logout({ commit }) {
      return axiosUsers.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
    // pega dados do usuário
    getUser({ commit }) {
      return axiosUsers.get("/user").then((res) => {
        commit("setUser", res.data);
      });
    },
    getEvents({ commit }) {
      commit("setEventsLoading", true);
      return axiosEvents.get("/events").then((res) => {
        commit("setEventsLoading", false);
        commit("setEvents", res.data);
        return res;
      });
    },
    getEvent({ commit }, id) {
      commit("setCurrentEventLoading", true);
      return axiosEvents
        .get(`/events/${id}`)
        .then((res) => {
          commit("setCurrentEvent", res.data);
          commit("setCurrentEventLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentEventLoading", false);
          throw err;
        });
    },
    signUpInEvent({ commit }, { eventId, userId }) {
      return axiosEvents
        .post(`/events/${eventId}/signup`, { user_id: userId })
        .then(({ data }) => {
          return data;
        });
    },
    getSubscriptionsByUser({ commit }, userId) {
      return axiosEvents
        .get(`/events/subscriptions/${userId}`)
        .then((res) => {
          commit("setSubscriptionsByUser", res.data);
          return res;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    generateCertificate({ commit }, data) {
      // Define o tipo de resposta esperada como um blob
      const config = {
        responseType: "blob",
      };
      return axiosCertificates
        .post(
          "/certificates/generate-certificate",
          { users_id: data.users_id, events_id: data.events_id },
          config
        )
        .then((response) => {
          // Obtém o conteúdo do arquivo a partir da resposta
          const file = new Blob([response.data], { type: "application/pdf" });
          // Cria um URL temporário para o arquivo
          const fileURL = URL.createObjectURL(file);
          // Cria um link temporário para o download do arquivo
          const link = document.createElement("a");
          link.href = fileURL;
          link.setAttribute("download", "certificate.pdf");
          document.body.appendChild(link);
          // Simula um clique no link para iniciar o download do arquivo
          link.click();
          // Remove o link e libera o URL temporário
          document.body.removeChild(link);
          URL.revokeObjectURL(fileURL);
        });
    },
    markAttendance({ commit }, data) {
      return axiosEvents
        .post("/events/markAttendance", {
          user_id: data.users_id,
          event_id: data.events_id,
        })
        .then((res) => {
          alert('Presença registrada!')
          return res;
        });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },

    setUser: (state, user) => {
      state.user.data = user;
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem("TOKEN", token);
    },
    setEventsLoading: (state, loading) => {
      state.events.loading = loading;
    },
    setEvents: (state, events) => {
      state.events.data = events;
    },
    setCurrentEventLoading: (state, loading) => {
      state.currentEvent.loading = loading;
    },
    setCurrentEvent: (state, event) => {
      state.currentEvent.data = event.data;
    },
    setSubscriptionsByUser(state, subscriptions) {
      state.subscriptionsByUser = subscriptions;
    },
    notify: (state, { message, type }) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000);
    },
  },
  modules: {},
});

export default store;
