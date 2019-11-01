import { Subject } from 'rxjs';
import { Network } from '../interfaces/network.interface';

export class SharedWorkerNetwork {
  private socketWorker: SharedWorker.SharedWorker;
  private socketResolves = [];
  private socketRejects = [];

  public workerSubject: Subject<any>;

  private sharedWorker(url: string) {
    console.log('sharedworker', url);
    let socket = new WebSocket(url);
    let port;

    addEventListener('connect', (e: MessageEvent) => {
      console.log('|| sharedWorker ||', e);
      port = e.ports[0];

      port.addEventListener('message', (event: MessageEvent) => {
        const message = event.data;
        if (socket && socket.readyState === WebSocket.OPEN && message) {
          socket.send(JSON.stringify(message));
        }
        socket.onopen = (open) => { };
        socket.onmessage = (event) => {
          port.postMessage(event.data);
        };
        socket.onerror = (err) => {
          port.postMessage('error');
        };

        socket.onclose = (close) => {
          port.postMessage('close');
          socket.close();
        };
      }, false);
      port.start();
    }, false);
  }

  constructor(url: string) {
    this.workerSubject = new Subject<any>();

    if (this.isSupportBlob()) {
      const blobURL = this.getBlobUrl(url);
      this.socketWorker = new SharedWorker(blobURL);
      this.socketWorker.port.start();
    } else {
      // 에러로 처리하는게 나을 듯하다.
      console.log('blob not support');
    }

    this.socketWorker.port.onmessage = (e: MessageEvent) => {
      console.log('sharedworker -> sharedoworker.network' , e );

      if (e.data === 'error' || e.data === 'close') {
        /* 여기로 에러가 오면 받질 못함. 
        *  왜냐면 서버에서 끊었기 때문에 열려있는 promise가 없기 때문임.
        *  에러를 모두 한꺼번에 처리하려면 Subject로 처리하고, 
        *  정상 에러와 close를 구분하려면 resject를 살린다.
        */
        this.workerSubject.next(e.data);
      }
      else {
        // const data = JSON.parse(e.data);

        const data = <Network.Socket.Response>JSON.parse(<any>e.data);
        // request - response
        // 이 부분은 서버의 리턴형에 따라 변경되어야 한다.
        if (data.networkType == Network.NetworkType.RESPONSE) {
          const resolve = this.socketResolves[data.trCode];
          const reject = this.socketRejects[data.trCode];
          
          if(resolve && data.result === Network.ResponseCode.SUCCESS) {
            resolve(data.message);              
            this.socketRejects[data.trCode] = undefined;
          } else if(reject && data.result !== Network.ResponseCode.SUCCESS) {
            // 공통에러
            // this.workerSubject.next(data.result);
            // 구분에러
            reject(data);  
            this.socketRejects[data.trCode] = undefined;
          }
        }
        else if (data.networkType == Network.NetworkType.PUSH) {
          // 이 지점을 push로 판단.
          this.workerSubject.next(data);
        }
      }
      
    };

    // error
    this.socketWorker.onerror = (err) => {
      console.log('err.message', err.message);
      this.socketWorker.port.close();
    };
  }



  public request(request: any) {
    console.log('service::socket::request::', request);
    return new Promise((resolve, reject) => {        
      this.socketResolves[request.trCode] = resolve;
      this.socketRejects[request.trCode] = reject;
      this.socketWorker.port.postMessage(request);        
    });
  }

  public push(request: any) {
    // console.log('service::socket::push::');
    this.socketWorker.port.postMessage(request);
  }

  /**
   * Browser의 Blob 지원 여부를 확인 한다.
   * @private
   * @returns {boolean}
   * @memberof SharedWorkerNetwork
   */
  private isSupportBlob() {
    return window.Blob && window.URL.createObjectURL;
  }

  /**
   * Class Method를 String으로 변환(lnlineJs)하여
   * SharedWorker에서 동작할 JS를 포함한 Blob를 반환 한다.
   * @private
   * @param {string} url
   * @returns
   * @memberof SharedWorkerNetwork
   */
  private getBlobUrl(url: string) {
    const dataObj = '(function ' + this.sharedWorker + ')("' + url + '")';
    const blob = new Blob([dataObj.replace('"use strict";', '')]);
    const blobURL = (window.URL ? window.URL : (<any>window).webkitURL).createObjectURL(blob, {
      type: 'application/javascript; charset=utf-8'
    });
    return blobURL;
  }

}
