import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from '../components/not-found.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', loadChildren: () => import ('./home/home.module').then(m=> m.HomeModule), data: { preload: true } },
    // { path: 'login', loadChildren: './login/login.module#LoginModule', data: {preload: true}},
    // { path: 'register', loadChildren: './register/register.module#RegisterModule', data: {preload: true}},
    { path: '**', component: NotFoundComponent }
  ]}
];

@NgModule({
  imports: [
    // https://angular.io/api/router/ExtraOptions
    RouterModule.forRoot(routes,
      {
        enableTracing: false,
        useHash: false,
        onSameUrlNavigation: 'ignore',
        preloadingStrategy: PreloadAllModules,
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        relativeLinkResolution: 'corrected',
        urlUpdateStrategy: 'deferred' // eager
      }
    )],
  exports: [ RouterModule ]
})

export class InitRouting {}

