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
                            <a-input placeholder="Recipe name" size="large" v-model:value="title" />
                        </a-form-item>


                    

                        <a-form-item ref="name" label="Description" name="description">

                            <ckeditor :editor="editor" v-model="description" :config="editorConfig" @ready="onEditorReady"></ckeditor>

                           </a-form-item>

                                <a-form-item ref="name" label="Location" name="name">
                            <a-input placeholder="Location" size="large" v-model:value="location" />
                        </a-form-item>


                        <a-form-item ref="name" label="Category" name="Category">

                            <a-select style="width: 120px" v-model:value="category_id" @change="filterRecipe">

                                <a-select-option v-for="category in categories" :value=category.id>{{ category.title
                                }}</a-select-option>

                            </a-select>


                        </a-form-item>
                     
 

                        <p>Header Image</p>

                        <input type="file"  multiple="multiple"   @change="handleFileUpload">
<p>Video</p>
                        <input type="file"   @change="handleVideoUpload">
                        <a-form-item>
                          
<a-button type="primary" html-type="submit" value="large"
                            size="large" class="blue-register-button small-space" :style="{ backgroundColor: '#ff800b' }" @click="handleSubmit">Submit</a-button>

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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
            videofile: '',
            location: '',
            category_id:'',
            errors:[],
            editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                }

        }
    },
    methods: {
        onEditorReady(editor) {
            //editor.plugins.get('Console').enable();
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
      };},
        handleFileUpload(event) {
            let that = this;
      const files = event.target.files;
      this.imageFiles = Array.from(files);
    },
    handleVideoUpload(event) {
    
      this.videofile =  event.target.files[0];
    },
        handleSubmit: function(){
            let that=this;
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
       
        that.$swal({
        title: 'New recipe',
        text: 'Recipe created successfully',
        icon: 'info',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-button-class' 
        }
      });
      that.$router.push('/profile');
    }

}).catch(err => {
            this.errors.push(err);

            console.log(err.request)

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

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then(file => {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem('token');
          const formData = new FormData();
          formData.append('image', file);

          axios.post('/api/image/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
            console.log(response.data);
            resolve({
              default: response.data.url
            });
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
        });
      });
  }

  abort() {
    // Abort the upload process if needed
  }
}
</script>

<style>
.small-space{
    margin-top:20px;
}</style>