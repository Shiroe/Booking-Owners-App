import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'dateTransform'})
export class DateTransformPipe implements PipeTransform {
  transform(val: string) {    
    // return "inp";
    let valueq = 20141221;
    // if (!val) return val;
    let value = val.toString();
    let inp =  value.substr(6,2) + '/' + value.substr(4,2) + '/' + value.substr(0,4);
    let dt = moment(val);
    return inp;
  }
}