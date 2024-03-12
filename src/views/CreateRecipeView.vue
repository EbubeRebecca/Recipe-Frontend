<template>
    <div class="register">


        <LoggedInHeader />
        <a-row>
            <a-col :span="8"></a-col>
            <a-col :span="8">
                <a-space direction="vertical" style="width: 100%">

                    <h3>Add new recipe</h3>
                    <a-form layout="vertical">


                        <a-form-item ref="name" label="Title" name="name">
                            <a-input placeholder="Recipe name" size="large" v-model:value="name" />
                        </a-form-item>


                    

                        <a-form-item ref="name" label="Description" name="description">
                            <a-textarea v-model:value="description" placeholder="Recipe description"
                                :auto-size="{ minRows: 4, maxRows: 6 }" /> </a-form-item>

                                <a-form-item ref="name" label="Location" name="name">
                            <a-input placeholder="Location" size="large" v-model:value="location" />
                        </a-form-item>


                        <a-form-item ref="name" label="Category" name="Category">

                            <a-select style="width: 120px" v-model:value="category_id" @change="filterRecipe">

                                <a-select-option v-for="category in categories" :value=category.id>{{ category.title
                                }}</a-select-option>

                            </a-select>


                        </a-form-item>


                        <p>Image upload</p>
                        <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
                        :multiple="true" 
                            :show-upload-list="false" :before-upload="beforeUpload" @change="handleChange"
                            :customRequest="handleUpload" :capture="environment" accept=".jpg, .jpeg, .png" ref="uploadBtn"
                            maxCount={5} multiple></a-upload>


                        <p>Video upload</p>
                        <a-upload v-model:file-list="videofile" name="file"
                          >
                            <a-button>
                                <upload-outlined></upload-outlined>
                                Click to Upload
                            </a-button>
                        </a-upload><p>Images</p>

                        <input type="file" ref="images" multiple="multiple"   @change="handleFileUpload">
<p>Video</p>
                        <input type="file" ref="video" >
                        <a-form-item>
                          

                        <router-link :to="{ name: 'createrecipe' }"><a-button type="primary" html-type="submit" value="large"
                            size="large" class="blue-register-button small-space" :style="{ backgroundColor: '#ff800b' }">Submit</a-button></router-link>

                        </a-form-item>

                    </a-form>


                </a-space>
            </a-col>
            <a-col :span="8"></a-col>
        </a-row>
        <a-row></a-row>


    </div>
</template>
<script>
import axios from 'axios';
import router from '../router'
import store from '../store'

import LoggedInHeader from "../components/LoggedInHeader.vue";
export default {
    components: {
        LoggedInHeader
    },
    data() {
        return {
            title: '',
            description: '',
            categories: [],
            fileList: [],
            imageFiles:[],
            videofile: [],
            location: '',
            category_id:''

        }
    },
    methods: {
        handleFileUpload(event) {
      const files = event.target.files;
      this.imageFiles = Array.from(files);
    },
        submit: function(){
         const formData = new FormData();
      this.imageFiles.forEach(file => {
        formData.append('images[]', file);
      });
      formData.append('video',videofile);
      formData.append('title',title);
      formData.append('body',description);

      formData.append('category_id',description);

      formData.append('location',description);


axios.post('/fileupload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
  }
).then(function(){
})
.catch(function(){
});
        }
    },
    created: function () {
        if (store.getters.user_type != 'chef') {
            //You can't perform this action
            router.push('/');
        } let self = this;

        axios.get('/api/category').then(res => {


            self.categories = res.data.category.data

        })
    }
}
</script>

<style>
.small-space{
    margin-top:20px;
}</style>