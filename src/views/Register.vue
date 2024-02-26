<template>
    <div class="register">


        <a-row>
            <a-col :span="8"></a-col>
            <a-col :span="8">
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
                                class="blue-register-button" :style="{ backgroundColor: '#ff800b' }">Register</a-button>
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
import { defineComponent, ref } from 'vue';
export default defineComponent({
    data() {
        return {
            user_role: '',
            name: '',
            email: '',
            password: ''
        }
    },
    setup() {

        return {

        };
    },
});
</script>