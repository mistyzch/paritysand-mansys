import axios from "axios";
import Qs from "qs";
import { Message } from "element-ui";
// import { Loading } from "element-ui";
// import { loadingOptions } from "../config/globalLoadingOptions";

axios.defaults.timeout = 60000;
axios.defaults.baseURL = "http://127.0.0.1:8081";
//axios.defaults.baseURL = "https://www.yhgf.ltd/grit";
// axios.defaults.baseURL = "http://118.190.90.157:8080";
axios.defaults.withCredentials = true;
axios.defaults.headers["Set-Cookie"] = "SameSite=None; Secure";
// let loadingInstance = null;
//请求拦截器
axios.interceptors.request.use(
  config => {
    // loadingInstance = Loading.service(loadingOptions);
    if (config.method === "post" || config.method === "put") {
      let formData = new FormData();
      let tranFormData = new Promise(resolve => {
        for (let key in config.data) {
          formData.append(key, config.data[key]);
        }
        resolve(formData);
      });
      tranFormData.then(res => {
        config.data = res;
      });
    } else {
      config.data = Qs.stringify(config.data);
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//响应拦截器
axios.interceptors.response.use(
  response => {
    // loadingInstance.close();
    if (response.status === 200) {
      return response.data;
    } else {
      return response;
    }
  },
  err => {
    // loadingInstance.close();
    Message({
      type: "error",
      message: "服务器或网络异常！"
    });
    return Promise.reject(err);
  }
);

/**
 * 封装get方法
 * @param {String}  url
 * @param {*} params
 * @returns {Promise}
 */

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param {String}  url
 * @param {*} params
 * @returns {Promise}
 */

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url,
      data: params
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 *封装put请求
 *
 * @export
 * @param {String}  url
 * @param {*} params
 * @returns {Promise}
 */
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url,
      data: params,
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 *封装delete请求
 *
 * @export
 * @param {String} url
 * @param {*} params
 * @returns {Promise}
 */
export function axiosDelete(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url,
      data: params
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
