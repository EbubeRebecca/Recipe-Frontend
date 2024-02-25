<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
    <main>
        <Header v-if="has_header"></Header>

        <ChefDashboard v-if="isLoggedIn"></ChefDashboard>

        <GuestHomepage v-else></GuestHomepage>


    </main>
</template>


<script>

import Header from "../components/Header.vue";
import ChefDashboard from "./ChefDashboard.vue";

import GuestHomepage from "./GuestHomepage.vue";
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