import { catchError } from 'rxjs/operators';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
//import { User } from '../../../models/user';
import { CarteCarburant } from '../../../models/carteCarburant';
import { Router } from '@angular/router';
import { util } from 'src/app/tools/utils';
import { Constant } from 'src/app/tools/constants';
import { ExportingTool } from 'src/app/tools/exporting_tool';
import { ExportExcel } from 'src/app/tools/export-excel';
//import { throwError } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';

//import { JsonEditorComponent, JsonEditorOptions } from './jsoneditor/jsoneditor.component'
import { schema } from 'src/app/tools/schema.value';
import { Console } from 'console';
//import { PlanEntretien } from 'src/app/models/planEnretien';
@Component({
  selector: 'app-cartecarburant',
  templateUrl: './cartecarburant.component.html',
 
})
export class CartecarburantComponent { 
 
  role = "admin";
  loading: boolean = false;
  modalLoading: boolean = false;

  mode = "Ajouter";

 // selectedUser: User = new User();
 selectedCarburant : CarteCarburant =new CarteCarburant();
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @ViewChild('secondModal') public secondModal: ModalDirective;
 
  public permissionData: any;
  public oldPermissionData:any;
  isEditPermission = false
  isAddPermission = false
 
  constructor(private dataService: DataService, public tools: util, private router: Router, public cst: Constant,private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel) { 
   
  }
  value: string | Object;
  data = [];//
  errorMsg: string;
  public groups: any = [];
  selectedGroups = "*";
  showErrorGroup = false;
  errorMessageGroup = "";
  selectedTimezones = "GMT+00:00";
//selction
//selectedPlan = new PlanEntretien();

suppliers = [];
drivers = [];


  ngOnInit() {

    this.loadData();
    this.loadSuppliers();
    this.getDrivers();
    this.oldPermissionData = this.permissionData = this.cst.userPermissions;
    this.isEditPermission = this.tools.isAuthorized('Parametrage_Cartecarburant','Mettre a jour')
    this.isAddPermission = this.tools.isAuthorized('Parametrage_carteCartecarbu','Ajouter')
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
    this.selectedCarburant.driverID = selected;
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
    this.selectedCarburant.id_Contact = selected;
  }

  loadData() {
    this.loading = true;
    var route = this.router
    //
    this.dataService.getCarteCarburant("").subscribe({
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

  showAddModal() {
    this.mode = "Ajouter"

    this.selectedCarburant= new CarteCarburant();
    this.selectedGroups = "*"
    this.errorMsg = ""
   this.primaryModal.show()
  }
 


  exporter(type) {
    type == 1 ? this.exportingPdfTool.exportPdf_Users(this.data, "Rapport de List Carte Carburant" ) :
      this.exportingExcelTool.Export_Users(this.data, "Rapport de List Carte Carburant" )
  }
  submit(){
    if (this.mode == "Ajouter") this.ajouter()
    if (this.mode == "Modifier") this.modifier()
    
    if (this.mode == "Affecter")this.affect();

  }

ajouter() {
  console.log("add")
  var route = this.router
  this.errorMsg = ""
  //this.selectedCarburant.TypeCarte="aju";
  console.log(this.selectedCarburant);
  this.dataService.addCarteCarburant(this.selectedCarburant).subscribe(()=>{

       
    this.loadData()
    this.primaryModal.hide()
    this.errorMsg = ""
     
  
})

}

  

delete(carteCarburant) {
  
  if (confirm("Are you sure to delete " + carteCarburant)) {
    var route = this.router
    var u = "?id=" + carteCarburant
   // console.log(u);
    this.dataService.delCarteCarburant(u).subscribe({
      next: (res) => {
       
        this.loadData()
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

modifier() {
  var route = this.router
  this.errorMsg = ""
 if (!this.selectedCarburant.NumCarte) {//|| !this.selectedDriver.contactPhone || !this.selectedDriver.contactEmail
    this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
  } else {
  // else {
   // console.log(this.selectedCarburant);
      this.dataService.updateCarteCarburant(this.selectedCarburant)
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
            this.primaryModal.hide()
            this.errorMsg = ""
          }
        })
   // }
  }
}
affect(){
  var route = this.router
  this.errorMsg = ""
 if (!this.selectedCarburant.NumCarte) {//|| !this.selectedDriver.contactPhone || !this.selectedDriver.contactEmail
    this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
  } else {
  // else {
   // console.log(this.selectedCarburant);
      this.dataService.AssignmentCarteCarburant(this.selectedCarburant)
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
loadAssignment(ev){
  this.mode = "Affecter"
  this.selectedCarburant = new CarteCarburant();
  this.errorMsg = ""
  if (ev) {
  
    var url = "?minimum="+ev;
    
   this.modalLoading=true;
    this.secondModal.show()
    var route = this.router
  
    this.dataService.getCarteCarburant(url).subscribe({
      next: (d: any) => {
       
       
        if (d && d.length) {
        
          this.selectedCarburant = d[0];
        
        
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

  loadModify(ev) {
   // console.log(ev);
    this.mode = "Modifier"
 
    this.selectedCarburant = new CarteCarburant();
 
    this.errorMsg = ""
    if (ev) {
    
      var url = "?id="+ev;
      console.log(url)
      this.modalLoading = true;
      this.primaryModal.show()
      var route = this.router
    
      this.dataService.getCarteCarburant(url).subscribe({
        next: (d: any) => {
         
         // console.log(d);
          if (d && d.length) {
           /* d.forEach(e => {
              e.birthdateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.birthdate ?? 0));
              e.licenseExpireString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.licenseExpire ?? 0));
              e.insuranceExpireString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.insuranceExpire ?? 0));
            });*/
            console.log(d);
            console.log(d[0]);
            this.selectedCarburant = d[0];
          
            //console.log("loadModify")
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


}
    




