<template>
    <div>

        <LoggedInHeader />
        <div class="container">

            <p>Chef Dashboard</p>
            <div style="display:flex;flex-direction: row;justify-content: space-between;">
                <h4> Welcome,{{ user.name }} </h4>

                <div v-if="isChef">
                    <router-link :to="{ name: 'createrecipe' }">AddRecipe</router-link>
                </div>
            </div>

            <div>

                <h3>View Recipes</h3>
                <div class="row">
                    <h6>Filter</h6>
                    <div class="filter-field">
                        <a-input placeholder="Search recipes" style="width: 120px" />
                        <a-select style="width: 120px">
                            <a-select-option value="london">london</a-select-option>
                            <a-select-option value="aberdeen">aberdeen</a-select-option>
                        </a-select>
                        <a-select style="width: 120px">
                            <a-select-option value="continental">continental</a-select-option>
                            <a-select-option value="welsh">welsh</a-select-option>
                        </a-select>
                        <a-button>Filter</a-button>
                    </div>
                </div>
                <div class="row recipe-section">
                    <div v-for="recipe in recipes" v-bind:key="recipe.id" class="col-sm-3">
                        <router-link :to="{ name: 'viewrecipe', params: { id: recipe.slug } }"><a-card hoverable>
                                <template #cover>
                                    <img alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                                </template>
                                <a-card-meta :title=recipe.title :description=recipe.location>
                                    <template #avatar>
                                        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </template>
                                </a-card-meta>
                                <a-card-meta :description=recipe.user.name>

                                </a-card-meta>
                            </a-card>
                        </router-link>



                    </div>
                </div>
                <a-row :align="middle">
                    <a-col :span="12">
                        <a-pagination v-model:current="current_page_number" :total=list_total @change="onChangePagination"
                            show-less-items />
                    </a-col>
                </a-row>
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
            current_page_number: 1,
            list_total: 0,
            links: [],
            recipes: []
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