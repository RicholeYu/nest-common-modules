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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var VaultService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultService = void 0;
const common_1 = require("@nestjs/common");
const node_vault_1 = __importDefault(require("node-vault"));
const fs_1 = __importDefault(require("fs"));
let VaultService = VaultService_1 = class VaultService {
    constructor(vaultPaths) {
        this.vaultPaths = vaultPaths;
        this.logger = new common_1.Logger(VaultService_1.name);
        this.config = {};
    }
    async onModuleInit() {
        this.logger.log(`Vault Initializing...`);
        try {
            await this.init();
            this.logger.log(`Vault initialize successfully: ${Object.keys(this.config)}`);
        }
        catch (e) {
            this.logger.error('Vault init failed.');
            this.logger.error(e.toString());
        }
    }
    async init() {
        const endpoint = process.env.VAULT_ADDR;
        const token = process.env.VAULT_TOKEN;
        const tokenFile = process.env.KUBE_SA_TOKEN_FILE;
        this.vault = (0, node_vault_1.default)({
            endpoint,
            token,
        });
        if (!token && tokenFile) {
            this.logger.log('Connecting to Vault...');
            await this.vault.kubernetesLogin({
                mount_point: process.env.VAULT_KUBE_AUTH_PATH,
                role: process.env.VAULT_KUBE_AUTH_ROLE,
                jwt: fs_1.default.readFileSync(tokenFile, 'utf-8'),
            });
            this.logger.log('Vault connected...');
        }
        this.logger.log('Getting Vault values...');
        return Promise.all(this.vaultPaths.map((vaultPath) => this.getVault(vaultPath)));
    }
    async getVault(key) {
        var _a;
        const vaultSecretEngine = process.env.VAULT_SECRET_ENGINE;
        const vaultSecretDataPath = process.env.VAULT_SECRET_DATA_PATH;
        const vaultKey = `${vaultSecretEngine}/data/${vaultSecretDataPath}/${key}`;
        this.logger.log(`Getting vault: ${vaultKey}`);
        const result = await this.vault.read(vaultKey);
        this.config = {
            ...this.config,
            ...(((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data) || {}),
        };
    }
    getAll() {
        return this.config;
    }
    get(key) {
        return this.config[key] || null;
    }
};
VaultService = VaultService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('vaultPaths')),
    __metadata("design:paramtypes", [Array])
], VaultService);
exports.VaultService = VaultService;
//# sourceMappingURL=vault.service.js.map