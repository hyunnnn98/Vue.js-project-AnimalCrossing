import Vue from 'vue';
import Vuex from 'vuex';
import socket_io from 'socket.io-client';
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
    us_logintoken: getAuthFromCookie() || '',
    us_id: getUserFromCookie() || '',
    us_nickname: '',
    us_islandname: '',
    us_code: '',
    us_thumbnail: '',
    // *** socket.io ***
    socket: '',
  },
  getters: {
    isLogin(state) {
      return state.us_id !== '';
    },
  },
  mutations: {
    setUserInfo(state, info) {
      console.log(info);
      state.us_id = info.us_id;
      state.us_nickname = info.us_nickname;
      state.us_islandname = info.us_islandname;
      state.us_code = info.us_code;
      state.us_thumbnail = info.us_thumbnail;
    },
    clearUserInfo(state) {
      state.us_id = '';
      state.us_nickname = '';
      state.us_islandname = '';
      state.us_code = '';
      state.us_thumbnail = '';
    },
    setToken(state, token) {
      state.us_logintoken = token;
    },
    clearToken(state) {
      state.us_logintoken = '';
    },
    setSocket(state) {
      console.log('소켓 접근을 하는중입니다!');
      if (state.socket === '') {
        console.log('여기들어왔어요!');
        state.socket = socket_io('https://server.anicro.org/');
      }
    },
    getSocket(state) {
      return state.socket;
    },
    setSocketCheck(state) {
      state.socket_check = !state.socket_check;
    },
  },
  actions: {
    async LOGIN({ commit }, user_data) {
      const { data } = await loginUser(user_data);
      console.log('로그인!', data);
      commit('setUserInfo', data.info.us_info);
      commit('setToken', data.info.new_token);
      commit('setSocket');
      saveAuthToCookie(data.info.new_token);
      saveUserToCookie(data.info.us_info.us_id);
      return data;
    },
    LOGOUT({ commit }) {
      commit('clearUserInfo');
      commit('clearToken');
      deleteCookie('animal_auth');
      deleteCookie('animal_user');
    },
    async X_SOCKET({ commit }, payload) {
      // console.log('actions :', payload);
      await commit('setSocket');
      const result = await commit(payload.type, payload);
      console.log('X_SOCKET : ', result);
      return result;
    },
  },
});
