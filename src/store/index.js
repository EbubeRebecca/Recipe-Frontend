
import axios from 'axios'
import { createStore } from 'vuex'
import router from '../router'
const store = createStore({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        messages: [],
        user_type: ''
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
        async login1({ commit }, user_) {
            let that = this;
            commit('auth_request')

            await axios({ url: 'api/auth/login', data: user_, method: 'POST' })
                .then(res => {

                    if (res.data.success) {
                        console.log(res.data)
                        let datum = res.data;

                        const token = datum.data.access_token
                        const user = JSON.parse(JSON.stringify(datum.data.user))

                        localStorage.setItem('user', user)

                        localStorage.setItem('token', token)
                        localStorage.setItem('access_token', token)


                        axios.defaults.headers.common['Authorization'] = token
                        this.state.user = datum.data.user
                        this.state.status = "success"
                        this.state.user_type = "regular"

                        //this.$router.push('/');

                        //commit('auth_success', token, datum.data.user, 'regular')
                        //resolve(res)


                    } else {
                        commit('auth_error')
                    }


                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')

                    //   reject(err)
                })


        },
        logout(context) {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('access_token')
            context.commit('logout');
        }

    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user, user_type) {
            state.status = 'success'
            //state.token = token
            // state.user = user
            // state.user_type = user_type

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

