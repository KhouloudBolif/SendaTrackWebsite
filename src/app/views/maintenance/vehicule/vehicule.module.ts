import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';



// Forms Component

import { MaterialsModule } from '../../../materials.module';
// Components Routing
import { MyDateRangePickerModule } from '../../components/my-date-range-picker/my-daterangepicker.module';
import { MyDropdownModule } from '../../components/my-dropdown/my-dropdown.module';
import { MatSelectModule } from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DropdownExportModule } from './../../components/dropdown-export/dropdown-export.module';
import { VehiculeComponent } from './vehicule.component';
import { TableVehiculeComponent } from './table-vehicule/table-vehicule.component';
import  { TabsModule } from 'ngx-bootstrap/tabs'
import{DetailComponent} from'./detail/detail.component'
import { DatePipe } from '@angular/common';
@NgModule({
  providers: [DatePipe],
  declarations: [
    VehiculeComponent,
    TableVehiculeComponent,
    DetailComponent
  ],
  imports: [
    TabsModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
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
export class VehiculeModule { }
