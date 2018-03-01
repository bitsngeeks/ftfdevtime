import { UsersService } from './../services/users.service';
import { Component,OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from 'app/services/projects.service';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';
declare var require: any
var moment = require('moment');

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent {
  public date = new Date();
  public date_start = new Date(moment().add(-1,'day').toISOString());
  public date_end = new Date(moment().add(1,'day').toISOString());
  public Frec=[{
    id:'day',
    text:"Diario"
  },
  {
    id:'week',
    text:"Semanal"
  },
  {
    id:'month',
    text:"Mensual"
  },
  {
    id:'year',
    text:"Anual"
  }
  ] 
  public Types=[{
    id:1,
    text:"Porcentaje de Utilización"
  },
  {
    id:2,
    text:"Producción por desarrolador"
  },
  {
    id:3,
    text:"Producción por cliente"
  }
  ]
  public Type;

  Views=[{
    id:true,
    text:"Individual"
  },
  {
    id:false,
    text:"Total"
  }]
  
  frecText:string='week';
  View:Boolean=true;


  myDateRangePickerOptions: IMyDrpOptions = {
/*     disableSince: {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()+1}, */
    dateFormat: 'dd.mm.yyyy',
};

  private model: any = {beginDate: {year: 2018, month: 2, day: 27},
                        endDate: {year: 2018, month: 3, day: 1}};
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public usersResult=[];
  public projectResult=[];
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
    })
    this.projectsService.getProjects()
    .then((result) => {
      this.projectResult=result.json();
    })
  }
  onDateRangeChanged(event: IMyDateRangeModel) {
    // event properties are: event.beginDate, event.endDate, event.formatted,
    // event.beginEpoc and event.endEpoc
    this.date_start=new Date(event.beginJsDate)
    this.date_end=new Date(event.endJsDate)
    this.getUtilPercent();

}
  frecSelect(){
    this.getUtilPercent();
  }
  viewSelect(){
    this.getUtilPercent();
  }
  typeSelect(){

    this.getUtilPercent();
  }


  getUtilPercent(){
    if(this.View){
      var factor=0;
    switch (this.frecText) {
      case "day":
        factor=8*60;
        break;
      case "week":
        factor=5*8*60;
        break;
      case "month":
        factor=30*8*60;
        break;
      case "year":
        factor=260*8*60;
        break;
    
      default:
        break;
    }
    this.tempChartData=[]
 
    this.usersResult.forEach(element => {
        
        var data =[]

      

      
      this.projectResult.forEach(element1 =>{
        this.projectsService.adminGetHours(element1._id,element._id,moment(this.date_start).toISOString()+"",moment(this.date_end).toISOString()+"",this.frecText)
        .then((result)=>{
          
          result.json().log.forEach(function(element,index,array) {
            if(!data[index]){
              data[index]=0;
            }            
            data[index]+=element.time/factor*100;
          });
          this.lineChartLabels=[]       
         for (let index = 0; index < result.json().diff; index++) {        
          this.lineChartLabels.push(moment(this.date_start).add(index,this.frecText).format('DD/MM/YYYY'))         
         }
              
        })   
      });
      
        this.tempChartData.push({data: data, label: element.name}) 
    
      
      
    })
    
   
   /*  setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {
        

        if(this.chart !== undefined){
          this.lineChartData=this.tempChartData
          this.chart.ngOnDestroy();
          this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
        }
      }
  }); */
    }else{
  
      var factor=0;
    switch (this.frecText) {
      case "day":
        factor=8*60;
        break;
      case "week":
        factor=5*8*60;
        break;
      case "month":
        factor=30*8*60;
        break;
      case "year":
        factor=260*8*60;
        break;
    
      default:
        break;
    }
    this.tempChartData=[]
    var data =[]
    var users=0;
    this.usersResult.forEach((element,index1,array1) => {     
            
     
      this.projectResult.forEach(element1 =>{
        
        this.projectsService.adminGetHours(element1._id,element._id,moment(this.date_start).toISOString()+"",moment(this.date_end).toISOString()+"",this.frecText)
        .then((result)=>{
          
          result.json().log.forEach(function(element,index,array) {
            
            if(!data[index]){
              data[index]=0;
              
            }            
            
            if(index1!=(array1.length-1)){
              data[index]+=element.time/factor*100;
            }else{
              users = array1.length
              data[index]+=element.time/(factor)*100;
         
           
            }
       
          });
          this.lineChartLabels=[]       
         for (let index = 0; index < result.json().diff; index++) {        
          this.lineChartLabels.push(moment(this.date_start).add(index,this.frecText).format('DD/MM/YYYY'))         
         }
              
        })   
      });
      
    
      this.tempChartData.push({data: data, label: "Porcentaje de utilización"})
        if(index1<(array1.length-1)){

          this.tempChartData.shift();
          

        }
        
      
      
      
    })
    
   
   
    }
    if(this.View){
      setTimeout(() => {
        if (this.chart && this.chart.chart && this.chart.chart.config) {
  
          if(this.chart !== undefined){
            
            this.lineChartData=this.tempChartData
/*             this.chart.ngOnDestroy();
            this.chart.chart = this.chart.getChartBuilder(this.chart.ctx); */
          }
        }
    });
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {

        if(this.chart !== undefined){
          this.lineChartData=this.tempChartData
          this.chart.ngOnDestroy();
          this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
        }
      }
  });
    }else{
      setTimeout(function(){
        if (this.chart && this.chart.chart && this.chart.chart.config) {
  
          if(this.chart !== undefined){
             /*           this.chart.chart.config.data.labels = this.labels; */
              this.tempChartData[0].data.forEach((element,index,array) => {
                this.tempChartData[0].data[index]/=users;
                this.lineChartData=this.tempChartData
              this.chart.ngOnDestroy();
              this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
              });
              console.log(this.tempChartData[0].data)
           /*    this.lineChartData=this.tempChartData
              this.chart.ngOnDestroy();
              this.chart.chart = this.chart.getChartBuilder(this.chart.ctx); */
          }
        }
    });
      setTimeout(() => {
        if (this.chart && this.chart.chart && this.chart.chart.config) {
  
          if(this.chart !== undefined){
            
          }
        }
    });
    }
    
    
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



 /*  // Doughnut
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

  public polarAreaChartType = 'polarArea'; */

  // events
  public chartClicked(e: any): void {
     console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

 /*  update(){
    
  
    this.lineChartData=this.tempChartData
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {

        if(this.chart !== undefined){
          this.chart.ngOnDestroy();
          this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
        }
      }
  });
  }
 */

}
