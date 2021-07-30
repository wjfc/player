import axios from 'axios'

const request = axios.create({});

// 响应拦截
request.interceptors.response.use(
  response => {
    const {
      data = {}
    } = response;
    return data;
  },
  error => {
    return Promise.reject(error);
  }
)

export default request;