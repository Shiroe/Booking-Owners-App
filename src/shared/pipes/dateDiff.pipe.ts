import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'dateDiff'})
export class DateDifferencePipe implements PipeTransform {
  transform(dts?: any) {    
    // if (!value) return value;
    // console.log('din: ', dts[0], ' dout:', dts[1]);
  
    let cin = moment(dts[0]);
    let cout = moment(dts[1]);
    // console.log('cin: ', cin, ' cout: ', cout);
        
    return cin.diff(cout, 'days');
  }
}