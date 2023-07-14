import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-bank-person-table',
  templateUrl: './bank-person-table.component.html',
  styleUrls: ['./bank-person-table.component.scss']
})
export class BankPersonTableComponent implements OnChanges {
  @Input() data=[];
  @Input() pageSizeOptions?= [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000];
  @Input() isEditPermission? = false

  columnNames = ["Civilité", "Nom", "Prénom", "Tél", "GSM", "Fax", "Email"]
  displayedColumns =["civility", "lastName", "firstName", "tel", "GSM", "fax", "email"]
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  public selectedPageSize = 15;
  public maxSize: number = 5;
  public totalItems: number = 0;
  public currentPage: number = 1;
  public numPages: number = 0;



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() modify?: EventEmitter<any> = new EventEmitter();
  @Output() delete?: EventEmitter<any> = new EventEmitter();


  constructor() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log("this.dataSource.filter", this.dataSource.filter);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClicked(row: any) {
    // console.log('Row clicked: ', row);
  }

  modif(ev) {
    this.modify.emit(ev)
  }

  supp(ev) {
    this.delete.emit(ev)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      let d = changes['data'].currentValue
      if (d) {
        this.dataSource = new MatTableDataSource(d)
        this.totalItems = this.dataSource.data.length
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
    if(changes['isEditPermission']){
      this.isEditPermission = changes['isEditPermission'].currentValue
      if(this.isEditPermission){
        this.displayedColumns.unshift("actions")
        this.columnNames.unshift("Actions")
      }
    }
  }
}
