import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionContactComponent } from './gestionContact.component'
import {PermissionsGuard} from '../../guards/permissions.guard'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Contact info'
    },
    children: [
      {
        path: '',
        component: GestionContactComponent,
        data: {
          title: ''
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionContactRoutingModule { }
