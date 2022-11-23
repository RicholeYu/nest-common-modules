"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const internal_service_exception_1 = require("./exception/internal-service.exception");
let RestService = class RestService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    get axiosRef() {
        return this.httpService.axiosRef;
    }
    request(config) {
        return this.httpService
            .request(config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    delete(url, config) {
        return this.httpService
            .delete(url, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    get(url, config) {
        return this.httpService
            .get(url, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    head(url, config) {
        return this.httpService
            .head(url, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    patch(url, data, config) {
        return this.httpService
            .patch(url, data, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    post(url, data, config) {
        return this.httpService
            .post(url, data, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    put(url, data, config) {
        return this.httpService
            .put(url, data, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
};
RestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], RestService);
exports.RestService = RestService;
//# sourceMappingURL=rest.service.js.map