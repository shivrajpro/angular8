import { Component, OnInit } from '@angular/core';
import { interval, of, throwError, timer } from 'rxjs';
import { concatMap, switchMap } from "rxjs/operators";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  
  getObs1(){
    // return of(1);
    // return interval(2000);
    return timer(1000);
    // return throwError(">> Something went wrong...ERROR!");
  }

  getObs2(d){
    return of(d*2);
  }

  ngOnInit(): void {
    // const switched = of(1, 2, 3).pipe(switchMap((x: number) => of(x, x * 2, x * 3)));
    // switched.subscribe(x => console.log('>> ',x));


    // this.sequentialSubscriptions();
    // this.nestedSubsciptions();
    this.switchMapDemo();


    // this.concatMapDemo();

    // this.asyncFn();
  }
  
  private  async asyncFn() {
    const p1 = this.getObs1().toPromise();
    const p2 = this.getObs2(2).toPromise();

    const result1 = await p1.then((d) => {
      console.log('>> inside P1 then', d);
      return d;
    });

    // console.log('>> result1',result1);
    
    const result2 =  await p2.then((d) => {
      console.log('>> inside P2 then', d);
      return d;
    });

    // return result2;
  }

  private sequentialSubscriptions() {
    this.getObs1().subscribe((d) => {
      console.log('>> 1st obs', d);
    });

    this.getObs2(2).subscribe((d) => {
      console.log('>> 2nd obs', d);
    });
  }

  private concatMapDemo() {
    this.getObs1().pipe(concatMap(d => {
      console.log('>> 1st concatMap', d);
      return this.getObs2(d);
    }),
      concatMap(d => {
        console.log('>> 2nd concatMap', d);
        return this.getObs2(d);
      })
    )
      .subscribe((d) => {
        console.log('>> subscribe of concatmap', d);

      });
  }

  private nestedSubsciptions() {
    this.getObs1().subscribe((d1) => {
      console.log('>> just d1', d1);

      this.getObs2(d1).subscribe((d2) => {
        console.log('>> d1=', d1, ' d2=', d2);
      });
    });
  }

  private switchMapDemo() {
    this.getObs1().pipe(
      switchMap((d) => {
        console.log('>> in switchMap', d);
        return this.getObs2(d);
      })
    ).subscribe((d) => {
      console.log('>> in subscribe', d);
    },
    (e)=>{
      console.log('>> error from switchMap',e);
    });
  }

}
