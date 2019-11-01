export enum LanguageCode {
    'ko-kr' = '한국어',
    'en-us' = 'English',
    'zh-cn' = '简体中文'
}

export module Modal {
    export enum Type {
        NONE = 1,
        NETWORKERROR
    }
    export interface Option {
        type: Modal.Type;
        message?: any;	
    }
}