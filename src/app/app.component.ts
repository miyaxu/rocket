import { Component, OnDestroy, OnInit } from '@angular/core';
import { findIndex } from 'lodash';
import { interval, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RockerService } from './rocker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscribeList: Subscription[] = [];
  private sub: Subscription;

  title = 'rocket';

  data: {
    odds_int: number;
    total_need: number
    gap: number
  }[];

  constructor(
    private rockerService: RockerService
  ) {  }

  ngOnInit(): void {
    this.data = [
      {
        odds_int: 1,
        total_need: 12,
        gap: 0.12,
      },
      {
        odds_int: 2,
        total_need: 18,
        gap: 0.06,
      },
      {
        odds_int: 3,
        total_need: 23,
        gap: 0.05,
      },
      {
        odds_int: 4,
        total_need: 27.5,
        gap: 0.045,
      },
      {
        odds_int: 5,
        total_need: 31.5,
        gap: 0.04,
      },
      {
        odds_int: 6,
        total_need: 35,
        gap: 0.035,
      },
      {
        odds_int: 7,
        total_need: 38,
        gap: 0.03,
      },
      {
        odds_int: 8,
        total_need: 40.5,
        gap: 0.025,
      },
      {
        odds_int: 9,
        total_need: 42.5,
        gap: 0.02,
      },
      {
        odds_int: 10,
        total_need: 51.5,
        gap: 0.009,
      },
      {
        odds_int: 20,
        total_need: 60,
        gap: 0.0085,
      },
      {
        odds_int: 30,
        total_need: 68,
        gap: 0.008,
      },
      {
        odds_int: 40,
        total_need: 75.5,
        gap: 0.0075,
      },
      {
        odds_int: 50,
        total_need: 82.5,
        gap: 0.007,
      },
      {
        odds_int: 60,
        total_need: 89,
        gap: 0.0065,
      },
      {
        odds_int: 70,
        total_need: 95,
        gap: 0.006,
      },
      {
        odds_int: 80,
        total_need: 100.5,
        gap: 0.0055,
      },
      {
        odds_int: 90,
        total_need: 105.5,
        gap: 0.005,
      },
      {
        odds_int: 100,
        total_need: 114.5,
        gap: 0.0009,
      },
      {
        odds_int: 200,
        total_need: 122.5,
        gap: 0.0008,
      },
      {
        odds_int: 300,
        total_need: 129.5,
        gap: 0.0007,
      },
      {
        odds_int: 400,
        total_need: 134.5,
        gap: 0.0005,
      },
      {
        odds_int: 500,
        total_need: 138.5,
        gap: 0.0004,
      },
    ];
  }

  ngOnDestroy(): void {
    this.subscribeList.forEach(sb => sb.unsubscribe());
  }

  getRate(sec: number): string {
    const sampleIndex = findIndex(this.data, (item) => item.total_need > sec);
    const lessItem = this.data[sampleIndex];

    const fillItem = this.data[sampleIndex - 1];

    const odds_int = lessItem.odds_int;

    const oddsSurplus = ((sec - (fillItem ? fillItem.total_need : 0)) / lessItem.gap / 100);

    const odds = odds_int + oddsSurplus;

    const xxx = odds.toFixed(4);
    const oddsSurplusInt = Number(xxx.split('.')[0]);
    const oddsSurplusFloat = xxx.split('.')[1].substring(0, 2);

    return `${oddsSurplusInt}.${oddsSurplusFloat}`;
  }

  start() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    const fps = 60;
    const ms = 1000 / fps;
    this.sub = interval(ms)
      .pipe(
        takeUntil(timer(1000))
      )
      .subscribe(val => {
        const rate = this.getRate((val * ms) / 1000);
        this.rockerService.progress({
          rate,
          time: val * ms
        }).subscribe();
    });

    this.subscribeList.push(this.sub);
  }

  crashed() {
  }

  memberEscape() {
  }
}
