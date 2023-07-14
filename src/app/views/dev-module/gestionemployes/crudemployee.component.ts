import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap/modal";
import {DataService} from "../../../services/data.service";
import {util} from "../../../tools/utils";
import {Router} from "@angular/router";
import {ExportingTool} from "../../../tools/exporting_tool";
import {ExportExcel} from "../../../tools/export-excel";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Employee} from "../../../models/employee";

@Component({
  selector: 'app-crudemployee',
  templateUrl: './crudemployee.component.html'
})
export class CrudemployeeComponent {
  loading: boolean = false;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  constructor(private dataService: DataService, private router: Router,public tools: util,private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel) { }

  value: string | Object;
  isCollapsed: boolean = false;
  isCollapsedData: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  data = [];
  mode = "Ajouter"
  isEditPermission = false
  isAddPermission = false
  errorMsg: string;
  public isnotNum: boolean = false
  modalLoading: boolean = false;
  selectedEmployee: Employee = new Employee();
  countries =[]
  selected


  ngOnInit() {
    this.isEditPermission = this.tools.isAuthorized('Parametrage_GroupeVehicules','Mettre a jour')
    this.isAddPermission = this.tools.isAuthorized('Parametrage_GroupeVehicules','Ajouter')
    // this.getDev();
    this.loadData();
    this.loadCountries();
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';

  }



  loadData() {
    this.loading = true;

    var route = this.router
    this.dataService.getEmployees("").subscribe({
      next: (d: any) => {
       /* if (d && d.length) { //not needed
          d.forEach(e => {
            e.DateNaissanceString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.DateNaissance ?? 0));
            e.DateEmbaucheString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.DateEmbauche ?? 0));
            if(e.Sortie!=0) e.DateSortieString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.DateSortie ?? 0));
          });

        } */
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

  loadModify(ev) {
    this.mode = "Modifier"


    if (ev) {
      var url = "?id=" + ev[0]
      this.modalLoading = true;
      this.primaryModal.show()

      var route = this.router
      this.dataService.getEmployees(url).subscribe({

        next: (e: any) => {
          console.log("e=");
          console.log(e);
          console.log("e[0] = ");
          console.log("loadmodify", e[0]);
          this.selectedEmployee = e[0]
          if (this.selectedEmployee) {
            this.selectedEmployee.DateNaissanceString = this.tools.formatDateForInput(this.tools.timeStampToDate(this.selectedEmployee.DateNaissance ?? 0));
            this.selectedEmployee.DateEmbaucheString = this.tools.formatDateForInput(this.tools.timeStampToDate(this.selectedEmployee.DateEmbauche ?? 0));
            this.selectedEmployee.DateSortieString = this.selectedEmployee.Sortie? this.tools.formatDateForInput(this.tools.timeStampToDate(this.selectedEmployee.DateSortie ?? 0)): '';
            this.selectedEmployee.id_City=this.selectedEmployee.id_City.toString();
            // this.selectedEmployee.country=this.selectedEmployee.country.toString(); //country not added yet
            this.selectedEmployee.Departement=this.selectedEmployee.Departement.toString();
          }
          this.modalLoading = false;
        }, error(err) {
          this.modalLoading = false;
          if (err.status == 401) {
            route.navigate(['login'], { queryParams: { returnUrl: route.url } });
          }
        }
      });
    }
  }


  submit() {
    this.selectedEmployee.DateNaissance = Math.round((new Date(this.selectedEmployee.DateNaissanceString).getTime()) / 1000);
    this.selectedEmployee.DateEmbauche = Math.round((new Date(this.selectedEmployee.DateEmbaucheString).getTime()) / 1000);
    this.selectedEmployee.DateSortie = this.selectedEmployee.Sortie? Math.round((new Date(this.selectedEmployee.DateSortieString).getTime()) / 1000): 0;
    if (this.mode == "Ajouter") this.ajouter()
    if (this.mode == "Modifier") this.modifier()
  }

  ajouter() {
    var route = this.router
    if (!this.selectedEmployee.firstName || !this.selectedEmployee.lastName || !this.selectedEmployee.tel ) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      this.dataService.addEmployee(this.selectedEmployee)
        .pipe(
          catchError(err => {
            console.log("res", err)
            this.modalLoading = false;
            this.errorMsg = "Erreur "+err
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }

            else if (err.status == 400) {
              console.log(err);
              this.errorMsg = "Groupe avec cet identifiant exist deja. Veuillez utiliser un autre identifiant."
              console.log(this.errorMsg);
            }

            else if (err.status == 402) {
              this.errorMsg = "Erreur l'ajout est bloqué."
            }
            return throwError(err);
          })
        )
        .subscribe({
          next: (res) => {
           console.log("add")
            this.loadData()
            this.primaryModal.hide()
            this.errorMsg = ""
          }
        })
    }

  }

  modifier() {
    var route = this.router
    if (!this.selectedEmployee.id || !this.selectedEmployee.firstName ||
      !this.selectedEmployee.lastName || !this.selectedEmployee.tel) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      this.dataService.updateEmployee(this.selectedEmployee)
        .pipe(
          catchError(err => {
            console.log("res", err)
            this.modalLoading = false;
            this.errorMsg = "Erreur "+err
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }

            else if (err.status == 400) {
              console.log(err);
              this.errorMsg = "Employé avec cet identifiant exist deja. Veuillez utiliser un autre identifiant."
              console.log(this.errorMsg);
            }

            else if (err.status == 402) {
              this.errorMsg = "Erreur l'ajout est bloqué."
            }
            return throwError(err);
          })
        )
        .subscribe({
          next: (res) => {
            // console.log("edit ")
            this.loadData()
            this.primaryModal.hide()
            this.errorMsg = ""
          }
        })
    }
  }


  delete(ev) {
    if (confirm("Etes vous sure de supprimer l'employé " + ev[1] + " " + ev[2])) {
      var route = this.router
      var url = "?id=" + ev[0]
      this.dataService.deleteEmployee(url).subscribe({
        next: (res) => {
          this.loadData()
        }, error(err) {
          this.modalLoading = false;
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

  showAddModal() {
    this.selectedEmployee = new Employee();
    this.errorMsg = ""
    this.mode = "Ajouter"
    this.primaryModal.show()
  }
  getSelectedCity(selected){
    this.countries
    this.selectedEmployee.id_City = selected;
    console.log(selected)
    console.log(this.selectedEmployee.id_City)
  }

  loadCountries() {
    var route = this.router
      this.loading = true
      this.dataService.loadParam("Country","Min").subscribe({
        next:
          res => {
            // console.log("res", res)
            this.loading = false;
            res.forEach(e => {
              e.id = e.id.toString()
            });
            this.countries = res // [{id:"",description:""},{...}]
          },
        error(err) {
          console.log("err ", err);
          if (err.status == 401) {
            route.navigate(['login']);
          }
          else
            alert("Erreur Serveur !")
        }
      })

  }



  exporter(type) {
    type == 1 ? this.exportingPdfTool.exportPdf_GroupeVehicules(this.data, "Rapport des Employés " ) :
      this.exportingExcelTool.Export_GroupVehicules(this.data, "Rapport des Employés ")
  }

}
