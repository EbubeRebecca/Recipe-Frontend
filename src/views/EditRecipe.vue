<template>
    <div>

        <LoggedInHeader />
        <div class="container" v-if="recipe">
            <img :alt=recipe.title :src=recipe.images[0].full_path height="300"/>
            <p class="username"> Posted by {{ recipe.user.name }}</p>
            <p>{{ recipe.location }}</p>
         
            <h3>{{ recipe.title }}</h3>
            <p>{{ recipe.body }}</p>
          

            
        </div>
        <a-row>
            <a-col :span="8"></a-col>
            <a-col :span="8">
                <a-space direction="vertical" style="width: 100%">

                    <h3>Add new recipe</h3>
                    <a-form layout="vertical">


                        <a-form-item ref="name" label="Title" name="name">
                            <a-input placeholder="Recipe name" size="large" v-model:value="title" />
                        </a-form-item>


                    

                        <a-form-item ref="name" label="Description" name="description">
                            <a-textarea v-model:value="description" placeholder="Recipe description"
                                :auto-size="{ minRows: 4, maxRows: 6 }" /> </a-form-item>

                                <a-form-item ref="name" label="Location" name="name">
                            <a-input placeholder="Location" size="large" v-model:value="location" />
                        </a-form-item>
                        <a-form-item>
                     
                        <a-button type="primary" html-type="submit" value="large"
                            size="large" class="blue-register-button small-space" :style="{ backgroundColor: '#ff800b' }" @click="handleSubmit">Submit</a-button>

                        </a-form-item>

                    </a-form></a-space>

                </a-col>
            <a-col :span="8"></a-col>
        </a-row>
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
            title:'',
            description: '',
            errors: [],
            categories:[]
        }
    },
    methods: {
        handleSubmit: function(){
         const formData = new FormData();
      this.imageFiles.forEach(file => {
        formData.append('images[]', file);
      });
      formData.append('video',this.videofile);
      formData.append('title',this.title);
      formData.append('body',this.description);

      formData.append('category_id',this.category_id);

      formData.append('location',this.location);

      const token = localStorage.getItem('token');
           
axios.post('/api/recipe/', formData, {
    headers: {
        'Content-Type': 'multipart/form-data','Authorization': `Bearer ${token}`
    },
  }
).then(res => {
    if (res.data.success){
        alert('Recipe created successfully');
    }
}).catch(err => {
            this.errors.push(err);

            console.log(err.request)

        });
        }
    },
    created: function () {
        let that = this;
        if (store.getters.user_type != 'chef') {
            //You can't perform this action
            router.push('/');
        }
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

        

        axios.get('/api/category').then(res => {


            that.categories = res.data.category.data

        })
    },
}
</script>
<style scoped>
.username{
    font-size:small;
}</style>