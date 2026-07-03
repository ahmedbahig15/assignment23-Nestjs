import KeyvRedis from "@keyv/redis";
import { CacheModuleOptions,CacheOptionsFactory } from "@nestjs/cache-manager";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
    constructor(private readonly configService:ConfigService) {}

    createCacheOptions(): CacheModuleOptions {
       return {
        ttl: 60 * 60 * 1000,
        stores: new KeyvRedis(this.configService.get('redis').host),
       } 
    }
}
