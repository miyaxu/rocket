declare global {
  interface Window { 
    mozRequestAnimationFrame?: any;
    cancelRequestAnimFrame?: any;
    webkitCancelRequestAnimationFrame?: any;
    mozCancelRequestAnimationFrame?: any;
    oCancelRequestAnimationFrame?: any;
    msCancelRequestAnimationFrame?: any;
  }
}

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback: any ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

window.cancelAnimationFrame = (function() {
  return window.cancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.mozCancelRequestAnimationFrame ||
  window.oCancelRequestAnimationFrame ||
  window.msCancelRequestAnimationFrame ||
  clearTimeout;
})();

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.sass']
})
export class AnimationComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;

  requestID: number;

  cpx = 550;
  cpy = 300;
  counter = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.loop(0);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.requestID);
  }

  clearRect() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  draw(currentTime: number) {
    this.clearRect();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(50, 300);
    this.ctx.quadraticCurveTo(this.cpx, this.cpy, 600, 20);
    this.ctx.stroke();
 
    this.ctx.globalCompositeOperation = 'destination-in';
    if (this.counter >= 550) {
      this.counter = 0;
    }
    this.ctx.fillRect(50, 20, this.counter += 1, 280);
    this.ctx.restore();

    this.counter += 1;


    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.cpx, this.cpy, 5, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.restore();
  }

  loop(currentTime: number) {
    // console.log('loop', this.requestID);
    this.draw(currentTime);
    this.requestID = requestAnimationFrame(this.loop.bind(this));
  }
}
