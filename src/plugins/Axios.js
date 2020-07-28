import axios from "axios";
import { notify } from "@/plugins/ElementUI";

// Axios 初始設定
axios.defaults.timeout = 10000;

const Request = axios.create({
  baseURL: process.env.VUE_APP_API,
});

// Token 攔截器
// Request.interceptors.request.use(
//   config => {
//     if (store.state.token) {
//       config.headers.Authorization = store.state.token
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

const httpCode = {
  401: () => {
    notify("提示", "請重新登入", "info");
  },
  404: () => {
    notify("提示", "請求不存在", "error");
  },
  500: () => {
    notify("錯誤提示", "伺服器出錯", "error");
  },
  503: () => {
    notify("錯誤提示", "服務失效", "error");
  },
};

// http 攔截器
Request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response) {
      httpCode[error.response.status]();
    }
    return Promise.reject(error.response.data);
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
          reject(notify("錯誤", "Error", "error"));
        }
      }).catch((error) => {
        reject(error);
      });
  });
}

export function post(url, data = {}) {
  return new Promise((resolve) => {
    resolve(axiosMethod("post", url, data));
  });
}

export function get(url, data = {}) {
  return new Promise((resolve) => {
    resolve(axiosMethod("get", url, data));
  });
}

export function put(url, data = {}) {
  return new Promise((resolve) => {
    resolve(axiosMethod("put", url, data));
  });
}

export function del(url) {
  return new Promise((resolve) => {
    resolve(axiosMethod("delete", url));
  });
}
