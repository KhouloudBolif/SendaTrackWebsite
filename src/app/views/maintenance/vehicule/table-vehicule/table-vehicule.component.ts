

import { Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'src/app/tools/constants';

@Component({
  selector: 'app-table-vehicule',
  templateUrl: './table-vehicule.component.html',
  styleUrls: ['./table-vehicule.component.scss']
})
export class TableVehiculeComponent implements OnChanges {
  @Input() data=[];

  @Input() isEditPermission? = false
  @Output() modify?: EventEmitter<any> = new EventEmitter();
  @Output() delete?: EventEmitter<any> = new EventEmitter();

  @Output() det?: EventEmitter<any> = new EventEmitter();
  public displayedColumns = ["actions", "code", "immatriculation", "etat", "marque", "type_motorisation", "capacite_tonnage","client","date_circulation","motif"]
  @Input() columns?: any[]
  @Input() pageSizeOptions?= [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  columnNames = ["Actions", "Code", "Immatriculation", "Etat", "Marque", "Type motorisation", "capacite_tonnage","Client","Date circulation","Motif"]
  public selectedPageSize = 15;
  public maxSize: number = 5;
  public totalItems: number = 0;
  public currentPage: number = 1;
  public numPages: number = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  constructor(public cts: Constant) {

  }
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      let d = changes['data'].currentValue
      if (d /*&& d.length > 0*/) {
        this.dataSource = new MatTableDataSource(d)
        this.totalItems = this.dataSource.data.length
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    } 
    if(changes['isEditPermission']){
      this.isEditPermission = changes['isEditPermission'].currentValue
      if(this.isEditPermission){
        this.displayedColumns = ["actions", "code", "immatriculation", "etat", "marque", "type_motorisation", "capacite_tonnage","client","date_circulation","motif"]
        this.columnNames =  ["Actions", "Code", "Immatriculation", "Etat", "Marque", "Type motorisation", "capacite_tonnage","Client","Date circulation","Motif"]
      }else{
        this.displayedColumns = ["actions", "code", "immatriculation", "etat", "marque", "type_motorisation", "capacite_tonnage","client","date_circulation","motif"]
        this.columnNames =  ["Actions", "Code", "Immatriculation", "Etat", "Marque", "Type motorisation", "capacite_tonnage","Client","Date circulation","Motif"]
      }
    }
  }

  modif(ev) {
    this.modify.emit(ev)
  }

  supp(ev){
   // 
  
     this.delete.emit(ev);
   
   }

  detail(ev) {
    console.log(ev); 
    this.delete.emit(ev)
  }

  

 /* getValue(c, row) {
    switch (c) {
      case 'value':
        return row["typeDeclenchement"] == 1 ? row["decKmValue"] : row["decDateValueString"]
      case 'status':
        return this.getStatusName(row[c])
      case 'typeDeclenchement':
        return this.getTypeDeclenchement(row[c])
      case 'operation':
        return this.getOperationById(row[c])
      case 'actions':
        return ''
      default:
        return row[c]
    }
  }

  

  getStatusName(s) {
    return s == "closed" ? 'Clôturée' : s == 'obsolete' ? 'Dépassé' : 'En Cours'
  }

  getTypeDeclenchement(t) {
    return t == 1 ? 'Par KM' : 'Par Date'
  }

  getOperationById(id) {
    for (let i = 0; i < this.cts.planOperations.length; i++) {
      if (this.cts.planOperations[i].id == id) return this.cts.planOperations[i].name
    }
    return 0
  }
  */
 getBgColorForStatus(s) {
    return s == "closed" ? 'bg-success' : s == 'obsolete' ? 'bg-danger' : ''
  }
}

