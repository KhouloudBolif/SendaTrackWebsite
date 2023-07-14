import { Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'my-LstArticle-table',
  styleUrls: ['my-LstArticle-table.component.scss'],
  templateUrl: 'my-LstArticle-table.component.html',
})
export class MyLstArticleTableComponent implements OnChanges {
  @Input() data=[];
  //@Input() columnNames?: any[]
  public displayedColumns =  ["actions","Reference","Designation","Prix_achat","QteStock","codebarre1","QteAlerte","id_FamillesArticle"/*,"id","TypeContact","Id_TypeFournisseur","Id_FamilleClient","Id_SecteursActivite"*/]
  @Input() columns?: any[]
  @Input() pageSizeOptions?= [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000];

  @Input() isEditPermission? = false
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  columnNames =["Actions","Référence","Désignation","Prix d'achat","Qte Stock","Valorisation Stock","Qte Alerte","Famille"/*,"id","Type Contact","Type Fournisseur","Famille Client","Secteurs Activite"*/];
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
      this.displayedColumns =  ["actions","Reference","Designation","Prix_achat","QteStock","codebarre1","QteAlerte","id_FamillesArticle"/*,"id","TypeContact","Id_TypeFournisseur","Id_FamilleClient","Id_SecteursActivite"*/]
      this.columnNames =["Actions","Référence","Désignation","Prix d'achat","Qte Stock","Valorisation Stock","Qte Alerte","Famille"/*,"id","Type Contact","Type Fournisseur","Famille Client","Secteurs Activite"*/];
    }else{
      this.displayedColumns =  ["Reference","Designation","Prix_achat","QteStock","codebarre1","QteAlerte","id_FamillesArticle"/*,"id","TypeContact","Id_TypeFournisseur","Id_FamilleClient","Id_SecteursActivite"*/]
      this.columnNames =["Référence","Désignation","Prix d'achat","Qte Stock","Valorisation Stock","Qte Alerte","Famille"/*,"id","Type Contact","Type Fournisseur","Famille Client","Secteurs Activite"*/];
    }
  }
}
}

 /*  'Reference',
  'Designation',
  'Prix_achat',
  'id_FamillesArticle',
'id_SousFamillesArticle',
'IDTypeArticle',
'codebarre1',
'codebarre2',
' QteStock',
  'QteAlerte ', */