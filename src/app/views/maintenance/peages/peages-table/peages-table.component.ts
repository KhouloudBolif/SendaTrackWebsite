import { Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-peages-table',
  
  templateUrl: 'peages-table.component.html',
})
export class PeagesTableComponent implements OnChanges {
  @Input() data = [];
  // @Input() columnNames?: any[]
  public displayedColumns = ["actions", "userID", "description", "roleID", "contactName", "contactEmail"]
  @Input() columns?: any[]
  @Input() pageSizeOptions?= [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000];
  @Input() isEditPermission? = false
  @Output() modify?: EventEmitter<any> = new EventEmitter();
  @Output() delete?: EventEmitter<any> = new EventEmitter();
 @Output() affect?: EventEmitter<any> = new EventEmitter();

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columnNames =["Actions", "Nº Carte", "Type", "Plafond", "Fournisseur", "Conducteur"];
  public selectedPageSize = 15;
  public maxSize: number = 5;
  public totalItems: number = 0;
  public currentPage: number = 1;
  public numPages: number = 0;
  loadDonnee: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modif(ev) {
    this.modify.emit(ev)
  }
  supp(ev) {
     console.log(ev)
    this.delete.emit(ev)
   
  }

  affecter(ev){
    this.affect.emit(ev);
    //console.log(ev);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      let d = changes['data'].currentValue
      if (d && d.length > 0) {
        this.dataSource = new MatTableDataSource(d)
        this.totalItems = this.dataSource.data.length
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
    if(changes['isEditPermission']){
      this.isEditPermission = changes['isEditPermission'].currentValue
      if(this.isEditPermission){
        this.displayedColumns = ["actions", "NumCarte", "TypeCarte", "Plafond", "id_Contact", "driverID"]
        this.columnNames = ["Actions", "Nº Carte", "Type", "Plafond", "Fournisseur", "Conducteur"];
      }else{
        this.displayedColumns = ["actions", "NumCarte", "TypeCarte", "Plafond", "id_Contact", "driverID"]
        this.columnNames = ["Actions", "Nº Carte", "Type", "Plafond", "Fournisseur", "Conducteur"];
      }
    }
  }


 
}