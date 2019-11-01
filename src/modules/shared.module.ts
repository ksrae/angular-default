import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
// module
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';

import { MomentPipe } from '../pipes/moment.pipe';
// mapper
// export class HammerConfig extends HammerGestureConfig  {
//   overrides = {
//     'swipe': {
//       direction: Hammer.DIRECTION_ALL
//      }
//   };



@NgModule({
  declarations: [
    MomentPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MomentPipe
  ]
})

export class SharedModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [
  //       // {
  //       //   provide: HAMMER_GESTURE_CONFIG,
  //       //   useClass: HammerConfig
  //       // }

  //     ]
  //   };
  // }
}
