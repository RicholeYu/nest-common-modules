import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {InternalServiceException} from './exception/internal-service.exception';

@Injectable()
export class RestService {
  constructor(private readonly httpService: HttpService) {}

  get axiosRef() {
    return this.httpService.axiosRef;
  }

  request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.httpService
      .request(config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.httpService
      .delete(url, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.httpService
      .get(url, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.httpService
      .head(url, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  patch<T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpService
      .patch(url, data, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  post<T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpService
      .post(url, data, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }

  put<T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.httpService
      .put(url, data, config)
      .toPromise()
      .catch((err) => {
        throw new InternalServiceException(err);
      });
  }
}
