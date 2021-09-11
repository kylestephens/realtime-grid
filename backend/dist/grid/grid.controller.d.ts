import { CreateGridDto } from './dto/create-grid.dto';
import { GridService } from './grid.service';
import { Grid } from '@prisma/client';
import { UpdateGridDto } from './dto/update-grid.dto';
export declare class GridController {
    private readonly gridService;
    constructor(gridService: GridService);
    getGrid(gridId: number): Promise<Grid>;
    createGrid(createGridDto: CreateGridDto): Promise<{}>;
    updateGrid(gridId: number, updateGridDto: UpdateGridDto): Promise<{
        removed: number;
    } | {
        inserted: number;
    }>;
}
