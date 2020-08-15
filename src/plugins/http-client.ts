import axios from 'axios';

interface HttpClientResponse<T = unknown> {
  data: T;
}

interface HttpClientRequestConfig {
  params?: unknown;
}

export default {
  get<T = unknown>(url: string, config: HttpClientRequestConfig): Promise<HttpClientResponse<T>> {
    return axios.get(url, config);
  },
};
