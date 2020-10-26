import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Observable, of, timer } from 'rxjs';
import { concatAll, finalize, takeUntil } from 'rxjs/operators';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.sass']
})
export class AnimationComponent implements OnInit {

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;

  cpx = 550;
  cpy = 300;
  counter = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    // this.start();

    // console.log(Math.floor(new Date().getTime() / 1000));
    // interval(1000)
    // .pipe(
    //   takeUntil(timer(3000)),
    //   finalize(() => {
    //     console.log('done');
    //   })
    // ).subscribe((n) => {
    //   console.log(n, Math.floor(new Date().getTime() / 1000));
    // });

    var data = {
      n: 0,
    };
    
    anime({
      targets: data,
      n: 100,
      easing: 'linear',
      duration: 9000,
      update: () => {
        this.draw();
        this.counter = 550 * (data.n / 100);
      }
    });
  }

  start() {
    // console.log(Math.floor(new Date().getTime() / 1000));
    const timeine = of(this.first(), this.second(), this.third());
    const state = timeine.pipe(concatAll());
    state.subscribe(val => console.log(val));
  }

  first() {
    return new Observable((observer) => {
      setTimeout(() => {
        console.log('first', Math.floor(new Date().getTime() / 1000));
        observer.complete();
      }, 1000);
    });
  }

  second() {
    return new Observable((observer) => {
      setTimeout(() => {
        console.log('second', Math.floor(new Date().getTime() / 1000));
        observer.complete();
      }, 1000);
    });
  }

  third() {
    return new Observable((observer) => {
      setTimeout(() => {
        console.log('third', Math.floor(new Date().getTime() / 1000));
        observer.complete();
      }, 1000);
    });
  }

  clearRect() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  draw() {
    this.clearRect();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(50, 300);
    this.ctx.quadraticCurveTo(this.cpx, this.cpy, 600, 20);
    this.ctx.stroke();
 
    this.ctx.globalCompositeOperation = 'destination-in';
    this.ctx.fillRect(50, 20, this.counter += 1, 280);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.cpx, this.cpy, 5, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.restore();
  }
}
