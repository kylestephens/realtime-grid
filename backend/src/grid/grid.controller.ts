import { Body, Controller, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { CreateGridDto } from './dto/create-grid.dto';
import { GridService } from './grid.service';
import { Grid } from '@prisma/client';
import { Operation, UpdateGridDto } from './dto/update-grid.dto';

@Controller('grid')
export class GridController {

  constructor(
    private readonly gridService: GridService
  ) {}

  @Get('/:gridId')
  async getGrid(@Param('gridId') gridId: number): Promise<Grid> {
    return this.gridService.get(Number(gridId));
  }

  @Post('/')
  async createGrid(@Body() createGridDto: CreateGridDto): Promise<{}> {
    return this.gridService.create(createGridDto);
  }

  @Patch('/:gridId')
  async updateGrid(@Param('gridId') gridId: number, @Body() updateGridDto: UpdateGridDto) {
    if (updateGridDto.operation === Operation.DELETE) {
      return this.gridService.removeRows(Number(gridId), updateGridDto);
    } else if (updateGridDto.operation === Operation.INSERT) {
      return this.gridService.addRows(Number(gridId), updateGridDto);
    } else {
      throw new HttpException({ error: 'Error! :(' }, 401);
    }
  }
}
