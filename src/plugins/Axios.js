import axios from 'axios';
import { notify } from '@/plugins/ElementUI';
import router from '@/router';

const store = require('@/store');

// Axios 初始設定

const Request = axios.create({
  baseURL: process.env.VUE_APP_API,
});

// Token 攔截器
Request.interceptors.request.use(
  (config) => {
    const setting = config;
    const cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    if (cookieToken) {
      setting.headers.Authorization = `Bearer ${cookieToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const httpCode = {
  401: () => {
    notify('提示', '請重新登入', 'info');
    router.push('/login');
  },
  404: () => {
    notify('提示', '請求不存在', 'error');
  },
  422: () => {
    notify('提示', '請填寫正確欄位', 'error');
  },
  500: () => {
    notify('錯誤提示', '伺服器出錯', 'error');
  },
  503: () => {
    notify('錯誤提示', '服務失效', 'error');
  },
};

// http 攔截器
Request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response) {
      httpCode[error.response.status]();
    }
    return Promise.reject(error);
  },
);

// 封裝 axios methods
function axiosMethod(method, url, data = {}) {
  return new Promise((resolve, reject) => {
    Request[method](url, data)
      .then((response) => {
        if (response.status <= 200 || response.status <= 226) {
          resolve(response.data);
        } else {
          reject(notify('錯誤', 'Error', 'error'));
        }
      }).catch((error) => {
        store.default.commit('Loading/LOADING', false);
        reject(error.response.status);
      });
  });
}

export function post(url, data = {}) {
  return new Promise((resolve) => {
    resolve(axiosMethod('post', url, data));
  });
}

export function get(url, data = {}) {
  return new Promise((resolve) => {
    resolve(axiosMethod('get', url, data));
  });
}

export function patch(url, data = {}) {
  return new Promise((resolve) => {
    resolve(axiosMethod('patch', url, data));
  });
}

export function del(url) {
  return new Promise((resolve) => {
    resolve(axiosMethod('delete', url));
  });
}
