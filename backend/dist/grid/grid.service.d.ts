import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGridDto } from './dto/create-grid.dto';
import { Grid } from '@prisma/client';
import { UpdateGridDto } from './dto/update-grid.dto';
export declare class GridService {
    private prisma;
    constructor(prisma: PrismaService);
    get(gridId: number): Promise<Grid>;
    create(data: CreateGridDto): Promise<Grid>;
    removeRows(gridId: number, data: UpdateGridDto): Promise<{
        removed: number;
    }>;
    addRows(gridId: number, data: UpdateGridDto): Promise<{
        inserted: number;
    }>;
}
