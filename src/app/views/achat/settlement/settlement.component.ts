import { Settlement } from './../../../models/settlement';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Router } from "@angular/router";
import { util } from "../../../tools/utils";
import { ExportingTool } from "../../../tools/exporting_tool";
import { ExportExcel } from "../../../tools/export-excel";
import { MyDateRangePickerComponent, MyDateRangePickerOptions } from '../../components/my-date-range-picker/my-daterangepicker.component';
import { Constant } from 'src/app/tools/constants';
import * as dateFns from 'date-fns';
@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html'
})



export class SettlementComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  constructor(private dataService: DataService, private tools: util, public cts: Constant, private router: Router, private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel) { }
  myDateRangePickerOptions: MyDateRangePickerOptions;
  data = [];
  selectedBillsNum = [];
  suppliers = [];
  supplierBills = []
  idBills = []
  banks = []
  mode = "List"
  isEditPermission = false
  isAddPermission = false
  errorMsg: string;
  modalLoading: boolean = false;

  settlement: Settlement = new Settlement()
  iconCollapse: string = 'icon-arrow-up';
  isCollapsed: boolean = false;
  check: boolean = false
  supplier = [];
  status = [];
  bank = [];
  statusses = [
    { status: 'EMIS' },
    { status: 'DEBITE' }
  ]
  payementOptions = [
    { label: 'Acompte', value: 'acompte' },
    { label: 'Chèque', value: 'check' },
    { label: 'Effet', value: 'effet' },
    { label: 'Espèce', value: 'cash' },
    { label: 'TPE', value: 'tpe' },
    { label: 'Virement', value: 'transfer' }
  ]
  showErrorOrder = false;
  errorMessageOrder = "";

  @ViewChild('calendar', { static: true })
  public myDateRangePicker: MyDateRangePickerComponent;
  ngOnInit() {
    this.isEditPermission = this.tools.isAuthorized('Parametrage_GroupeVehicules', 'Mettre a jour')
    this.isAddPermission = this.tools.isAuthorized('Parametrage_GroupeVehicules', 'Ajouter')
    const from = dateFns.startOfMonth(new Date)
    const to = dateFns.endOfMonth(new Date)
    this.myDateRangePickerOptions = {
      theme: 'default',
      labels: ['Début', 'Fin'],
      menu: [
        { alias: 'td', text: 'Aujourd\'hui', operation: '0d' },
        { alias: 'tm', text: 'Ce mois-ci', operation: '0m' },
        { alias: 'lm', text: 'Le mois dernier', operation: '-1m' },
        { alias: 'tw', text: 'Cette semaine', operation: '0w' },
        { alias: 'lw', text: 'La semaine dernière', operation: '-1w' },
        { alias: 'ty', text: 'Cette année', operation: '0y' },
        { alias: 'ly', text: 'L\'année dernière', operation: '-1y' },
        { alias: 'ln', text: '90 derniers jours', operation: '-90d' },
        { alias: 'l2m', text: '2 derniers mois', operation: '-2m' },

        { alias: 'pmt', text: 'Mois passé à partir d\'aujourd\'hui', operation: '-1mt' },
        { alias: 'pwt', text: 'Semaine passée à partir d\'aujourd\'hui', operation: '-1wt' },
        { alias: 'pyt', text: 'Année passée à partir d\'aujourd\'hui', operation: '-1yt' },
        { alias: 'pdt', text: '90 derniers jours à partir d\'aujourd\'hui', operation: '-90dt' },
        { alias: 'pl2mt', text: '2 derniers mois à partir d\'aujourd\'hui', operation: '-2mt' }
      ],
      dateFormat: 'yyyy-MM-dd',
      outputFormat: 'dd-MM-yyyy',
      startOfWeek: 1,
      outputType: 'object',
      locale: 'fr-US',
      minDate: {
        day: null,
        month: null,
        year: null
      },
      maxDate: {
        day: null,
        month: null,
        year: null
      },
      date: {
        from: from,
        to: to
      }
    };
    this.loadSuppliers();
    this.loadBanks();
  }

  ngAfterViewInit(): void {
    this.loadData(true);
  }


  resetValidator() {
    this.showErrorOrder = false;
    this.errorMessageOrder = "";
  }
  clear(event) {
    var iconId = event.target.id
    switch (iconId) {
      case 'status':
        this.status = []
        break;
      case 'supplier':
        this.supplier = []
        break;
      case 'bank':
        this.bank = []
        break;
      default:
        this.status = []
        this.supplier = []
        break;
    }
  }

  loadSuppliers() {
    this.loading = true;
    var route = this.router
    this.dataService.getSuppliers("?Fourniseur=true").subscribe({
      next: (d: any) => {
        console.log("fournisseurs", d);
        d.forEach(e => {
          e.id = e.id.toString()
        });
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

  loadBillsBySupplier(selected) {
    this.loading = true
    var route = this.router
    var url = "?min=true&supp=" + selected
    this.dataService.getBills(url).subscribe({
      next: (d: any) => {
        // console.log(d)
        this.supplierBills = d;
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
  loadBanks() {
    this.loading = true
    var route = this.router
    this.dataService.getBanks("?min=true").subscribe({
      next: (d: any) => {
        d.forEach(e => {
          e.id = e.id.toString()
        });
        this.banks = d;
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


  loadData(all = false) {
    var route = this.router
    this.loading = true;
    var urlParams = "?from=" + this.myDateRangePicker.getDateFrom + "&to=" + this.myDateRangePicker.getDateTo
    if (!all) {
      urlParams += (this.supplier.length) ? "&supp=" + this.supplier : ""
      urlParams += (this.status.length) ? "&st=" + this.status : ""
      urlParams += (this.bank.length) ? "&st=" + this.bank : ""
    }
    this.dataService.getSettlements(urlParams).subscribe({
      next: (d: any) => {
        if (d && d.length) {
          d.forEach(e => {
            e.settlementDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.settlementDate ?? 0));
            e.dueDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.dueDate ?? 0));
          });
        }
        this.data = d;
        console.log("data", d);
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
  loadModify(id) {
    if (id) {
      document.getElementById("modeList").style.display = "none"
      var url = "?id=" + id
      this.modalLoading = true;
      this.mode = "Modifier"
      var route = this.router
      this.dataService.getSettlements(url).subscribe({
        next: (res: any) => {
          // this.idDeliveries = res.idDeliveries
          // this.OnIdBillsChange()
          this.settlement = res
          if (this.settlement) {
            this.settlement.id_Contact = this.settlement.id_Contact.toString();
            // this.loadDeliveriesBySupplier(this.selectedBill.id_Contact)
            this.settlement.settlementDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(this.settlement.settlementDate ?? 0));
            this.settlement.dueDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(this.settlement.dueDate ?? 0));
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
    if (!this.check) {
      this.settlement.settlementDate = Math.round((new Date(this.settlement.settlementDateString).getTime()) / 1000);
      this.settlement.dueDate = this.settlement.dueDateString ? Math.round((new Date(this.settlement.dueDateString).getTime()) / 1000) : 0;
      if (this.settlement.settlementMode == "cash" || this.settlement.settlementMode == "transfer")
        this.settlement.status = "DEBITE"
      if (this.mode == "Ajouter") this.ajouter()
      if (this.mode == "Modifier") this.modifier()
    }
  }

  ajouter() {
    var route = this.router
    if (!this.settlement.settlementDate || !this.settlement.id_Contact || this.settlement.settlementMode) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      this.dataService.addSettlement(this.settlement)
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
              this.errorMsg = "Attention ce numéro de réglement" + this.settlement.settlementNum + " existe déjà."
              // this.errorMsg = err.message;
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
            this.reset()
            this.loadData(true)
          }
        })
    }
  }

  modifier() {
    var route = this.router
    if (!this.settlement.settlementDate || !this.settlement.id_Contact || this.settlement.settlementMode) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      this.dataService.updateSettlement(this.settlement)
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
              this.errorMsg = "Un Réglement avec cet numéro exist deja. Veuillez utiliser un autre numéro."
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
            this.reset()
            this.loadData(true)

          }
        })
    }
  }

  delete(id) {
    if (confirm("Etes vous sure de supprimer le réglement N " + id)) {
      var route = this.router
      var url = "?id=" + id
      this.dataService.delSettlement(url).subscribe({
        next: (res) => {
          this.loadData(true)
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

  newSettlement() {
    document.getElementById("modeList").style.display = "none"
    this.settlement = new Settlement();
    this.errorMsg = ""
    this.mode = "Ajouter"
  }

  reset() {
    this.mode = 'List'
    document.getElementById("modeList").style.display = "block"
    this.errorMsg = ""
    this.idBills = []
    this.selectedBillsNum = []
  }

  exporter(type) {
    // to modify
    type == 1 ? this.exportingPdfTool.exportPdf_GroupeVehicules(this.data, "Rapport des Réglements") :
      this.exportingExcelTool.Export_GroupVehicules(this.data, "Rapport des Réglements")
  }

  getSelectedSupplier(selected) {
    this.settlement.id_Contact = selected;
    this.loadBillsBySupplier(selected);
    // this.resetListItem();
  }
  getSelectedSupp(selected) {
    this.supplier = selected;
  }
  getSelectedStatus(selected) {
    this.status = selected;
  }
  getSelectedMode(selected) {
    this.settlement.settlementMode = selected
  }
  getSelectedBank(selected) {
    this.settlement.bankId = selected
  }


  getBillNumById(id) {
    for (let index = 0; index < this.supplierBills.length; index++) {
      const element = this.supplierBills[index];
      if (element.id == id) return element.billNum
    }
    return null;
  }
  OnIdBillsChange() {
    this.selectedBillsNum = []
    this.idBills.forEach(id => {
      var x = this.getBillNumById(id)
      if (x) this.selectedBillsNum.push(x)
    })
    console.log("this.selectedBillsNum", this.selectedBillsNum);
  }

  getSelectedBills(selected) {
    this.idBills = selected
    this.OnIdBillsChange()
    if (selected.length != 0) {
      // selected.unshift("")
      var route = this.router
      // this.selectedBill.billItemsList.shift()
      var settlementItems = []
      var ids = []
      selected.forEach(id => {
        var x = this.settlement.settlementItems.filter((v) => { return (id.toString() == v.billId) })
        if (x.length > 0) {
          settlementItems.push(x[0])
        } else {
          if (id != "")
            ids.push(id)
        }
      })

      this.settlement.settlementItems = settlementItems
      if (ids.length > 0) {
        this.dataService.getBills("?idBills=" + JSON.stringify(ids)).subscribe({
          next: (d: any) => {
            console.log("getBills", d)
            d.forEach(item => {
              this.settlement.settlementItems.push(item); this.calculate();
            })
            console.log("this.settlement ", this.settlement);
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

    }
  }
  calculate() {
    this.check = false
    let amountToPay = 0.00
    this.settlement.settlementItems.forEach(i => {
      this.check ||= i.alert
      amountToPay += i.amountToPay
    });
    this.settlement.amountToPay = amountToPay
  }


  resetItems() {
    this.idBills = []
    this.selectedBillsNum = []
    this.settlement.settlementItems = []
    this.calculate()
  }
}


