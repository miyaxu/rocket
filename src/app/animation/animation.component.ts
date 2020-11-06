import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RockerService } from '../rocker.service';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.sass']
})
export class AnimationComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  img: any;

  constructor(
    private rockerService: RockerService
  ) {
    this.rockerService.onStart.subscribe((currentTime: number) => {
      this.start(currentTime);
    });
  }

  ngOnInit(): void {
    this.img = new Image();
    this.img.src = 'data:image/png;base64,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';

    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.animatePathDrawing(this.ctx, 0, 350, 525, 250, 750, 0, 6000);
  }

  start(currentTime: number) {
    console.log('start', currentTime);
  }

  /**
   * Animates bezier-curve
   *
   * @param ctx       The canvas context to draw to
   * @param x0        The x-coord of the start point
   * @param y0        The y-coord of the start point
   * @param x1        The x-coord of the control point
   * @param y1        The y-coord of the control point
   * @param x2        The x-coord of the end point
   * @param y2        The y-coord of the end point
   * @param duration  The duration in milliseconds
   */
  // tslint:disable-next-line:max-line-length
  animatePathDrawing(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, duration: number) {
    let start = null;

    const step = (timestamp: number) => {
      if (start === null) {
        start = timestamp;
      }

      const delta = timestamp - start;
      const progress = Math.min(delta / duration, 1);

      // Clear canvas
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Draw curve
      this.drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, 0, progress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }

      if (progress >= 1) {
        console.log('finish');
      }
    };

    window.requestAnimationFrame(step);
  }

  /**
   * Draws a splitted bezier-curve
   *
   * @param ctx       The canvas context to draw to
   * @param x0        The x-coord of the start point
   * @param y0        The y-coord of the start point
   * @param x1        The x-coord of the control point
   * @param y1        The y-coord of the control point
   * @param x2        The x-coord of the end point
   * @param y2        The y-coord of the end point
   * @param t0        The start ratio of the splitted bezier from 0.0 to 1.0
   * @param t1        The start ratio of the splitted bezier from 0.0 to 1.0
   */
  // tslint:disable-next-line:max-line-length
  drawBezierSplit(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, t0: number, t1: number) {
    ctx.beginPath();

    if (0.0 === t0 && t1 === 1.0) {
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(x1, y1, x2, y2);
      ctx.drawImage(this.img, x2, y2);
    } else if (t0 !== t1) {
      let t00 = t0 * t0;
      let t01 = 1 - t0;
      let t02 = t01 * t01;
      let t03 = 2 * t0 * t01;

      const nx0 = t02 * x0 + t03 * x1 + t00 * x2;
      const ny0 = t02 * y0 + t03 * y1 + t00 * y2;

      t00 = t1 * t1;
      t01 = 1.0 - t1;
      t02 = t01 * t01;
      t03 = 2.0 * t1 * t01;

      const nx2 = t02 * x0 + t03 * x1 + t00 * x2;
      const ny2 = t02 * y0 + t03 * y1 + t00 * y2;

      const nx1 = this.lerp(this.lerp(x0, x1, t0), this.lerp(x1, x2, t0), t1);
      const ny1 = this.lerp(this.lerp(y0, y1, t0), this.lerp(y1, y2, t0), t1);

      ctx.moveTo(nx0, ny0);
      console.log('quadraticCurveTo', nx1, ny1, nx2, ny2);
      ctx.quadraticCurveTo(nx1, ny1, nx2, ny2);

      // rocket
      ctx.drawImage(this.img, nx2, ny2);
    }

    ctx.stroke();
    ctx.closePath();
  }

  lerp(v0: number, v1: number, t: number) {
    return (1 - t) * v0 + t * v1;
  }
}
