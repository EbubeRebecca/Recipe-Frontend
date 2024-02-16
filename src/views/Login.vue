<template>
    <div class="login">
        <a-space direction="vertical">
            <a-input v-model:value="value" placeholder="Email" />
            <a-input v-model:value.lazy="value1" autofocus placeholder="Password" />
            <a-form-item>
                <a-button type="primary" html-type="submit" value="large" class="blue-register-button">Login</a-button>
            </a-form-item>
        </a-space>
    </div>
</template>
<script setup>
import { watch, ref } from 'vue';
const value = ref('');
const value1 = ref('');
watch(value, () => {
    console.log(value.value);
});
watch(value1, () => {
    console.log(value1.value);
});
</script>
  