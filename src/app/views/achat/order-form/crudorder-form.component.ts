import {Component, ViewChild} from '@angular/core';
import { MyDateRangePickerComponent, MyDateRangePickerOptions } from '../../components/my-date-range-picker/my-daterangepicker.component';
import {DataService} from "../../../services/data.service";
import {Router} from "@angular/router";
import {util} from "../../../tools/utils";
import {ExportingTool} from "../../../tools/exporting_tool";
import {ExportExcel} from "../../../tools/export-excel";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {OrderItem} from "../../../models/orderItem";
import { OrderForm } from 'src/app/models/orderForm';
import * as dateFns from 'date-fns';
import { GestionContactComponent } from '../../gestionContact/gestionContact.component';




@Component({
  selector: 'app-crudorder-form',
  templateUrl: './crudorder-form.component.html'
})
export class CrudorderFormComponent{
  loading: boolean = false;

  constructor(private dataService: DataService, private router: Router,public tools: util,private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel) { }
  myDateRangePickerOptions: MyDateRangePickerOptions;
  data = [];
  products = [];
  suppliers = [];
  stores = [];
  status=[
    {status: 'ENCOURS'},
    {status: 'LIVREPAR'},
    {status: 'LIVRETOT'}
  ]
  supplier=[]
  selectedStatuses=[]
  store=[]
  vehicules=[]
  mode = "List"
  isEditPermission = false
  isAddPermission = false
  errorMsg: string;
  modalLoading: boolean = false;
  selectedOrderForm: OrderForm = new OrderForm();
  errorMessageOrder:any
  showErrorOrder:any

  disableUpdate: boolean = false;

  @ViewChild(GestionContactComponent, { static: true })
  gestionContactComponent: GestionContactComponent

  @ViewChild('calendar', { static: true })
  private myDateRangePicker: MyDateRangePickerComponent;

  ngOnInit() {
    this.isEditPermission = this.tools.isAuthorized('Parametrage_GroupeVehicules','Mettre a jour')
    this.isAddPermission = this.tools.isAuthorized('Parametrage_GroupeVehicules','Ajouter')
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
    this.loadVehicules();
  }
  ngAfterViewInit(): void {
    this.loadData(true);
    }

  getIconStyle(){
    return (this.selectedOrderForm.status!='ENCOURS') ? {'opacity': '0.5', 'pointer-events': 'none'} : {'cursor': 'pointer'};
  }
 toModeList(){
  document.getElementById("modeList").style.display = "block"
  this.mode = "List"
  this.errorMsg = ""
 }
 clear(event){
  var iconId = event.target.id
  switch (iconId) {
    case 'status':
      this.selectedStatuses = []
      break;
    case 'supplier':
      this.supplier = []
      break;
    case 'store':
      this.store = []
    break;
    default:
      this.selectedStatuses = []
      this.supplier = []
      this.store = []
      console.log(iconId);
      break;
  }
 }

 supplierModal(){
  this.gestionContactComponent.showAddModal()
}

  loadData(all=false) {
    this.loading = true;
    var route = this.router
    var urlParams = "?from=" + this.myDateRangePicker.getDateFrom + "&to=" + this.myDateRangePicker.getDateTo
    if (!all) {
      // urlParams += "?"
      urlParams +=  (this.selectedStatuses.length && this.selectedStatuses.length!=3)? "&stat=" + JSON.stringify(this.selectedStatuses) : ""
      urlParams +=  (this.supplier.length)? "&supp=" + this.supplier : ""
      urlParams +=  (this.store.length)? "&store=" + this.store : ""
      // urlParams +=  "from=" + this.myDateRangePicker.getDateFrom + "&to=" + this.myDateRangePicker.getDateTo
    }
    console.log("urlParams",urlParams);

    this.dataService.getOrdersForm(urlParams).subscribe({
      next: (d: any) => {
        console.log(d)
        if (d && d.length) {
          d.forEach(e => {
            e.orderDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.orderDate ?? 0));
            e.deliveryDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.deliveryDate ?? 0));
          });

        }

        console.log("d",d)
        this.data = d;
        console.log("data",this.data)
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
    this.disableUpdate = (ev[1]=="ENCOURS")? false:true
    var url = "?id=" + ev[0]
      this.errorMsg = ""
      this.modalLoading = true;
      document.getElementById("modeList").style.display = "none"
      this.mode = "Modifier"
      var route = this.router
      this.dataService.getOrdersForm(url).subscribe({
        next: (d: any) => {
          this.selectedOrderForm=d.order
          if (this.selectedOrderForm) {
            this.selectedOrderForm.orderDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(this.selectedOrderForm.orderDate ?? 0));
            this.selectedOrderForm.deliveryDateString = this.tools.formatDateForInput(this.tools.timeStampToDate(this.selectedOrderForm.deliveryDate ?? 0));
            this.selectedOrderForm.depot=this.selectedOrderForm.depot.toString();
            this.selectedOrderForm.id_Contact =this.selectedOrderForm.id_Contact.toString();
          }
          this.selectedOrderForm.orderItems=d.orderItems
          if(this.selectedOrderForm.orderItems){
              this.calculate();
          }
          console.log("this.selectedOrderForm");
          console.log(this.selectedOrderForm);
          this.modalLoading = false;
        }, error(err) {
          this.modalLoading = false;
          if (err.status == 401) {
            route.navigate(['login'], { queryParams: { returnUrl: route.url } });
          }
        }
      });
  }

  submit() {
    this.selectedOrderForm.orderDate = Math.round((new Date(this.selectedOrderForm.orderDateString).getTime()) / 1000);
    this.selectedOrderForm.deliveryDate = Math.round((new Date(this.selectedOrderForm.deliveryDateString).getTime()) / 1000);
    if (this.mode == "Ajouter") this.ajouter()
    if (this.mode == "Modifier") this.modifier()
  }


  ajouter() {
    var route = this.router
    console.log(this.selectedOrderForm)
    if (!this.selectedOrderForm.orderDate || !this.selectedOrderForm.deliveryDate
        || !this.selectedOrderForm.depot || !this.selectedOrderForm.id_Contact
      ) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {

      this.dataService.addOrderForm(this.selectedOrderForm)
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
            this.loadData(true)
            this.toModeList()
          }
        });
    }
  }

  modifier() {
    var route = this.router
    if (!this.selectedOrderForm.orderDate || !this.selectedOrderForm.deliveryDate
      || !this.selectedOrderForm.depot || !this.selectedOrderForm.id_Contact
      ) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      this.dataService.updateOrderForm(this.selectedOrderForm)
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
            // console.log("edit order form")
            this.loadData(true)
            this.toModeList()
          }
        })
    }
  }


  delete(ev) {
    if(ev[2]!="ENCOURS"){
      confirm("Vous nous pouvez pas supprimer un bon de commande " +ev[2]+ "!");
      return
    }
    if (confirm("Etes vous sure de supprimer le bon de commande " + ev[1] )) {
      var route = this.router
      var url = "?id=" + ev[0]
      console.log(url)
      this.dataService.delOrderForm(url).subscribe({
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

  newOrderForm() {
    document.getElementById("modeList").style.display = "none"
    this.selectedOrderForm = new OrderForm();
    this.errorMsg = ""
    this.mode = "Ajouter"
  }

  loadStores() {
    var route = this.router
    this.loading = true
    this.dataService.loadParam("Store","Min").subscribe({
      next:
        res => {
          console.log("res depot", res)
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
        d.forEach(e => {
          e.id = e.id.toString()
        });
        console.log("suppliers",d)
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
  loadProducts() {
    this.loading = true;
    var route = this.router
    this.dataService.getArticleData("?minimum=true").subscribe({
      next: (d: any) => {
        // d.forEach(e => {
        //   e.id = e.id.toString()
        // });
        console.log(d);
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

  loadVehicules() {
    this.loading = true;
    var route = this.router
    this.dataService.getVehicule("").subscribe({
      next: (d: any) => {
        this.vehicules = d;
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

  exporter(type) {
    // to modify
    type == 1 ? this.exportingPdfTool.exportPdf_GroupeVehicules(this.data, "Rapport de Bons de commande" ) :
      this.exportingExcelTool.Export_GroupVehicules(this.data, "Rapport de Bons de commande ")
  }
  //******* Items order form treatment ***************

  getSelectedDepot(selected) {
    this.selectedOrderForm.depot = selected;
  }
  getSelectedSupp(selected) {
    this.supplier= selected;
  }
  getSelectedSupplier(selected) {
    this.selectedOrderForm.id_Contact = selected;
  }
  getSelectedStore(selected: any) {
    this.store = selected;
  }
  getSelectedStatus(selected: any) {
    this.selectedStatuses = selected;
  }
  getSelectedVehicule(v,i) {
   i.IdVehicule=v;
  }
  productChange(v,i){
    i.Reference = v;
    let product = this.getProductByRef(v);
    if(product){
      console.log(product)
      i.designation = product.Designation;
      i.price=product.Prix_achat;
      i.TVA=product.Tva;
      this.calculate();
    }

  }
  getProductByRef(ref){
    for (let index = 0; index < this.products.length; index++) {
      const element = this.products[index];
      if(element.Reference==ref) return element;
  }
  return null;
  }

  calculate(){
      let totalHT=0.00
      let totalTva=0.00
      let totalRemise=0.00
      this.selectedOrderForm.orderItems.forEach((item,i)=>{
        item.sort=i
        item.totalHT = item.price * item.Qte
        var tva = (item.TVA*item.totalHT/100)
        item.totalTTC = item.totalHT + tva - item.price * item.Qte *item.Remise/100
        totalRemise += item.price * item.Qte *item.Remise/100
        totalHT+=item.totalHT
        totalTva+=tva
      })
      this.selectedOrderForm.totalHT = totalHT
      this.selectedOrderForm.totalTVA= totalTva
      this.selectedOrderForm.totalRemise = totalRemise
      this.selectedOrderForm.totalTTC = totalHT + totalTva -totalRemise
  }
  // checkItems(){
  //   let check = true;
  //   if(this.selectedOrderForm.orderItems && this.selectedOrderForm.orderItems.length){
  //     this.selectedOrderForm.orderItems.forEach(item=>{
  //       if (!item.Reference || !item.designation || !item.Qte || (item.Qte==0)){
  //         check=false;
  //         return;
  //       }
  //     });
  //   }
  //   return true;
  // }
  // checkTopItem(){
  //   if(this.selectedOrderForm.orderItems && this.selectedOrderForm.orderItems.length){
  //     let item=this.selectedOrderForm.orderItems[0];
  //     if (!item.Reference || !item.designation || (item.totalTTC==0)) return false;
  //   }
  //   return true;
  // }


  addOrderItem(){
    // if(!this.checkTopItem()) {
    //   alert("Veuillez remplir correctement la ligne de commande.")
    //     return
    // }
    this.selectedOrderForm.orderItems.unshift(new OrderItem());
  }

  deleteItem(i){
    if(this.selectedOrderForm.orderItems.length==1){
      this.selectedOrderForm.orderItems[i] = new OrderItem()
    }else{
      this.selectedOrderForm.orderItems = this.selectedOrderForm.orderItems.filter((e,j)=>{
        return j!=i
      })
    }

  }
}


