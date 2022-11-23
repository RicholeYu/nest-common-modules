import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {InternalServiceException} from './exception/internal-service.exception';

@Injectable()
export class RestService {
  constructor(private readonly httpService: HttpService) {}

  get axiosRef(): AxiosInstance {
    return this.httpService.axiosRef;
  }

  request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpService
      .request(config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpService
      .delete(url, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpService
      .get(url, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpService
      .head(url, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpService
      .patch(url, data, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpService
      .post(url, data, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpService
      .put(url, data, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }
}
