import { Component, ElementRef, ViewChild ,OnInit,NgZone} from '@angular/core';
import { MyDateRangePickerComponent, MyDateRangePickerOptions } from '../../components/my-date-range-picker/my-daterangepicker.component';
import { DataService } from '../../../services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { util } from '../../../tools/utils';
import { Router } from '@angular/router';
import { ExportingTool } from 'src/app/tools/exporting_tool';
import { Demandeinterventions} from 'src/app/models/Demandeinterventions';
import { Constant } from 'src/app/tools/constants';
import { ExportExcel } from 'src/app/tools/export-excel';
import { FormGroup,FormBuilder } from '@angular/forms';
@Component({
  templateUrl: 'demandeinterventions.component.html',
})
export class DemandeinterventionsComponent{
interventionForm:FormGroup;
  loading: boolean = false;
  modalLoading: boolean = false;
  mode = "Ajouter";
  currentKM = 0;
  selectedDemandeinterventions : Demandeinterventions= new Demandeinterventions();
  errorMsg: string;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  constructor(private dataService: DataService, private tools: util, public cts: Constant, private router: Router,private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel,public formBiulder:FormBuilder, private ngZone:NgZone) {

    this.interventionForm=this.formBiulder.group({
            matricule:[''],
            statut:['Encours'],
            DateIntervention:[''],
            demandeur:[''],
            description:[''],
            typeintervention:[''],
            typepanne:[''],
            km:[''],

    })
  }
  myDateRangePickerOptions: MyDateRangePickerOptions;
  isCollapsed: boolean = false;
  isCollapsedData: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  data = [];
  isEditPermission = false
  isAddPermission = false
  public isnotNum: boolean = false

  employees = [];

  description=[];
  typeinter= [];
  typepanne = [ ];
  matricule = [];
  statut = [
  { value: 'Reparer', label: 'Reparer' },
  { value: 'Encours', label: 'Encours' },
  { value: 'valider', label: 'valider' },
  { value: 'Rejeter', label: 'Rejeter' },
  ];

  public devices: any = [];
  selectedDevices:any;
  public statuies: any = [];
  selectedstatuties = [];
  selectedstatut: string[] = [];


  selectedDevicesModal = [];
  selectedDeviceModal = this.selectedDevicesModal;


  displayedColumns: any = ["id",
  "matricule",
  "statut",
  "date" ,
  " demandeur" ,
  "description",
  "type intervention" ,
  "type panne",
  "km",
  "NumMat",
  "Diagn",
  "login" ,
    "DateCreation"]


  public operations: any = [];
  selectedOperations = [];
  selectedOperation = this.selectedOperations;

  texteComplet: string = "";
  texteCompletAffiche: boolean = false;

  afficherTexteComplet(description: string) {
    this.texteComplet = description;
    this.texteCompletAffiche = true;
  }

  cacherTexteComplet() {
    this.texteComplet = "";
    this.texteCompletAffiche = false;
  }

  getSelectedOperation(selected) {
    // console.log(selected);
    this.selectedDemandeinterventions.operation = selected;
  }

  @ViewChild('calendar', { static: true })
  private myDateRangePicker: MyDateRangePickerComponent;


  ngOnInit() {


    this.loadData(true);
    this.isEditPermission = this.tools.isAuthorized('Maintenance_PlanEntretien','Mettre a jour')
    this.isAddPermission = this.tools.isAuthorized('Maintenance_PlanEntretien','Ajouter')
    const today = new Date();
    const tomorrow = new Date();
    this.loadEmploye();

    this.loadtypeinter();
    this.loadtypepanne();
    //this.loadmatricule();

    tomorrow.setDate(today.getDate() + 1);
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
        from: today,
        to: tomorrow
      }
    };

    this.getDev();
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-up' : 'icon-arrow-down';

  }


  getSelectedDevices(selected) {
     console.log(selected);
    this.selectedDevices = selected;
  }
  getSelectedDevice(selected) {
    console.log(selected);
   this.selectedDevices = selected;
 }



  getSelectedDevicesModal(selected) {
    // console.log(selected);
    this.selectedDemandeinterventions. deviceID = selected;
    this.currentKM = this.getVehiculeKMById(selected)

  }


loadData(first = false) {
  var route = this.router;
  this.loading = true;
   var urlParams = "";
   if(!first){


   var statut = this.selectedstatut.length === 0 ? "" : "?statut=" + this.selectedstatut +"&";
   var DeviceID = this.selectedDevices.length === 0 ? "" : "DeviceID=" + this.selectedDevices +"&";
   let from =Math.round(this.myDateRangePicker.dateFrom.getTime() / 1000) + this.convertToTimestamp(this.myDateRangePicker.time_1)
   console.log("from",from);

   let to =Math.round(this.myDateRangePicker.dateTo.getTime() / 1000) + this.convertToTimestamp(this.myDateRangePicker.time_2)

   urlParams = statut + DeviceID  + 'from=' + from + '&to=' + to;



  }
  this.dataService.getintervention(urlParams ).subscribe({
    next: (d: any) => {
      this.loading = false;
      this.data = d;
      console.log("data", d);
      this.data.forEach((e) => {
        e.dateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.DateIntervention ?? 0));

      });
    },
    error: (err) => {
      console.log(err);
      this.loading = false;
      if (err.status == 401) {
        route.navigate(['login'], { queryParams: { returnUrl: route.url } });
      }
    }
  });
}


getDev() {
  var route = this.router
  this.dataService.getVehicule("?extra=true").subscribe({
    next: (res) => {
      this.devices = res;
    }, error(err) {
      if (err.status == 401) {
        route.navigate(['login'], { queryParams: { returnUrl: route.url } });
      }
    }
  })
}
  getVehiculeKMById(id) {
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].dID == id) return this.devices[i].km
    }
    return 0
  }
  modalAjouter() {
    this.mode = "Ajouter"
    this.selectedDemandeinterventions = new Demandeinterventions();
    this.selectedDevicesModal = []
    this.selectedOperations = []
    this.currentKM = null
    this.primaryModal.show()
  }


  loadModify(ev) {
    // console.log(ev);
     this.mode = "Modifier"
     this.errorMsg = ""

    if (ev) {

      var url = "?id="+ev;
      console.log("url")
      this.modalLoading = true;
      this.primaryModal.show()
      var route = this.router

      this.dataService.getintervention(url).subscribe({
        next: (d: any) => {

         // console.log(d);
          if (d && d.length) {

            console.log(d);
            console.log(d[0]);
            this.selectedDemandeinterventions = d[0];
            this.selectedDemandeinterventions.dateString= this.tools.formatDateForInput(this.tools.timeStampToDate(this.selectedDemandeinterventions.DateIntervention ?? 0));
            this.selectedDemandeinterventions.typeintervention= this.selectedDemandeinterventions.typeintervention.toString();
            this.selectedDemandeinterventions.typepanne= this.selectedDemandeinterventions.typepanne.toString();
            this.selectedDemandeinterventions.id_employe= this.selectedDemandeinterventions.id_employe.toString();
            //console.log("this.selectedintervention.dateString",this.selectedDemandeinterventions.dateString)
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
   loadEditinter(ev) {
    // console.log(ev);
     this.mode = "Modifier"

     this.selectedDemandeinterventions= new Demandeinterventions();

     this.errorMsg = ""
     if (ev) {

       var url = "?id="+ev;
       this.modalLoading = true;
       this.primaryModal.show()
       var route = this.router

       this.dataService.getintervention(url).subscribe({
         next: (d: any) => {


           if (d && d.length) {

             this.selectedDemandeinterventions = d[0];


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


  submit() {
     this.selectedDemandeinterventions.DateIntervention = Math.round((new Date(this.selectedDemandeinterventions.dateString).getTime()) / 1000);


    if (this.mode == "Ajouter") this.ajouter()



      if (this.mode == "Modifier") this.modifier()
  }


  modifier() {
    var route = this.router
    this.errorMsg = ""
    console.log("this.selectedintervention",this.selectedDemandeinterventions);

    /*  this.dataService.editintervention(this.selectedDemandeinterventions).subscribe({
        next: (res) => {
          console.log(res);

          this.errorMsg = ""
          this.loadData(true)
          this.primaryModal.hide()
        //  this.loading=true
          this.errorMsg = ""
        }, error(err) {
          console.log("error", err)
          this.modalLoading = false;
          if (err.status == 401) {
            route.navigate(['login'], { queryParams: { returnUrl: route.url } });
          }
          else if (err.status == 402) {
            this.errorMsg = "Erreur la modification est bloqué."
          }
        }
      })*/
    }
valider(ev){
  this.selectedDemandeinterventions.statut="valider";
  var route = this.router



  console.log(this.selectedDemandeinterventions);
  this.errorMsg = "";

  this.dataService.editinter(ev)

  .subscribe({
    next: (res) => {
    //console.log("add")
      this.loadData(true)

      this.errorMsg = ""
    }

  })
}
rejeter(ev){
  this.selectedDemandeinterventions.statut="rejeter";
  var route = this.router



  console.log(this.selectedDemandeinterventions);
  this.errorMsg = "";

  this.dataService.rejeterinter(ev)

  .subscribe({
    next: (res) => {
    console.log("add")
      this.loadData(true)

      this.errorMsg = ""
    }

  })
}

reparer(ev){
  this.selectedDemandeinterventions.statut="reparer";
  var route = this.router



  console.log(this.selectedDemandeinterventions);
  this.errorMsg = "";

  this.dataService.reparerinter(ev)

  .subscribe({
    next: (res) => {
    //console.log("add")
      this.loadData(true)

      this.errorMsg = ""
    }
    // , error(err) {
    //   this.modalLoading = false;
    //   if (err.status == 401) {
    //     route.navigate(['login'], { queryParams: { returnUrl: route.url } });
    //   }
    //   else if (err.status == 402) {
    //     this.errorMsg = "Erreur l'ajout est bloqué."
    //   }
    // }
  })
}


  ajouter() {
    var route = this.router


           // console.log("this.selectedintervention",this.selectedintervention);
            this.errorMsg = "";
            this.selectedDemandeinterventions.id_employe=parseInt(this.selectedDemandeinterventions.id_employe)
            this.selectedDemandeinterventions.typeintervention=parseInt(this.selectedDemandeinterventions.typeintervention)
            this.selectedDemandeinterventions.typepanne=parseInt(this.selectedDemandeinterventions.typepanne)

           /* this.dataService.addIntervention(this.selectedDemandeinterventions)

            .subscribe({
              next: (res) => {
              //console.log("add")
                this.loadData(true)
                this.primaryModal.hide()
                this.errorMsg = ""
              }

            })*/
          }




  close(plan) {
    if (confirm("Are you sure you want to close " + plan)) {
      var route = this.router
      var u = "?id=" + plan + "&status=closed"
      this.dataService.updateStatusPlanEntretien(u).subscribe({
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



  delete(intervention) {
    if (confirm("Are you sure to delete " + intervention)) {
      var route = this.router
      var u = "?id=" + intervention
      this.dataService.deleteintervention(u).subscribe({
        next: (res) => {
           //console.log("deleted cruduser")
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


    reset() {
      this.selectedDevices = []
      // this.selectedDevice = null
    }





loadEmploye() {
  this.loading = true;
  var route = this.router
  this.dataService. getEmployees('?minimum=true').subscribe({
    next:
      response => {
         console.log("employess ", response);
        // console.log(typeof response)
        this.employees = [].concat(response)
        this.employees= this.employees.map(employees=> {

      return {
        fullName: employees.lastName +' '+ employees.firstName,
        id: employees.id
     };

  });

  this.loading = false;
      },

  error(err) {
      console.log(err);
      this.loading = false;
      if (err.status == 401) {
        route.navigate(['login'], { queryParams: { returnUrl: route.url } });
      }
    }
  })

}



loadtypeinter() {
  this.loading = true;
  var route = this.router
  this.dataService. loadParam("TypeIntervention","Min").subscribe({
    next: (d: any) => {
      d.forEach(e => {
        e.id = e.id.toString()
      });
      console.log("typeinter",d)
      this.typeinter = d;
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


loadtypepanne() {
  this.loading = true;
  var route = this.router
  this.dataService. loadParam("TypePanne","Min").subscribe({
    next: (d: any) => {
      d.forEach(e => {
        e.id = e.id.toString()
      });
      console.log("typepanne",d)
      this.typepanne = d;
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



// loadmatricule() {
//   this.loading = true;
//   var route = this.router
//   this.dataService. getmatricule("?matricule=true").subscribe({
//     next: (d: any) => {
//       d.forEach(e => {
//         e.id = e.id.toString()
//       });
//       console.log("matricule",d)
//       this.matricule = d;
//       this.loading = false;
//     }, error(err) {
//       console.log(err);
//       this.loading = false;
//       if (err.status == 401) {
//         route.navigate(['login'], { queryParams: { returnUrl: route.url } });
//       }
//     }
//   })}
  exporter(type) {
    var v = this.getJsonValue(this.data);
    v.forEach(e => {
     e.value = e.typeDeclenchement == 1 ? e.decKmValue : e.decDateValueString
     e.status = this.getStatusName(e.status)
     e.typeDeclenchement = this.getTypeDeclenchement(e.typeDeclenchement)
     e.operation =  this.getOperationById(e.operation)
    });
    type == 1 ? this.exportingPdfTool.exportPdf_Intervention(v, "Rapport de demande  d'intervention " ) :
    this.exportingExcelTool. Export_Intervention(v, "Rapport de demande  d'intervention ")
  }

  getJsonValue(v) {
    return JSON.parse(JSON.stringify(v))
  }

 getBgColorForStatus(s) {
    return s == "closed" ? 'bg-success' : s == 'obsolete' ? 'bg-danger' : ''
  }

  getStatusName(s) {
    return s == "closed" ? 'Clôturée' : s == 'obsolete' ? 'Dépassé' : 'En Cours'
  }

  getTypeDeclenchement(t) {
    return t == 1 ? 'Par KM' : 'Par Date'
  }

  getSelectedintervention(selected) {
    this.selectedDemandeinterventions.id_employe = selected;


  }
  getSelectedstatut(selected) {
    this.selectedstatut = selected;
  }
  getSelectedmatricule(selected) {
    this.selectedDemandeinterventions.deviceID= selected;
  }
  getSelectedtypepanne(selected) {
    this.selectedDemandeinterventions.typepanne = selected;


  }
  getSelectedtypeintervention(selected) {
    this.selectedDemandeinterventions.typeintervention = selected;
console.log(this.selectedDemandeinterventions.typeintervention);

  }


  getOperationById(id) {
    for (let i = 0; i < this.cts.planOperations.length; i++) {
      if (this.cts.planOperations[i].id == id) return this.cts.planOperations[i].name
    }
    return 0
  }
  onSubmit():any{
    this.dataService.addIntervention(this.interventionForm.value)
  .subscribe(()=>{
    console.log('data added ')
    this.ngZone.run(()=>this.router.navigateByUrl(''))
})
}
convertToTimestamp(val: any) {
  var res = 0
  let values = val.split(':')
  if (values && values.length == 2) {
      let hr = Number.parseInt(values[0])
      let min = Number.parseInt(values[1])
      res += (!hr || isNaN(hr)) ? 0 : hr * 60 * 60;
      res += (!min || isNaN(min)) ? 0 : min * 60;
  }
  return res;
}

}


