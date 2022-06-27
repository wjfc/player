import axios from 'axios'

const request = axios.create({});

// // 响应拦截
// request.interceptors.response.use(
//   response => {
//     const {
//       headers,
//       data = {}
//     } = response;
//     const { errorCode, errorMessage } = data;
//     if (errorCode !== 0) {
      
//     }
//     return data;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// )

export default request;