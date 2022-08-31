import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface DefaultRequestOptions {
  withCredentials: boolean;
  timeout: number;
  timeoutErrorMessage: string;
}

export interface RequestOptions extends Partial<DefaultRequestOptions> {
  baseURL: string
}

export type RequestMethod = "GET" | "POST" | "DELETE" | "PUT";

export type RequestFunction = (url: string, data:any, config: Partial<AxiosRequestConfig>) => Promise<AxiosResponse['data']>
