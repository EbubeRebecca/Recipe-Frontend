<template>
    <div class="login">
        <div class="container">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 ">
                <a href="/"
                    class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">

                    <span class="fs-4">Recipes</span>
                </a>

                <ul class="nav ">
                    <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
                    <li class="nav-item"> <router-link to="login" class="nav-link">Login</router-link></li>
                    <li class="nav-item"> <router-link to="register" class="nav-link">Register</router-link></li>

                </ul>
            </header>
        </div>
        <a-row>
            <a-col :span="8"></a-col>
            <a-col :span="8">
                <a-space direction="vertical" style="width: 100%">

                    <h3>Admin Login Form</h3>

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
                        </a-form-item>
                    </a-form>


                </a-space>
            </a-col>
            <a-col :span="8"></a-col>
        </a-row>
    </div>
</template>
<script >
import router from '@/router'
import store from '@/store'
export default {
    name: 'AdminLogin',
    components: {

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

                this.$store.dispatch('admin_login', formData)
                    .then(() => this.$router.push('/admin'))
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
  