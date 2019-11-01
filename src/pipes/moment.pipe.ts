import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'moment'
})
export class MomentPipe implements PipeTransform {
	dateFormat = 'YYYY.MM.DD';
	// timeFormat = 'HH:MM:SS';
	// countryFormat = [
	// 	{ key: 'ko', format: 'yy.mm.dd'},
	// 	{ key: 'en', format: 'mm.dd.yy'}
	// ];

	constructor() {
	}

	/**
	 * value값 필수 입력 
	 ** 원하는 포멧이 있을경우 입력 기본포멧은 'YYYY.MM.DD'
	 * @param {number} value
	 * @param {string} [format]
	 * @returns
	 * @memberof MomentPipe
	 */
	public transform(value: number, format?: string) {
		if(value) {
			return moment(value).format(format ? format : this.dateFormat);
		} else {
			return null;
		}
		
	}
}