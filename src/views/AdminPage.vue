<template>
    <div class="admin">
        <h1>Admin</h1>
    </div>
</template>
  
<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>

<script>
import store from '@/store'
import router from '@/router'
export default {
    name: 'AdminLogin',
    components: {

    },
    created: function () {
        if (!store.getters.isAdminLoggedIn) {
            //You can't perform this action
            router.push('/admin/login');
        }
    }
}

</script>
  