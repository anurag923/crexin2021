import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleproductRoutingModule } from './singleproduct-routing.module';
import { SingleproductComponent } from './singleproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  declarations: [SingleproductComponent],
  imports: [
    CommonModule,
    SingleproductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ]
})
export class SingleproductModule { }
