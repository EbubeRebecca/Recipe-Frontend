<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
    <main>
        <TheWelcome />
        <div v-if="this.$store.getters.isLoggedIn">
            <p> User is logged in</p>
        </div>

    </main>
</template>
