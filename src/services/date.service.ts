import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import * as moment from 'moment';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
}) 
export class DateService {
    private langList: Array<any>;

    constructor(
        private translateService: TranslateService
    ) {
    }
    public onInit(){
        // config에서 언어 리스트 가져오기
        this.langList = environment.common.languages;
        
        // 브라우저 navigator.language 와 설정 언어 비교 'ko-kr'
        let existLang = this.langList.find(lang => window.navigator.language.toLowerCase() == lang.fullName);
        // key 값 입력 'ko,en,ch'
        moment.locale(existLang ? existLang.key : 'ko-kr'); 

        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            moment.locale(event.lang);
        });
    }

    /**
     * date를 원하는 포맷으로 변환
     * @param {number} date
     * @param {string} format
     * @returns
     * @memberof DateService
     */
    public get(date: number | Date | string, start: boolean = false, format: string = 'YYYY-MM-DD' ) {
        if(moment.isDate(date)) {
            let time:string = moment(date).format(format);
    
            if(start || start == false) {
                return time + (start ? ' 00:00:00.000' : ' 23:59:59.999');
            }
            return time;
        }
        return null;

    }

}