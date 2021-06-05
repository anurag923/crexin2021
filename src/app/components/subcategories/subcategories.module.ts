import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { SubcategoriesComponent } from './subcategories.component';
import { SsidenavComponent } from './ssidenav/ssidenav.component';
import { SubcategorieslistComponent } from './subcategorieslist/subcategorieslist.component';
import { SharedModule } from '../../shared/shared/shared.module';

@NgModule({
  declarations: [SubcategoriesComponent, SsidenavComponent, SubcategorieslistComponent],
  imports: [
    CommonModule,
    SubcategoriesRoutingModule,
    SharedModule
  ],
  exports: [SubcategoriesComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SubcategoriesModule { }
