import { Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'my-gestionContact-table',
  styleUrls: ['my-gestionContact-table.component.scss'],
  templateUrl: 'my-gestionContact-table.component.html',
})
export class MyGestionContactTableComponent implements OnChanges {
  @Input() data=[];
  //@Input() columnNames?: any[]
  public displayedColumns =  ["actions","Company","Address","Id_City","Tel1","GSM","Email","ICE"/*,"id","TypeContact","Id_TypeFournisseur","Id_FamilleClient","Id_SecteursActivite"*/]
  @Input() columns?: any[]
  @Input() pageSizeOptions?= [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000];

  @Input() isEditPermission? = false
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  columnNames =["Actions","Société","Adresse","Ville","Tel","GSM","Email","ICE"/*,"id","Type Contact","Type Fournisseur","Famille Client","Secteurs Activite"*/];
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
      this.displayedColumns =  ["actions","Company","Address","Id_City","Tel1","GSM","Email","ICE"/*,"id","TypeContact","Id_TypeFournisseur","Id_FamilleClient","Id_SecteursActivite"*/]
      this.columnNames =["Actions","Société","Adresse","Ville","Tel","GSM","Email","ICE"/*,"id","Type Contact","Type Fournisseur","Famille Client","Secteurs Activite"*/];
    }else{
      this.displayedColumns =  ["Company","Address","Id_City","Tel1","GSM","Email","ICE"/*,"id","TypeContact","Id_TypeFournisseur","Id_FamilleClient","Id_SecteursActivite"*/]
      this.columnNames =["Société","Adresse","Ville","Tel","GSM","Email","ICE"/*,"id","Type Contact","Type Fournisseur","Famille Client","Secteurs Activite"*/];
    }
  }
}
}

