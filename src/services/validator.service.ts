import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

/**
 * 폼 작성 시 validator
 * @export
 * @class ValidatorService
 */
@Injectable({
    providedIn: 'root'
})
export class ValidatorService {
    // public emailValidator: RegExp;
    public passwordValidator: RegExp;
    public numberValidator: RegExp;
    public forceValidator: boolean = true;

    constructor() {        
        this.numberValidator = /^[0-9.]$/;
        // this.emailValidator = /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+([A-Za-z]{2,4})$/;
        // /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+([A-Za-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/;
        // /^[^/<>()\[\]\\.,;:\s@"][a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,3}))$/
        // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // (영문자, 특수문자, 숫자 각1개), 6-12자 이내
        this.passwordValidator = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).[^/<>:\\]{6,12}$/;
        // /^(?=.*[a-z]|[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,12}$/;
        // this.passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,12}$/;
    }

    /**
     * Input 필드간 비교
     * @param {string} field_name
     * @returns {ValidatorFn}
     * @memberof CustomValidatorService
     */
    public equalTo(field_name: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let isValid = control.root.value[field_name] == control.value;
            if (!isValid) {
                return { 'equalTo': { isValid } };
            }
            return null;
        };
    }
    /**
     * 각 폼의 컨트롤의 validation 체크
     * @param {...AbstractControl[]} controls
     * @returns {boolean}
     * @memberof ValidatorService
     */
    public formControlValidator(...controls: AbstractControl[]): boolean {
        for (let control of controls) {
            if (control.untouched || control.invalid || !control.value) {
                return false;
            }
        }
        return true;
    }
    public formGroupValidator(group: FormGroup): boolean {
        return group.touched && group.dirty && !group.invalid ? true : false;
    }

    public coinAmountValidator(field_name: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let isValid = control.root.value['maxAmount'] >= control.value && control.root.value['minAmount'] <= control.value;
            if (!isValid) {
                return { 'AmountErr': { isValid } };
            }
            return null;
        };
    }
    // 조건에 따라 필요 / 불필요를 정해줌
    // 최초 form 로딩 시에만 적용되며, 실시간 반응 하지 않으므로 주의.
    public requiredValidator(isRequired: boolean): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (isRequired && !control.value){
                return { required: true };
            }
            return null;
        };
    }


}
