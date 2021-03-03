import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {

  @Input() chartTitle: string = '';
  @Input() pieColor: string = '#992211';
  @Input() data: any[] = [];

  chartInstance: any;
  options = {};
  
  constructor() {}

  ngOnInit(): void {
    this.setChartOptions();
  }

  setChartOptions() {
    this.options = {
      backgroundColor: '#bcbcbc',
      title: {
        text: this.chartTitle,
        left: 'center',
        top: 20,
        textStyle: {
          color: '#222',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      visualMap: {
        show: false,
        min: 80,
        max: 100,
        inRange: {
          colorLightness: [0.2, 0.3],
        },
      },
      series: [
        {
          name: this.chartTitle,
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: this.data,
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(0, 0, 0, 0.3)',
              },
            },
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
              },
              smooth: 0.2,
              length: 8,
              length2: 12,
            },
          },
          itemStyle: {
            normal: {
              color: this.pieColor,// '#ffdd33',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
  
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: () => Math.random() * 200,
        },
      ]
    };
  }

  onChartInit(e: any) {
    this.chartInstance = e;
    console.log('on chart init:', e);
  }

  callMethod(type: string) {
    if (this.chartInstance) {
      const result = this.chartInstance[type]();
      console.log(result);
    }
  }
}
