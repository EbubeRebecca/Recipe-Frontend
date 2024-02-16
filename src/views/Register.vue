<template>
    <div class="register">


        <a-row>
            <a-col :span="8"></a-col>
            <a-col :span="8">
                <a-space direction="vertical" style="width: 100%">
                    <h3>Registration Form</h3>
                    <a-input v-model:value="value" placeholder="Email" size="large" />
                    <a-input placeholder="Password" size="large" />

                    <a-select ref="select" v-model:value="value1" style="width: 200px" size="large">
                        <a-select-option value="chef">Chef</a-select-option>
                        <a-select-option value="foodie">Foodie</a-select-option>
                    </a-select>
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
<script>


import { defineComponent, watch, ref } from 'vue';

export default defineComponent({
    setup() {
        const options1 = ref([
            {
                value: 'jack',
                label: 'Jack',
            },
            {
                value: 'password',
                label: 'password',
            },
            {
                value: 'disabled',
                label: 'Disabled',
                disabled: true,
            },
            {
                value: 'yiminghe',
                label: 'Yiminghe',
            },
        ]);
        const options2 = ref([
            {
                value: 'lucy',
                label: 'Lucy',
            },
        ]);
        const options3 = ref([
            {
                value: 'lucy',
                label: 'Lucy',
            },
        ]);
        const focus = () => {
            console.log('focus');
        };
        const handleChange = value => {
            console.log(`selected ${value}`);
        };
        return {
            focus,
            handleChange,
            value1: ref('lucy'),
            value2: ref('lucy'),
            value3: ref('lucy'),
            options1,
            options2,
            options3,
        };
    },
});
</script>