import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.scss']
})
export class BillTableComponent implements OnChanges {
  @Input() data = [];

  @Input() columns?: any[]
  @Input() pageSizeOptions?= [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000];
  @Input() isEditPermission?= false
  columnNames: any = ["N Facture", "Date Facture", "N Facture fournisseur", "fournisseur", "Total HT", "Total TVA", "Total Remise", "Total TTC", "Statut", "valideON", "valideON"];
  displayedColumns: any = ["billNum", "billDateString", "supplierBillNum", "id_Contact", "totalHT", "totalTVA", "totalRemise", "totalTTC", "status", "valideON", "ComptabiliseON"];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  public selectedPageSize = 15;
  public maxSize: number = 5;
  public totalItems: number = 0;
  public currentPage: number = 1;
  public numPages: number = 0;

  totalHT = 0.00
  totalTVA = 0.00
  totalRemise = 0.00
  totalTTC = 0.00

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
        this.totalHT = 0.00
        this.totalTVA = 0.00
        this.totalRemise = 0.00
        this.totalTTC = 0.00
        this.dataSource.data.forEach(d => {
          this.totalHT += parseFloat(d.totalHT)
          this.totalTVA += parseFloat(d.totalTVA)
          this.totalRemise += parseFloat(d.totalRemise)
        })
        this.totalTTC = this.totalHT + this.totalTVA - this.totalRemise
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


