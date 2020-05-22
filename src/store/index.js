import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
  deleteCookie,
} from '@/utils/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    us_info: {
      us_nickname: getUserFromCookie() || '',
      us_islandname: '',
      us_code: '',
      us_social_id: '',
      us_social: '',
      us_logintoken: getAuthFromCookie() || '',
    },
    login_status: true,
  },
  getters: {
    isLogin(state) {
      return state.us_info.us_nickname !== '';
    },
    isLoginStatus(state) {
      return state.login_status;
    },
  },
  mutations: {
    setUserInfo(state, info) {
      state.us_info.us_nickname = info.us_nickname;
      state.us_info.us_islandname = info.us_islandname;
      state.us_info.us_code = info.us_code;
    },
    clearUserInfo(state) {
      state.us_info = '';
    },
    setSession(state, session) {
      state.session = session;
    },
    clearSession(state) {
      state.session = '';
    },
    setLoginInfo(state, info) {
      state.us_info.us_social = info.us_social;
      state.us_info.us_social_id = info.us_social_id;
      state.us_info.us_logintoken = info.us_logintoken;
    },
  },
  actions: {
    LOGIN({ commit }, userData) {
      //TODO 여기서 DB로부터 유저 이름, 섬이름, 통신코드, 세션 받아와야 함.
      commit('setSession', '세션값');
      commit('setUserInfo', '유저정보');
      saveAuthToCookie('세션값');
      saveUserToCookie('유저이름');
    },
    LOGOUT({ commit }) {
      commit('clearUserInfo');
      commit('clearSession');
      deleteCookie('animal_auth');
      deleteCookie('animal_user');
    },
    SaveData({ commit }, userInfo) {
      commit('setLoginInfo', userInfo);
    },
  },
});
