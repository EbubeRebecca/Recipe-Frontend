<template>
    



    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container">
  <a class="navbar-brand" href="/"><img src="/recipe-hub-logo.png" width="30" height="30"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      


      <li class="nav-item home-nav-item"><a href="/" class="nav-link active" aria-current="page">Home</a></li>
                <li class="nav-item home-nav-item" v-if="isChef"><router-link to="/profile" class="nav-link">My Recipes</router-link></li>
              
                <li class="nav-item home-nav-item"> <a v-on:click="logout" class="nav-link">Logout</a></li>

    </ul>
   
  </div>
</div>
</nav>

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
        },
        isChef() {
            return this.$store.getters.user_type == 'chef';
        }
    }
}
</script>
