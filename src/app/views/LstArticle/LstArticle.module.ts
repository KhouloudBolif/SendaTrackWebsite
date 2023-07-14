import { ApiService } from './../../services/aPI_Addresse.service';
// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


// Forms Component
import { MyLstArticleTableComponent } from './my-LstArticle-table/my-LstArticle-table.component';

import { MaterialsModule } from '../../materials.module';
// Components Routing
import { MyDateRangePickerModule } from '../components/my-date-range-picker/my-daterangepicker.module';
import { MyDropdownModule } from '../components/my-dropdown/my-dropdown.module';
import { MatSelectModule } from '@angular/material/select';
// import { ApiService } from '../../services/aPI_Addresse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DropdownExportModule } from '../components/dropdown-export/dropdown-export.module';
import { SharedModule } from '../components/shared.module';
import { LstArticleRoutingModule} from './LstArticle-routing.module'
import { LstArticleComponent } from './LstArticle.component';
// import { GooglePlaceModule } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.module';
// import { TranslateModule } from '@ngx-translate/core';

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
    LstArticleRoutingModule,
    SharedModule,
    MyDropdownModule,
    // GooglePlaceModule,
    // TranslateModule
  ],
  providers: [
    ApiService,
  ],
  declarations: [
    LstArticleComponent,
    MyLstArticleTableComponent,
  ]
})
export class LstArticletModule { }
