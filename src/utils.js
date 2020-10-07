import Axios from 'axios';

/**
 * @param {{ url: string, config?: import('axios').AxiosRequestConfig }} param0
 */
export const makeCancelableGet = ({ url, config }) => {
  let hasCanceled_ = false;
  const source = Axios.CancelToken.source();
  const request = Axios.get(url, {
    ...config,
    cancelToken: source.token,
  }).catch((error) => {
    return hasCanceled_
      ? Promise.reject({ message: 'hasCanceled' })
      : Promise.reject(error);
  });

  return {
    request,
    cancel() {
      hasCanceled_ = true;
      source.cancel('Canceled');
    },
  };
};
