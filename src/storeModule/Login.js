import { checkLogin, login, logout } from '@/utils/api';
import { notify } from '@/plugins/ElementUI';
import router from '@/router';

export default {
  namespaced: true,
  actions: {
    async CheckLogin({ commit }) {
      let result;
      commit('Loading/LOADING', true, {
        root: true,
      });
      const cookieToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      try {
        result = await checkLogin(cookieToken);
        commit('Loading/LOADING', false, {
          root: true,
        });
      } catch (error) {
        if (error === 422) {
          commit('Loading/LOADING', false, {
            root: true,
          });
          router.push('/login');
          result = error;
        }
      }
      return result;
    },
    async Login({ commit }, from) {
      let result;
      commit('Loading/LOADING', true, {
        root: true,
      });
      try {
        result = await login(from);
        const { token } = result;
        const { expired } = result;
        document.cookie = `token=${token};expires=${new Date(
          expired * 1000,
        )};`;
        notify('提示', '登入成功', 'success');
        commit('Loading/LOADING', false, {
          root: true,
        });
        router.push('/');
      } catch (error) {
        notify('提示', '登入失敗', 'error');
        result = error;
      }
      return result;
    },
    async Logout({ commit }) {
      let result;
      commit('Loading/LOADING', true, {
        root: true,
      });
      const cookieToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      try {
        result = await logout(cookieToken);
        commit('Loading/LOADING', false, {
          root: true,
        });
        notify('提示', '登出成功', 'success');
        document.cookie = 'token=;expires=;';
        router.push('/login');
      } catch (error) {
        if (error === 422) {
          commit('Loading/LOADING', false, {
            root: true,
          });
          router.push('/login');
        }
        result = error;
      }
      return result;
    },
  },
};
