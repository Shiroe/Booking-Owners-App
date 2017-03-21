import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'dateTransform'})
export class DateTransformPipe implements PipeTransform {
  transform(val?: string) {    
    // if (!value) return value;
    // let value = val.toString();
    // let inp = value.substr(0,4) + '/' + value.substr(4,2) + '/' + value.substr(6,2);
    let dt = moment(val);
    return dt;
  }
}