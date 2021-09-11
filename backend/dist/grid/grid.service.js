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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const faker = require('faker');
let GridService = class GridService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async get(gridId) {
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
    async create(data) {
        const mockData = [];
        for (let i = 0; i < data.numberOfRows; i++) {
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
    async removeRows(gridId, data) {
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
            removed: rowsDeleted === null || rowsDeleted === void 0 ? void 0 : rowsDeleted.count
        };
    }
    async addRows(gridId, data) {
        const numberOfRows = data.numberOfRows;
        const mockData = [];
        for (let i = 0; i < numberOfRows; i++) {
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
            inserted: rowsInserted === null || rowsInserted === void 0 ? void 0 : rowsInserted.count
        };
    }
};
GridService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GridService);
exports.GridService = GridService;
//# sourceMappingURL=grid.service.js.map