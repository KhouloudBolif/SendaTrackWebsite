import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CartecarburantComponent } from './cartecarburant.component';

//gestion de tableau 
import{GestioncarburantTableComponent} from './gestioncarburant-table/gestioncarburant-table.component';


import { MaterialsModule } from '../../../materials.module';
// Components Routing
import { MyDropdownModule } from '../../components/my-dropdown/my-dropdown.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DropdownExportModule } from './../../components/dropdown-export/dropdown-export.module';
import { MatSelectModule } from '@angular/material/select';
//import { NgJsonEditorModule } from './jsoneditor/jsoneditor.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
   // NgJsonEditorModule,
    MyDropdownModule,
    ModalModule.forRoot(),
    MatSelectModule,
    CollapseModule.forRoot(),
    DropdownExportModule
  ],
  declarations: [
    CartecarburantComponent,
    GestioncarburantTableComponent
  ],
})
export class CartecarburantModule {}
