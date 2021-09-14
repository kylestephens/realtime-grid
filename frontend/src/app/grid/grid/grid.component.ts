import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/notifications.service';
import { GridService } from '../grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public gridData: any;

  public columnDefs = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'jobTitle', headerName: 'Job Title', flex: 1 }
  ];

  public rowData = [
    { id: '', firstName: '', lastName: '', jobTitle: '' },
  ];

  private paramsListener?: Subscription;
  private gridApi: any;

  constructor(
    private route: ActivatedRoute,
    private gridService: GridService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.paramsListener = this.route.params.subscribe((params) => {
      const { gridId } = params;
      this.fetchGrid(gridId);

      this.notificationsService.receiveGridUpdates(gridId).subscribe((message: any) => {
        if (message.operation === 'DELETE') {
          this.gridApi.applyTransaction({
            remove: message.rows
          });
        }
  
        if (message.operation === 'INSERT') {
          this.gridApi.applyTransaction({
            add: message.rows,
            addIndex: 0,
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.paramsListener?.unsubscribe();
  }

  public getRowNodeId = (data: any) => data.id;

  public onGridReady(params: any) {
    this.gridApi = params.api;
  }

  private fetchGrid(gridId: number) {
    this.gridService.get(gridId).subscribe((data: any) => {
      this.rowData = data.users;
    });
  }

}
