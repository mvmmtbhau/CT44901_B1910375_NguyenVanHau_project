<template>
  <router-view :key="this.$route.fullPath"></router-view>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const getCurrentUser = async () => {
      const access_token = localStorage.getItem("access_token") || "";

      if (access_token) {
        const decodedHeader = jwt_decode(access_token);
        store.dispatch("auth/handleSetUser", decodedHeader[0]);

        if (location.pathname == '/login') {
          router.push({
            name: 'Home',
          })
        };
      }

      if (!access_token || store.state.auth.user == null) {
        router.push({
          name: 'Login',
        })
      }
    }

    getCurrentUser();

    return {

    }
  }
}
</script>

<style scoped></style>
