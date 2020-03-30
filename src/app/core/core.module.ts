import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SerialsComponent } from './serials/serials.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    SerialsComponent, 
    PageNotFoundComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class CoreModule { }
