import { Component, Input, OnInit ,ViewChild} from '@angular/core';
import { combineLatest, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { util } from './../../../tools/utils';
import { Consommation } from './../../../models/Consommation';
import {Vehicules } from '../../../models/vehicules';
import { MyDateRangePickerComponent, MyDateRangePickerOptions } from '../../components/my-date-range-picker/my-daterangepicker.component';
import { DataService } from '../../../services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { ExportingTool } from 'src/app/tools/exporting_tool';
import { ExportExcel } from 'src/app/tools/export-excel';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss']
})
export class VehiculeComponent {



  constructor(private dataService: DataService, private router: Router, private tools: util, private dateAdapter: DateAdapter<Date>, private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel) { }
 deviceID:any;

  value: string | Object;
  myDateRangePickerOptions: MyDateRangePickerOptions;
  isCollapsed: boolean = false;
  isCollapsedData: boolean = false;
  data = [];

  ngOnInit(): void {
  
    this.isEditPermission = this.tools.isAuthorized('Maintenance_Consommation','Mettre a jour')
    this.isAddPermission = this.tools.isAuthorized('Maintenance_Consommation','Ajouter')
    this.loadData(true);
   

  }
  loading: boolean = false;
  modalLoading: boolean = false;
  selectedVehicule : Vehicules =new Vehicules();
  isEditPermission = false
  isAddPermission = false
  mode = "Ajouter";
  selectedTab = 0
  typeSelected = []
  public errorMsg = "";
  
  // show table or detail 
  showtable:boolean=false;
  showdetail:boolean =false;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  private myDateRangePicker: MyDateRangePickerComponent;


  submit() {
    this.mode == 'Ajouter' ? this.ajouter() : this.modifier();
  }
  ajouter(){
    console.log("function add")
  }
  modifier(){
    console.log("function update")

  }
  // show detail
  delete(ev) {
    this.deviceID=ev;
    console.log("this.deviceid", this.deviceID)
this.showdetail=false;
this.showtable=true;
  }

  loadData(first = false) {
    var route = this.router
    this.loading = true;
    var urlParams = ""
    this.dataService.getVehicules(urlParams).subscribe({
      next: (d: any) => {
        this.loading = false;
        console.log(d)
        this.data = d;
        this.data.forEach((e) => {
          e.creationTime = this.tools.formatDateForInput(new Date(Number.parseInt(e.creationTime ?? 0) * 1000));
          e.decDateValueString = this.tools.formatDateForInput(new Date(Number.parseInt(e.decDateValue ?? 0) * 1000));
          // if (e.da) e.da = Math.round(Number.parseInt(e.da) / 60);
        })

      }, error(err) {
        console.log(err);
        this.loading = false;
        if (err.status == 401) {
          route.navigate(['login'], { queryParams: { returnUrl: route.url } });
        }
      }
    })

    }

  exporter(type) {
    type == 1 ? this.exportingPdfTool.exportPdf_Consommation(this.data, "Rapport de Consommation ") :
      this.exportingExcelTool.Export_Consommaton(this.data, "Rapport de Consommation ")
  }
  
  


}
