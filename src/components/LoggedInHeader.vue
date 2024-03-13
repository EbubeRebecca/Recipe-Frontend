<template>
    <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 ">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">

                <span class="fs-4"> <img src="/recipe-hub-logo.png" width="100"></span>
            </a>

            <ul class="nav">
                <li class="nav-item home-nav-item"><a href="/" class="nav-link active" aria-current="page">Home</a></li>
                <li class="nav-item home-nav-item"><router-link to="/profile" class="nav-link">My Recipes</router-link>
                </li>

                <li class="nav-item home-nav-item"> <a v-on:click="logout" class="nav-link">Logout</a></li>


            </ul>
        </header>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'


export default {
    name: 'Header',
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
    }
}
</script>
