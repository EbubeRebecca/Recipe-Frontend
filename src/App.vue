<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <Header v-if="has_header"></Header>

    <RouterView />
</template>

<script>
import Header from "./components/Header.vue";
export default {
    name: 'App',
    components: {
        Header

    },
    computed: {
        has_header: function () {
            let has_header_val = this.$route.meta.has_header;
            return has_header_val
        }
    }
}
</script>