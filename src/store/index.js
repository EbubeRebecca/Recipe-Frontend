
import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        messages: [],
        user_type: ''
    },
    actions: {
        async login({ commit }, user_) {
            commit('auth_request')

            axios({ url: 'api/auth/login', data: user_, method: 'POST' })
                .then(resp => {
                    if (resp.data.success === true) {
                        const token = resp.data.access_token
                        const user = JSON.parse(JSON.stringify(resp.data.user))
                        localStorage.setItem('user', user)

                        localStorage.setItem('token', token)
                        localStorage.setItem('access_token', token)


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


        },
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user, user_type) {
            state.status = 'success'
            state.token = token
            state.user = user
            state.user_type = user_type

        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },

    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,


    }

})


export default store;

