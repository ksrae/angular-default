import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    //{ path: '', redirectTo: '', pathMatch: 'full' }

  ]}
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
  })

export class HomeRouting { }
