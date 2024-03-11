<template>
    <div>

        <LoggedInHeader />
        <div class="container">

            <div style="display:flex;flex-direction: row;justify-content: space-between;">
                <h4> Welcome,{{ user.name }} </h4>

                <div v-if="isChef">
                    <router-link :to="{ name: 'createrecipe' }"><a-button type="primary" html-type="submit" value="large"
                            size="large" class="blue-register-button" :style="{ backgroundColor: '#ff800b' }">Add New
                            Recipe</a-button></router-link>
                </div>
            </div>

            <div>

                <h3>View Recipes</h3>
                <div class="row">
                    <div class="col-sm-6">
                        <h6>Search</h6>
                        <div class="filter-field">
                            <a-input placeholder="Search recipes" v-model:value="search_query"
                                style="width: 300px; margin-right:10px" />

                            <a-button @click="searchRecipe">Search</a-button>

                        </div>
                    </div>
                    <div class="col-sm-6">
                        <h6>Filter</h6>
                        Category:
                        <a-select style="width: 120px" v-model:value="category_id" @change="filterRecipe">

                            <a-select-option v-for="category in categories" :value=category.id>{{ category.title
                            }}</a-select-option>

                        </a-select>
                        Location: <a-select style="width: 120px" v-model:value="location" @change="filterRecipe">
                            <a-select-option v-for="location in locations" :value=location.location>{{ location.location
                            }}</a-select-option>

                        </a-select>
                        <span v-show="filtered" @click="clearFilter"><a-button>clear filter</a-button></span>
                    </div>
                </div>
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
    name: 'ChefDashboard',
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
                    that.recipes = res.data.data.data;

                }

            })

        },
        clearFilter: function () {
            this.location = '',
                this.category_id = '',
                this.filterRecipe();
            this.filtered = false;
        },

        filterRecipe: function () {
            this.filtered = true;
            let url = '/api/recipes/';
            let that = this;
            const token = localStorage.getItem('token');
            axios.get(url, {
                params: { category_id: that.category_id, location: that.location },
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                if (res.data.success) {
                    that.recipes = res.data.data.data;

                    that.list_total = res.data.data.total;
                    that.links = res.data.data.links;

                }

            })


        },

        searchRecipe: function () {
            this.filtered = true;
            let url = '/api/search/';
            let that = this;
            const token = localStorage.getItem('token');
            axios.get(url, {
                params: { q: that.search_query },
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                if (res.data.success) {
                    that.recipes = res.data.data.data;

                    that.list_total = res.data.data.total;
                    that.links = res.data.data.links;

                }

            })


        }
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
        axios.get('/api/recipe/', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (res.data.success) {
                that.recipes = res.data.data.data;

                that.list_total = res.data.data.total;
                that.links = res.data.data.links;

            }

        })

        axios.get('/api/category').then(res => {


            that.categories = res.data.category.data

        })
        axios.get('/api/locations', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (res.data.success) {
                that.locations = res.data.locations;
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