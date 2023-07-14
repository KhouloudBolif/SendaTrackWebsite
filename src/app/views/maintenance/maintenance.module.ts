import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { SharedModule } from '../components/shared.module';
import { PlanentretienModule } from './planentretien/planentretien.module';
import { GestioncarburantModule } from './gestioncarburant/gestioncarburant.module';
import { PneuModule } from './pneu/pneu.module';
import { AccidentsModule } from './accidents/accidents.module';
import { VehiculeModule} from './vehicule/vehicule.module';
import { DemandeinterventionsModule} from './demandeinterventions/Demandeinterventions.Module';
import { CartecarburantModule } from './cartecarburant/cartecarburant.module';
import{ PeagesModule} from './peages/peages.module';
@NgModule({
  declarations: [
    MaintenanceComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaintenanceRoutingModule,
    GestioncarburantModule,
    PlanentretienModule,
    PneuModule,
    AccidentsModule,
    PeagesModule,
    CartecarburantModule,
    DemandeinterventionsModule,
    VehiculeModule,
  ]
})
export class MaintenanceModule { }
