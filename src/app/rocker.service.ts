import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RocketPos } from './rocket';

@Injectable({
  providedIn: 'root'
})
export class RockerService {

  onStart: Subject<any> = new Subject<any>();
  onProgress: Subject<any> = new Subject<RocketPos>();
  onCrashed: Subject<any> = new Subject<any>();
  onMemberEscape: Subject<any> = new Subject<any>();

  constructor() { }

  public start(currentTime: number = 0): Observable<any> {
    return new Observable(subscribe => {
      this.onStart.next(currentTime);

      subscribe.next(true);
      subscribe.complete();
    });
  }

  public progress(ratePos: RocketPos): Observable<RocketPos> {
    return new Observable(subscribe => {
      this.onProgress.next(ratePos);

      subscribe.next(ratePos);
      subscribe.complete();
    });
  }

  public crashed(): Observable<any> {
    return new Observable(subscribe => {
      this.onCrashed.next(true);

      subscribe.next(true);
      subscribe.complete();
    });
  }

  public memberEscape(): Observable<any> {
    return new Observable(subscribe => {
      this.onMemberEscape.next(true);

      subscribe.next(true);
      subscribe.complete();
    });
  }
}
