import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { SubcategoriesComponent } from './subcategories.component';
import { SsidenavComponent } from './ssidenav/ssidenav.component';
import { SubcategorieslistComponent } from './subcategorieslist/subcategorieslist.component';


@NgModule({
  declarations: [SubcategoriesComponent, SsidenavComponent, SubcategorieslistComponent],
  imports: [
    CommonModule,
    SubcategoriesRoutingModule
  ],
  exports: [SubcategoriesComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SubcategoriesModule { }
