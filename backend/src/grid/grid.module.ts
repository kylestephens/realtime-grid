import { Module } from '@nestjs/common';
import { GridService } from './grid.service';
import { GridController } from './grid.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [PrismaModule, NotificationsModule],
  providers: [GridService],
  controllers: [GridController]
})
export class GridModule {}
