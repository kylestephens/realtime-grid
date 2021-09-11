import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridRoutingModule } from './grid-routing.module';

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    GridRoutingModule
  ]
})
export class GridModule { }
