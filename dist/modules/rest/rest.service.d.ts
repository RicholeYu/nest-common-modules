import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
export declare class RestService {
    private readonly httpService;
    constructor(httpService: HttpService);
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T, any>>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    patch<T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}
