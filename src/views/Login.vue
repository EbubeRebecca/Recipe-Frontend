<template>
    <div class="login">
        <div class="container">
         <Header/>
     
        <a-row>
            <a-col :xs="2" :sm="4" :md="8" :lg="8" :xl="8"></a-col>
            <a-col :xs="20" :sm="16" :md="8" :lg="8" :xl="8">
                <a-space direction="vertical" style="width: 100%">

                    <h3>Login Form</h3>

                    <div v-if="errors">
                        <div class="alert alert-primary" role="alert" v-for="error in errors" v-bind:key="error.id">
                            {{ error }}
                        </div>
                    </div>

                    <a-form layout="vertical">
                        <a-form-item ref="email" label="Email" name="email">
                            <a-input v-model:value="email" placeholder="Email" size="large" />

                        </a-form-item>
                        <a-form-item ref="password" label="Password" name="password">
                            <a-input v-model:value="password" autofocus placeholder="Password" type="password"
                                size="large" />

                        </a-form-item> <a-form-item>
                            <a-button type="primary" html-type="submit" value="large" size="large"
                                class="blue-register-button" v-on:click="handleSubmit"
                                :style="{ backgroundColor: '#ff800b' }">Login</a-button>
                       
                                <a-spin :indicator="indicator" size="large" :spinning="processing">
</a-spin>     </a-form-item>

                    </a-form>


                </a-space>
            </a-col>
            <a-col :xs="2" :sm="4" :md="8" :lg="8" :xl="8"></a-col>
        </a-row>
    </div></div>
</template>
<script >
import router from '../router'
import store from '../store'
import Header from "../components/Header.vue";
export default {
    name: 'Login',
    components: {
Header
    },
    data() {
        return {
            email: "",
            password: "",
            submitted: false,
            processing: false,
            errors: []
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()



            if (this.password.length > 0 && this.email.length > 0) {
                this.processing = true;
                this.submitted = true;
                let formData = { email: this.email, password: this.password };

                this.$store.dispatch('login', formData)
                    .then(() => this.$router.push('/'))
                    .catch(() => {
                        this.errors.push("Incorrect email or password"); this.processing = false;
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
}
</script>


<style scoped>
.nav-item a {
    text-decoration: none;
    color: #898986 !important;
}
</style>