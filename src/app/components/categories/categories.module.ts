import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategorieslistComponent } from './categorieslist/categorieslist.component';
import { CsidenavComponent } from './csidenav/csidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoriesComponent, CategorieslistComponent, CsidenavComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CategoriesComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CategoriesModule { }

