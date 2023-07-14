import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component'
import { PlanComponent } from './planentretien/plan.component';
import { ConsommcarburantComponent } from './gestioncarburant/consommcarburant.component';
import { PermissionsGuard } from 'src/app/guards/permissions.guard';
import { PneuComponent } from './pneu/pneu.component';
import { AccidentsComponent } from './accidents/accidents.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { DemandeinterventionsComponent } from './demandeinterventions/Demandeinterventions.component';

import{ CartecarburantComponent} from'./cartecarburant/cartecarburant.component';
import { PeagesComponent} from './peages/peages.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Maintenance'
    },
    children: [
      {
        path: '',
        component: MaintenanceComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'planentretien',
        component: PlanComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Maintenance_PlanEntretien',
          title: 'Plan Entretien'
        }
      },
      {
        path: 'gestioncarburant',
        component: ConsommcarburantComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Maintenance_Consommation',
          title: 'Carte Carburant'
        }
      },
      {
        path: 'pneu',
        component: PneuComponent,
        data: {
          title: 'Pneu'
        }
      },
      {
        path: 'accidents',
        component: AccidentsComponent,
        data: {
          title: 'Accidents'
        }
      },
      {
        path: 'demandeinterventions',
        component: DemandeinterventionsComponent,

        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Maintenance_Interventions',
          title: 'Carte Carburant'
        }
      },
      {
        path: 'cartecarburant',
        component:  CartecarburantComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Maintenance_Cartecarburant',
          title: 'Carte Carburant'
        }
      },
      {
        path: 'péages',
        component: PeagesComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Maintenance_Peages',
          title: 'Péages'
        }
      },
    
      {
        path: 'vehicule',
        component: VehiculeComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Maintenance_Vehicules',
          title: 'Vehicule'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
