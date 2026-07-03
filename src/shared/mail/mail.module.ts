import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailService } from "./mail.service";

@Module({
   imports: [MailerModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService:ConfigService) => ({
    transport: {
        host: configService.get('mailer').host,
        port: configService.get('mailer').port,
        auth: {
            user: configService.get('mailer').auth.user,
            pass: configService.get('mailer').auth.pass
        }
    },
    defaults: {
        from: "'nest app'<ahmedbahig15@gmail.com"
    },
    })
   })],
   controllers: [],
   providers: [MailService],
   exports: [MailService] 
})
export class MailModule {}