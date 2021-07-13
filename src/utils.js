import Axios from "axios";

/**
 * @param {import('axios').AxiosRequestConfig } config
 */
const api = (method, url, config) => {
  const source = Axios.CancelToken.source();
  const request = Axios({
    ...config,
    method,
    url,
    cancelToken: source.token
  });

  request.cancel = (message) => {
    source.cancel(message);
  };

  return request;
};

export default {
  get: (...args) => api("get", ...args),
  post: (...args) => api("post", ...args),
  put: (...args) => api("put", ...args),
  delete: (...args) => api("delete", ...args)
};
