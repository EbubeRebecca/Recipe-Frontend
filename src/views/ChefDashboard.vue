<template>
    <div>
        <p>Chef Dashboard</p>
        <router-link :to="{ name: 'createrecipe' }">AddRecipe</router-link>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'
export default {
    name: 'ChefDashboard',
    components: {},
    data() {

    }
}
</script>