import { Injectable } from '@angular/core';
// import { HttpNetwork } from '../networks/http.network';
// import { Network } from '../interfaces/network.interface';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http' 
/**
 * .json으로 된 config파일을 읽는다.
 * 특정 구조로 되어 있어 다른 .json 파일을 읽는 구조는 아니다.
 * 참고: https://gist.github.com/fernandohu/122e88c3bcd210bbe41c608c36306db9
 * @export
 * @class Config
 */
@Injectable({
    providedIn: 'root'
})
export class Config {
    constructor(private httpClient: HttpClient) {
        // console.log('config.service', window.location);
        // this.onInit('/assets/config/config.json');
    }

    /**
     * APP_INITIALIZER 시 호출한다.
     * .json으로 된 파일을 읽어온다.
     * @param {string} url
     * @returns
     * @memberof Config
     */
    public async onInit() {
        await this.set('/assets/config/config.json');
        // return null;
    }

    private set(url: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.get(window.location.origin + url,   
            ).toPromise().then((result) => {
                resolve(result);
            }).catch(err => {
                resolve(null);
            });
        });
    }

    // /**
    //  * config 값을 get 한다.
    //  * key값이 있으면 해당값만 리턴하고, 없으면 전체를 리턴한다.
    //  * @param {string} [key]
    //  * @returns
    //  * @memberof Config
    //  */
    // public get(key?: string) {
    //     return key ? this.item[key] : this.item;
    // }

    // /**
    //  * 환경값에 따라 달라지는 값 ("prod" 또는 "dev")
    //  * 환경과 관계 없는 값 ("common")을
    //  * merge하여 하나의 json으로 만들어 리턴한다.
    //  * @private
    //  * @param {Object} message
    //  * @returns
    //  * @memberof Config
    //  */
    // private merge(message: object) {
    //     let mergeItem = {};
    //     let envConfig = (environment.production) ? message['prod'] : message['dev'];
    //     Object.assign(mergeItem, envConfig , message['common']);

    //     return mergeItem;
    // }
}
