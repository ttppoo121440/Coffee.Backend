import { checkLogin, login, logout } from '@/utils/api';
import { notify } from '@/plugins/ElementUI';
import router from '@/router';

export default {
  namespaced: true,
  actions: {
    CheckLogin({ commit }) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      const cookieToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      return checkLogin(cookieToken).then((res) => {
        commit('Loading/LOADING', false, {
          root: true,
        });
        return res.success;
      }).catch((error) => {
        if (error === 422) {
          commit('Loading/LOADING', false, {
            root: true,
          });
        }
        return error;
      });
    },
    async Login({ commit }, from) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      await login(from).then((res) => {
        const { token } = res;
        const { expired } = res;
        document.cookie = `token=${token};expires=${new Date(
          expired * 1000,
        )};`;
        notify('提示', '登入成功', 'success');
        commit('Loading/LOADING', false, {
          root: true,
        });
        router.push('/');
      }).catch(() => {
        notify('提示', '登入失敗', 'error');
      });
    },
    async Logout({ commit }) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      const cookieToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      await logout(cookieToken).then(() => {
        commit('Loading/LOADING', false, {
          root: true,
        });
        notify('提示', '登出成功', 'success');
        document.cookie = 'token=;expires=;';
      }).catch((error) => {
        if (error === 422) {
          commit('Loading/LOADING', false, {
            root: true,
          });
        }
      });
    },
  },
};
