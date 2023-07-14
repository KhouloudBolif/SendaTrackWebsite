import { Component, ViewChild } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Router } from "@angular/router";
import { util } from "../../../tools/utils";
import { ExportingTool } from "../../../tools/exporting_tool";
import { ExportExcel } from "../../../tools/export-excel";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Bank } from 'src/app/models/banque';
import { BankPerson } from 'src/app/models/bankPerson';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html'
})
export class BankComponent {
  loading: boolean = false;

  constructor(private dataService: DataService, private router: Router, public tools: util, private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel) { }
  data = [];
  dataBP = [];
  cities = [];
  mode = "List"
  modeBP = "Ajouter"
  isEditPermission = false
  isAddPermission = false
  errorMsg: string;
  modalLoading: boolean = false;
  selectedBank: Bank = new Bank();
  selectedBP: BankPerson = new BankPerson()

  errorMessageOrder: any
  showErrorOrder: any

  selectedTab = 0

  selectTab(i) {
    this.selectedTab = i
  }
  civilities = [{ display: 'Mme', value: 'F' },
  { display: 'Monsieur', value: 'M' }
  ]
  editionTypes = [
    { editionType: 'ATTIJARI' },
    { editionType: 'BMCE' },
    { editionType: 'SGMB' },
    { editionType: 'BP' },
    { editionType: 'CDM' },
    { editionType: 'BCP' },
    { editionType: 'BMCI' },
    { editionType: 'CIH' },
  ]

  ngOnInit() {
    this.isEditPermission = this.tools.isAuthorized('Parametrage_GroupeVehicules', 'Mettre a jour')
    this.isAddPermission = this.tools.isAuthorized('Parametrage_GroupeVehicules', 'Ajouter')
    this.loadData()
    this.loadCities()
  }

  toModeList() {
    this.mode = "List"
    this.errorMsg = ""
    this.loadData()
    this.selectedBank = new Bank()
  }
  loadCities() {
    var route = this.router
    this.loading = true
    this.dataService.loadParam("Country", "Min").subscribe({
      next:
        res => {
          // console.log("res", res)
          this.loading = false;
          res.forEach(e => {
            e.id = e.id.toString()
          });
          this.cities = res // [{id:"",description:""},{...}]
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

  loadData() {
    this.loading = true;
    var route = this.router
    this.dataService.getBanks("").subscribe({
      next: (d: any) => {
        console.log("d", d)
        this.data = d;
        console.log("data", this.data)
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
      var url = "?id=" + ev
      this.errorMsg = ""
      this.modalLoading = true;
      this.mode = "Modifier"
      this.selectedTab = 0
      var route = this.router
      this.dataService.getBanks(url).subscribe({
        next: (d: any) => {
          this.selectedBank = d
          this.selectedBP.bankId = d.id
          this.loadBP(ev)
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
    if (this.mode == "Ajouter") this.ajouter()
    if (this.mode == "Modifier") this.modifier()
  }


  ajouter() {
    var route = this.router
    console.log(this.selectedBank)
    if (!this.selectedBank.name) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {

      this.dataService.addBank(this.selectedBank)
        .pipe(
          catchError(err => {
            console.log("res", err)
            this.modalLoading = false;
            this.errorMsg = "Erreur " + err
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }

            else if (err.status == 400) {
              console.log(err);
              this.errorMsg = "Un bon de Commande avec cet numéro exist deja. Veuillez utiliser un autre numéro."
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
            this.toModeList()
          }
        });
    }
  }

  modifier() {
    var route = this.router
    if (!this.selectedBank.name) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      this.dataService.updateBank(this.selectedBank)
        .pipe(
          catchError(err => {
            console.log("res", err)
            this.modalLoading = false;
            this.errorMsg = "Erreur " + err
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }

            else if (err.status == 400) {
              console.log(err);
              this.errorMsg = "Un bon de Commande avec cet numéro exist deja. Veuillez utiliser un autre numéro."
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
            this.loadData()
            this.toModeList()
          }
        })
    }
  }


  delete(ev) {
    if (confirm("Are you sure to delete " + ev)) {
      var route = this.router
      var url = "?id=" + ev
      console.log(url)
      this.dataService.delBank(url).subscribe({
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

  loadBP(bankId) {
    this.loading = true;
    var route = this.router
    var url = "?bankId=" + bankId
    this.dataService.getbankPers(url).subscribe({
      next: (d: any) => {
        console.log("d", d)
        this.dataBP = d;
        console.log("data", this.data)
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
  loadModifyBP(ev) {
    if (ev) {
      var url = "?id=" + ev
      this.errorMsg = ""
      this.modalLoading = true;
      var route = this.router
      this.modeBP = "Modifier"
      // this.selectedTab = 1
      this.dataService.getbankPers(url).subscribe({
        next: (d: any) => {
          this.selectedBP = d
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
  resetBP() {
    this.errorMsg = ""
    this.modeBP = "Ajouter"
    this.selectedBP = new BankPerson()
    this.selectedBP.bankId = this.selectedBank.id
  }
  submitBP() {
    if (this.modeBP == "Ajouter") this.ajouterBP()
    if (this.modeBP == "Modifier") this.modifierBP()
  }


  ajouterBP() {
    var route = this.router
    console.log(this.selectedBank)
    if (!this.selectedBP.tel || !this.selectedBP.lastName) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      this.dataService.addBankPers(this.selectedBP)
        .pipe(
          catchError(err => {
            console.log("res", err)
            this.modalLoading = false;
            this.errorMsg = "Erreur " + err
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }

            else if (err.status == 400) {
              console.log(err);
              this.errorMsg = "Un bon de Commande avec cet numéro exist deja. Veuillez utiliser un autre numéro."
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
            this.loadBP(this.selectedBank.id)
            this.resetBP()
          }
        });
    }
  }

  modifierBP() {
    var route = this.router
    if (!this.selectedBP.tel || !this.selectedBP.lastName) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      this.dataService.updateBankPers(this.selectedBP)
        .pipe(
          catchError(err => {
            console.log("res", err)
            this.modalLoading = false;
            this.errorMsg = "Erreur " + err
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }

            else if (err.status == 400) {
              console.log(err);
              this.errorMsg = "Un bon de Commande avec cet numéro exist deja. Veuillez utiliser un autre numéro."
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
            this.loadBP(this.selectedBank.id)
            this.resetBP()
          }
        })
    }
  }


  deleteBP(ev) {
    if (confirm("Are you sure to delete " + ev)) {
      var route = this.router
      var url = "?id=" + ev
      console.log(url)
      this.dataService.delBankPers(url).subscribe({
        next: (res) => {
          this.loadBP(this.selectedBank.id)
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

  newBank() {
    this.selectedBank = new Bank();
    this.errorMsg = ""
    this.mode = "Ajouter"
    this.selectedTab = 0
  }

  exporter(type) {
    // to modify
    type == 1 ? this.exportingPdfTool.exportPdf_GroupeVehicules(this.data, "Rapport de Bons de commande") :
      this.exportingExcelTool.Export_GroupVehicules(this.data, "Rapport de Bons de commande ")
  }
  //******* Items order form treatment ***************

  getSelectedEdition(selected) {
    this.selectedBank.editionType = selected;
  }

  getSelectedEditionType(selected) {
    this.selectedBank.editionType = selected;
  }
  getSelectedCivility(selected) {
    this.selectedBP.civility = selected
  }
  editionType

  // addOrderItem(){
  //   // if(!this.checkTopItem()) {
  //   //   alert("Veuillez remplir correctement la ligne de commande.")
  //   //     return
  //   // }
  //   this.selectedOrderForm.orderItems.unshift(new OrderItem());
  // }

  // deleteItem(i){
  //   if(this.selectedOrderForm.orderItems.length==1){
  //     this.selectedOrderForm.orderItems[i] = new OrderItem()
  //   }else{
  //     this.selectedOrderForm.orderItems = this.selectedOrderForm.orderItems.filter((e,j)=>{
  //       return j!=i
  //     })
  //   }

  // }
}
