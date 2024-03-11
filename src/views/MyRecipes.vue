<template>
    <div>

        <LoggedInHeader />
        <div class="container">

            <div style="display:flex;flex-direction: row;justify-content: space-between;">
                <h4> {{ user.name }} </h4>
                

              
            </div>

            <div>

                <h3>Your Recipes</h3>
               
                <div v-if="recipes">
                    <div class="row recipe-section">
                        <div v-for="recipe in recipes" v-bind:key="recipe.id" class="col-sm-3">
                            <router-link :to="{ name: 'viewrecipe', params: { slug: recipe.slug } }"><a-card hoverable>
                                    <template #cover>
                                        <img alt="example"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                                    </template>
                                    <a-card-meta :title=recipe.title :description=recipe.location>
                                        <template #avatar>
                                            <a-avatar
                                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        </template>
                                    </a-card-meta>
                                </a-card>
                            </router-link>



                        </div>
                    </div>
                    <a-row :align="middle">
                        <a-col :span="12">
                            <a-pagination v-model:current="current_page_number" :total=list_total
                                @change="onChangePagination" show-less-items />
                        </a-col>
                    </a-row>
                </div>
                <div v-else>
                    <div class="row recipe-section">
                        <p>No recipe to match that query</p>
                    </div>
                </div>
                <div>

                </div>

            </div>




        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import LoggedInHeader from "../components/LoggedInHeader.vue";
export default {
    name: 'MyRecipes',
    components: {
        LoggedInHeader
    },
    data() {
        return {
            locations: [],
            categories: [],
            current_page_number: 1,
            list_total: 0,
            links: [],
            recipes: [],
            location: '',
            category_id: '',
            filtered: false,
            search_query: ''
        }

    },
    methods: {
        logout: function () {
            this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push('/login')
                })
        },
        onChangePagination: function (page) {
            let url = this.links[page].url;

            let that = this;
            const token = localStorage.getItem('token');
            axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                if (res.data.success) {
                    that.recipes = res.data.recipe.data;

                }

            })

        },
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        }
        , user() {
            return this.$store.getters.user;
        },
        isChef() {
            return this.$store.getters.user_type == 'chef';
        }

    }, created() {

        let that = this;
        const token = localStorage.getItem('token');
        axios.get('/api/me/recipes/', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (res.data.success) {
                that.recipes = res.data.recipe.data;

                that.list_total = res.data.recipe.total;
                that.links = res.data.recipe.links;

            }

        })

    
    }
}


</script>

<style>
.recipe-section div {
    margin-bottom: 15px;
}

.filter-field {
    margin-bottom: 10px;
}
</style>