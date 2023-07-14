import { Component, OnInit } from '@angular/core';
import { util } from 'src/app/tools/utils';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  constructor(public tools: util,) { }

  Maintenance_PlanEntretien = false
  Maintenance_Pneu = false
  Maintenance_Accidents = false
  Maintenance_Consommation = false
  Maintenance_Vehicules= false
  Maintenance_Cartecarburant = false 
   Maintenance_Peages= false
   Maintenance_DemandesIntervention=false
  ngOnInit(): void {
    
    this.Maintenance_PlanEntretien = this.tools.isAuthorized('Maintenance_PlanEntretien', 'Afficher')
    this.Maintenance_Pneu = this.tools.isAuthorized('Maintenance_Pneu', 'Afficher')
    this.Maintenance_Accidents = this.tools.isAuthorized('Maintenance_Accidents', 'Afficher')
    this.Maintenance_Consommation = this.tools.isAuthorized('Maintenance_Consommation', 'Afficher')
    this.Maintenance_Cartecarburant = this.tools.isAuthorized('Maintenance_Cartecarburant', 'Afficher')
    this.Maintenance_Peages= this.tools.isAuthorized('Maintenance_Peages', 'Afficher')
    this.Maintenance_Vehicules= this.tools.isAuthorized('Maintenance_Vehicules', 'Afficher')
    this.Maintenance_DemandesIntervention= this.tools.isAuthorized('Maintenance_DemandesIntervention', 'Afficher')

    // console.log("Maintenance_PlanEntretien",this.Maintenance_Consommation,this.Maintenance_Accidents,this.Maintenance_Pneu,this.Maintenance_PlanEntretien);
  }

}
