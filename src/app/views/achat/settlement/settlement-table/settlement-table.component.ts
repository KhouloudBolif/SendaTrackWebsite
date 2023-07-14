import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
@Component({
  selector: 'app-settlement-table',
  templateUrl: './settlement-table.component.html',
  styleUrls: ['./settlement-table.component.scss']
})



export class SettlementTableComponent implements OnChanges {
  @Input() data = [];

  @Input() columns?: any[]
  @Input() pageSizeOptions?= [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000];
  @Input() isEditPermission?= false
  columnNames: any = ["N Réglement", "Date Réglement", "Date écheance", "N Facture", "Fournisseur","Montant Réglé",  "Montant restant", "Mode de réglement", "Statut", "N Pièce", "Banque"];
  displayedColumns: any = ["settlementNum", "settlementDateString", "dueDateString", "billNum", "id_Contact", "amountToPay", "remainingAmount", "settlementMode", "status", "numPiece", "bankId"];

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
    if (changes['isEditPermission']) {
      this.isEditPermission = changes['isEditPermission'].currentValue
      if (this.isEditPermission) {
        this.displayedColumns.unshift("actions")
        this.columnNames.unshift("Actions")
      }
    }
  }
}


