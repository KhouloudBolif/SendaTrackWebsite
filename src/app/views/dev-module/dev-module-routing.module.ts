import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudemployeeComponent } from './gestionemployes/crudemployee.component';
import { PermissionsGuard } from 'src/app/guards/permissions.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dev Module'
    },
    children: [
      // {
      //   path: '',
      //   component: AchatComponent,
      //   data: {
      //     title: ''
      //   }
      // },
      {
        path: 'employees',
        component: CrudemployeeComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Parametrage_Utilisateur',
          title: 'Employés'
        }
      },
      {
        path: 'achat',
        component: CrudemployeeComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Parametrage_Utilisateur',
          title: 'Employés'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevModuleRoutingModule { }
