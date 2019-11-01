import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { ModalHelper } from '../../helpers/modal.helper';

@Component({
    selector: 'modal-network-error',
    templateUrl: '../../templates/modal/modal-network-error.html',
    // styleUrls: ['../../styless/modal/modal-network-error.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModalNetworkErrorComponent implements OnInit, OnDestroy {
  constructor(
    private modalHelper: ModalHelper,
    private cd: ChangeDetectorRef,
    private zone: NgZone) {

  }
  ngOnInit() {

  }

  close(e: Event) {
    e.preventDefault();
    this.modalHelper.shut(false);
  }

  ngOnDestroy() {

  }
}
