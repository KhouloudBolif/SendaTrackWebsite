import { GestionemployesModule } from './gestionemployes/gestionemployes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevModuleRoutingModule } from './dev-module-routing.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DevModuleRoutingModule,
    GestionemployesModule
  ]
})
export class DevModuleModule { }
