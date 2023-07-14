import { CrudBillComponent } from './billing/crud-bill.component';
import { AchatComponent } from './achat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from 'src/app/guards/permissions.guard';
import { CrudorderFormComponent } from './order-form/crudorder-form.component';
import { CrudDeliveryNoteComponent } from './delivery-note/crud-delivery-note.component';
import { BankComponent } from './bank/bank.component';
import { SettlementComponent } from './settlement/settlement.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Achat'
    },
    children: [
      {
        path: '',
        component: AchatComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'order-form',
        component: CrudorderFormComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Parametrage_Utilisateur',
          title: 'Bon de Commande'
        }
      },
      {
        path: 'delivery-note',
        component: CrudDeliveryNoteComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Parametrage_Utilisateur',
          title: 'Bon de livraison'
        }
      },
      {
        path: 'billing',
        component: CrudBillComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Parametrage_Utilisateur',
          title: 'Facturation'
        }
      }
      ,
      {
        path: 'bank',
        component: BankComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Parametrage_Utilisateur',
          title: 'Banque'
        }
      },
      {
        path: 'settlement',
        component: SettlementComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissionKey:'Parametrage_Utilisateur',
          title: 'Reglement'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchatRoutingModule { }
