<template>
    <div class="login">
        <a-row>
            <a-col :span="8"></a-col>
            <a-col :span="8">
                <a-space direction="vertical" style="width: 100%">

                    <h3>Login Form</h3>
                    <a-input v-model="email" placeholder="Email" size="large" />
                    <a-input v-model="password" autofocus placeholder="Password" type="password" size="large" />
                    <a-form-item>
                        <a-button type="primary" html-type="submit" value="large" size="large"
                            class="blue-register-button">Register</a-button>
                    </a-form-item>


                </a-space>
            </a-col>
            <a-col :span="8"></a-col>
        </a-row>
    </div>
</template>
<script >

export default {
    name: 'Login',
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

            if (this.password.length > 0 && this.username.length > 0) {
                this.processing = true;
                this.submitted = true;
                let formData = { username: this.email, password: this.password };

                this.$store.dispatch('login', formData)
                    .then(() => this.$router.push('/'))
                    .catch(() => {
                        this.errors.push("Incorrect username or password"); this.processing = false;
                        this.submitted = false;
                    })
            }
            else {
                this.username = ''
                this.password = ''
            }


        }

    }
}
</script>
  