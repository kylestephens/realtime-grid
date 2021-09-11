import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGridDto } from './dto/create-grid.dto';
import { Grid } from '@prisma/client';
import { UpdateGridDto } from './dto/update-grid.dto';
const faker = require('faker');

@Injectable()
export class GridService {

  constructor(
    private prisma: PrismaService
  ) {}

  async get(gridId: number): Promise<Grid> {
    return this.prisma.grid.findUnique({
      where: {
        id: gridId
      },
      include: {
        users: true,
        notifications: true
      }
    });
  }

  async create(data: CreateGridDto): Promise<Grid> {
    const mockData = [];

    for(let i = 0; i < data.numberOfRows; i++) {
      mockData.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        jobTitle: faker.name.jobTitle()
      });
    }

    return this.prisma.grid.create({
      data: {
        users: {
          create: mockData
        }
      }
    });
  }

  async removeRows(gridId: number, data: UpdateGridDto) {
    const numberOfRows = data.numberOfRows;

    const dataArr = await this.prisma.userData.findMany({
      where: {
        gridId: gridId
      }
    });

    const shuffle = array => array.map(a => ({ sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map(a => a.value);
    const shuffledArr = shuffle(dataArr);
    const rowsToDelete = shuffledArr.splice(0, numberOfRows);
    const idsToDelete = rowsToDelete.map(row => row.id);

    const rowsDeleted = await this.prisma.userData.deleteMany({
      where: {
        gridId,
        id: {
          in: idsToDelete
        }
      }
    });

    return {
      removed: rowsDeleted?.count
    };
  }

  async addRows(gridId: number, data: UpdateGridDto) {
    const numberOfRows = data.numberOfRows;
    const mockData = [];

    for(let i = 0; i < numberOfRows; i++) {
      mockData.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        jobTitle: faker.name.jobTitle(),
        gridId
      });
    }

    const rowsInserted = await this.prisma.userData.createMany({
      data: mockData
    });

    return {
      inserted: rowsInserted?.count
    };
  }

}
