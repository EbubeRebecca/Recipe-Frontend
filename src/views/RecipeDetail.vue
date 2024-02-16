<template>
    {{ recipe }}
</template>

<script>
import axios from 'axios'
export default {
    name: 'SingleRecipe',
    components: {},
    data() {
        return {
            recipe: '',
            errors: []
        }
    },
    methods: {

    },
    created: function () {

        const recipe_id = this.$route.params.id;
        let url = '/api/recipe/' + recipe_id;
        axios({
            url: url, method: 'GET'
        })
            .then(res => {
                const recipe = JSON.parse(res.data.data)
                this.recipe = recipe
            }).catch(err => {
                this.errors.push(err);

                console.log(err.request)

            })
    },
}
</script>