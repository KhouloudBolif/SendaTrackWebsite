import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PeagesComponent } from './peages.component';

import { PeagesTableComponent } from './peages-table/peages-table.component';
import { MaterialsModule } from '../../../materials.module';
 
import { MyDropdownModule } from '../../components/my-dropdown/my-dropdown.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DropdownExportModule } from './../../components/dropdown-export/dropdown-export.module';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    MyDropdownModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    DropdownExportModule
  ],
  declarations: [
    PeagesComponent,
    PeagesTableComponent
  ],
  
})
export class PeagesModule {}
