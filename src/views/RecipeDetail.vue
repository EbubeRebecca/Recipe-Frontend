<template>
    <div>

        <LoggedInHeader />
        <div class="container">
            <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />

            <p>{{ recipe.user.name }}</p>
            <p>{{ recipe.title }}</p>
            <p>{{ recipe.description }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import LoggedInHeader from "../components/LoggedInHeader.vue";
export default {
    name: 'SingleRecipe',
    components: {
        LoggedInHeader
    },
    data() {
        return {
            recipe: '',
            errors: []
        }
    },
    methods: {

    },
    created: function () {
        let that = this;
        const recipe_slug = this.$route.params.slug;
        let url = '/api/srecipe/' + recipe_slug;
        const token = localStorage.getItem('token');
        axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (res.data.success) {
                that.recipe = res.data.data;
            }
        }).catch(err => {
            this.errors.push(err);

            console.log(err.request)

        })
    },
}
</script>