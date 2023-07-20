import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: any): any {
    if (value instanceof Timestamp) {
      return value.toDate();
    } else {
      return value; // If not a Timestamp, return the input value
    }
  }

}
