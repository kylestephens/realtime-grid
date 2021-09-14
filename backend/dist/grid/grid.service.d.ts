import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGridDto } from './dto/create-grid.dto';
import { Grid } from '@prisma/client';
import { UpdateGridDto } from './dto/update-grid.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
export declare class GridService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    get(gridId: number): Promise<Grid>;
    create(data: CreateGridDto): Promise<Grid>;
    removeRows(gridId: number, data: UpdateGridDto): Promise<{
        removed: number;
    }>;
    addRows(gridId: number, data: UpdateGridDto): Promise<{
        inserted: number;
    }>;
}
