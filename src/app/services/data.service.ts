import { Bank } from './../models/banque';
import { DeliveryNote } from './../models/deliveryNote';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Device } from '../models/device';
import { Driver } from '../models/driver';
import { Groupevehicules } from '../models/groupevehicules';
import { Consommation } from '../models/Consommation';
import { Employee } from "../models/employee";
import { OrderForm } from "../models/orderForm";
import { Bill } from '../models/bill';
import { Article } from '../models/Article';
import { SiteContact } from '../models/SiteContact';
import { Contact } from '../models/Contact';
import { TelContact } from '../models/TelContact';
import { BankPerson } from '../models/bankPerson';
import { Settlement } from '../models/settlement';
import { CarteCarburant } from '../models/carteCarburant';
import { Peages } from '../models/peages';
import { Vehicules } from '../models/vehicules';
import { Demandeinterventions } from '../models/Demandeinterventions';
import {intervention} from '../models/intervention';
@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpClient, private JWT: JwtService) {
  }

  upload(file: any, extra = "") {
    let SERVER_URL = environment.apiUrl + "upload" + extra;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });

    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    return this.http.post(SERVER_URL, formData, {
      headers: headers
    })
  }

  getDocsUrl(extra = "") {
    let SERVER_URL = environment.apiUrl + "getDocsUrl" + extra;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  deleteFile(id) {
    let SERVER_URL = environment.apiUrl + "deleteFile?id=" + id;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getVehicule(extra = "") {
    let SERVER_URL = environment.apiUrl + "vehicule" + extra;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  generateTrackToken(extra = "") {
    let SERVER_URL = environment.apiUrl + "generateTrackToken" + extra;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getStatistique(urlParams) {
    let SERVER_URL = environment.apiUrl + "statistique" + urlParams;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getRapportSynthetiques(urlParams) {
    let SERVER_URL = environment.apiUrl + "synthetiques" + urlParams;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getAllTrajets(urlParams) {
    let SERVER_URL = environment.apiUrl + "trajet-jour" + urlParams + "&k&na&da&dc&c&t&v&addi&addf";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getPoseFuel(urlParams) {
    let SERVER_URL = environment.apiUrl + "poseFuel" + urlParams;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  //fonction de detail
  getDetails(urldetails) {
    let SERVER_URL = environment.apiUrl + "eventspagination" + urldetails;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getEvolution(urldetails) {
    let SERVER_URL = environment.apiUrl + "eventsEvolution" + urldetails;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  // fonction de AlertPlanEntretien
  getPlanEntretien(urlplan) {
    let SERVER_URL = environment.apiUrl + "planEntretien" + urlplan;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  addPlanEntretien(plan) {
    let SERVER_URL = environment.apiUrl + "addPlanEntretien";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { u: JSON.stringify(plan) }

    })
  }

  updatePlanEntretien(plan) {
    let SERVER_URL = environment.apiUrl + "editPlanEntretien";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { u: JSON.stringify(plan) }

    })
  }

  delPlanEntretien(plan) {
    let SERVER_URL = environment.apiUrl + "deletePlanEntretien" + plan;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  updateStatusPlanEntretien(plan) {
    let SERVER_URL = environment.apiUrl + "updateStatusPlanEntretien" + plan;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }
  // fonction de notifications
  getNotifications(urlNotif) {
    let SERVER_URL = environment.apiUrl + "notif" + urlNotif;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getNotifRules(p) {
    let SERVER_URL = environment.apiUrl + "getNotifRules" + p;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  addRule(rule) {
    let SERVER_URL = environment.apiUrl + "createRule";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { u: JSON.stringify(rule) }

    })
  }

  updateRule(rule) {
    let SERVER_URL = environment.apiUrl + "editRule";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { u: JSON.stringify(rule) }

    })
  }

  delRule(rule) {
    let SERVER_URL = environment.apiUrl + "deleteRule" + rule;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getGroupedUnseenNotifs() {
    let SERVER_URL = environment.apiUrl + "getGroupedUnseenNotifs";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getDeviceData(urld) {
    let SERVER_URL = environment.apiUrl + "gestionvehicules" + urld;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getDriverData(urldriver) {
    let SERVER_URL = environment.apiUrl + "gestiondriver" + urldriver;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getGroupeVehicules(urlgrp) {
    let SERVER_URL = environment.apiUrl + "groupevehicules" + urlgrp;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getUsers(urluser) {
    let SERVER_URL = environment.apiUrl + "gestionusers" + urluser;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  addUsers(user: User) {
    let SERVER_URL = environment.apiUrl + "createUser";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { u: JSON.stringify(user) }

    })
  }

  updateUsers(user: User) {
    let SERVER_URL = environment.apiUrl + "editUser";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { u: JSON.stringify(user) }

    })
  }

  delUsers(u) {
    let SERVER_URL = environment.apiUrl + "deleteUser" + u;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  updateDevice(vehicule: Device) {
    let SERVER_URL = environment.apiUrl + "editVehicule";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { v: JSON.stringify(vehicule) }

    })
  }

  updateDeviceOffset(vehicule: any) {
    let SERVER_URL = environment.apiUrl + "editVehicule?offset=true";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { v: JSON.stringify(vehicule) }

    })
  }

  addDriver(driver: Driver) {
    let SERVER_URL = environment.apiUrl + "addDrivers";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(driver) }

    })
  }

  updateDriver(driver: Driver) {
    let SERVER_URL = environment.apiUrl + "editDrivers";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(driver) }

    })
  }

  delDriver(d) {
    let SERVER_URL = environment.apiUrl + "deleteDrivers" + d;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  addDevicesGroup(group: Groupevehicules) {
    let SERVER_URL = environment.apiUrl + "addGroupeVehicules";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { g: JSON.stringify(group) }
    })
  }

  updateDevicesGroup(group: Groupevehicules) {
    let SERVER_URL = environment.apiUrl + "editGroupeVehicules";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { g: JSON.stringify(group) }

    })
  }

  delDevicesGroup(g) {
    let SERVER_URL = environment.apiUrl + "deleteGroupeVehicules" + g;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  // get Consommation
  getConsommation(urlplan) {
    let SERVER_URL = environment.apiUrl + "consommation" + urlplan;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  // create consommation
  addConsommation(consommation: Consommation) {
    let SERVER_URL = environment.apiUrl + "addConsommation";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { c: JSON.stringify(consommation) }
    })
  }

  // edit consommation
  editConsommation(consommation: Consommation) {
    let SERVER_URL = environment.apiUrl + "editConsommation";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { c: JSON.stringify(consommation) }
    })
  }

  // delete consommation
  deleteConsommation(id) {
    let SERVER_URL = environment.apiUrl + "deleteConsommation" + id;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  /********** Add schema for device ******** */
  addShema(axe: any) {
    let SERVER_URL = environment.apiUrl + "addSchema";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { schema: JSON.stringify(axe) }

    })
  }

  /********** Get schema for device ******** */
  getSchema(url) {
    let SERVER_URL = environment.apiUrl + "schema" + url;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,

    })
  }

  /********** Delete axe for device ******** */
  deleteAxe(axe) {
    let SERVER_URL = environment.apiUrl + "deleteAxe";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { axe: JSON.stringify(axe) }
    })
  }

  /******** Add Document for Device ******* */
  AddOrUpdateDeviceDocument(endPoint, doc) {
    let SERVER_URL = environment.apiUrl + endPoint;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { doc: JSON.stringify(doc) }

    })
  }

  /******** Delete Document for Device ******* */
  deleteDeviceDocument(doc) {
    let SERVER_URL = environment.apiUrl + "deleteDocVehicule";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { doc: JSON.stringify(doc) }

    })
  }


  /******** Add Pneu for Device ******* */
  addPneu(pneu) {
    let SERVER_URL = environment.apiUrl + "addPneu";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { pneu: JSON.stringify(pneu) }

    })
  }

  /******** get All changements pneu ******* */
  getChangemantsPneu(deviceID) {

    let SERVER_URL = environment.apiUrl + "changementsPneu" + deviceID;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
    })
  }

  /******** Delete changements pneu ******* */
  deleteCangementPneu(idPneu) {
    let SERVER_URL = environment.apiUrl + "deleteChangementPneu" + idPneu;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,

    })
  }


  /******** Edit changements pneu ******* */
  updateCangementPneu(Pneu) {
    let SERVER_URL = environment.apiUrl + "editChangementPneu";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { pneu: JSON.stringify(Pneu) }
    })
  }


  /******** get All Device Documents ******* */
  getDeviceDocuments(url) {
    let SERVER_URL = environment.apiUrl + "getDocVehicule" + url;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
    })
  }


  /******** Add Driver Document ******* */
  addDriverDocument(doc) {
    let SERVER_URL = environment.apiUrl + "addDriverDocuments";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { doc: JSON.stringify(doc) }

    })
  }

  /******** Get Driver Document ******* */
  getDriverDocument(driverID) {
    let SERVER_URL = environment.apiUrl + "getDriverDocuments" + driverID;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
    })
  }


  getStream() {
    let SERVER_URL = 'http://api.tvmaze.com/search/shows?q=golden%20girls';
    // let params: {
    //   modules: 'A comma-delimited list of one or more insights to request.',
    //   id: 'An ID that uniquely identifies a video. The Video object\'s videoId field contains the ID that you set this parameter to.'
    // };
    let headers: {
      'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      'X-RapidAPI-Host': 'bing-video-search1.p.rapidapi.com'
    }
    return this.http.get(SERVER_URL, {
      headers: headers,
      // params: params
    })
  }


  /****************** Accidents Services **************** */
  saveAccident(accident) {
    let SERVER_URL = environment.apiUrl + "saveAccident";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { accident: JSON.stringify(accident) }

    })
  }

  getAccident(url) {
    let SERVER_URL = environment.apiUrl + "getAccidents" + url;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get<any>(SERVER_URL, {
      headers: headers,
    }
    )
  }


  deleteAccident(id) {
    let SERVER_URL = environment.apiUrl + "deleteAccident" + id;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
    }
    )
  }

  saveAccidentComment(comment, accident) {
    let SERVER_URL = environment.apiUrl + "saveAccidentComment" + accident;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { comment: JSON.stringify(comment) }

    })
  }

  getAccidentCommnet(accidentID) {
    let SERVER_URL = environment.apiUrl + "getAccidentComments" + accidentID;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get<any>(SERVER_URL, {
      headers: headers,
    })
  }

  deleteAccidentComment(id) {
    let SERVER_URL = environment.apiUrl + "deleteAccidentComment" + id;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
    }

    )
  }

  /*************** Assurance Services ***************** */

  savePlanAssurance(plan) {
    let SERVER_URL = environment.apiUrl + "saveAssurance";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { plan: JSON.stringify(plan) }

    })
  }

  getPlanAssurance() {
    let SERVER_URL = environment.apiUrl + "getPlan";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get<any>(SERVER_URL, {
      headers: headers,
    })
  }

  deletePlanAssurance(assuranceID) {
    let SERVER_URL = environment.apiUrl + "deletePlan" + assuranceID;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get<any>(SERVER_URL, {
      headers: headers,
    })
  }

  editPlanAssurance(plan) {
    let SERVER_URL = environment.apiUrl + "editPlan";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get<any>(SERVER_URL, {
      headers: headers,
      params: { plan: JSON.stringify(plan) }
    })
  }

  getEtapes() {
    let SERVER_URL = environment.apiUrl + "getEtapes";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
    })
  }
  saveEtape(etape) {
    let SERVER_URL = environment.apiUrl + "saveEtape";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { etape: JSON.stringify(etape) }
    })
  }

  // get docVehicule by idVehicule && type assurance
  getAssuranceVehicule(deviceID) {
    let SERVER_URL = environment.apiUrl + "getAssuranceVehicule" + deviceID;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
    })
  }

  ////////////////////// Auto reports /////////////////////

  getautoReports(options) {
    let SERVER_URL = environment.apiUrl + "getautoReports" + options;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
    })
  }

  addautoReports(rep) {
    let SERVER_URL = environment.apiUrl + "addautoReports";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(rep) }
    })
  }

  updateautoReports(rep) {
    let SERVER_URL = environment.apiUrl + "updateautoReports";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(rep) }
    })
  }

  deleteautoReports(id) {
    let SERVER_URL = environment.apiUrl + "deleteautoReports" + id;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get<any>(SERVER_URL, {
      headers: headers,
    })
  }

  ////////////////////// trajet planner /////////////////////

  getPlannedTrips(options) {
    let SERVER_URL = environment.apiUrl + "getPlannedTrips" + options;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
    })
  }

  addPlannedTrips(rep) {
    let SERVER_URL = environment.apiUrl + "addPlannedTrips";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.post(SERVER_URL, JSON.stringify(rep), {
      headers: headers,
    })
  }

  updatePlannedTrips(rep) {
    let SERVER_URL = environment.apiUrl + "updatePlannedTrips";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.post(SERVER_URL, JSON.stringify(rep), {
      headers: headers,
    })
  }

  deletePlannedTrips(id) {
    let SERVER_URL = environment.apiUrl + "deletePlannedTrips" + id;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get<any>(SERVER_URL, {
      headers: headers,
    })
  }
  //
  getArticleData(urlproduct) {
    let SERVER_URL = environment.apiUrl + "getProductt" + urlproduct;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,

    })
  }

  addArticle(product : Article) {
    let SERVER_URL = environment.apiUrl + "addProducts";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(product) }

    })
  }

  updateArticle(product : Article) {
    let SERVER_URL = environment.apiUrl + "editProducts";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(product) }

    })
  }

  delArticle(d) {
    let SERVER_URL = environment.apiUrl + "deleteProducts" + d;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }
  //
  getContactData(urlcontact) {
    let SERVER_URL = environment.apiUrl + "gestioncontact" + urlcontact;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  addContact(contact : Contact) {
    let SERVER_URL = environment.apiUrl + "addContacts";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(contact) }

    })
  }

  updateContact(contact : Contact) {
    let SERVER_URL = environment.apiUrl + "editContacts";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(contact) }

    })
  }

  delContact(d) {
    let SERVER_URL = environment.apiUrl + "deleteContacts" + d;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

   getTelContactData(urlTelcontact) {
    let SERVER_URL = environment.apiUrl + "gestionTelcontact" + urlTelcontact;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  addTelContact(Telcontact : TelContact) {
    let SERVER_URL = environment.apiUrl + "addTelContacts";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(Telcontact) }

    })
  }

  updateTelContact(Telcontact : TelContact) {
    let SERVER_URL = environment.apiUrl + "editTelContacts";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(Telcontact) }

    })
  }

  delTelContact(d) {
    let SERVER_URL = environment.apiUrl + "deleteTelContacts" + d;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  getSiteContactData(urlSitecontact) {
    let SERVER_URL = environment.apiUrl + "gestionSitecontact" + urlSitecontact;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  addSiteContact(Sitecontact : SiteContact) {
    let SERVER_URL = environment.apiUrl + "addSiteContacts";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(Sitecontact) }

    })
  }

  updateSiteContact(Sitecontact : SiteContact) {
    let SERVER_URL = environment.apiUrl + "editSiteContacts";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { d: JSON.stringify(Sitecontact) }

    })
  }

  delSiteContact(d) {
    let SERVER_URL = environment.apiUrl + "deleteSiteContacts" + d;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }
  ////////// employees

  getEmployees(url) {
    let SERVER_URL = environment.apiUrl + "gestionemployes" + url;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  addEmployee(employee: Employee) {
    let SERVER_URL = environment.apiUrl + "createEmployee";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { u: JSON.stringify(employee) }

    })
  }

  updateEmployee(e: Employee) {
    let SERVER_URL = environment.apiUrl + "editEmployee";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { e: JSON.stringify(e) }

    })
  }

  deleteEmployee(e) {
    let SERVER_URL = environment.apiUrl + "delEmployee" + e;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }
  ////////load countries

  loadParam(table, extra = "") {
    let SERVER_URL = environment.apiUrl + "loadParam";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get<any>(SERVER_URL, {
      headers: headers,
      params: { table: table, extra: extra }
    });
  }

  //orderForm

  getOrdersForm(url) {
    let SERVER_URL = environment.apiUrl + "ordersForm" + url;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  addOrderForm(o: OrderForm) {
    let SERVER_URL = environment.apiUrl + "createOrderForm";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.post(SERVER_URL, "", {
      headers: headers,
      params: { o: JSON.stringify(o) }

    })
  }

  updateOrderForm(o: OrderForm) {
    console.log(o);

    let SERVER_URL = environment.apiUrl + "editOrderForm";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.post(SERVER_URL, "", {
      headers: headers,
      params: { o: JSON.stringify(o) }

    })
  }

  delOrderForm(url) {
    let SERVER_URL = environment.apiUrl + "delOrderForm" + url;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })

  }
  // get suppliers
  getSuppliers(url) {
    let SERVER_URL = environment.apiUrl + "gestioncontact" + url;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  //delivery note


  getDeliveryNotes(url) {
    let SERVER_URL = environment.apiUrl + "delivery" + url;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }

  addDeliveryNote(dn: DeliveryNote) {
    let SERVER_URL = environment.apiUrl + "createDelivery";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.post(SERVER_URL, "", {
      headers: headers,
      params: { dn: JSON.stringify(dn) }
    })
  }

  updateDeliveryNote(dn: DeliveryNote) {
    let SERVER_URL = environment.apiUrl + "editDelivery";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.post(SERVER_URL, "", {
      headers: headers,
      params: { dn: JSON.stringify(dn) }

    })
  }

  delDeliveryNote(dn) {
    let SERVER_URL = environment.apiUrl + "delDelivery" + dn;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })

  }

    //bill
    getBills(url) {
      let SERVER_URL = environment.purchaseApi + "bills" + url;
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.get(SERVER_URL, {
        headers: headers
      })
    }

    addBill(bill: Bill) {
      // let SERVER_URL = environment.apiUrl + "createBill";
      let SERVER_URL = environment.purchaseApi + "createBill";
      let jwt = this.JWT.get();
      // console.log(jwt);

      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.post(SERVER_URL, "", {
        headers: headers,
        params: { bill: JSON.stringify(bill) }
      })
    }

    updateBill(bill: Bill) {
      let SERVER_URL = environment.purchaseApi + "editBill";
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.post(SERVER_URL, "", {
        headers: headers,
        params: { bill: JSON.stringify(bill) }

      })
    }

    delBill(url) {
      let SERVER_URL = environment.purchaseApi + "delBill" + url;
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.get(SERVER_URL, {
        headers: headers
      })

    }
    //banks
    getBanks(url) {
      let SERVER_URL = environment.purchaseApi + "banks" + url;
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.get(SERVER_URL, {
        headers: headers
      })
    }

    addBank(bank: Bank) {
      // let SERVER_URL = environment.apiUrl + "createBank";
      let SERVER_URL = environment.purchaseApi + "createBank";
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.post(SERVER_URL, "", {
        headers: headers,
        params: { bank: JSON.stringify(bank) }
      })
    }

    updateBank(bank: Bank) {
      let SERVER_URL = environment.purchaseApi + "editBank";
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.post(SERVER_URL, "", {
        headers: headers,
        params: { bank: JSON.stringify(bank) }

      })
    }

    delBank(url) {
      let SERVER_URL = environment.purchaseApi + "delBank" + url;
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.get(SERVER_URL, {
        headers: headers
      })

    }
    //BankPersons
    getbankPers(url) {
      let SERVER_URL = environment.purchaseApi + "bankPers" + url;
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.get(SERVER_URL, {
        headers: headers
      })
    }

    addBankPers(bp: BankPerson) {
      // let SERVER_URL = environment.apiUrl + "createBankPers";
      let SERVER_URL = environment.purchaseApi + "createBankPers";
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.post(SERVER_URL, "", {
        headers: headers,
        params: { bp: JSON.stringify(bp) }
      })
    }

    updateBankPers(bp: BankPerson) {
      let SERVER_URL = environment.purchaseApi + "editBankPers";
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.post(SERVER_URL, "", {
        headers: headers,
        params: { bp: JSON.stringify(bp) }

      })
    }

    delBankPers(url) {
      let SERVER_URL = environment.purchaseApi + "delBankPers" + url;
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.get(SERVER_URL, {
        headers: headers
      })

    }
    //Réglement
    getSettlements(url) {
      let SERVER_URL = environment.purchaseApi + "settlements" + url;
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.get(SERVER_URL, {
        headers: headers
      })
    }

    addSettlement(s: Settlement) {
      // let SERVER_URL = environment.apiUrl + "createSettlement";
      let SERVER_URL = environment.purchaseApi + "createSettlement";
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.post(SERVER_URL, "", {
        headers: headers,
        params: { s: JSON.stringify(s) }
      })
    }

    updateSettlement(s: Settlement) {
      let SERVER_URL = environment.purchaseApi + "editSettlement";
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.post(SERVER_URL, "", {
        headers: headers,
        params: { s: JSON.stringify(s) }

      })
    }

    delSettlement(url) {
      let SERVER_URL = environment.purchaseApi + "delSettlement" + url;
      let jwt = this.JWT.get();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwt,
        'Accept': 'application/json'
      });
      return this.http.get(SERVER_URL, {
        headers: headers
      })

    }

  //Carte Carburant

  getCarteCarburant(urlcartecarburant) {
    // let SERVER_URL = environment.apiUrl + "gestionCarburant" + urlcartecarburant;
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "gestionCarteCarburant" + urlcartecarburant;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })

  }
  addCarteCarburant(carteCarburant: CarteCarburant) {
    // let SERVER_URL = environment.apiUrl + "createCarteCarburant";
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "createCarteCarburant";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { u: JSON.stringify(carteCarburant) }

    })
  }
  delCarteCarburant(c) {
    // let SERVER_URL = environment.apiUrl + "deleteUser" + c;
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "delCarteCarburant" + c;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }
  updateCarteCarburant(CarteCarburant: CarteCarburant) {
    // let SERVER_URL = environment.apiUrl + "editCarteCarburant";
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "editCarteCarburant";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { id: JSON.stringify(CarteCarburant) }

    })
  }
  AssignmentCarteCarburant(CarteCarburant: CarteCarburant) {
    // let SERVER_URL = environment.apiUrl + "assignmentCarteCarburant";
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "assignmentCarteCarburant";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { id: JSON.stringify(CarteCarburant) }

    })
  }

  // Peages 
  getPeages(urlpeages) {
    // let SERVER_URL = environment.apiUrl + "gestionPeages" + urlpeages;
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "gestionPeages" + urlpeages;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })

  }

  delPeages(c) {
    // let SERVER_URL = environment.apiUrl + "delPeages" + c;
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "delPeages" + c;
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers
    })
  }
  addPeages(peages: Peages) {

    // let SERVER_URL = environment.apiUrl + "createPeages";
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "createPeages";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { u: JSON.stringify(peages) }

    })

  }

  updatePeages(peages: Peages) {
    // let SERVER_URL = environment.apiUrl + "editPeages";
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "editPeages";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { id: JSON.stringify(peages) }

    })
  }

  AssignmentCartePeages(CarteCarburant: CarteCarburant) {
    // let SERVER_URL = environment.apiUrl + "assignmentCarteCarburant";
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "assignmentCartePeages";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { id: JSON.stringify(CarteCarburant) }

    })
  }

  //api Cities 
  getCities(lang, country) {

    return this.http.get<any[]>('http://api.geonames.org/searchJSON?country=' + country + '&featureClass=P&lang=' + lang + '&username=KhouloudBolif');
  }
  //api country
  getCountry(lang) {
    return this.http.get<any[]>('http://api.geonames.org/countryInfoJSON?lang=' + lang + '&username=KhouloudBolif');
  }
  
  Getchartinfo(){
    return this.http.get("http://localhost:3000/sales");
    
//return this.http.get("http://localhost:3000/Adblue");
  }
  
//Vehicule 
getVehicules(urlpeages) {
  // let SERVER_URL = environment.apiUrl + "gestionVehicules" + urlpeages;
  let SERVER_URL = "http://127.0.0.1:8000/api/" + "gestionVehicules" + urlpeages;
  let jwt = this.JWT.get();
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + jwt,
    'Accept': 'application/json'
  });
  return this.http.get(SERVER_URL, {
    headers: headers
  })

}

delvehicules(c) {
  // let SERVER_URL = environment.apiUrl + "delVehicule" + c;
  let SERVER_URL = "http://127.0.0.1:8000/api/" + "delVehicule" + c;
  let jwt = this.JWT.get();
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + jwt,
    'Accept': 'application/json'
  });
  return this.http.get(SERVER_URL, {
    headers: headers
  })
}
addVehicules(Vehicule: Vehicules) {

    // let SERVER_URL = environment.apiUrl + "addVehicule";
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "addVehicule";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { u: JSON.stringify(Vehicule) }

    })

  }
  updateVehicule(Vehicule: Vehicules) {
    // let SERVER_URL = environment.apiUrl + "editVehicule";
    let SERVER_URL = "http://127.0.0.1:8000/api/" + "editVehicule";
    let jwt = this.JWT.get();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json'
    });
    return this.http.get(SERVER_URL, {
      headers: headers,
      params: { id: JSON.stringify(Vehicule) }

    })
  }
 // partie de demande interventions 
 getintervention(url) {
  let SERVER_URL = environment.host  +"getintervention" + url;

  let jwt = this.JWT.get();
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + jwt,
    'Accept': 'application/json'
  });
  return this.http.get(SERVER_URL, {
    headers: headers
  })
}
getdemandeur(url) {
  let SERVER_URL = environment.apiUrl + "gestioncontact" + url;
  let jwt = this.JWT.get();
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + jwt,
    'Accept': 'application/json'
  });
  return this.http.get(SERVER_URL, {
    headers: headers
  })
}
deleteintervention(u) {
  let SERVER_URL = environment.host + "deleteintervention" + u;
  let jwt = this.JWT.get();
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + jwt,
    'Accept': 'application/json'
  });
  return this.http.get(SERVER_URL, {
    headers: headers
  })
}

editintervention(intervention: intervention) {
  let SERVER_URL = environment.host + "editintervention";
  let jwt = this.JWT.get();
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + jwt,
    'Accept': 'application/json'
  });
  return this.http.get(SERVER_URL, {
    headers: headers,
    params: { e: JSON.stringify(intervention) }

  })
}
editinter(intervention: intervention) {
  let SERVER_URL = environment.host + "editinter";
  let jwt = this.JWT.get();
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + jwt,
    'Accept': 'application/json'
  });
  return this.http.get(SERVER_URL, {
    headers: headers,
    params: {id: JSON.stringify(intervention) }

  })
}
rejeterinter(intervention: intervention) {
  let SERVER_URL = environment.host + "rejeterinter";
  let jwt = this.JWT.get();
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + jwt,
    'Accept': 'application/json'
  });
  return this.http.get(SERVER_URL, {
    headers: headers,
    params: {id: JSON.stringify(intervention) }

  })
}
reparerinter(intervention: intervention) {
  let SERVER_URL = environment.host + "reparerinter";
  let jwt = this.JWT.get();
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + jwt,
    'Accept': 'application/json'
  });
  return this.http.get(SERVER_URL, {
    headers: headers,
    params: {id: JSON.stringify(intervention) }

  })
}
addIntervention(intervention: intervention ) {
  let SERVER_URL = environment.host + "addIntervention";
  let jwt = this.JWT.get();
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + jwt,
    'Accept': 'application/json'
  });
  return this.http.get(SERVER_URL, {
    headers: headers,
    params: { u: JSON.stringify(intervention) }

  })
}

gettypeintervention(url) {
let SERVER_URL = environment.apiUrl  + url;
let jwt = this.JWT.get();
let headers = new HttpHeaders({
  'Authorization': 'Bearer ' + jwt,
  'Accept': 'application/json'
});
return this.http.get(SERVER_URL, {
  headers: headers
})
}
getstatut(url) {
let SERVER_URL = environment.apiUrl  + url;
let jwt = this.JWT.get();
let headers = new HttpHeaders({
  'Authorization': 'Bearer ' + jwt,
  'Accept': 'application/json'
});
return this.http.get(SERVER_URL, {
  headers: headers
})
}
gettypepanne(url) {
let SERVER_URL = environment.host  + url;
let jwt = this.JWT.get();
let headers = new HttpHeaders({
  'Authorization': 'Bearer ' + jwt,
  'Accept': 'application/json'
});
return this.http.get(SERVER_URL, {
  headers: headers
})
}
getmatricule(url) {
let SERVER_URL = environment.apiUrl  + url;
let jwt = this.JWT.get();
let headers = new HttpHeaders({
  'Authorization': 'Bearer ' + jwt,
  'Accept': 'application/json'
});
return this.http.get(SERVER_URL, {
  headers: headers
})
}
getdescription(url) {
let SERVER_URL = environment.apiUrl  + url;
let jwt = this.JWT.get();
let headers = new HttpHeaders({
  'Authorization': 'Bearer ' + jwt,
  'Accept': 'application/json'
});
return this.http.get(SERVER_URL, {
  headers: headers
})
}
}
