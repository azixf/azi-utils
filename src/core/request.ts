import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  type AxiosRequestConfig,
} from "axios";
import {
  DefaultRequestOptions,
  RequestFunction,
  RequestMethod,
  RequestOptions,
} from "../type/request";

export class Request {
  private instance!: AxiosInstance;
  public get!: RequestFunction;
  public post!: RequestFunction;
  public delete!: RequestFunction;
  public put!: RequestFunction;

  constructor(requestOptions: RequestOptions) {
    const options = Object.assign(this.initDef(), requestOptions);
    this.instance = axios.create(options);
    this.setRequestInterceptor();
    this.setResponseHandler();
    this.install();
  }

  private initDef() {
    return <DefaultRequestOptions>{
      timeout: 5 * 1000,
      timeoutErrorMessage: "请求超时",
      withCredentials: false,
    };
  }

  /**
   * 设置请求拦截器
   * @param requestHanlder
   */
  public setRequestInterceptor(
    requestHanlder?: (config: AxiosRequestConfig) => AxiosRequestConfig
  ) {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (requestHanlder) return requestHanlder(config);
      return config;
    });
  }

  /**
   * 设置响应拦截器
   * @param responseHandler
   * @param errorHandler
   */
  public setResponseHandler(
    responseHandler?: (res: AxiosResponse) => Promise<AxiosResponse["data"]>,
    errorHandler?: (err: AxiosError) => Promise<AxiosError>
  ) {
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (responseHandler) return responseHandler(res);
        return Promise.resolve(res.data);
      },
      (err: AxiosError) => {
        if (errorHandler) return errorHandler(err);
        return Promise.reject(err);
      }
    );
  }

  /**
   * 请求方法
   * @param method
   * @param url
   * @param data
   */
  public request(
    method: RequestMethod,
    url: string,
    data: any,
    config: Partial<AxiosRequestConfig> = {}
  ) {
    this.instance
      .request({
        method,
        url,
        data: method === "GET" ? null : data,
        params: method === "GET" ? data : null,
        ...config,
      })
      .then((res: AxiosResponse["data"]) => {
        return Promise.resolve(res);
      });
  }

  private install() {
    ["get", "post", "delete", "put"].map((method) => {
      this[method] = function (
        url: string,
        data: any,
        config: Partial<AxiosRequestConfig> = {}
      ) {
        return new Promise((resolve, reject) => {
          method = method.toUpperCase() as RequestMethod;
          this.instance
            .request({
              method,
              url,
              data: method === "GET" ? null : data,
              params: method === "GET" ? data : null,
              ...config,
            })
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
      };
    });
  }
}
