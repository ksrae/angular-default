import { Injectable } from '@angular/core';
// service
import { TranslateService } from '@ngx-translate/core';
// interface
import { LanguageCode } from '../interfaces/common.interface';

/**
 * translate Service를 보다 편리하게 사용하기 위한 목적
 * 여러 기능이 있으나 불필요한 내용은 제거함
 * @export
 * @class LanguageService
 */
@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private langList: Array<string>;

    constructor(private translateService: TranslateService) {

    }

    public onInit() {
        this.langList = Object.keys(LanguageCode);
        
        for (let lang of this.langList) {
            this.translateService.addLangs([lang]);
        }

        let browserLang = this.translateService.getBrowserLang();
        // let matchingLang = browserLang.match(/ko|en/) ? browserLang: 'ko';
        let existLang = this.langList.find(lang => browserLang == lang);
        let matchingLang = existLang ? browserLang : 'ko-kr';

        this.translateService.setDefaultLang(matchingLang);
        this.translateService.use('ko-kr');
    }
    
    public change(language: string){
        // 이 코드는 프로젝트 상태에 따라 enum을 쓰든 string을 쓰든 해야겠다.
        let existLang = this.langList.find(lang => language == lang);
        if(existLang){
            this.translateService.use(language);
        }
    }

    /**
     * 파라미터의 text에 해당하는 현재 설정한 언어의 값을 리턴한다.
     * @param {string} text
     * @returns
     * @memberof LanguageService
     */
    public get(text: string) {
        return new Promise<string>((resolve, reject) => {
            this.translateService.get(text).subscribe(val => {
                resolve(val);
            });
        });
    }

    public get allLanguages() {
        return this.langList;
    }
    public get current() {
        return this.translateService.currentLang;
    }

    // public getLanguageKeyValue(key: string, param: string[]) {
    //     return new Promise<string>((resolve, reject) => {
    //         this.translateService.get(key).subscribe(val => {
    //             resolve(val);
    //         });
    //     });
    // }

    // public setLanguage(langCode: LangCode) {
    //     this.translateService.use(langCode[langCode]);

    //     //localstorage에 저장
    //     //this.preferencesManagementService.setLanguage(langObject);

    // }

    // public getLangSet(langKey: string = null) {
    //     langKey = langKey ? langKey.toLowerCase() : this.translateService.currentLang ? this.translateService.currentLang : this.defaultLanguageSet.key.toLowerCase();
    //     let langSet = Chivas.config.supportLanguages.find((item, index) =>
    //         (item.key).toString().toLowerCase() == langKey.toLocaleLowerCase()
    //     );

    //     return langSet;
    // }

    // public hasKey(lang: string): boolean {
    //     // lang = lang ? lang.toLowerCase() : this.translateService.currentLang ? this.translateService.currentLang : this.defaultLanguageSet.key.toLowerCase();

    //     // let langValue = Chivas.config.supportLanguages.find((item, index) => item.key && ((item.key).toString().toLowerCase() == lang.toLowerCase()));

    //     return (lang == LanguageCode[lang]) ? true : false;
    // }

    // public getLangValues(lang: string = null) {

    //     // if (!lang) {
    //     //     lang = this.preferencesManagementService && this.preferencesManagementService.getLanguage() ? this.preferencesManagementService.getLanguage().key : this.translateService.currentLang;
    //     // }

    //     return this.translateService.getTranslation(lang).toPromise();
    // }

    // public getKeyValue(langKey: string) {
    //     //console.log(this.translateService.instant(langKey));
    //     return this.translateService.instant(langKey);
    // }

    // public setKeyValue(key: string, value: string) {
    //     this.translateService.set(key, value);
    // }

}


