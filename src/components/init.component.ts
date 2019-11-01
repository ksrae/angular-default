import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';

    @Component({
        selector: 'app-root',
        templateUrl: '../templates/init.html',
        // styleUrls: ['../styles/not-found.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })

  export class InitComponent implements OnInit {
    constructor(
      private cd: ChangeDetectorRef,
      private zone: NgZone
    ) {

    }

    ngOnInit() {

    }
  }
