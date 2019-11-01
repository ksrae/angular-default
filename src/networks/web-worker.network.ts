import { Subject } from 'rxjs';
import { Network } from '../interfaces/network.interface';

export class WebWorkerNetwork {
  private socketWorker: Worker;
  private socketResolves = [];
  private socketRejects = [];

  public workerSubject: Subject<any>;

  // worker.js
  private worker(url: string) {
    // console.log('worker');
    let socket: WebSocket = new WebSocket(url);

    addEventListener('message', (event: MessageEvent) => {
      // console.log('worker got message', socket.readyState, event.data);
      let message = event.data;
      if (socket && socket.readyState === WebSocket.OPEN && message) {
        socket.send(JSON.stringify(message));
      }
      socket.onopen = (e) => { };
      socket.onmessage = (e: MessageEvent) => {
        postMessage(e.data);
      };
      socket.onerror = (err) => {
        console.log('webworker error');
        postMessage('error');
      };
      socket.onclose = (close) => {
        console.log('webworker close');
        postMessage('close');
        socket.close();
      };
    }, false);
  }

  constructor(url: string) {
    this.workerSubject = new Subject<any>();

    if (this.isSupportBlob()) {
      const blobURL = this.getBlobUrl(url);
      try {
        this.socketWorker = new Worker(blobURL);
      } catch (e) {
        this.socketWorker = new Worker('assets/scripts/workers/socket.worker.js');
      }
    } else {
      // 에러로 처리하는게 나을 듯하다.
      console.log('blob not support');
    }

    this.socketWorker.onmessage = (e: MessageEvent) => {
      console.log('service::socket::response::', e);
      if (e.data === 'error' || e.data === 'close') {
        /* 여기로 에러가 오면 받질 못함. 
        *  왜냐면 서버에서 끊었기 때문에 열려있는 promise가 없기 때문임.
        *  에러를 모두 한꺼번에 처리하려면 Subject로 처리하고, 
        *  정상 에러와 close를 구분하려면 resject를 살린다.
        */
        this.workerSubject.next(e.data);
      } else {
        const data = <Network.Socket.Response>JSON.parse(<any>e.data);
        // request - response
        // 이 부분은 서버의 리턴형에 따라 변경되어야 한다.
        if (data.networkType == Network.NetworkType.RESPONSE) {
          const resolve = this.socketResolves[data.trCode];
          const reject = this.socketRejects[data.trCode];
  
          if (resolve && data.result === Network.ResponseCode.SUCCESS) {
            resolve(data.message);              
            this.socketRejects[data.trCode] = undefined;
          } else if(reject && data.result !== Network.ResponseCode.SUCCESS) {
            reject(data);  
            this.socketRejects[data.trCode] = undefined;
          }
          // this.socketResolves = null;
        }
        // push
        else if (data.networkType == Network.NetworkType.PUSH) {
          // 이 지점을 push로 판단.
          this.workerSubject.next(data);
        }
      }
    };
  }

  public request(request: any) {
    // console.log('service::socket::send::');
    return new Promise((resolve, reject) => {
      this.socketResolves[request.trCode] = resolve;
      this.socketRejects[request.trCode] = reject;

      this.socketWorker.postMessage(request);
    });
  }

  public push(request: any) {
    this.socketWorker.postMessage(request);
  }

  private getBlobUrl(url: string) {
    let dataObj = '(function ' + this.worker + ')("' + url + '")';
    let blob = new Blob([dataObj.replace('"use strict";', '')]);
    const blobURL = (window.URL ? window.URL : (<any>window).webkitURL).createObjectURL(blob, {
      type: 'application/javascript; charset=utf-8'
    });
    return blobURL;
  }

  private isSupportBlob() {
    return window.Blob && window.URL.createObjectURL;
  }

}
