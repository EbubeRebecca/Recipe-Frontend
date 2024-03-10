<template>
    <div>

        <LoggedInHeader />
        <div class="container">

            <p>Chef Dashboard</p>

            <h4> Welcome,{{ user.name }} </h4>

            <div v-if="isChef">
                <router-link :to="{ name: 'createrecipe' }">AddRecipe</router-link>
            </div>


            <div>

                <h3>View Recipes</h3>

                <div class="row recipe-section">
                    <div v-for="recipe in recipes" v-bind:key="recipe.id" class="col-sm-3">
                        <a-card hoverable>
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



                    </div>
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
            }

        })
    }
}


</script>

<style>
.recipe-section div {
    margin-bottom: 15px;
}
</style>