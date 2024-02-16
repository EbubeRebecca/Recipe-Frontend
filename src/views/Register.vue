<template>
    <div class="register">
        <a-space direction="vertical">
            <a-input v-model:value="value" placeholder="Email" />
            <a-input placeholder="Password" />

            <a-select ref="select" v-model:value="value1" style="width: 120px" @change="handleChange">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>
            <a-form-item>
                <a-button type="primary" html-type="submit" value="large" class="blue-register-button">Register</a-button>
            </a-form-item>

        </a-space>

    </div>
</template>
<script>


import { defineComponent, watch, ref } from 'vue';
const value = ref('');
const value1 = ref('');
watch(value, () => {
    console.log(value.value);
});
watch(value1, () => {
    console.log(value1.value);
});
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