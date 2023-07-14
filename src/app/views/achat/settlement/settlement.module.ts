import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownExportModule} from "../../components/dropdown-export/dropdown-export.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialsModule} from "../../../materials.module";
import {MyDropdownModule} from "../../components/my-dropdown/my-dropdown.module";
import {ModalModule} from "ngx-bootstrap/modal";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {ChartsModule} from "ng2-charts";


import { SettlementComponent } from './settlement.component';
import { SettlementTableComponent } from './settlement-table/settlement-table.component';
import { MyDateRangePickerModule } from '../../components/my-date-range-picker/my-daterangepicker.module';



@NgModule({
  declarations: [
    SettlementComponent,
    SettlementTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
      ChartsModule,
      MaterialsModule,
      MyDateRangePickerModule,
      MyDropdownModule,
      ReactiveFormsModule,
      ModalModule.forRoot(),
      CollapseModule.forRoot(),
      DropdownExportModule
  ]
})
export class SettlementModule { }
