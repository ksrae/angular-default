import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// module
import { SharedModule } from '../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
// material

// routing

// guard

// component
import { ModalContainerComponent } from '../../components/modal/modal-container.component';
import { ModalNetworkErrorComponent } from '../../components/modal/modal-network-error.component';

// services


// directives // 하위 모듈로 공유가 안된다.

@NgModule({
  declarations: [
    ModalContainerComponent,
    ModalNetworkErrorComponent
  ],
  imports: [
    // TranslateModule.forChild(),
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ModalContainerComponent
  ],
  providers: [

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ModalModule { }
