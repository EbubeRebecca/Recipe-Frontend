<template>
    <div class="register">


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
                            <textarea></textarea>
                        </a-form-item>

                        <a-form-item ref="name" label="Category" name="Category">

                            <select name="category">
                                <option v-for="category in categories" :value=category.id>{{ category.title }}</option>

                            </select>
                        </a-form-item>



                        <a-upload v-model:value="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
                            :show-upload-list="false" :before-upload="beforeUpload" @change="handleChange"
                            :customRequest="handleUpload" :capture="environment" accept=".jpg, .jpeg, .png" ref="uploadBtn"
                            maxCount={5} multiple></a-upload>
                        <a-form-item>
                            <a-button type="primary" html-type="submit" value="large" size="large"
                                class="blue-register-button">Submit</a-button>
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
export default {
    data() {
        return {
            user_role: '',
            name: '',
            email: '',
            password: '',
            categories: [],
            fileList: []

        }
    },
    methods: {},
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