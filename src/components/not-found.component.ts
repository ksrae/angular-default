import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';

    @Component({
        selector: 'not-found',
        templateUrl: '../templates/not-found.html',
        // styleUrls: ['../styles/not-found.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })

  export class NotFoundComponent implements OnInit {
    constructor(
      private cd: ChangeDetectorRef,
      private zone: NgZone
    ) {

    }

    ngOnInit() {

    }
  }
