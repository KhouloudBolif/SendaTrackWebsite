import { catchError } from 'rxjs/operators';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Peages } from '../../../models/peages';
import { Router } from '@angular/router';
import { util } from 'src/app/tools/utils';
import { Constant } from 'src/app/tools/constants';
import { ExportingTool } from 'src/app/tools/exporting_tool';
import { ExportExcel } from 'src/app/tools/export-excel';
import { throwError } from 'rxjs';
//import { JsonEditorComponent, JsonEditorOptions } from './jsoneditor/jsoneditor.component'
import { schema } from 'src/app/tools/schema.value';

@Component({
  selector: 'app-peages',
  templateUrl: './peages.component.html',
})
export class PeagesComponent { 
  role = "admin";
  loading: boolean = false;
  modalLoading: boolean = false;
  Assignmentmodal :boolean = false;

  mode = "Ajouter";
  selectedPeages: Peages = new Peages();
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @ViewChild('secondModal') public secondModal: ModalDirective;
 
  public permissionData: any;
  public oldPermissionData:any;
  isEditPermission = false
  isAddPermission = false

  constructor(private dataService: DataService, public tools: util, private router: Router, public cst: Constant,private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel) { 

  }

  data = [];
  errorMsg: string;
  public groups: any = [];
  selectedGroups = "*";
  showErrorGroup = false;
  errorMessageGroup = "";
  selectedTimezones = "GMT+00:00";

  suppliers = [];
  drivers = [];

  ngOnInit() {
    this.loadData();
    this.loadSuppliers();
    this.getDrivers();
    this.oldPermissionData = this.permissionData = this.cst.userPermissions;
    this.isEditPermission = this.tools.isAuthorized('Parametrage_Peages','Mettre a jour')
    this.isAddPermission = this.tools.isAuthorized('Parametrage_Peages','Ajouter')
  }

  
  getDrivers() {
    this.dataService.getDriverData("?minimum=true").subscribe({
      next:
        response => {
          // console.log("drivers ", response);
          this.drivers = [].concat(response)
        },
      error(err) {
        console.log("err ", err);
        if (err.status == 401) {
          this.route.navigate(['login']);
        }
        else
          alert("Erreur Serveur,")
      }
    })
  }
  getSelectedDriver(selected) {
    this.selectedPeages.driverID = selected;
  }
  loadSuppliers() {
    this.loading = true;
    var route = this.router
    this.dataService.getSuppliers("?Fourniseur=true").subscribe({
      next: (d: any) => {
        d.forEach(e => {
          e.id = e.id.toString()
        });
       // console.log("suppliers",d)
        this.suppliers = d;
        this.loading = false;
      }, error(err) {
        console.log(err);
        this.loading = false;
        if (err.status == 401) {
          route.navigate(['login'], { queryParams: { returnUrl: route.url } });
        }
      }
    })
  }
  getSelectedSupplier(selected) {
    this.selectedPeages.id_Contact = selected;
  }

  loadData() {
    this.loading = true;
    var route = this.router
    this.dataService.getPeages("").subscribe({
      next: (d: any) => {
        let now = Math.round(new Date().getTime() / 1000)
       /* d.forEach(e => {
          if (e.lastLoginTime != 0) {
            e.lastLoginTime = this.tools.formatDate(new Date(Number.parseInt(e.lastLoginTime) * 1000));
          } else {
            e.lastLoginTime = "Jamais"
          }

        });*/
        this.data = d;
       // console.log(d);

        this.loading = false;
      }, error(err) {
        console.log(err);
        this.loading = false;
        if (err.status == 401) {
          route.navigate(['login'], { queryParams: { returnUrl: route.url } });
        }
      }
    })
  };


  submit() {
    if (this.mode == "Ajouter") this.ajouter()
    if (this.mode == "Modifier") this.modifier()
    if (this.mode == "Affecter")this.affect();

  }

  affect(){
    var route = this.router
    this.errorMsg = ""
   if (!this.selectedPeages.NumCarte) {//|| !this.selectedDriver.contactPhone || !this.selectedDriver.contactEmail
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
    // else {
     // console.log(this.selectedCarburant);
        this.dataService.AssignmentCartePeages(this.selectedPeages)
          .pipe(
            catchError(err => {
              console.log("res", err)
              this.modalLoading = false;
              
              if (err.status == 401) {
                route.navigate(['login'], { queryParams: { returnUrl: route.url } });
              }
  
              else if (err.status == 400) {
                console.log(err);
                this.errorMsg = "Carte Carburant avec cet identifiant exist deja. Veuillez utiliser un autre identifiant."
                console.log(this.errorMsg);
              }
  
              else if (err.status == 402) {
                this.errorMsg = "Erreur l'ajout est bloqué."
              }
              return throwError(err);
            })
          )
          .subscribe({
            next: (res: any) => {
             
              this.loadData()
              this.secondModal.hide()
              this.errorMsg = ""
            }
          })
     // }
    }
  }
  ajouter(){
    //console.log("add")
     var route = this.router
     this.errorMsg = ""
     console.log(this.selectedPeages);
     this.dataService.addPeages(this.selectedPeages).subscribe(()=>{
     
       
         this.loadData()
         this.primaryModal.hide()
         this.errorMsg = ""
          
       
     })
   
   }
  

   modifier() {
    //console.log("modifier btn")
    var route = this.router
    this.errorMsg = ""
   if (!this.selectedPeages.NumCarte) {//|| !this.selectedDriver.contactPhone || !this.selectedDriver.contactEmail
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
    // else {
      console.log(this.selectedPeages);
        this.dataService.updatePeages(this.selectedPeages)
          .pipe(
            catchError(err => {
              console.log("res", err)
              this.modalLoading = false;
              this.Assignmentmodal=false;
              if (err.status == 401) {
                route.navigate(['login'], { queryParams: { returnUrl: route.url } });
              }
  
              else if (err.status == 400) {
                console.log(err);
                this.errorMsg = "Peages avec cet identifiant exist deja. Veuillez utiliser un autre identifiant."
                console.log(this.errorMsg);
              }
  
              else if (err.status == 402) {
                this.errorMsg = "Erreur l'ajout est bloqué."
              }
              return throwError(err);
            })
          )
          .subscribe({
            next: (res: any) => {
             
              this.loadData()
              this.primaryModal.hide()
              this.errorMsg = ""
            }
          })
     // }
    }
  }
  
  loadModify(ev) {
    console.log(ev);
     this.mode = "Modifier"
  
     this.selectedPeages = new Peages();
  
     this.errorMsg = ""
     if (ev) {
     
       var url = "?id="+ev;
       this.modalLoading = true;
       this.primaryModal.show()
       var route = this.router
     
       this.dataService.getPeages(url).subscribe({
         next: (d: any) => {
          
          // console.log(d);
           if (d && d.length) {
            /* d.forEach(e => {
               e.birthdateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.birthdate ?? 0));
               e.licenseExpireString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.licenseExpire ?? 0));
               e.insuranceExpireString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.insuranceExpire ?? 0));
             });*/
             this.selectedPeages= d[0];
           
             console.log("loadModify")
           }
           
 
           this.modalLoading = false;
         }, error(err) {
           this.modalLoading = false;
           if (err.status == 401) {
             route.navigate(['login'], { queryParams: { returnUrl: route.url } });
           }
         }
       })
     }
   }
 
  delete(peages) {
  
    if (confirm("Are you sure to delete " + peages)) {
      var route = this.router
      var u = "?id=" + peages
    
      this.dataService.delPeages(u).subscribe({
        next: (res) => {
          this.loadData()
          console.log("Deleted")
        }, error(err) {
          this.modalLoading = false;
          this.Assignmentmodal=false;
          if (err.status == 401) {
            route.navigate(['login'], { queryParams: { returnUrl: route.url } });
          }
          else if (err.status == 402) {
            alert("Erreur, la suppression est bloqué")
          }
        }
      })
    }
   
  }

  loadAssignment(ev){
    this.mode = "Affecter"
    this.selectedPeages = new Peages();
    this.errorMsg = ""
    if (ev) {
    
      var url = "?minimum="+ev;
      
     this.modalLoading=true;
      this.secondModal.show()
      var route = this.router
    
      this.dataService.getPeages(url).subscribe({
        next: (d: any) => {
         
         
          if (d && d.length) {
          
            this.selectedPeages = d[0];
          
          
          }
          
  
          this.modalLoading = false;
        }, error(err) {
          this.modalLoading = false;
          if (err.status == 401) {
            route.navigate(['login'], { queryParams: { returnUrl: route.url } });
          }
        }
      })
    }
  }
  showAddModal() {
    this.mode = "Ajouter"
    this.selectedPeages = new Peages();
    this.selectedGroups = "*"
    this.errorMsg = ""
    this.primaryModal.show()
  }


  exporter(type) {
    type == 1 ? this.exportingPdfTool.exportPdf_Users(this.data, "Rapport de List Utilisateurs" ) :
      this.exportingExcelTool.Export_Users(this.data, "Rapport de List Utilisateurs" )
  }
}
