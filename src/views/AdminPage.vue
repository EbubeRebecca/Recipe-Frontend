<template>
    <div class="admin">
        <h1>Admin</h1>

        <p>Recipe Seeker {{ recipe_seeker_count }}</p>

        <p>Recipes {{ recipe_count }}</p>

        <p>Chef {{ chef_count }}</p>
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
import axios from 'axios';
export default {
    name: 'Admin',
    components: {

    },
    data() {
        return {
            'recipe_seeker_count': 0,
            'chef_count': 0,
            'recipe_count': 0
        }
    },
    created: function () {
        if (!store.getters.isAdminLoggedIn) {
            //You can't perform this action
            router.push('/admin/login');
        }
        if (store.getters.isAdminLoggedIn) {
            axios.get('/api/account/summary').then(res => {
                if (res.data.success) {
                    this.chef_count = res.data.summary.chef_count;
                    this.recipe_seeker_count = res.data.summary.recipe_seeker_count;
                    this.recipe_count = res.data.summary.recipe_count;
                }

            })
        }


    }
}

</script>
  