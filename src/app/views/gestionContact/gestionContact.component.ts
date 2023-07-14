import { catchError } from 'rxjs/operators';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MyDateRangePickerComponent, MyDateRangePickerOptions } from '../components/my-date-range-picker/my-daterangepicker.component';
import { DataService } from '../../services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { util } from '../../tools/utils';
import { Contact } from '../../models/Contact';
import { TelContact } from '../../models/TelContact';
import { SiteContact } from '../../models/SiteContact';
import { Router } from '@angular/router';
import { ExportingTool } from '../../tools/exporting_tool';
import { ExportExcel } from '../../tools/export-excel';
import { throwError } from 'rxjs/internal/observable/throwError';
import { DriverDocument } from '../../models/DriverDocument';
import { Constant } from '../../tools/constants';
/* import { ApiService, Maps } from '../../services/aPI_Addresse'; */
// import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { log } from 'console';


/* const place = null as google.maps.places.PlaceResult;
type Components = typeof place.address_components; */

@Component({
  selector: 'gestionContact',
  templateUrl: './gestionContact.component.html',
  styleUrls: ['./gestionContact.component.scss']
})
export class GestionContactComponent {
  typeContact = [{ val: 1, status: false }, { val: 2, status: false }];
  loading: boolean = false;
  modalLoading: boolean = false;
  //selectedDriver: Driver = new Driver();
  selectedContact: Contact = new Contact();
  selectedTelContact: TelContact = new TelContact();
  selectedSiteContact: SiteContact = new SiteContact();
  isEditPermission = false
  isAddPermission = false

  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  /*  @ViewChild('search')
   public searchElementRef: ElementRef; */

  /*  public place: google.maps.places.PlaceResult;
   public locationFields = [
     'name',
     'cityName',
     'stateCode',
     'countryName',
     'countryCode',
   ]; */

  options: any = {
    componentRestrictions: { country: 'IN' }
  }

  // handleAddressChange(address: Address) {
  //   console.log(address.formatted_address)
  //   console.log(address.geometry.location.lat())
  //   console.log(address.geometry.location.lng())
  // }

  constructor(/* apiService: ApiService, private ngZone: NgZone, */private dataService: DataService, private tools: util, public cts: Constant, private router: Router, private exportingPdfTool: ExportingTool, private exportingExcelTool: ExportExcel,) {
    /*  apiService.api.then((maps) => {
       this.initAutocomplete(maps);
     }); */

  }

  value: string | Object;
  myDateRangePickerOptions: MyDateRangePickerOptions;
  isCollapsed: boolean = false;
  isCollapsedData: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  data = [];
  contact_data = [];
  Site_data = [];
  errorMsg: string;
  mode = "Ajouter"
  modeTel = "Ajouter"
  modeSite = "Ajouter"
  public isnotNum: boolean = false
  displayedColumns: any = ["Véhicule", "Device", "Num de Tel"]

  selectedFieldModal = [{ selected: [], table: "FamilleClient", data: [] }, { selected: [], table: "SecteursActivite", data: [] }, { selected: [], table: "", data: [] }, { selected: [], table: "TypeFournisseur", data: [] }];
  selectedcivility = []
  /////////////
  selectedTab = 0
  //typeSelected = []
  openAlert: boolean = false
  driverDocument: DriverDocument = new DriverDocument();
  selectTab(i) {
    this.selectedTab = i
  }
  //////////////////////////////

  /*
    initAutocomplete(maps: Maps) {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.onPlaceChange(autocomplete.getPlace());
        });
      });
    }

    onPlaceChange(place: google.maps.places.PlaceResult) {
     // this.map.setCenter(place.geometry.location);
      const location = this.locationFromPlace(place);
      console.log(location);
    }

    locationFromPlace(place: google.maps.places.PlaceResult) {
      const components = place.address_components;
      if (components === undefined) {
        return null;
      }

      const areaLevel3 =  this.getShort(components, 'administrative_area_level_3');
      const locality =  this.getLong(components, 'locality');

      const cityName = locality || areaLevel3;
      const countryName =  this.getLong(components, 'country');
      const countryCode =  this.getShort(components, 'country');
      const stateCode =  this.getShort(components, 'administrative_area_level_1');
      const name = place.name !== cityName ? place.name : null;

      const coordinates = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      };

      const bounds = place.geometry.viewport.toJSON();

      // placeId is in place.place_id, if needed
      return {
        name,
        cityName,
        countryName,
        countryCode,
        stateCode,
        bounds,
        coordinates,
      };
    }

     getComponent(components: Components, name: string) {
      return components.filter((component) => component.types[0] === name)[0];
    }

     getLong(components: Components, name: string) {
      const component =  this.getComponent(components, name);
      return component && component.long_name;
    }

     getShort(components: Components, name: string) {
      const component = this.getComponent(components, name);
      return component && component.short_name;
    }
   */
  /////////////////////////////////////
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

  getSelectedFormeJuridique(selectedForm) {
    this.selectedContact.FormeJuridique = selectedForm
    this.selectedFieldModal[2].selected = selectedForm
  }

  getSelectedCivility(selectedCivi) {
    this.selectedTelContact.Civility = selectedCivi
    this.selectedcivility = selectedCivi
  }

  getSelectedTypeFournisseur(selectedForm) {
    this.selectedContact.Id_TypeFournisseur = selectedForm
    this.selectedFieldModal[3].selected = selectedForm
  }

  getSelectedSecteursActivite(selectedForm) {
    this.selectedContact.Id_SecteursActivite = selectedForm
    this.selectedFieldModal[1].selected = selectedForm
  }

  getSelectedFamilleClient(selectedForm) {
    this.selectedContact.Id_FamilleClient = selectedForm
    this.selectedFieldModal[0].selected = selectedForm
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';

  }

  /*  onValidateDevice() {
     this.showErrorDevice = !this.showErrorDevice;
     this.errorMessageDevice = "This field is required";
   } */
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
            this.selectedFieldModal[i].data = res // [{id:"",description:""},{...}]
            //console.log(this.selectedFieldModal[i].data);

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
    this.dataService.getContactData(urlParams).subscribe({
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
      this.selectedContact = new Contact();
      this.resetSelected()
      this.typeContact = this.tools.get_typecontact(0)
      var url = "?d=" + ev
      this.modalLoading = true;
      this.primaryModal.show()
      var route = this.router
      this.dataService.getContactData(url).subscribe({
        next: (d: any) => {
          if (d && d.length) {
            /*  d.forEach(e => {
               e.birthdateString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.birthdate ?? 0));
               e.licenseExpireString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.licenseExpire ?? 0));
               e.insuranceExpireString = this.tools.formatDateForInput(this.tools.timeStampToDate(e.insuranceExpire ?? 0));
             }); */
            this.selectedContact = d[0];
            this.typeContact = this.tools.get_typecontact(this.selectedContact.TypeContact)
            this.selectedFieldModal[0].selected = this.selectedContact.Id_FamilleClient.toString()
            this.selectedFieldModal[1].selected = this.selectedContact.Id_SecteursActivite.toString()
            this.selectedFieldModal[2].selected = this.selectedContact.FormeJuridique.toString()
            this.selectedFieldModal[3].selected = this.selectedContact.Id_TypeFournisseur.toString()
            this.loadTelData()
            this.loadSiteData()
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
    this.selectedContact = new Contact();
    this.resetSelected()
    this.typeContact = this.tools.get_typecontact(0)
    this.selectedTelContact = new TelContact();
    this.selectedSiteContact = new SiteContact();
    this.selectedcivility = []
    this.contact_data=[]
    this.Site_data=[]
    this.errorMsg = ""
    this.mode = "Ajouter"
    this.selectedTab = 0
    this.primaryModal.show()
  }


  submit() {
    if (this.mode == "Ajouter") this.ajouter()
    if (this.mode == "Modifier") this.modifier()/*
    if (this.modeTel == "Ajouter") this.ajouterTel()
    if (this.modeTel == "Modifier") this.modifierTel() */
  }



  /*   convertDatesToTimestamp(){
      this.selectedDriver.birthdateString = this.tools.dateToTimestamp(this.selectedDriver.birthdate);
      this.selectedDriver.licenseExpireString = this.tools.dateToTimestamp(this.selectedDriver.licenseExpire);
      this.selectedDriver.insuranceExpireString = this.tools.dateToTimestamp(this.selectedDriver.insuranceExpire);
    } */

  ajouter() {
    var route = this.router
    this.errorMsg = ""
    if (!this.selectedContact.Company) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
     /*  if (!this.tools.ValidateEmail(this.selectedContact.contactEmail)) {
        this.errorMsg = "Vous avez saisi un email de contact invalid."
      } else if (!this.tools.ValidatePhone(this.selectedContact.contactPhone)) {
        this.errorMsg = "Vous avez saisi un telephone de contact invalid."
      } else */ {
        this.selectedContact.TypeContact = this.tools.set_typecontact(this.typeContact)
        this.dataService.addContact(this.selectedContact)
          .pipe(
            catchError(err => {
              // console.log("res", err)
              this.modalLoading = false;
              if (err.status == 401) {
                route.navigate(['login'], { queryParams: { returnUrl: route.url } });
              }

              else if (err.status == 400) {
                console.log(err);
                this.errorMsg = "Ce contact exist deja. Veuillez utiliser un autre Raison Sociale."
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
              this.selectedContact.id = res.id
              this.loadData()
              /* this.primaryModal.hide() */
              this.mode = "Modifier"
              this.errorMsg = ""
            }
          })
      }
    }
  }

  modifier() {
    var route = this.router
    this.openAlert = false
    this.errorMsg = ""
    // console.log("selectedDriver", this.selectedDriver)
    if (!this.selectedContact.Company) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      /* if (!this.tools.ValidateEmail(this.selectedDriver.contactEmail)) {
        this.errorMsg = "Vous avez saisi un email de contact invalid."
      } else if (!this.tools.ValidatePhone(this.selectedDriver.contactPhone)) {
        this.errorMsg = "Vous avez saisi un telephone de contact invalid."
      } else { */
      this.selectedContact.TypeContact = this.tools.set_typecontact(this.typeContact)
      this.dataService.updateContact(this.selectedContact)
        .pipe(
          catchError(err => {
            console.log("err", err)
            this.modalLoading = false;
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }
            else if (err.status == 400) {
              console.log(err);
              this.errorMsg = "Ce contact exist deja. Veuillez utiliser un autre Raison Sociale."
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

  delete(contact) {
    if (confirm("Are you sure to delete " + contact)) {
      var route = this.router
      var d = "?d=" + contact
      this.dataService.delContact(d).subscribe({
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
    type == 1 ? this.exportingPdfTool.exportPdf_Conducteurs(this.data, "Rapport de List Contacts ") :
      this.exportingExcelTool.ExportConducteurs(this.data, "Rapport de List Contacts ")
  }

  resetSelected() {
    this.selectedFieldModal.forEach((element, index) => {
      element.selected = [];
    });
  }

///////////// tel Contact

  loadTelData() {
      this.loading = true;
      var urlParams = "";
      if (this.selectedContact != null) {
        urlParams += "?cId=" + this.selectedContact.id
      }
      var route = this.router
      this.dataService.getTelContactData(urlParams).subscribe({
        next: (d: any) => {
          this.contact_data = d;
          console.log(d);
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

  loadTelModify(ev) {
    if (ev) {
      this.modeTel = "Modifier"
      this.selectedTelContact = new TelContact();
      this.selectedcivility = []
      var url = "?d=" + ev
      if (this.selectedContact != null) {
        url += "&cId=" + this.selectedContact.id
      }
      this.modalLoading = true;
      var route = this.router
      this.dataService.getTelContactData(url).subscribe({
        next: (d: any) => {
          if (d && d.length) {
            this.selectedTelContact = d[0];
            this.selectedcivility = this.selectedTelContact.Civility
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

  ajouterTel() {
    var route = this.router
    this.errorMsg = ""
    if (!this.selectedTelContact.id_contact && !this.selectedTelContact.Last_Name && !this.selectedTelContact.First_Name && !this.selectedTelContact.Tel1) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      //this.selectedContact.TypeContact = this.tools.set_typecontact(this.typeContact)
      this.selectedTelContact.id_contact = this.selectedContact.id
      this.dataService.addTelContact(this.selectedTelContact)

        .pipe(
          catchError(err => {
            console.log(this.selectedTelContact)
            console.log("res", err)
            this.modalLoading = false;
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }
            else if (err.status == 400) {
              console.log(err);
              this.errorMsg = "Ce contact exist deja. Veuillez utiliser un autre Raison Sociale."
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
            this.loadTelData()
            this.errorMsg = ""
          }
        })
    }
  }

  modifierTel() {
    var route = this.router
    this.openAlert = false
    this.errorMsg = ""
    // console.log("selectedDriver", this.selectedDriver)
    if (!this.selectedTelContact.id && !this.selectedTelContact.id_contact && !this.selectedTelContact.Last_Name && !this.selectedTelContact.First_Name && !this.selectedTelContact.Tel1) {
      this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
    } else {
      /* if (!this.tools.ValidateEmail(this.selectedDriver.contactEmail)) {
        this.errorMsg = "Vous avez saisi un email de contact invalid."
      } else if (!this.tools.ValidatePhone(this.selectedDriver.contactPhone)) {
        this.errorMsg = "Vous avez saisi un telephone de contact invalid."
      } else { */
      //this.selectedContact.TypeContact = this.tools.set_typecontact(this.typeContact)
      this.dataService.updateTelContact(this.selectedTelContact)
        .pipe(
          catchError(err => {
            console.log("err", err)
            this.modalLoading = false;
            if (err.status == 401) {
              route.navigate(['login'], { queryParams: { returnUrl: route.url } });
            }
            else if (err.status == 400) {
              console.log(err);
              this.errorMsg = "Ce contact exist deja. Veuillez utiliser un autre Raison Sociale."
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
            this.loadTelData()
            this.errorMsg = ""
            this.openAlert = true
          }
        })
      //}
    }
  }

   deleteTel(contact) {
     if (confirm("Are you sure to delete " + contact)) {
       var route = this.router
       var d = "?d=" + contact
       if (this.selectedContact != null) {
        d += "&cId=" + this.selectedContact.id
      }
       this.dataService.delTelContact(d).subscribe({
         next: (res) => {
          this.modeTel = "Ajouter"
           this.loadTelData()
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

  reset_tel() {
      this.modeTel = "Ajouter"
      this.selectedTelContact = new TelContact();
      this.selectedcivility = []
    }

  submit_tel() {
      if (this.modeTel == "Ajouter") this.ajouterTel()
      if (this.modeTel == "Modifier") this.modifierTel()
  }

  ////////////////////////////Site Contact

  loadSiteData() {
    this.loading = true;
    var urlParams = "";
    if (this.selectedContact != null) {
      urlParams += "?cId=" + this.selectedContact.id
    }
    var route = this.router
    this.dataService.getSiteContactData(urlParams).subscribe({
      next: (d: any) => {
        this.Site_data = d;
        console.log(d);
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

loadSiteModify(ev) {
  if (ev) {
    this.modeSite = "Modifier"
    this.selectedSiteContact = new SiteContact();
    //this.selectedcivility = []
    var url = "?d=" + ev
    if (this.selectedContact != null) {
      url += "&cId=" + this.selectedContact.id
    }
    this.modalLoading = true;
    var route = this.router
    this.dataService.getSiteContactData(url).subscribe({
      next: (d: any) => {
        if (d && d.length) {
          this.selectedSiteContact = d[0];
          //this.selectedcivility = this.selectedTelContact.Civility
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

ajouterSite() {
  var route = this.router
  this.errorMsg = ""
  if (!this.selectedSiteContact.id_contact && !this.selectedSiteContact.NameSite) {
    this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
  } else {
    //this.selectedContact.TypeContact = this.tools.set_typecontact(this.typeContact)
    this.selectedSiteContact.id_contact = this.selectedContact.id
    this.dataService.addSiteContact(this.selectedSiteContact)

      .pipe(
        catchError(err => {
          console.log(this.selectedSiteContact)
          console.log("res", err)
          this.modalLoading = false;
          if (err.status == 401) {
            route.navigate(['login'], { queryParams: { returnUrl: route.url } });
          }
          else if (err.status == 400) {
            console.log(err);
            this.errorMsg = "Ce contact exist deja. Veuillez utiliser un autre Raison Sociale."
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
          this.loadSiteData()
          this.errorMsg = ""
        }
      })
  }
}

modifierSite() {
  var route = this.router
  this.openAlert = false
  this.errorMsg = ""
  // console.log("selectedDriver", this.selectedDriver)
  if (!this.selectedSiteContact.id && !this.selectedSiteContact.id_contact && !this.selectedSiteContact.NameSite) {
    this.errorMsg = "Veuillez remplir les champs obligatoires (*) ."
  } else {
    /* if (!this.tools.ValidateEmail(this.selectedDriver.contactEmail)) {
      this.errorMsg = "Vous avez saisi un email de contact invalid."
    } else if (!this.tools.ValidatePhone(this.selectedDriver.contactPhone)) {
      this.errorMsg = "Vous avez saisi un telephone de contact invalid."
    } else { */
    //this.selectedContact.TypeContact = this.tools.set_typecontact(this.typeContact)
    this.dataService.updateSiteContact(this.selectedSiteContact)
      .pipe(
        catchError(err => {
          console.log("err", err)
          this.modalLoading = false;
          if (err.status == 401) {
            route.navigate(['login'], { queryParams: { returnUrl: route.url } });
          }
          else if (err.status == 400) {
            console.log(err);
            this.errorMsg = "Ce contact exist deja. Veuillez utiliser un autre Raison Sociale."
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
          this.loadSiteData()
          this.errorMsg = ""
          this.openAlert = true
        }
      })
    //}
  }
}

 deleteSite(contact) {
   if (confirm("Are you sure to delete " + contact)) {
     var route = this.router
     var d = "?d=" + contact
     if (this.selectedContact != null) {
      d += "&cId=" + this.selectedContact.id
    }
     this.dataService.delSiteContact(d).subscribe({
       next: (res) => {
        this.modeSite = "Ajouter"
         this.loadSiteData()
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

reset_Site() {
    this.modeSite = "Ajouter"
    this.selectedSiteContact = new SiteContact();
    //this.selectedcivility = []
  }

submit_Site() {
    if (this.modeSite == "Ajouter") this.ajouterSite()
    if (this.modeSite == "Modifier") this.modifierSite()
}
}


