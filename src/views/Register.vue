<template>
    <div class="register">
        <div class="container">
       <Header/>

        <a-row>
            <a-col :xs="2" :sm="4" :md="8" :lg="8" :xl="8"></a-col>
            <a-col :xs="20" :sm="16" :md="8" :lg="8" :xl="8">
                <a-space direction="vertical" style="width: 100%">

                    <h3>Registration Form</h3>
                    <a-form layout="vertical">


                        <a-form-item ref="name" label="Full name" name="name">
                            <a-input placeholder="Full Name" size="large" v-model:value="name" />
                        </a-form-item>

                        <a-form-item ref="email" label="Email" name="email">
                            <a-input placeholder="Email" size="large" v-model:value="email" />
                        </a-form-item>

                        <a-form-item ref="password" label="Password" name="password">
                            <a-input placeholder="Password" size="large" type="password" v-model:value="password" />
                        </a-form-item>



                        <a-form-item label="User role" name="user_role">
                            <a-radio-group name="radioGroup" v-model:value="user_role">
                                <a-radio value="chef">Chef</a-radio>
                                <a-radio value="recipe_seeker">Recipe Seeker</a-radio>

                            </a-radio-group>
                        </a-form-item>

                        <a-form-item>
                            <a-button type="primary" html-type="submit" value="large" size="large"
                                class="blue-register-button" :style="{ backgroundColor: '#ff800b' }"
                                v-on:click="handleSubmit">Register</a-button>
                        </a-form-item>

                    </a-form>


                </a-space>
            </a-col>
            <a-col :xs="2" :sm="4" :md="8" :lg="8" :xl="8"></a-col>
        </a-row>
        <a-row></a-row>

    </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import router from '../router'
import store from '../store'
import Header from "../components/Header.vue";
export default defineComponent({
    components:{
        Header
    },
    data() {
        return {
            user_role: '',
            name: '',
            email: '',
            password: '',
            errors: []
        }
    },
    setup() {

        return {

        };
    },
    methods: {
        handleSubmit(e) {
            let that=this;
            e.preventDefault()



            if (this.password.length > 0 && this.email.length > 0 && this.user_role.length > 0 && this.name.length > 0) {
                this.processing = true;
                this.submitted = true;
                let formData = { email: this.email, password: this.password, password_confirmation: this.password, user_type: this.user_role, name: this.name };

                this.$store.dispatch('register', formData)
                    .then(()=> {
                    
                    this.$swal({
        title: 'Account creation',
        text: 'Account created successfully',
        icon: 'info',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-button-class' 
        }
      });
                    that.$router.push({ name: 'login'});
    })
                    .catch(() => {
                        this.errors.push("An error occured during registration"); this.processing = false;
                        this.submitted = false;
                    })
            }
            else {
                this.username = ''
                this.password = ''
            }


        }

    },
    created: () => {
        if (store.getters.isLoggedIn) {
            return router.push('/');
        }
    }
});
</script>


<style scoped>
.nav-item a {
    text-decoration: none;
    color: #898986 !important;
}

.custom-button-class{
    background-color: #ff800b;
}
</style>