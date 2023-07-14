// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { GestionContactComponent } from './gestionContact.component';

// Forms Component
import { MyGestionContactTableComponent } from './my-gestionContact-table/my-gestionContact-table.component';
import { MyTelContactTableComponent } from './my-Tel-Contact-table/my-Tel-Contact-table.component';
import { MySiteContactTableComponent } from './my-Site-Contact-table/my-Site-Contact-table.component';

import { MaterialsModule } from '../../materials.module';
// Components Routing
import { MyDateRangePickerModule } from '../components/my-date-range-picker/my-daterangepicker.module';
import { MyDropdownModule } from '../components/my-dropdown/my-dropdown.module';
import { MatSelectModule } from '@angular/material/select';
// import { ApiService } from '../../services/aPI_Addresse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DropdownExportModule } from './../components/dropdown-export/dropdown-export.module';
import { SharedModule } from '../components/shared.module';
import { GestionContactRoutingModule} from './gestionContact-routing.module'
// import { GooglePlaceModule } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MaterialsModule,
    MyDateRangePickerModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    DropdownExportModule,
    GestionContactRoutingModule,
    SharedModule,
    // MyDropdownModule,
    // GooglePlaceModule
  ],
  providers: [
    // ApiService,
  ],
  declarations: [
    GestionContactComponent,
    MyGestionContactTableComponent,
    MyTelContactTableComponent,
    MySiteContactTableComponent

  ]
})
export class GestionContactModule { }
