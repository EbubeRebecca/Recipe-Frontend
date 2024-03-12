<template>
    <div class="admin">
        <h1>Admin</h1>

        <p>Recipe Seeker {{ recipe_seeker_count }}</p>

        <p>Recipes {{ recipe_count }}</p>

        <p>Chef {{ chef_count }}</p>

        <a-table :columns="columns" :data-source="recipes"  :pagination="paginationConfig" @change="handlePageChange" >
        </a-table>
      
    </div>
</template>
  
<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>



<script>
import store from '@/store'
import router from '@/router'
import axios from 'axios';

import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';


export default {
    name: 'AdminRecipeListPage',
    components: {
    SmileOutlined,
    DownOutlined,
  },
    data() {
        return {
            'recipe_seeker_count': 0,
            'chef_count': 0,
            'recipe_count': 0,
            'recipes':[],
            'list_total':0,
            'links':[],
            'current_page_number': 1,
            'paginationConfig':{
                pageSize: 12,
                showSizeChanger: false
            },
           
            'columns': [
  {
    title:'Title',
    dataIndex: 'title',
    key:'title'
  
 
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location'
 
  },

  {
    title: 'User',
    dataIndex: ['user','name'],
    key: 'User'
 
  },

  
]
        }
    },
    created: function () {
        if (!store.getters.isAdminLoggedIn) {
            //You can't perform this action
            router.push('/admin/login');
        }
        if (store.getters.isAdminLoggedIn) {
            axios.get('/api/account/summary').then(res => {
                if (res.data.success) {
                    this.chef_count = res.data.summary.chef_count;
                    this.recipe_seeker_count = res.data.summary.recipe_seeker_count;
                    this.recipe_count = res.data.summary.recipe_count;
                }

            })
        }

   

let that = this;
const token = localStorage.getItem('admin_token');
axios.get('/api/recipe/', {
    headers: { Authorization: `Bearer ${token}` }
}).then(res => {
    if (res.data.success) {
        that.recipes = res.data.data.data;

        that.list_total = res.data.data.total;
        that.links = res.data.data.links;


        that.paginationConfig['total']=that.list_total;

    
   
    }

})


    },methods:{
        handlePageChange: function (page) {
            console.log(page);
            let url = this.links[page.current].url;

            let that = this;
            const token = localStorage.getItem('admin_token');
            axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                if (res.data.success) {
                    that.recipes = res.data.data.data;

                }

            })

        },
    
        onChangePagination: function (page) {
            let url = this.links[page].url;

            let that = this;
            const token = localStorage.getItem('admin_token');
            axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                if (res.data.success) {
                    that.recipes = res.data.data.data;

                }

            })

        },
    },
    computed:{
        pagination:function(){
         return {
  total: this.list_total,
  current: 3,
  pageSize: 12,}
         }
        }
    }


</script>
  