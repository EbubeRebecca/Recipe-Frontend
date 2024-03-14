<template>
    <div class="homepage-wrapper ">
        <div class="container">
       <Header/>


        <div class="container">
<div class="row hompage-hero">
    
                <div class="col-sm-6 col-xs-12">
                    <div>
                        <h2 class="homepage-h2">Share</h2>
                        <h2 class="homepage-h2 "><span class="root-orange">Recipes</span> with</h2>
                        <h2 class="homepage-h2">Everyone</h2>
                        <p class="muted-text">Share recipes with recipe seekers.<br /> Join as a Chef or Recipe Seeker</p>


                        <router-link to="register"><a-button type="primary" shape="round" html-type="submit" value="large"
                                size="large" class="blue-register-button"
                                :style="{ backgroundColor: '#ff800b' }">Register</a-button></router-link>

                    </div>
                </div>
                <div class="col-sm-6 col-xs-12">

                    <img src="/img/valencia.png" width="100%" style="object-fit: contain;">
            <div>
</div>
        </div></div>
    </div></div></div>
</template>

<script>

import Header from "../components/Header.vue";

export default {
    name: 'GuestHomepage',
    components: {
        Header,
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
    }
}

</script>