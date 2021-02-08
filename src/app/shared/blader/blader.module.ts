import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IconModule } from '../icon/icon.module';

import {
  BladerComponent,
  CanDeactivateBladerComponent
} from './blader/blader.component';
import { BladeComponent } from './blade/blade.component';
import { BladeManager } from './bladeManager.service';

const BLADER_ROUTES = [
  {
    path: 'blader/:entry',
    component: BladerComponent,
    canDeactivate: [CanDeactivateBladerComponent]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BLADER_ROUTES),
    IconModule
  ],
  declarations: [
    BladerComponent,
    BladeComponent
  ],
  exports: [
    BladerComponent
  ],
  providers: [
    BladeManager,
    CanDeactivateBladerComponent
  ]
})
export class BladerModule { }
