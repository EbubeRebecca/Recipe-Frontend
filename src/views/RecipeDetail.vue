<template>
    <div>

        <LoggedInHeader />
        <div class="container" v-if="recipe">
            <img :alt=recipe.title :src=recipe.images[0].full_path height="300"/>
            <p class="username"> Posted by {{ recipe.user.name }}</p>
            <p>{{ recipe.location }}</p>
         
            <h3>{{ recipe.title }}</h3>
            <p>{{ recipe.body }}</p>

            <video class="video" width="320" height="240" controls>
      <source :src="recipe.full_video_path" type="video/mp4" >
    </video>
          

            
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

            

        })
    },
}
</script>
<style scoped>
.username{
    font-size:small;
}</style>