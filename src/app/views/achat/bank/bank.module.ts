import { BankTableComponent } from './bank-table/bank-table.component';
import { BankComponent } from './bank.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownExportModule} from "../../components/dropdown-export/dropdown-export.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialsModule} from "../../../materials.module";
import {MyDropdownModule} from "../../components/my-dropdown/my-dropdown.module";
import {ModalModule} from "ngx-bootstrap/modal";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {ChartsModule} from "ng2-charts";
import {MyDateRangePickerModule} from "../../components/my-date-range-picker/my-daterangepicker.module";
import { BankPersonTableComponent } from './bank-person-table/bank-person-table.component';
import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [
    BankComponent,
    BankTableComponent,
    BankPersonTableComponent
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
    DropdownExportModule,
    TabsModule,
  ]
})
export class BankModule { }
