import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  @ViewChild('numberRowsToGenerate') numberRowsToGenerate!: ElementRef;
  @ViewChild('gridId') gridId!: ElementRef;
  @ViewChild('operationType') operationType!: ElementRef;
  @ViewChild('numberRowsToUpdate') numberRowsToUpdate!: ElementRef;

  isUpdateView = false;

  constructor(
    private manageService: ManageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public onClickCreateGrid() {
    const numRows = parseInt(this.numberRowsToGenerate.nativeElement.value);

    this.manageService.create(numRows).subscribe(
      (data: any) => {
        this.toastr.success(`Grid Create: Grid ID is ${data.id}`, 'New Grid Created 😊');
      },
      (error) => {
        this.toastr.error('Something went wrong!', 'Error');
      }
    );
  }

  public onClickUpdate() {
    const gridId = parseInt(this.gridId.nativeElement.value);
    const numRows = parseInt(this.numberRowsToUpdate.nativeElement.value);
    const operationType = this.operationType.nativeElement.value;

    this.manageService.update(gridId, numRows, operationType).subscribe(
      (data: any) => {
        this.toastr.success(`Grid #${gridId} updated`, `${numRows} rows ${operationType}'ed 😊`);
      },
      (error) => {
        this.toastr.error('Something went wrong!', 'Error');
      }
    );
  }

}
