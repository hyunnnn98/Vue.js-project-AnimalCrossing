import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
  deleteCookie,
} from '@/utils/cookies';
import { loginUser } from '../api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // *** us_info ***
    us_nickname: getUserFromCookie() || '',
    us_logintoken: getAuthFromCookie() || '',
    us_id: '',
    us_islandname: '',
    us_code: '',
  },
  getters: {
    isLogin(state) {
      return state.us_nickname !== '';
    },
  },
  mutations: {
    setUserInfo(state, info) {
      console.log(info);
      state.us_id = info.us_id;
      state.us_nickname = info.us_nickname;
      state.us_islandname = info.us_islandname;
      state.us_code = info.us_code;
    },
    clearUserInfo(state) {
      state.us_info = '';
    },
    setToken(state, token) {
      state.us_logintoken = token;
    },
    clearToken(state) {
      state.us_logintoken = '';
    },
  },
  actions: {
    async LOGIN({ commit }, user_data) {
      //TODO 여기서 DB로부터 유저 이름, 섬이름, 통신코드,토큰 받아와야 함.
      const { data } = await loginUser(user_data);
      console.log(data);
      commit('setUserInfo', data.data.us_info);
      commit('setToken', data.data.new_token);
      saveAuthToCookie(data.data.new_token);
      saveUserToCookie(data.data.us_info.us_nickname);
      return data;
    },
    LOGOUT({ commit }) {
      commit('clearUserInfo');
      commit('clearSession');
      deleteCookie('animal_auth');
      deleteCookie('animal_user');
    },
  },
});
