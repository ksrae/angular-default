import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
// service
import { ModalHelper } from '../../helpers/modal.helper';
// interface
import { Modal } from '../../interfaces/common.interface';


/**
 * 모든 모달을 관리
 * @export
 * @class ModalContainerComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'modal-container',
  templateUrl: '../../templates/modal/modal-container.html',
  // styleUrls: ['../../styles/modal/m.modal-container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalContainerComponent implements OnInit, OnDestroy {
   ModalType = Modal.Type;
   modalOption: Modal.Option;
   modalSubscription: Subscription;
   
  constructor(
    private modalHelper: ModalHelper,
    private cd: ChangeDetectorRef,
    private zone: NgZone) {

  }

  ngOnInit() {
    console.log('modal-container');
    this.modalSubscription = this.modalHelper.modalSubject.subscribe(this.subscribeModalSubject);
  }

  subscribeModalSubject = (item: Modal.Option) => {
    if (item && item.type != undefined) {
      this.modalOption = item;
      this.zone.run(() => this.cd.markForCheck());
    }

  }

  /**
   * 열려있는 popup을 닫는다.
   * @memberof ModalContainerComponent
   */
  closeModal() {
    this.modalHelper.shut();
  }

  ngOnDestroy() {
    
  }
}
