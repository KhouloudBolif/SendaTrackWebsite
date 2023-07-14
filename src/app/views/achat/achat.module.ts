import { BankModule } from './bank/bank.module';
import { SettlementModule } from './settlement/settlement.module';
import { BillingModule } from './billing/billing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TabsModule } from 'ngx-bootstrap/tabs';
// import {FormsModule} from "@angular/forms";


import { AchatRoutingModule } from './achat-routing.module';
import { AchatComponent } from './achat.component';
import { SharedModule } from '../components/shared.module';
import { OrderFormModule } from './order-form/order-form.module';
import { DeliveryNoteModule } from './delivery-note/delivery-note.module';
import { MaterialsModule } from 'src/app/materials.module';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AchatComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // TabsModule,
    MatSelectModule,
    MaterialsModule,
    SharedModule,
    AchatRoutingModule,
    OrderFormModule,
    DeliveryNoteModule,
    BillingModule,
    BankModule,
    SettlementModule
  ]
})
export class AchatModule { }
