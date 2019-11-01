import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Network } from '../interfaces/network.interface';
import { SharedWorkerNetwork } from '../networks/shared-worker.network';
import { WebWorkerNetwork } from '../networks/web-worker.network';
import { environment } from '../environments/environment';

/**
 * 소켓 통신 처리
 * push 데이터는 목적에 따라 해당 subject에 싣는다.
 * @export
 * @class SocketService
 */
@Injectable({
    providedIn: 'root'
})
export class SocketService {
    // 웹서버 소켓
    private dataSocket: SharedWorkerNetwork | WebWorkerNetwork;
    public isDataSocketConnected: boolean;

    // 시세
    public socketSubject: Subject<Network.Socket.Response>;

    /**
     * Creates an instance of SocketService.
     * sharedWorker를 지원하면 sharedWorker를 쓰고 그렇지 않으면 worker를 사용한다.
     * push 데이터를 subscribe 한 뒤 trcode에 따라 해당 처리 함수로 이동 시킨다.
     * @param {Mapper} mapper
     * @memberof SocketService
     */
    constructor(
        
    ) {

    }

    public onInit() {
        console.log('shared socket oninit');

        this.isDataSocketConnected = false;
        this.socketSubject = new Subject<Network.Socket.Response>();
        // 웹서버 소켓
        const host = environment.socket;

        if ((<any>window).SharedWorker) {
            this.dataSocket = new SharedWorkerNetwork(host);
        } else {
            // this.log.error('no sharedworker supported');
            this.dataSocket = new WebWorkerNetwork(host);
        }


        this.dataSocket.workerSubject.subscribe((data) => {
            console.log('this.workerSubject', data.result, data.message);
            this.socketSubject.next(data);
        });
    }
    // Session Server
    public async request(trCode: number, message: any) {
        console.log('request', trCode, message);
        let result: any;

        await this.dataSocket.request(<Network.Socket.Request>{
            trCode: trCode,
            message: message
        }).then((item) => {
            result = item;
        }).catch(err => {
            console.error('error response', err);
        });

        return result;
    }

    // Session Server
    public push(message: any) {
        console.log('push dataSocket', this.dataSocket);
        this.dataSocket.push(message);
    }

}
