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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MongoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs_1 = __importDefault(require("fs"));
const mongodb_1 = require("mongodb");
const mongodb_client_encryption_1 = require("mongodb-client-encryption");
const vault_service_1 = require("../vault/vault.service");
let MongoService = MongoService_1 = class MongoService {
    async onModuleInit() {
        this.logger.log(`Mongo Initializing...`);
        try {
            await this.init();
            this.logger.log(`Mongo initialize successfully`);
        }
        catch (e) {
            this.logger.error('Mongo init failed.');
            this.logger.error(e.toString());
        }
    }
    constructor(configService, vaultService) {
        this.configService = configService;
        this.vaultService = vaultService;
        this.logger = new common_1.Logger(MongoService_1.name);
        this.schemaMap = {};
    }
    async init() {
        this.mongodbUrl = this.vaultService.get('lead-mongodb-url') || process.env.MONGODB_URL;
        this.mongodbKeyDb = process.env.MONGODB_KEY_DB;
        this.mongodbKeyCollection = process.env.MONGODB_KEY_COLLECTION;
        this.mongodbMasterKey = Buffer.from(this.vaultService.get('mongodb-master-key') || process.env.MONGODB_MASTER_KEY, 'base64');
        this.isEncript = fs_1.default.existsSync(process.env.MONGODB_SCHEMA_MAP_PATH);
        this.logger.log(`Connecting to mongodb(unencrypted client)...`);
        const unencryptedClient = await new mongodb_1.MongoClient(this.mongodbUrl).connect();
        const databaseName = unencryptedClient.db().databaseName;
        this.logger.log(`Unencrypted client connected...`);
        if (this.isEncript) {
            this.schemaMap = JSON.parse(fs_1.default.readFileSync(process.env.MONGODB_SCHEMA_MAP_PATH, 'utf8'));
            this.logger.log(`Encrypting...`);
            const encryption = new mongodb_client_encryption_1.ClientEncryption(unencryptedClient, {
                keyVaultNamespace: this.getKeyVaultNamespace(),
                kmsProviders: {
                    local: {
                        key: this.mongodbMasterKey,
                    },
                },
            });
            this.logger.log(`Encrypted...`);
            this.clientEncryption = encryption;
            const collection = unencryptedClient.db(this.mongodbKeyDb).collection(this.mongodbKeyCollection);
            this.logger.log(`Checking data key...`);
            let keyId;
            const dataKey = await collection.findOne({ keyAltNames: [databaseName] });
            if (!dataKey) {
                this.logger.log(`Data key not found, creating...`);
                keyId = await encryption.createDataKey('local', {
                    keyAltNames: [databaseName],
                });
            }
            else {
                keyId = dataKey._id;
            }
            this.logger.log(`Data key ready, setting schema map...`);
            Object.keys(this.schemaMap).forEach((collectionName) => {
                this.schemaMap[collectionName].encryptMetadata.keyId = [keyId];
                this.schemaMap[`${databaseName}.${collectionName}`] = this.schemaMap[collectionName];
                delete this.schemaMap[collectionName];
            });
        }
        this.logger.log(`Mongo util initialed: ${databaseName}`);
    }
    getKeyVaultNamespace() {
        return `${this.mongodbKeyDb}.${this.mongodbKeyCollection}`;
    }
};
MongoService = MongoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, vault_service_1.VaultService])
], MongoService);
exports.MongoService = MongoService;
//# sourceMappingURL=mongo.service.js.map