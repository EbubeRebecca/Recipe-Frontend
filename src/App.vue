<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
   
        <RouterView />
   </template>

<script>
import Header from "./components/Header.vue";
import ChefDashboard from "./views/ChefDashboard.vue";

import GuestHomepage from "./views/GuestHomepage.vue";
export default {
    name: 'App',
    components: {
        Header,
        ChefDashboard,
        GuestHomepage

    },
    computed: {
        has_header: function () {
            let has_header_val = this.$route.meta.has_header;
            return has_header_val
        },
        isLoggedIn: function () {
            return this.$store.getters.isLoggedIn;
        }
    }
}
</script>