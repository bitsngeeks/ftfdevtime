import { UsersService } from './../services/users.service';
import { Component,OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from 'app/services/projects.service';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
declare var require: any
var moment = require('moment');

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent {
  public date = new Date();
  public date_start = new Date();
  public date_end = new Date();

  myOptions: INgxMyDpOptions = {
    disableSince: {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()+1},
    dateFormat: 'dd.mm.yyyy',
  };

  public model1: any = { jsdate: new Date() };
  public model2: any = { jsdate: new Date() };
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public usersResult=[];
  constructor(public projectsService: ProjectsService, public userService: UsersService) { }
  // lineChart
  
  ngOnInit(){

    this.userService.getUsers()
    .then((result) => {
      result.json().forEach(element => {
        if(!element.role){  
          this.usersResult.push(element)
        }
      });
      
        this.usersResult.forEach(element => {
          var data=[];

               console.log(moment().toISOString())
            this.projectsService.adminGetHours("5a96d1cf6b6c7f26e87efe82",element._id,moment().add(-3,'day').toISOString()+"",moment().add(+3,'day').toISOString()+"",'day')
          .then((result)=>{
            result.json().log.forEach(element => {
              data.push(element.time)
            });
            this.lineChartLabels=[]
            var start= Math.floor(result.json().diff/2)*(-1);
           for (let index = 0; index < result.json().diff; index++) {
            
            this.lineChartLabels.push(moment().add(start+index,'day').format('DD/MM/YYYY'))
             
           }
            this.tempChartData.push({data: data, label: element.name})
            console.log(this.tempChartData)
       /*      console.log(result.json().log) */
            /* data.push(result.json()) */
          
          })       
 
          
          
        })
    })
  }

  onDateChangedStart(event: IMyDateModel): void {
    this.date_start = new Date(event.jsdate)
}
  onDateChangedEnd(event: IMyDateModel): void {
    this.date_end = new Date(event.jsdate)
}

  getUtilPercent(){
    this.tempChartData=[]
    this.usersResult.forEach(element => {
      var data=[];
        this.projectsService.adminGetHours("5a96d1cf6b6c7f26e87efe82",element._id,moment().add(-3,'day').toISOString()+"",moment().add(+3,'day').toISOString()+"",'day')
      .then((result)=>{
        result.json().log.forEach(element => {
          data.push(element.time/(8*60))
        });
        this.lineChartLabels=[]
        var start= Math.floor(result.json().diff/2)*(-1);
       for (let index = 0; index < result.json().diff; index++) {
        
        this.lineChartLabels.push(moment().add(start+index,'day').format('DD/MM/YYYY'))
         
       }
        this.tempChartData.push({data: data, label: element.name})
        
      })       

      
      
    })
   
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {
        
/*           this.chart.chart.config.data.labels = this.labels; */
        if(this.chart !== undefined){
          this.lineChartData=this.tempChartData
          this.chart.ngOnDestroy();
          this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
        }
      }
  });
  }

  public tempChartData: Array<any> = [
    
  ]
  public lineChartData: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series A'},
  ];

  
  
  public week = moment().week()
  public lineChartLabels: Array<any> = ['Week '+(this.week-3), 'Week '+(this.week-2), 'Week '+(this.week-1), 'Week '+(this.week), 'Week '+(this.week+1), 'Week '+(this.week+2), 'Week '+(this.week+3)];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  // Radar
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType = 'radar';

  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';

  // PolarArea
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType = 'polarArea';

  // events
  public chartClicked(e: any): void {
     console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  update(){
    
  
    this.lineChartData=this.tempChartData
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {
/*           this.chart.chart.config.data.labels = this.labels; */
        if(this.chart !== undefined){
          this.chart.ngOnDestroy();
          this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
        }
      }
  });
  }


}
