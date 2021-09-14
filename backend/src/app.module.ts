import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GridModule } from './grid/grid.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    GridModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
