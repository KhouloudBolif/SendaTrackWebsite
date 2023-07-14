import { catchError } from 'rxjs/operators';
import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MyDateRangePickerComponent, MyDateRangePickerOptions } from '../components/my-date-range-picker/my-daterangepicker.component';
import { DataService } from '../../services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { util } from '../../tools/utils';
import { Article } from '../../models/Article';
import { Router } from '@angular/router';
import { ExportingTool } from '../../tools/exporting_tool';
import { ExportExcel } from '../../tools/export-excel';
import { throwError } from 'rxjs/internal/observable/throwError';
import { DriverDocument } from '../../models/DriverDocument';
import { Constant } from '../../tools/constants';
// import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { log } from 'console';
// import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'LstArticle',
  templateUrl: './LstArticle.component.html',
  styleUrls: ['./LstArticle.component.scss']
})
export class LstArticleComponent  implements  OnInit, OnDestroy {
  typeContact = [{ val: 1, status: false }, { val: 2, status: false }];
  loading: boolean = false;
  modalLoading: boolean = false;
  selectedArticle: Article = new Article();
  isEditPermission = false
  isAddPermission = false

  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  options: any = {
    componentRestrictions: { country: 'IN' }
  }

  // handleAddressChange(address: Address) {
  //   console.log(address.formatted_address)
  //   console.log(address.geometry.location.lat())
  //   console.log(address.geometry.location.lng())
  // }

  constructor(private dataService: DataService, private tools: util, public cts: Constant, private router: Router, private exportingPdfTool: ExportingTool, /*public translate: TranslateService,*/ private exportingExcelTool: ExportExcel,)
  {
  }

  value: string | Object;
  myDateRangePickerOptions: MyDateRangePickerOptions;
  isCollapsed: boolean = false;
  isCollapsedData: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  data = [];
  errorMsg: string;
  mode = "Ajouter"
  public isnotNum: boolean = false
  displayedColumns: any = ["Véhicule", "Device", "Num de Tel"]

  selectedFieldModal = [{ selected: [], table: "FamillesArticle", data: [] }, { selected: [], table: "SousFamillesArticle", data: [] }, { selected: [], table: "", data: [] }, { selected: [], table: "TypeArticle", data: [] }];
  selectedcivility = []
  /////////////
  selectedTab = 0
  //typeSelected = []
  openAlert: boolean = false
  driverDocument: DriverDocument = new DriverDocument();
  selectTab(i) {
    this.selectedTab = i
  }

  @ViewChild('calendar', { static: true })
  private myDateRangePicker: MyDateRangePickerComponent;
  ngOnInit() {
    this.isEditPermission = true//this.tools.isAuthorized('Parametrage_Conducteur','Mettre a jour')
    this.isAddPermission = true//this.tools.isAuthorized('Parametrage_Conducteur','Ajouter')
    this.selectedFieldModal.forEach((element, index) => {
      this.loadParam4Combo(index);
    });
    this.loadData();

  }

  /* getSelectedFormeJuridique(selectedForm) {
    this.selectedArticle.FormeJuridique = selectedForm
    this.selectedFieldModal[2].selected = selectedForm
  } */

  getSelectedTypeArticle(selectedForm) {
    this.selectedArticle.IDTypeArticle = selectedForm
    this.selectedFieldModal[3].selected = selectedForm
  }

  getSelectedSousFamillesArticle(selectedForm) {
    this.selectedArticle.id_SousFamillesArticle = selectedForm
    this.selectedFieldModal[1].selected = selectedForm
  }

  getSelectedFamillesArticle(selectedForm) {
    this.selectedArticle.id_FamillesArticle = selectedForm
    this.selectedFieldModal[0].selected = selectedForm
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';

  }

  loadParam4Combo(i) {
    if (this.selectedFieldModal[i].table != "") {
      var route = this.router
      this.loading = true
      this.dataService.loadParam(this.selectedFieldModal[i].table, "Min").subscribe({
        next:
          res => {
            this.loading = false;
            res.forEach(e => {
              e.id = e.id.toString()
            });
            this.selectedFieldModal[i].data = res

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

  }

  loadData() {
    this.loading = true;
    var urlParams = "";
    var route = this.router
    this.dataService.getArticleData(urlParams).subscribe({
      next: (d: any) => {
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
    if (ev) {
      this.mode = "Modifier"
      this.selectedTab = 0
      this.selectedArticle = new Article();
      this.resetSelected()
      //this.typeContact = this.tools.get_typecontact(0)
      var url = "?d=" + ev
      console.log(url)
      console.log(ev)
      this.modalLoading = true;
      this.primaryModal.show()
      var route = this.router
      this.dataService.getArticleData(url).subscribe({
        next: (d: any) => {
          if (d && d.length) {
            /*  d.forEach(e => {
               e.birthdateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.birthdate ?? 0));
               e.licenseExpireString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.licenseExpire ?? 0));
               e.insuranceExpireString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.insuranceExpire ?? 0));
             }); */
             console.log(d);

            this.selectedArticle = d[0];
            //this.typeContact = this.tools.get_typecontact(this.selectedArticle.TypeContact)
            this.selectedFieldModal[0].selected = this.selectedArticle.id_FamillesArticle.toString()
            this.selectedFieldModal[1].selected = this.selectedArticle.id_SousFamillesArticle.toString()
            //this.selectedFieldModal[2].selected = this.selectedArticle.FormeJuridique.toString()
            this.selectedFieldModal[3].selected = this.selectedArticle.IDTypeArticle.toString()
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
    this.selectedArticle = new Article();
    this.resetSelected()
    //this.typeContact = this.tools.get_typecontact(0)
    this.selectedcivility = []
    this.errorMsg = ""
    this.mode = "Ajouter"
    this.selectedTab = 0
    this.primaryModal.show()
  }

  submit() {
    if (this.mode == "Ajouter") this.ajouter()
    if (this.mode == "Modifier") this.modifier()
  }

  ajouter() {
    var route = this.router
    this.errorMsg = ""
    if (!this.selectedArticle.Reference && !this.selectedArticle.Designation ) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
        //this.selectedContact.TypeContact = this.tools.set_typecontact(this.typeContact)
        this.dataService.addArticle(this.selectedArticle)

          .pipe(
            catchError(err => {
              console.log(this.selectedArticle)
              // console.log("res", err)
              this.modalLoading = false;
              if (err.status == 401) {
                route.navigate(['login'], { queryParams: { returnUrl: route.url } });
              }

              else if (err.status == 400) {
                console.log(err);
                this.errorMsg = "ce article exist deja. Veuillez utiliser un autre Reference."
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
              this.selectedArticle.Reference = res.Reference
              this.loadData()
              /* this.primaryModal.hide() */
              this.mode = "Modifier"
              this.errorMsg = ""
            }
          })

    }
  }

  modifier() {
    var route = this.router
    this.openAlert = false
    this.errorMsg = ""
    if (!this.selectedArticle.Designation) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      //this.selectedContact.TypeContact = this.tools.set_typecontact(this.typeContact)
      this.dataService.updateArticle(this.selectedArticle)
        .pipe(
          catchError(err => {
            console.log("err", err)
            this.modalLoading = false;
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }
            else if (err.status == 400) {
              console.log(err);
              this.errorMsg = "ce article exist deja. Veuillez utiliser un autre Reference."
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
            // console.log("res", res)
            this.loadData()
            this.primaryModal.hide()
            this.errorMsg = ""
            this.openAlert = true
          }
        })
      //}
    }
  }

  delete(article) {
    if (confirm("Are you sure to delete " + article)) {
      var route = this.router
      var d = "?d=" + article
      this.dataService.delArticle(d).subscribe({
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

  exporter(type) {
    type == 1 ? this.exportingPdfTool.exportPdf_Conducteurs(this.data, "Rapport de List Des Articles ") :
      this.exportingExcelTool.ExportConducteurs(this.data, "Rapport de List Des Article ")
  }

  resetSelected() {
    this.selectedFieldModal.forEach((element, index) => {
      element.selected = [];
    });
  }


  ngOnDestroy(): void {
  }
}


