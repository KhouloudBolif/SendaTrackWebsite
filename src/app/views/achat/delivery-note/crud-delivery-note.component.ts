import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DeliveryItem } from './../../../models/deliveryItem';
import { DeliveryNote, DeliveryItems } from './../../../models/deliveryNote';
import { Component, ViewChild } from '@angular/core';
import { MyDateRangePickerComponent, MyDateRangePickerOptions } from '../../components/my-date-range-picker/my-daterangepicker.component';
import { DataService } from "../../../services/data.service";
import { Router } from "@angular/router";
import { util } from "../../../tools/utils";
import { ExportingTool } from "../../../tools/exporting_tool";
import { ExportExcel } from "../../../tools/export-excel";
import * as dateFns from 'date-fns';



@Component({
  selector: 'app-crud-delivery-note',
  templateUrl: './crud-delivery-note.component.html'
})
export class CrudDeliveryNoteComponent {

  loading: boolean = false;
  constructor(private dataService: DataService, private router: Router, public tools: util, private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel) { }
  myDateRangePickerOptions: MyDateRangePickerOptions;
  data = [];
  selectedOrdersNum = [];
  suppliers = [];
  stores = [];
  products = [];
  supplierOrders = []
  idOrders = []
  mode = "List"
  isDisabled: boolean = false
  isEditPermission = false
  isAddPermission = false
  errorMsg: string;
  modalLoading: boolean = false;
  selectedDeliveryNote: DeliveryNote = new DeliveryNote();
  iconCollapse: string = 'icon-arrow-up';
  isCollapsed: boolean = false;
  isAllCollapsed: boolean = false;
  check: boolean = false;
  status = [
    { billed: 'Oui', invoiced: '0' },
    { billed: 'Non', invoiced: '1' }
  ]
  billed = []
  supplier = []
  store = []

  showErrorOrder = false;
  errorMessageOrder = "";


  resetValidator() {
    this.showErrorOrder = false;
    this.errorMessageOrder = "";
  }

  @ViewChild('calendar', { static: true })
  private myDateRangePicker: MyDateRangePickerComponent;
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
    this.loadStores();
    this.loadSuppliers();
    this.loadProducts();
  }
  ngAfterViewInit(): void {
    this.loadData(true);
    // throw new Error('Method not implemented.');
  }

  toModeList() {
    this.mode = 'List'
    document.getElementById("modeList").style.display = "block"
    this.reset()
  }
  clear(event) {
    var iconId = event.target.id
    switch (iconId) {
      case 'billed':
        this.billed = []
        break;
      case 'supplier':
        this.supplier = []
        break;
      case 'store':
        this.store = []
        break;
      default:
        this.billed = []
        this.supplier = []
        this.store = []
        break;
    }
  }
  loadStores() {
    var route = this.router
    this.loading = true
    this.dataService.loadParam("Store", "Min").subscribe({
      next:
        res => {
          this.loading = false;
          res.forEach(e => {
            e.id = e.id.toString()
          });
          this.stores = res // [{id:"",description:""},{...}]
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

  loadOrdersBySupplier(selected) {
    this.loading = true
    var route = this.router

    var url = "?Fourniseur=" + selected;
    if (this.mode == "Ajouter")
      url += '&mode=' + this.mode
    this.dataService.getOrdersForm(url).subscribe({
      next: (d: any) => {
        // console.log(d)
        this.supplierOrders = d;
        console.log("this.supplierOrders", this.supplierOrders);
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
    this.loading = true;
    var route = this.router
    var urlParams = "?from=" + this.myDateRangePicker.getDateFrom + "&to=" + this.myDateRangePicker.getDateTo
    if (!all) {
      urlParams += this.billed.length ? "&bill=" + this.billed : ""
      urlParams += this.supplier.length ? "&supp=" + this.supplier : ""
      urlParams += this.store.length ? "&store=" + this.store : ""
      // urlParams += "from=" + 158436000 + "&to=" + 1784369000
    }
    console.log("urlParams", urlParams);
    this.dataService.getDeliveryNotes(urlParams).subscribe({
      next: (d: any) => {
        if (d && d.length) {
          d.forEach(e => {
            e.deliveryDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.deliveryDate ?? 0));
            if (!e.order_numbers) e.order_numbers = "Libre"
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
    // this.reset()
    if (id) {
      document.getElementById("modeList").style.display = "none"
      var url = "?id=" + id
      this.modalLoading = true;
      this.mode = "Modifier"
      var route = this.router
      this.dataService.getDeliveryNotes(url).subscribe({
        next: (res: any) => {
          this.selectedDeliveryNote = res
          if (this.selectedDeliveryNote) {
            this.loadOrdersBySupplier(this.selectedDeliveryNote.id_Contact)
            this.idOrders = res.id_Orders
            this.OnIdOrdersChange()
            this.selectedDeliveryNote.deliveryDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(this.selectedDeliveryNote.deliveryDate ?? 0));
            this.selectedDeliveryNote.depot = this.selectedDeliveryNote.depot.toString();
            this.selectedDeliveryNote.id_Contact = this.selectedDeliveryNote.id_Contact.toString();
            this.isDisabled = this.selectedDeliveryNote.deliveryItemsList[0].orderNum == 'Libre' ? false : true
          }
          console.log("loadModify", res);
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
    // this.selectedDeliveryNote.deliveryItemsList.forEach(itemlist => {
    //   itemlist.deliveryItems.forEach((item) => {
    //     if (!item.quantity || item.quantity == 0) {
    //       this.errorMsg = "Veuillez remplir les quantités des BC correctement. Vous ne pourriez pas ajouter un bon de commande vide!"
    //       check = false
    //       return
    //     }
    //   })
    // });
    this.selectedDeliveryNote.deliveryDate = Math.round((new Date(this.selectedDeliveryNote.deliveryDateString).getTime()) / 1000);
    if (this.check) this.errorMsg = "Veuillez remplir les bon de comandes correctement!"
    else {
      if (this.mode == "Ajouter") this.ajouter()
      if (this.mode == "Modifier") this.modifier()
    }
  }

  ajouter() {
    var route = this.router
    console.log(this.selectedDeliveryNote)
    if (!this.selectedDeliveryNote.deliveryDate || !this.selectedDeliveryNote.supplierDeliveryNum || !this.selectedDeliveryNote.id_Contact || !this.selectedDeliveryNote.depot) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {

      this.dataService.addDeliveryNote(this.selectedDeliveryNote)
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
              this.errorMsg = "Un bon de Livraison avec cet numéro exist deja. Veuillez utiliser un autre numéro."
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
            this.loadData(true)
            this.toModeList()
          }
        })
    }
  }

  modifier() {
    var route = this.router
    console.log(this.selectedDeliveryNote)
    if (!this.selectedDeliveryNote.deliveryDate || !this.selectedDeliveryNote.supplierDeliveryNum || !this.selectedDeliveryNote.id_Contact || !this.selectedDeliveryNote.depot) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      this.dataService.updateDeliveryNote(this.selectedDeliveryNote)
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
              this.errorMsg = "Un bon de Livraison avec cet numéro exist deja. Veuillez utiliser un autre numéro."
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
            this.loadData(true)
            this.toModeList()
          }
        })
    }
  }


  delete(ev) {
    if (confirm("Are you sure to delete " + ev[1])) {
      var route = this.router
      var url = "?id=" + ev[0]
      this.dataService.delDeliveryNote(url).subscribe({
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

  newDeliveryNote() {
    document.getElementById("modeList").style.display = "none"
    this.selectedDeliveryNote = new DeliveryNote();
    this.mode = "Ajouter"
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
    this.selectedDeliveryNote.deliveryItemsList.forEach(i => {
      i.isCollapsed = this.isCollapsed
    })
  }


  getIconCllapsed(c) {
    return c ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  reset() {
    this.errorMsg = ""
    this.idOrders = []
    this.selectedOrdersNum = []
    // this.isDisabled =false
  }

  exporter(type) {
    // to modify
    type == 1 ? this.exportingPdfTool.exportPdf_GroupeVehicules(this.data, "Rapport de Bons de commande") :
      this.exportingExcelTool.Export_GroupVehicules(this.data, "Rapport de Bons de commande ")
  }
  getSelectedStatus(selected: any) {
    this.billed = selected;
  }
  getSelectedSupp(selected: any) {
    this.supplier = selected;
  }
  getSelectedStore(selected: any) {
    this.store = selected;
  }
  getSelectedDepot(selected: any) {
    this.selectedDeliveryNote.depot = selected;
  }

  getSelectedSupplier(selected) {
    this.selectedDeliveryNote.id_Contact = selected;
    this.reset()
    this.loadOrdersBySupplier(selected);
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

  getOrderNumById(id) {
    for (let index = 0; index < this.supplierOrders.length; index++) {
      const element = this.supplierOrders[index];
      if (element.id == id) {
        return element.orderNum
      }
    }
    return null;
  }
  OnIdOrdersChange() {
    this.selectedOrdersNum = []
    this.idOrders.forEach(id => {
      var x = this.getOrderNumById(id)
      console.log("orderNum", x);

      if (x) this.selectedOrdersNum.push(x)
    })
    console.log("idOrders", this.idOrders);

    console.log("this.selectedOrdersNum", this.selectedOrdersNum)
  }

  getSelectedOrders(selected) {

    this.idOrders = selected
    this.OnIdOrdersChange()
    if (selected.length == 0) {
      this.isDisabled = false
      this.selectedDeliveryNote.deliveryItemsList = [new DeliveryItems()]
    }
    else {
      this.isDisabled = true
      // selected.unshift("")
      var route = this.router
      this.selectedDeliveryNote.deliveryItemsList.shift()
      var deliveryItemsList = []
      var ids = []
      selected.forEach(id => {
        var x = this.selectedDeliveryNote.deliveryItemsList.filter((v) => { return (id.toString() == v.id_order.toString()) })
        if (x.length > 0) {
          deliveryItemsList.push(x[0])
        } else {
          if (id != "")
            ids.push(id)
        }
      })
      this.selectedDeliveryNote.deliveryItemsList = deliveryItemsList
      let urlParam = '?mode=' + this.mode + "&id_orders=" + JSON.stringify(ids)
      /* if(this.mode=='Modifier') urlParam +=
      if(this.mode=='Ajouter') urlParam +='?mode=' +this.mode */
      this.dataService.getOrdersForm(urlParam).subscribe({
        next: (d: any) => {
          console.log("getOrdersForm", d)
          d.forEach(item => {
            this.selectedDeliveryNote.deliveryItemsList.push(item); this.calculate();
          })
          console.log("this.selectedDeliveryNote ", this.selectedDeliveryNote);
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
  calculate() {
    let totalHT = 0.00
    let totalTva = 0.00
    let totalRemise = 0.00
    this.check = false
    this.selectedDeliveryNote.deliveryItemsList.forEach(itemlist => {
      itemlist.deliveryItems.forEach((item, i) => {
        item.sort = i
        item.alert = false
        // if(!item.quantity) item.quantity = (item.Qte - item.QteLivre)
        if (item.quantity < 0 || item.quantity=='' || item.quantity==null) item.alert = true
        else if (item.quantity == 0 && (this.mode == 'Ajouter')) item.alert = true
        if (item.Qte && item.quantity > item.Qte -item.QteLivre) item.alert = true;
        this.check = this.check || item.alert
        // if(item.Qte) item.alert=(item.quantity >item.Qte)? true:item.alert
        // if(item.quantity >item.Qte || item.quantity<=0) item.alert=true
        item.totalHT = item.price * item.quantity
        var tva = (item.TVA * item.totalHT / 100)
        item.totalTTC = item.totalHT + tva - item.price * item.quantity * item.Remise / 100
        totalRemise += item.price * item.Qte * item.Remise / 100
        totalHT += item.totalHT
        totalTva += tva

      })
    });
    this.selectedDeliveryNote.totalHT = totalHT
    this.selectedDeliveryNote.totalTVA = totalTva
    this.selectedDeliveryNote.totalRemise = totalRemise
    this.selectedDeliveryNote.totalTTC = totalHT + totalTva - totalRemise
  }



  addDeliveryItem() {
    this.selectedDeliveryNote.deliveryItemsList[0].isCollapsed = false
    this.selectedDeliveryNote.deliveryItemsList[0].deliveryItems.unshift(new DeliveryItem());
    this.calculate();
  }

  deleteItem(i, j) {
    if (this.selectedDeliveryNote.deliveryItemsList[i].deliveryItems.length == 1) {
      if (this.selectedDeliveryNote.deliveryItemsList[i].orderNum == 'Libre') // case BL Libre
        this.selectedDeliveryNote.deliveryItemsList[i].deliveryItems = [new DeliveryItem()]
      else {
        if (this.selectedDeliveryNote.deliveryItemsList.length == 1) { //removing last BL non Libre
          this.isDisabled = false
          this.reset()
          this.selectedDeliveryNote.deliveryItemsList = [new DeliveryItems()]
        }
        else {
          this.selectedDeliveryNote.deliveryItemsList = this.selectedDeliveryNote.deliveryItemsList.filter((elt, l) => {
            return l != i
          })
          // console.log("this.idOrders", this.idOrders)
          this.idOrders = this.idOrders.filter((elt, l) => {
            return l != i
          })
          this.OnIdOrdersChange()
        }
      }
    } else {
      this.selectedDeliveryNote.deliveryItemsList[i].deliveryItems = this.selectedDeliveryNote.deliveryItemsList[i].deliveryItems.filter((e, k) => {
        return k != j
      })
    }
    //console.log("this.idOrders", this.idOrders)
  }
}


