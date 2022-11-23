import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
export declare class RestService {
    private readonly httpService;
    constructor(httpService: HttpService);
    get axiosRef(): import("axios").AxiosInstance;
    request(config: AxiosRequestConfig): Promise<AxiosResponse>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    patch<T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}
