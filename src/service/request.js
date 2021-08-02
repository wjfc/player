import axios from 'axios'
import { Toast } from 'vant';

const request = axios.create({});

// 响应拦截
request.interceptors.response.use(
  response => {
    const {
      config,
      headers,
      data = {}
    } = response;
    const { errorCode, errorMessage } = data;
    if (errorCode !== 0) {
      Toast(errorMessage);
    }
    return data;
  },
  error => {
    return Promise.reject(error);
  }
)

export default request;