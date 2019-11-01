import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// module
// import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from '../modal/modal.module';
import { SharedModule } from '../shared.module';
// material

// routing
import { HomeRouting } from './home.routing';
// component
import { HomeComponent } from '../../components/home/home.component';
// import { AuthGuard } from '../../guards/auth.guard';

// services

// directives // 하위 모듈로 공유가 안된다.

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
	HomeRouting,
	ModalModule,
    SharedModule
  ],
  exports: [

  ],
  providers: [

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomeModule { }
