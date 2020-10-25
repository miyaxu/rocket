import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.sass']
})
export class AnimationComponent implements OnInit {

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.draw();
  }

  draw() {
    // Quadratric curves example
    this.ctx.beginPath();
    this.ctx.moveTo(0,0);
    this.ctx.lineTo(50,50);
    this.ctx.lineTo(100,50);
    // this.ctx.quadraticCurveTo(25,25,25,62.5);
    // this.ctx.quadraticCurveTo(25,100,50,100);
    // this.ctx.quadraticCurveTo(50,120,30,125);
    // this.ctx.quadraticCurveTo(60,120,65,100);
    // this.ctx.quadraticCurveTo(125,100,125,62.5);
    // this.ctx.quadraticCurveTo(125,25,75,25);
    this.ctx.stroke();
  }
}
