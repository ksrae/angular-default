import { Injectable } from '@angular/core';
import { Network } from '../interfaces/network.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpNetwork {
  private httpWorker: Worker;
  private httpResolves: any;
  private httpRejects: any;

  constructor() {
    // 만일 worker를 지원하지 않을 경우 대처 방안 필요.
    // ie10까지 지원되므로 브라우저의 제한을 둘 필요가 있으며 가능한 worker를 활용하는 방안으로 가는 것이 효율적.
    this.httpResolves = {};
    this.httpRejects = {};
    this.httpWorker = new Worker('assets/scripts/workers/http.worker.js');
    this.response();
  }

  /**
   * @param {Http.Request} request
   * @returns
   * @memberof HttpNetwork
   */
  public request(request: Network.Http.Request) {
    // console.log('service::http::send::');

    return new Promise((resolve, reject) => {
      this.httpResolves = resolve;
      this.httpRejects = reject;

      this.httpWorker.postMessage({
          url: request.url,
          type: request.type,
          message: request.message
        });
    });
  }

/**
 * @private
 * @memberof HttpNetwork
 * http 요청의 async 응답 처리
 */
private response() {
    this.httpWorker.addEventListener('message', (e: MessageEvent) => {
      // console.log('service::http::response::', e);

      if (this.httpResolves && e.data) {
        this.httpResolves(<Network.Http.Response>{
          result: Network.ResponseCode.SUCCESS,
          message: e.data
        });
      } else if (this.httpRejects || !e.data) {
        this.httpRejects(<Network.Http.Response>{
          result: Network.ResponseCode.FAIL,
          message: e
        });
      }

      this.httpResolves = null;
      this.httpRejects = null;
    });
  }

}
