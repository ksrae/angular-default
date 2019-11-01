import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Modal } from '../interfaces/common.interface';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ModalHelper {
    public modalSubject: BehaviorSubject<Modal.Option>;
    public modalResultSubject: Subject<any>;

    constructor() {
        this.modalSubject = new BehaviorSubject<Modal.Option>({type: Modal.Type.NONE});
        this.modalResultSubject = new Subject<any>();

    }
    // loanQuit(message?: any) {
    //     this.set({
    //         type: ICommon.Modal.Type.LOANQUIT,
    //         message: message
    //     });   
    // }
    networkError() {
        this.set({type: Modal.Type.NETWORKERROR});

        return new Promise<boolean>((resolve, reject) => {
            this.modalResultSubject.pipe(first()).subscribe((result: any) => {
                resolve(result);
            });
        });
    }
    /**
     * 모달을 종료한다.
     * 만일 리턴이 필요한 경우 파라미터를 boolean으로 호출하고, (true: 확인, false: 취소)
     * 리턴이 필요없는 alert 형태는 파라미터 없이 호출한다.
     * @param {boolean} [result=null]
     * @memberof ModalHelper
     */
    shut(result: any = null) {
        this.set({type: Modal.Type.NONE});

        if (result !== null) {
            this.modalResultSubject.next(result);
        }
    }

    private set(option: Modal.Option) {
        this.modalSubject.next(option);
    }
}
