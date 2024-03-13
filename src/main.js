//import './assets/main.css'
import { createApp } from 'vue'
import router from './router'
import store from './store'
import "ant-design-vue/dist/reset.css";
import App from './App.vue'
import { DatePicker } from 'ant-design-vue';
import { Select, ConfigProvider, Button, Tag, Menu, Dropdown, Avatar, Spin, Result, Space, Form, Tabs, Input, Checkbox, Row, Col, Modal, Alert, Divider, Upload, PageHeader, Progress, Radio, RadioGroup, Card, Pagination, Table, FormItem } from 'ant-design-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";






const app = createApp(App)
app.config.devtools = true
app.use(router)
app.use(store)
app.use(VueSweetalert2);
app.use(DatePicker);





// Ant Design Vue
app.use(ConfigProvider)
//app.use(Icon)
app.use(Tag)
app.use(Button)
app.use(Menu)
app.use(Dropdown)
app.use(Avatar)
app.use(Spin)
app.use(Result)
app.use(Form)
app.use(Tabs)
app.use(Input)
app.use(Checkbox)
app.use(Space)
//app.use(CheckboxGroup)
app.use(Row)
app.use(Col)
app.use(Modal)
app.use(Alert)
app.use(Divider)
app.use(Select)
app.use(Upload)
app.use(PageHeader)
app.use(Progress)
app.use(Radio)
app.use(RadioGroup)
app.use(Card)
app.use(Pagination)
app.use(Table)
app.use(FormItem)

/*
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.common["Authorization"] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

*/
app.mount('#app')
