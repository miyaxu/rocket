import { Component, OnInit } from '@angular/core';
import { RockerService } from './rocker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'rocket';

  constructor(
    private rockerService: RockerService
  ) {  }

  ngOnInit(): void {
  }

  start() {
    const now = Math.floor(new Date().getTime() / 1000);
    this.rockerService.start(now).subscribe();
  }
}
