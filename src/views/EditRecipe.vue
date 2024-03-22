<template>
    <div>

        <LoggedInHeader />
       
        <a-row v-if="recipe">
            <a-col :span="8"></a-col>
            <a-col :span="8">
                <a-space direction="vertical" style="width: 100%">

                    <h3>Edit recipe</h3>
                    <a-form layout="vertical">


                        <a-form-item ref="name" label="Title" name="name">
                            <a-input placeholder="Recipe name" size="large" v-model:value="recipe.title" />
                        </a-form-item>

                        <a-form-item ref="name" label="Description" name="description">

<ckeditor :editor="editor" v-model="recipe.body" :config="editorConfig" @ready="onEditorReady"></ckeditor>

</a-form-item>
                    

                        

                                <a-form-item ref="name" label="Location" name="name">
                            <a-input placeholder="Location" size="large" v-model:value="recipe.location" />
                        </a-form-item>
                        <a-form-item>
                            <p>Header Image</p>

<input type="file"  accept="image/*" @change="handleImageUpload">
<p>Video</p>
<input type="file" accept="video/*"  @change="handleVideoUpload">
                     
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
import MyUploadAdapter from '../utils/ckuploadadapter'
import LoggedInHeader from "../components/LoggedInHeader.vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    name: 'EditRecipe',
    components: {
        LoggedInHeader
    },
    data() {
        return {
            recipe:'',
            title: '',
            description: '',
            categories: [],
            fileList: [],
            imagefile:'',
            videofile: '',
            location: '',
            category_id:'',
            errors:[],
            editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                },
            
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
    handleImageUpload(event) {
    
    this.imagefile =  event.target.files[0];
  },
        handleSubmit: function(){
            let that=this;
         const formData = new FormData();
     

      if (this.videofile){
      formData.append('video',this.videofile);}

      if (this.imagefile){
      formData.append('image',this.imagefile);}

      formData.append('title',this.recipe.title);
      formData.append('body',this.recipe.body);

      formData.append('category_id',this.recipe.category_id);

      formData.append('location',this.recipe.location);

      const token = localStorage.getItem('token');
      const url = '/api/edit/recipe/'+this.recipe.id+'/';
           
axios.post(url, formData, {
    headers: {
        'Content-Type': 'multipart/form-data','Authorization': `Bearer ${token}`
    },
  }
).then(res => {
    if (res.data.success){
       
        that.$swal({
        title: 'Recipe updated',
        text: 'Recipe updated successfully',
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
        let that = this;
        if (this.$store.getters.user_type != 'chef') {
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
                 //check if recipe is equal to user id
                if (that.$store.getters.user.id ==res.data.data.created_by_id){
               
                that.recipe = res.data.data;}
                else{
                    that.errors.push('You are not authorized to perform this action');

                }
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