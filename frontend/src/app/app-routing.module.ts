import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from './grid/grid.module';
import { ManageModule } from './manage/manage.module';

const routes: Routes = [
  {
    path: 'grid', loadChildren: () => GridModule
  },
  {
    path: 'manage', loadChildren: () => ManageModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
