<template>
    <div>

        <LoggedInHeader />
        <div class="container">

            <p>Chef Dashboard</p>

            <h4> Welcome,{{ user.name }} </h4>

            <div v-if="isChef">
                <router-link :to="{ name: 'createrecipe' }">AddRecipe</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import LoggedInHeader from "../components/LoggedInHeader.vue";
export default {
    name: 'ChefDashboard',
    components: {
        LoggedInHeader
    },
    data() {

    },
    methods: {
        logout: function () {
            this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push('/login')
                })
        },
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        }
        , user() {
            return this.$store.getters.user;
        },
        isChef() {
            return this.$store.getters.user_type == 'chef';
        }

    }
}
</script>