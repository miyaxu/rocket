import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RockerService } from '../rocker.service';
import { RocketPos } from '../rocket';

@Component({
  selector: 'app-animation2',
  templateUrl: './animation2.component.html',
  styleUrls: ['./animation2.component.sass']
})
export class Animation2Component implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;

  nums: any;
  datas: any;

  constructor(
    private rockerService: RockerService
  ) {

    this.nums = [20, 60, 60, 80, 100, 120, 140, 60, 100];
    this.datas = ['5-24', '5-26', '5-26', '5-26', '5-26', '5-26', '5-26', '5-26', '5-26'];

    this.rockerService.onProgress.subscribe((data: RocketPos) => {
    });
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.draw();
  }

  maxData(arr: []) {
    return Math.max.apply(null, arr);
  }

  extend(defaults: any, newObj: any) {
    for (const i of Object.keys(newObj)) {
      defaults[i] = newObj[i];
    }

    return defaults;
  }

  draw() {
    const wd = this.canvas.nativeElement.width;
    const wid = wd - 24;
    const ht = wd - 20;
    const maxPoint = this.maxData(this.nums) / 0.88;

    this.drawBorder(this.ctx, wd, ht);
    this.drawLine(this.ctx, this.nums, wd, ht, wid, maxPoint);
    this.drawPoint(this.ctx, this.nums, this.datas, wd, ht, wid, maxPoint);
  }

  drawBorder(ctx: CanvasRenderingContext2D, wd, ht) {
    ctx.beginPath();
    ctx.translate(0.5, 0.5);
    ctx.moveTo(10, 10);
    ctx.lineTo(10, ht - 1);
    ctx.moveTo(10, ht - 1);
    ctx.lineTo(wd - 10, ht - 1);
    ctx.closePath();
    // ctx.strokeStyle = defaultParam.styleSet.borderColor;
    ctx.stroke();
  }
  drawLine(ctx, nums, wd, ht, wid, maxPoint) {
    for (let i = 0; i < nums.length - 1; i ++){
      const axiosY = ht - ht * nums[i] / maxPoint;
      const averNum = (wid / nums.length - 1);
      const axiosX = i * averNum + 30;

      const axiosNY = ht - ht * nums[i + 1] / maxPoint;
      const axiosNX = (i + 1) * averNum + 30;

      ctx.beginPath();
      ctx.moveTo(axiosX, axiosY);
      ctx.lineTo(axiosNX, axiosNY);
      ctx.lineWidth = 2;
      // ctx.strokeStyle = defaultParam.styleSet.lineColor;
      ctx.setLineDash([0]);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      if (i === 0) {
        ctx.moveTo(axiosX, ht - 2);
        ctx.lineTo(axiosX, axiosY);
      }
      ctx.moveTo(axiosNX, ht - 2);
      ctx.lineTo(axiosNX, axiosNY);
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 8]);
      ctx.strokeStyle = '#d6d6d6';
      ctx.closePath();
      ctx.stroke();
    }
  }
  drawPoint(ctx, nums, datas, wd, ht, wid, maxPoint) {
    const len = nums.length;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    for (let i = 0; i <= len; i ++){
      const numsY = ht - ht * nums[i] / maxPoint;
      const numsX = i * (wid / nums.length - 1) + 30;

      ctx.beginPath();
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 4;
      // ctx.shadowColor = defaultParam.styleSet.pointColor;
      // ctx.fillStyle = defaultParam.styleSet.pointColor;
      ctx.setLineDash([0]);
      ctx.arc(numsX , numsY, 5, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#222';
      ctx.textAlign = 'center';
      ctx.fillText(nums[i], numsX, numsY - 10);

      if (i < nums.length){
          const rowText = ctx.measureText(datas[i]);
          ctx.textAlign = 'left';
          ctx.fillText(datas[i], numsX - rowText.width / 2, ht + 16);
      } else if (i === nums.length) {
          return;
      }

      ctx.closePath();
      ctx.stroke();
    }
  }
}
