import axios from 'axios';

interface HttpClientResponse<T = unknown> {
  data: T;
}

interface HttpClientRequestConfig {
  params?: unknown;
  baseURL?: string;
}

interface HttpClientInstance {
  get<T = unknown>(url: string, config: HttpClientRequestConfig): Promise<HttpClientResponse<T>>;
}

interface HttpClientStatic extends HttpClientInstance {
  create(config: HttpClientRequestConfig): HttpClientInstance;
}

const httpClient: HttpClientStatic = {
  create(config) {
    return axios.create(config);
  },
  get(url, config) {
    return axios.get(url, config);
  },
};

export default httpClient;
