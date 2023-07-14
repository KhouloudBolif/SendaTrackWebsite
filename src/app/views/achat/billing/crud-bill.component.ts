import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BillItem } from './../../../models/billItem';
import { Bill, BillItemList } from './../../../models/bill';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Router } from "@angular/router";
import { util } from "../../../tools/utils";
import { ExportingTool } from "../../../tools/exporting_tool";
import { ExportExcel } from "../../../tools/export-excel";
import { MyDateRangePickerComponent, MyDateRangePickerOptions } from '../../components/my-date-range-picker/my-daterangepicker.component';
import { Constant } from 'src/app/tools/constants';
import * as dateFns from 'date-fns';
import { AnyARecord } from 'dns';


@Component({
  selector: 'app-crud-bill',
  templateUrl: './crud-bill.component.html'
})
export class CrudBillComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  constructor(private dataService: DataService, private tools: util, public cts: Constant, private router: Router, private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel) { }
  myDateRangePickerOptions: MyDateRangePickerOptions;
  data = [];
  selectedDeliveriesNum = [];
  suppliers = [];
  products = [];
  supplierDeliveries = []
  idDeliveries = []
  mode = "List"
  isEditPermission = false
  isAddPermission = false
  errorMsg: string;
  modalLoading: boolean = false;
  selectedBill: Bill = new Bill()
  bill: Bill = new Bill()
  iconCollapse: string = 'icon-arrow-up';
  isCollapsed: boolean = false;
  disabled: boolean = false;
  supplier = [];
  status = [];
  statusses = [
    { statusName: 'Payée', status: '0' },
    { statusName: 'Non Payée', status: '1' }
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
  }

  ngAfterViewInit(): void {
    this.loadSuppliers();
    this.loadProducts();
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

  loadDeliveriesBySupplier(selected) {
    this.loading = true
    var route = this.router
    var url = "?Fourniseur=" + selected
    this.dataService.getDeliveryNotes(url).subscribe({
      next: (d: any) => {
        // console.log(d)
        this.supplierDeliveries = d;
        console.log("this.supplierDeliveries", this.supplierDeliveries);
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

  loadProducts() {
    this.loading = true;
    var route = this.router
    this.dataService.getArticleData("?minimum=true").subscribe({
      next: (d: any) => {
        this.products = d;
        console.log("products", this.products);

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
  }
    this.dataService.getBills(urlParams).subscribe({
      next: (d: any) => {
        if (d && d.length) {
          d.forEach(e => {
            e.billDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.billDate ?? 0));
            e.echeanceDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.echeanceDate ?? 0));
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
      this.dataService.getBills(url).subscribe({
        next: (res: any) => {
          this.idDeliveries = res.idDeliveries
          this.OnIdDeliveriesChange()
          this.selectedBill = res
          if (this.idDeliveries[0] == 0) this.idDeliveries.shift();
          else this.selectedBill.billItemsList.unshift(new BillItemList())
          if (this.selectedBill) {
            this.selectedBill.id_Contact = this.selectedBill.id_Contact.toString();
            this.loadDeliveriesBySupplier(this.selectedBill.id_Contact)
            this.selectedBill.billDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(this.selectedBill.billDate ?? 0));
            this.selectedBill.echeanceDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(this.selectedBill.echeanceDate ?? 0));
          }
          this.disabled=true
          console.log("idDeliveries", this.idDeliveries);
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
    let check = true
    this.bill = this.selectedBill
    if (this.selectedBill.billItemsList[0].billItems.length == 1 &&
      (!this.selectedBill.billItemsList[0].billItems[0].quantity ||
        this.selectedBill.billItemsList[0].billItems[0].quantity == 0 ||
        !this.selectedBill.billItemsList[0].billItems[0].Reference))
      this.bill.billItemsList.shift();
    else this.selectedBill.billItemsList[0].billItems.forEach((item) => {
      if (!item.quantity || item.quantity == 0 || !item.Reference) {
        this.errorMsg = "Veuillez remplir les éléments libres de facture correctement!"
        check = false
        return
      }
    });
    if (check) {
      document.getElementById("modeList").style.display = "none"
      this.selectedBill.billDate = Math.round((new Date(this.selectedBill.billDateString).getTime()) / 1000);
      this.selectedBill.echeanceDate = this.selectedBill.echeanceDateString ?  Math.round((new Date(this.selectedBill.echeanceDateString).getTime()) / 1000) : 0;
      if (this.mode == "Ajouter") this.ajouter()
      if (this.mode == "Modifier") this.modifier()
    }
  }

  ajouter() {
    var route = this.router
    if (!this.selectedBill.billDate || !this.selectedBill.supplierBillNum || !this.selectedBill.id_Contact) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {

      this.dataService.addBill(this.bill)
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
              this.errorMsg = "Attention ce numéro de facture fournisseur " + this.selectedBill.supplierBillNum + " existe déjà."
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
    if (!this.selectedBill.billDate || !this.selectedBill.supplierBillNum || !this.selectedBill.id_Contact) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      this.dataService.updateBill(this.bill)
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
              this.errorMsg = "Une facture avec cet numéro exist deja. Veuillez utiliser un autre numéro."
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

  delete(ev) {
    if (confirm("Are you sure to delete facture N " + ev[1])) {
      var route = this.router
      var url = "?id=" + ev[0]
      this.dataService.delBill(url).subscribe({
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

  newBill() {
    document.getElementById("modeList").style.display = "none"
    this.selectedBill = new Bill();
    this.errorMsg = ""
    this.mode = "Ajouter"
    this.disabled=false
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
    this.selectedBill.billItemsList.forEach(i => {
      i.isCollapsed = this.isCollapsed
    })
  }
  getIconCllapsed(c) {
    return c ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  reset() {
    this.mode = 'List'
    document.getElementById("modeList").style.display = "block"
    this.errorMsg = ""
    this.idDeliveries = []
    this.selectedDeliveriesNum = []
  }

  exporter(type) {
    // to modify
    type == 1 ? this.exportingPdfTool.exportPdf_GroupeVehicules(this.data, "Rapport des Factures") :
      this.exportingExcelTool.Export_GroupVehicules(this.data, "Rapport des Factures")
  }

  getSelectedSupplier(selected) {
    this.selectedBill.id_Contact = selected;
    this.loadDeliveriesBySupplier(selected);
    this.resetListItem();
  }
  getSelectedSupp(selected) {
    this.supplier = selected;
  }
  getSelectedStatus(selected) {
    this.status = selected;
  }

  productChange(v, i) {
    i.Reference = v;
    let product = this.getProductByRef(v);
    if (product) {
      console.log(product)
      i.designation = product.Designation;
      i.price = product.Prix_achat;
      i.TVA = product.Tva;
      this.calculate();
    }

  }

  getProductByRef(ref) {
    for (let index = 0; index < this.products.length; index++) {
      const element = this.products[index];
      if (element.Reference == ref) return element;
    }
    return null;
  }

  getDeliveryNumById(id) {
    for (let index = 0; index < this.supplierDeliveries.length; index++) {
      const element = this.supplierDeliveries[index];
      if (element.id == id) return element.deliveryNum
      console.log("deliveryByNum");

    }
    return null;
  }
  OnIdDeliveriesChange() {
    this.selectedDeliveriesNum = []
    this.idDeliveries.forEach(id => {
      var x = this.getDeliveryNumById(id)
      if (x) this.selectedDeliveriesNum.push(x)
    })
    console.log("this.selectedDeliveriesNum", this.selectedDeliveriesNum);

  }

  getSelectedDeliveries(selected) {
    this.idDeliveries = selected
    this.OnIdDeliveriesChange()
    if (selected.length != 0) {
      // selected.unshift("")
      var route = this.router
      // this.selectedBill.billItemsList.shift()
      var billItemsList = [this.selectedBill.billItemsList[0]] // make always an Empty Delivery in top
      var ids = []
      selected.forEach(id => {
        var x = this.selectedBill.billItemsList.filter((v) => { return (id.toString() == v.idDelivery.toString()) })
        if (x.length > 0) {
          billItemsList.push(x[0])
        } else {
          if (id != "")
            ids.push(id)
        }
      })

      this.selectedBill.billItemsList = billItemsList
      if (ids.length > 0) {
        this.dataService.getDeliveryNotes("?id_deliveries=" + JSON.stringify(ids)).subscribe({
          next: (d: any) => {
            console.log("getDeliveries", d)
            d.forEach(item => {
              this.selectedBill.billItemsList.push(item); this.calculate();
            })
            console.log("this.selectedBill ", this.selectedBill);
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
    let totalHT = 0.00
    let totalTva = 0.00
    let totalRemise = 0.00
    this.selectedBill.billItemsList.forEach(itemlist => {
      itemlist.billItems.forEach((item, i) => {
        item.sort = i
        // item.quantity = item.quantity?? (item.Qte - item.QteLivre)
        item.totalHT = item.price * item.quantity
        var tva = (item.TVA * item.totalHT / 100)
        item.totalTTC = item.totalHT + tva - item.price * item.quantity * item.Remise / 100
        totalRemise += item.price * item.quantity * item.Remise / 100
        totalHT += item.totalHT
        totalTva += tva
      })
    });
    this.selectedBill.totalHT = totalHT
    this.selectedBill.totalTVA = totalTva
    this.selectedBill.totalRemise = totalRemise
    this.selectedBill.totalTTC = totalHT + totalTva - totalRemise
  }

  addBillItem() {
    this.selectedBill.billItemsList[0].isCollapsed = false
    this.selectedBill.billItemsList[0].billItems.unshift(new BillItem());
    this.calculate();
  }

  deleteItemList(i) {
    if (i == 0)
      this.selectedBill.billItemsList[0].billItems = [new BillItem()]
    else {
      this.idDeliveries = this.idDeliveries.filter((e, k) => {
        return k != i - 1
      })
      // this.OnIdDeliveriesChange()
      this.selectedDeliveriesNum = this.selectedDeliveriesNum.filter((e, k) => {
        return k != i - 1
      })
      this.selectedBill.billItemsList = this.selectedBill.billItemsList.filter((e, k) => {
        return k != i
      })
    }
    this.calculate()
  }
  deleteItem(j) {     //only new deliveries can be removed
    this.selectedBill.billItemsList[0].billItems = (this.selectedBill.billItemsList[0].billItems.length == 1) ? [new BillItem()] : this.selectedBill.billItemsList[0].billItems.filter((e, k) => {
      return k != j
    })
  }
  EmptyOnTop() {   // make always Empty Delivery in top
    if (this.selectedBill.billItemsList[0].deliveryNum != '') {

    }
    else {

    }
  }
  resetListItem() {
    this.idDeliveries = []
    // this.OnIdDeliveriesChange()
    this.selectedDeliveriesNum = []
    this.selectedBill.billItemsList = [new BillItemList()]
    this.calculate()
  }
}


