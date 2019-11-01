import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ModalHelper } from '../../helpers/modal.helper';

  @Component({
      selector: 'admin-home',
      templateUrl: '../../templates/home/home.html',
      styleUrls: ['../../styles/home/home.scss'],
      changeDetection: ChangeDetectionStrategy.OnPush
  })

export class HomeComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  groupUrl = new Array<string>();
  
  constructor(
    private router: Router,
    private modalHelper: ModalHelper,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {

  }

  ngOnInit() {
    this.setGroupUrl(this.router.url);
    
    this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(this.subscribeNavigationStart);
    this.router.events.pipe(filter(e => e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError)).subscribe(this.subscribeNavigationEnd);
  }

  subscribeNavigationStart = (event: NavigationStart) => {
    this.isLoading = true;
    this.zone.run(() => this.cd.markForCheck());
  }

  subscribeNavigationEnd = (event: NavigationEnd) => {
    this.modalHelper.shut();

    this.isLoading = false;
    this.setGroupUrl(event.urlAfterRedirects);
    this.zone.run(() => this.cd.markForCheck());
  }

  setGroupUrl(url: string) {
    this.groupUrl = url.split('/');
    this.groupUrl.length ? this.groupUrl.shift() : null;
    this.zone.run(() => this.cd.markForCheck());
  }
  ngOnDestroy() {

  }
}
