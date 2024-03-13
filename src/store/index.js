
import axios from 'axios'
import { createStore } from 'vuex'
import router from '../router'
import createPersistedState from "vuex-persistedstate";


const store = createStore({
    plugins: [createPersistedState()],
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        messages: [],
        user_type: '',
        admin: {},
        admin_token: '',
        admin_status: ''
    },
    actions: {
        login({ commit }, user_) {
            return new Promise((resolve, reject) => {
                commit('auth_request')

                axios({ url: '/api/auth/login', data: user_, method: 'POST' })
                    .then(resp => {
                        if (resp.data.success === true) {
                            console.log(resp.data.data.user)
                            const token = resp.data.data.access_token

                            const user = JSON.parse(JSON.stringify(resp.data.data.user))
                            this.state.token = token
                            this.state.user = JSON.parse(JSON.stringify(resp.data.data.user))
                            this.state.user_type = resp.data.data.user["user_type"]
                            localStorage.setItem('user', user)
                            localStorage.setItem('token', token)
                            localStorage.setItem('access_token', token)
                            // localStorage.setItem('refresh_token', refresh_token)

                            axios.defaults.headers.common['Authorization'] = token

                            commit('auth_success', token, user)
                            resolve(resp)
                        } else {
                            commit('auth_error')
                        }


                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')

                        reject(err)
                    })

            })
        },



        register({ commit }, user_) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: '/api/auth/register', data: user_, method: 'POST' })
                    .then(resp => {

                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        reject(err)
                    })
            })
        },
        logout(context) {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('access_token')
            context.commit('logout');
        },

        admin_login({ commit }, user_) {
            return new Promise((resolve, reject) => {
                commit('auth_request')

                axios({ url: '/api/auth/admin/login', data: user_, method: 'POST' })
                    .then(resp => {
                        if (resp.data.success === true) {
                            const token = resp.data.data.access_token

                            const user = JSON.parse(JSON.stringify(resp.data.data.user))
                            this.state.admin_token = token
                            this.state.admin = JSON.parse(JSON.stringify(resp.data.data.user))
                            localStorage.setItem('admin', user)
                            localStorage.setItem('admin_token', token)



                            resolve(resp)
                        } else {
                            commit('admin_auth_error')
                        }


                    })
                    .catch(err => {
                        commit('admin_auth_error')
                        localStorage.removeItem('admin_token')

                        reject(err)
                    })

            })
        },



    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user, user_type) {
            state.status = 'success'


        },
        auth_error(state) {
            state.status = 'error'
        },
        admin_auth_error(state) {
            state.admin_status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
        admin_logout(state) {
            state.admin_status = ''
            state.admin_token = ''
        }
    },

    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        user_type: state => state.user_type,
        user: state => state.user,
        admin: state => state.admin,
        isAdminLoggedIn: state => !!state.admin_token,



    }

})


export default store;

