import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { combineLatest, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { util } from '../../../../tools/utils';
import { Consommation } from '../../../../models/Consommation';
import { Vehicules } from '../../../../models/vehicules';
import { MyDateRangePickerComponent, MyDateRangePickerOptions } from '../../../components/my-date-range-picker/my-daterangepicker.component';
import { DataService } from '../../../../services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { ExportingTool } from 'src/app/tools/exporting_tool';
import { ExportExcel } from 'src/app/tools/export-excel';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'src/app/tools/constants';
import { Assurance } from '../../../../models/assurance'
import * as Chart from 'chart.js';
import { ChartOptions } from 'chart.js';
import { DatePipe } from '@angular/common';
import { log } from 'console';

interface IItemEtape {
  etapeID: number;
  designation: string;
}
interface Data {
  date: Date;
  km: number;
  qte: number;
}
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent {
  constructor(private datePipe: DatePipe, private dataService: DataService, private router: Router, private tools: util, private dateAdapter: DateAdapter<Date>, public cts: Constant, private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel) { }
  @Input() deviceID: any;
  myDateRangePickerOptions: MyDateRangePickerOptions;
  @ViewChild('calendar', { static: true })
  private myDateRangePicker: MyDateRangePickerComponent;
  loading: boolean = false
  showdetail: boolean = false
  //
  vehicule: any = [];
  selectedTab = 0;
  public devices: any = [];
  public drivers: any = [];
  data2 = [];
  dataAcc = [];
  data = [];

  chart: any;
  chart1: any;
  //
  Pneu: any = [];
  selectedPlan: any = [];
  Accident: any = [];
  accidentTable = [];
  typesDegat = []
  // drivers = []
  assuranceTable: Assurance[] = []
  etapesPredefinie: IItemEtape[]
  assuranceVehicule: any
  nameAssurance: string = ""
  intervention: any = [];
  Consommation: any = [];
  modalLoading: boolean
  devices$ = this.dataService.getVehicule("?extra=true");
  drivers$ = this.dataService.getDriverData("?minimum=true");
  //
  TotalPneu: number = 0;
  TotalConsommation: number = 0;
  //date de calendrier 
  startDate: any;
  endDate: any;
  //tableaux
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  NamesPlan = ["Véhicule", "Type d'Opération", "Déclenchement", "Valeur", "Status", "Date de Création"]
  public ColumnsPlan = ["deviceID", "operation", "typeDeclenchement", "value", "status", "creationTime"]
  NamesPneu = ["Véhicule", "N° série", "Etat Pneu", "Km Acquisition", "Date debut", "Date fin", "Position Pneu", "Fournisseurs", "Modele Pneu", "Montant", "DATE DE CRÉATION"]
  public ColumnsPneu = ["deviceID", "NumSerie", "EtatPneu", "KmAcquisition", "DateDebut", "DateFin", "PositionPneu", "Fournisseurs", "ModelePneu", "Montant", "creationTime"]
  NamesAccident = ["Date", "Véhicule", "Conducteur", "Lieu", "Type Dégât", "Etat d'avancement", "Type Assurance", "Statut"]
  public ColumnsAccident = ["date", "deviceID", "driverID", "lieu", "degatType", "etapeAssurance", "assuranceID", "statut"]
  public ColumnsIntervention = ["id", "deviceID", "statut", "DateIntervention", "id_employe", "description", "typeintervention", "typepanne", "km"]
  NamesIntervention = ["id", "matricule", "statut", "date", "demandeur", "description", "type intervention", "type panne", "km"]
  NamesConsommation = ['id', 'Chauffeur', 'Vehicule', 'Fournisseur', 'N Carte', 'N Bon', 'Qte', 'Plein', 'Montant', 'Montant TTC', 'KM Precedent', 'KM Encours', 'Consommation Moy (%)', 'Date', 'Observation'];
  public ColumnsConsommation = ['id', 'driverID', 'deviceID', 'fournisseur', 'numCarte', 'numBon', 'qte', 'pleinOnStr', 'montant', 'montantTTC', 'kmPrecedent', 'kmEncours', 'consoM', 'dateFill', 'observation',]

  /// tabeau qui charge donnees de bar chart 
  monthlyTotals :{ month: string, totalKm: number, totalQte: number }[] = [];
  TabChart: Data[] = [];
  donneesGrapheKm = Array(12).fill(0);
  donneesGrapheQte= Array(12).fill(0);
  ngOnInit() {
    this.chart = document.getElementById('second');
    this.chart1 = document.getElementById('third');

    this.LoadVehicule();
    this.getChangementsPneu();
    this.getAccidents();
    this.loadData(true);
    this.Interventions();
    this.getConsommation();
    // les graphes 
    //this.Chart1()
    //this.loadChart1();
    // this.RenderChart();
    this.RenderChart();
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const year = new Date().getFullYear();

    const firstDayOfYear = new Date(year, 0, 1);
    const startDate = this.datePipe.transform(firstDayOfYear, 'dd/MM/yyyy');

    const lastDayOfYear = new Date(year, 11, 31);
    this.endDate = this.datePipe.transform(lastDayOfYear, 'dd/MM/yyyy');
    console.log("calendrier ", this.startDate, this.endDate)
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
        from: firstDayOfYear,
        to: lastDayOfYear
      }
    };

  }
  LoadVehicule() {
    {
      this.showdetail = true
      var route = this.router
      this.loading = true;
      var urlParams = "?id=" + this.deviceID;
      this.dataService.getVehicules(urlParams).subscribe({
        next: (d: any) => {
          this.loading = false;
          console.log("this.vehicule", d)
          this.vehicule = d;
          console.log("vehicule ", this.vehicule)
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

  selectTab(i) {
    this.selectedTab = i
  }
  getChangementsPneu() {
    // let url = "";

    let url = "?deviceID=" + this.deviceID;
    this.dataService.getChangemantsPneu(url).subscribe({
      next:
        res => {
          // console.log("pneu", res)
          this.data2 = [].concat(res)
          this.data2.forEach(p => {
            p.deviceName = this.getVehiculeNameById(p.deviceID);
            p.DateDebut = this.tools.formatDateForInput(new Date(Number.parseInt(p.DateDebut ?? 0) * 1000)).toString();
            p.DateFin = this.tools.formatDateForInput(new Date(Number.parseInt(p.DateFin ?? 0) * 1000)).toString();
            p.creationTime = this.tools.formatDateForInput(new Date(Number.parseInt(p.creationTime ?? 0) * 1000)).toString();
            this.TotalPneu += p.Montant
            //  console.log("montant ", this.TotalPneu);

          })

          this.Pneu = [].concat(this.data2)
          console.log("pneu", this.Pneu)
        },
      error(err) {
        console.log("err ", err);
      }
    })
  }
  getVehiculeNameById(id) {
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].dID == id) return this.devices[i].name
    }
    return ""
  }

  getDev() {
    var route = this.router
    this.dataService.getVehicule("?extra=true").subscribe({
      next: (res) => {
        this.devices = res;
        // this.getChangementsPneu();

      }, error(err) {
        if (err.status == 401) {
          route.navigate(['login'], { queryParams: { returnUrl: route.url } });
        }
      }
    })


  }
  //plan d'entretien 
  loadData(first = false) {

    var route = this.router
    this.loading = true;
    var urlParams = "?d=" + this.deviceID;
    if (!first) {
      //plan
      var d = this.deviceID == null ? "?" : "?d=" + this.deviceID + "&"
      urlParams = d + "st=" + this.myDateRangePicker.getDateFrom + "&et=" + this.myDateRangePicker.getDateTo
      //pneu
      let a = this.data2.filter(e => (Date.parse(e.creationTime) / 1000) >= this.myDateRangePicker.getDateFrom && (Date.parse(e.creationTime) / 1000) <= this.myDateRangePicker.getDateTo && e.deviceID == this.deviceID)
      this.Pneu = [].concat(a);
      //accident 
      this.dataAcc = [].concat(this.accidentTable)
      let b = this.dataAcc.filter(e => (Date.parse(e.date) / 1000) >= this.myDateRangePicker.getDateFrom &&
        (Date.parse(e.date) / 1000) <= this.myDateRangePicker.getDateTo)
      this.Accident = [].concat(b);
      //demandes d'intervention 
      // var statut = this.selectedstatut.length === 0 ? "" : "?statut=" + this.selectedstatut +"&";
      //var DeviceID = this.selectedDevices.length === 0 ? "" : "DeviceID=" + this.selectedDevices +"&";
      let from = Math.round(this.myDateRangePicker.dateFrom.getTime() / 1000) + this.convertToTimestamp(this.myDateRangePicker.time_1)
      //console.log("from",from);
      let to = Math.round(this.myDateRangePicker.dateTo.getTime() / 1000) + this.convertToTimestamp(this.myDateRangePicker.time_2)
      var urlPar = this.deviceID + 'from=' + from + '&to=' + to;
      //consommation 
      var d = this.deviceID == '-' || this.deviceID == null ? "?" : "?d=" + this.deviceID + "&"
      var urlP = d + "st=" + this.myDateRangePicker.getDateFrom + "&et=" + this.myDateRangePicker.getDateTo
    }
    this.loading = false
    this.dataService.getintervention(urlPar).subscribe({
      next: (d: any) => {
        this.loading = false;
        this.intervention = d;
        console.log("data", d);
        this.intervention.forEach((e) => {
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
    this.dataService.getConsommation(urlP).subscribe({
      next: (d: any) => {
        this.Consommation = d;

        this.getDevicesAndDrivers().subscribe({
          next: ([devices, drivers]) => {
            this.devices = devices;

            this.drivers = drivers;
            this.Consommation.forEach((e) => {
              e.pleinOnStr = e.pleinOn == 1 ? 'ON' : 'OFF';

              e.dateFill = this.tools.formatDateVer(new Date(Number.parseInt(e.dateFill) * 1000));

              const d = { ...this.drivers.find(elem => elem.driverID == e.driverID) };
              e.driverName! = d!.displayName;

              const dev = { ...this.devices.find(elem => elem.dID == e.deviceID) };
              e.deviceName! = dev!.name;
            })

          }, error(err) {
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }
          }
        });

        this.loading = false;

      }, error(err) {
        this.loading = false;
        if (err.status == 401) {
          route.navigate(['login'], { queryParams: { returnUrl: route.url } });
        }
      }
    })
    this.dataService.getPlanEntretien(urlParams).subscribe({
      next: (d: any) => {

        // this.loading = false;
        this.selectedPlan = d;
        this.selectedPlan.forEach((e) => {
          e.creationTime = this.tools.formatDateForInput(new Date(Number.parseInt(e.creationTime ?? 0) * 1000));
          e.decDateValueString = this.tools.formatDateForInput(new Date(Number.parseInt(e.decDateValue ?? 0) * 1000));
          // if (e.da) e.da = Math.round(Number.parseInt(e.da) / 60);
        })
        console.log("plan", this.selectedPlan)
      }, error(err) {
        console.log(err);
        this.loading = false;
        if (err.status == 401) {
          route.navigate(['login'], { queryParams: { returnUrl: route.url } });
        }
      }
    })

  };
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
  getValue(c, row) {
    switch (c) {
      case 'value':
        return row["typeDeclenchement"] == 1 ? row["decKmValue"] : row["decDateValueString"]
      case 'status':
        return this.getStatusName(row[c])
      case 'typeDeclenchement':
        return this.getTypeDeclenchement(row[c])
      case 'operation':
        return this.getOperationById(row[c])
      case 'actions':
        return ''
      default:
        return row[c]
    }
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

  getOperationById(id) {
    for (let i = 0; i < this.cts.planOperations.length; i++) {
      if (this.cts.planOperations[i].id == id) return this.cts.planOperations[i].name
    }
    return 0
  }
  getAccidents() {
    let url = "?dr=" + this.deviceID
    this.dataService.getAccident(url).subscribe({
      next:
        response => {
          // console.log("response accident", response);
          this.accidentTable = response;
          this.accidentTable.forEach(acc => {
            // acc.driverName = this.drivers.filter(dr => dr.driverID == acc.driverID)[0].displayName;
            //  acc.deviceName = this.devices.filter(dv => dv.dID == acc.deviceID)[0].name;
            // acc.typeAssurance = this.assuranceTable.filter(assur => assur.assuranceID == acc.assuranceID)[0].designation;
            // acc.etapeAssuranceName = this.etapesPredefinie.filter(etape => etape.etapeID == acc.etapeAssurance)[0].designation;
            acc.date = this.tools.formatDateVer(this.tools.timeStampToDate(acc.date));
            acc.assuranceID = acc.assuranceID.toString();

            this.typesDegat = Array.from(acc.degatType.split(','));
            acc.degatType = this.typesDegat;
            acc.icons = []
            acc.degatType.forEach(element => {
              let icon = this.cts.degatTypes.filter(dg => dg.value == element)[0].icon.toString()
              acc.icons.push(icon)
              // console.log("icon", icon);


            });
          })
          console.log("acidents table", this.accidentTable);
          this.Accident = this.accidentTable.reverse();
        },
      error(err) {
        console.log("err get accident ", err);
        if (err.status == 401) {
          this.route.navigate(['login']);
        }
        else
          alert("Erreur Serveur")
      }
    })
  }
  getTypeDegat(event) {
    // console.log("event ", event);
    this.Accident.degatType = event.toString();
    // console.log("this.accident ", this.accident);


  }

  getValu(c, row) {
    switch (c) {
      case 'value':
        return row["typeDeclenchement"] == 1 ? row["decKmValue"] : row["decDateValueString"]
      case 'status':
        return this.getStatusName(row[c])
      case 'cloturer':
        return ''
      case 'degatType':
        return ''
      case 'actions':
        return ''
      case 'statut':
        return ''

      default:
        return row[c]
    }
  }

  getAssuranceVehicule(deviceID) {
    let url = "?deviceID=" + deviceID
    this.dataService.getAssuranceVehicule(url).subscribe({
      next:
        response => {
          // console.log("response assurance vehicule ", response);
          this.assuranceVehicule = response;
          this.nameAssurance = this.assuranceVehicule.societe

        },
      error(err) {
        console.log("err ", err);
        if (err.status == 401) {
          this.route.navigate(['login']);
        }
        else
          alert("Erreur Serveur !")
      }
    })
  }
  Interventions() {
    var route = this.router
    this.loading = true;
    var urlParams = "?deviceID=" + this.deviceID;
    //console.log(this.deviceID);
    // var  urlParams = this.deviceID.length == 0 ? "" : "?c=" + this.deviceID
    //var statut = this.selectedstatut.length == 0 ? "?" : "statut=" + this.selectedstatut;
    //  urlParams = c + statut;
    this.dataService.getintervention(urlParams).subscribe({
      next: (d: any) => {
        this.loading = false;
        this.intervention = d;
        console.log("data", d);
        this.intervention.forEach((e) => {
          //   e.dateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.DateIntervention ?? 0));
          e.dateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.DateIntervention ?? 0));

          //   e.dateString= this.tools.formatDateForInput(this.tools.timeStampToDate(this.intervention.DateIntervention ?? 0));
          e.typeintervention = e.typeintervention.toString();
          e.typepanne = e.typepanne.toString();
          e.id_employe = e.id_employe.toString();
          console.log("e", e.typeintervention.toString())
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
  };
  getDevicesAndDrivers() {
    return combineLatest([
      this.devices$,
      this.drivers$
    ])
  }
  getConsommation() {
    var route = this.router
    this.loading = true;
    var urlParams = "?d=" + this.deviceID;
    this.dataService.getConsommation(urlParams).subscribe({
      next: (d: any) => {
        this.Consommation = d;
        console.log("consommation", d);
        this.getDevicesAndDrivers().subscribe({
          next: ([devices, drivers]) => {
            this.devices = devices;

            this.drivers = drivers;
            this.Consommation.forEach((e) => {
              e.pleinOnStr = e.pleinOn == 1 ? 'ON' : 'OFF';

              e.dateFill = this.tools.formatDateVer(new Date(Number.parseInt(e.dateFill) * 1000));

              const d = { ...this.drivers.find(elem => elem.driverID == e.driverID) };
              e.driverName! = d!.displayName;

              const dev = { ...this.devices.find(elem => elem.dID == e.deviceID) };
              e.deviceName! = dev!.name;
              this.TotalConsommation += e.montantTTC

              this.TabChart.push({ date: e.dateFill, km: e.kmEncours, qte: e.qte });
            })
            //charger un tableau qui contient les donnees de consommation qui contient qte et km pour chaque date 
            console.log("tabChart", this.TabChart)
            // calculer chaque mois la somme de km et qte selon tableau quand a charger  
            const monthlyTotals = this.calculateMonthlyTotal(this.TabChart);
            console.log("calcule somme pour chaque mois ", monthlyTotals);
           
           

// Remplissage des données du graphe à partir du tableau
monthlyTotals.forEach((donnees) => {
  const month = parseInt(donnees.month);
  if (month >= 1 && month <= 12) {
    this.donneesGrapheQte[month - 1] = donnees.totalQte;
   
  }
  
  
});
monthlyTotals.forEach((donnees) => {
  const month = parseInt(donnees.month);
  if (month >= 1 && month <= 12) {
    this.donneesGrapheKm[month - 1] = donnees.totalKm;
   
  }
  
  
});
           this.Chart1();
            this.loadChart1();
          }, error(err) {
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }
          }
        });
        this.loading = false;
      }, error(err) {
        this.loading = false;
        if (err.status == 401) {
          route.navigate(['login'], { queryParams: { returnUrl: route.url } });
        }
      }
    })
  }
  //function qui calcule la somme de KM et qte pour chaque moi dans consomations 
  calculateMonthlyTotal(tabChart: any): {
    month: string, totalKm: number, totalQte: number
  }[] {
   //  monthlyTotals: { month: string, totalKm: number, totalQte: number }[] = [];

    if (tabChart.length === 0) {
      return this.monthlyTotals; // Si le tableau est vide, renvoyer un tableau vide de totaux mensuels
    }

    const dateMap = new Map<string, { totalKm: number, totalQte: number }>(); // Utiliser une Map pour regrouper les totaux par mois

    tabChart.forEach((data) => {
      const date = new Date(data.date);
     // const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const month = `${date.getMonth() + 1}`;

      if (dateMap.has(month)) {
        const existingTotal = dateMap.get(month)!;
        existingTotal.totalKm += data.km;
        existingTotal.totalQte += data.qte;
        dateMap.set(month, existingTotal);
      } else {
        dateMap.set(month, { totalKm: data.km, totalQte: data.qte });
      }
    });

    dateMap.forEach((total, month) => {
      this.monthlyTotals.push({ month, totalKm: total.totalKm, totalQte: total.totalQte });
    });

    return this.monthlyTotals;
  }

  // Utilisation de la fonction pour calculer les totaux mensuels


  /*isDateInJune(date: Date): boolean {
    return date.getMonth() === 5;
    // return date.getMonth() + 1 === 6; // Le mois de juin est représenté par la valeur 5 (les mois sont basés sur des index de 0 à 11)
  }*/

  back() {
    console.log("back ")
  }
  //les graphes 
  Chart1() {
    var myChart = new Chart("first", {
      type: 'bar',
      data: {
        labels: [
          'Janv',
          'Fév',
          'Mars',
          'Avr',
          'Mai',
          'Juin',
          'Juillet',
          'Aout',
          'Sept',
          'Oct',
          'Nov',
          'Dec'

        ],
        datasets: [
          {
            label: 'KM',
            data: this.donneesGrapheKm,
         
            //data: [65, 59, 80, 81, 56, 260, 40, 12, 66, 23, 78, 42],
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
            ],
          },
        ],
      },

      options: {

      }
    });
    
   
  }
 

  loadChart1() {
    new Chart("third", {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Quantité',
          //  data: this.monthlyTotals.map((total) => total.totalQte),
         data:this.donneesGrapheQte,
           // data: [65, 59, 80, 81, 56, 55, 40, 12, 66, 23, 78, 42],
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
            ],
          },
        ],
        labels: [
          'Janv',
          'Fév',
          'Mars',
          'Avr',
          'Mai',
          'Juin',
          'Juillet',
          'Aout',
          'Sept',
          'Oct',
          'Nov',
          'Dec'

        ],

      },
      options: {

        legend: {
          display: true,
          position: 'top',
        },
        scales: {
          ticks: {
            display: false
          }
        },
        responsive: false,
      }
    });
  }

  RenderChart() {
    const ctx = document.getElementById('second');
    const data = {
      labels: ['Recervoir1', 'Recervoir2', 'adblue'],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      }],
    };

    const options = {

      cutoutPercentage: 90,
      legend: {
        display: true,
        position: 'right',
      },

      animation: {
        onComplete: function () {
          const chartInstance = this.chart;
          const ctx = chartInstance.ctx;
          ctx.font = Chart.helpers.fontString(20, 'bold', Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
          ctx.fillText('120', (chartInstance.chartArea.left + chartInstance.chartArea.right) / 2, (chartInstance.chartArea.top + chartInstance.chartArea.bottom) / 2);
        }
      }
    };

    new Chart(this.chart, {
      type: 'doughnut',
      data: data,
      options: options as ChartOptions
    });
  }

  jour(targetDate: any) {
    const today = new Date();
    const date = new Date(targetDate); // Remplacez cette date par celle que vous souhaitez utiliser

    // Calculer la différence en millisecondes entre les deux dates
    const timeDiff = date.getTime() - today.getTime();

    // Convertir la différence en jours
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining;
  }

  KmReste(KmDec, KmVehicule) {
    var KmReste = 0;
    KmReste = KmVehicule - KmDec;
    return KmReste
  }
}
