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


                        <a-form-item ref="name" label="Location" name="name">
                            <a-input placeholder="Location" size="large" v-model:value="location" />
                        </a-form-item>


                        <a-form-item ref="name" label="Description" name="description">
                            <a-textarea v-model:value="description" placeholder="Recipe description"
                                :auto-size="{ minRows: 4, maxRows: 6 }" /> </a-form-item>


                        <a-form-item ref="name" label="Category" name="Category">

                            <a-select style="width: 120px" v-model:value="category_id" @change="filterRecipe">

                                <a-select-option v-for="category in categories" :value=category.id>{{ category.title
                                }}</a-select-option>

                            </a-select>


                        </a-form-item>


                        <p>Image upload</p>
                        <a-upload v-model:value="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
                            :show-upload-list="false" :before-upload="beforeUpload" @change="handleChange"
                            :customRequest="handleUpload" :capture="environment" accept=".jpg, .jpeg, .png" ref="uploadBtn"
                            maxCount={5} multiple></a-upload>


                        <p>Video upload</p>
                        <a-upload v-model:file-list="videofile" name="file"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers">
                            <a-button>
                                <upload-outlined></upload-outlined>
                                Click to Upload
                            </a-button>
                        </a-upload>
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
            videofile: [],
            location: ''

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