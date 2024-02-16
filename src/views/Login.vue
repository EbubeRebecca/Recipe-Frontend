<template>
    <div class="login">
        <a-space direction="vertical">
            <a-input v-model="email" placeholder="Email" />
            <a-input v-model="password" autofocus placeholder="Password"  type="password"/>
           
        </a-space>
    </div>
</template>
<script >

export default{
    name:'Login',
    components: {

},
data(){
    return {
        email : "",
        password : "",
          submitted:false,
  processing:false,
        errors:[]
    }
},
    methods : {
        handleSubmit(e){
            e.preventDefault()

            if (this.password.length > 0 && this.username.length > 0){
                this.processing=true;
                this.submitted=true;
                let formData = { username:this.email, password:this.password};

                this.$store.dispatch('login', formData)
                    .then(() => this.$router.push('/'))
                    .catch(() => {this.errors.push("Incorrect username or password");this.processing=false;
                        this.submitted=false;})
            }
            else{
                this.username = ''
                this.password = ''
            }


        }

    }
}
</script>
  