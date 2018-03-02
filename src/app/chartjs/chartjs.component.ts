import { ClientsviewService } from './../services/clientsview.service';
import { UsersService } from './../services/users.service';
import { Component,OnInit, ViewChild, NgModule } from '@angular/core';
import { ProjectsService } from 'app/services/projects.service';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';
import { CommonModule } from "@angular/common";
declare var require: any
var moment = require('moment');

@Component({
  templateUrl: 'chartjs.component.html'
})

export class ChartJSComponent {
  public grafica= "gráfica";
  public tabla= "tabla";
  public date = new Date();
  public date_start = new Date(moment().add(-1,'week').toISOString());
  public date_end = new Date(moment().add(1,'week').toISOString());
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
  public toggleTable = false;
  public texto = "";
  public summaryPerc=[]
  public summaryPercClient=[]
  public summaryPercNum=[];
  public summaryPercNumClient=[];
  public tabNumber=0;
  public elementsTable=[0,1,2,3,4,5]
  myDateRangePickerOptions: IMyDrpOptions = {
/*     disableSince: {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()+1}, */
    dateFormat: 'dd.mm.yyyy',
};

  public model: any = {beginDate: {year: this.date_start.getFullYear(), month: this.date_start.getMonth()+1, day: this.date_start.getDate()},
                        endDate: {year: this.date_end.getFullYear(), month: this.date_end.getMonth()+1, day: this.date_end.getDate()}};
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public usersResult=[];
  public projectResult=[];
  public clientResult=[];
  constructor(public projectsService: ProjectsService, public userService: UsersService, public clientsviewService: ClientsviewService) { }
  // lineChart
  
  ngOnInit(){

    this.userService.getUsers()
    .then((result) => {
   
      result.json().forEach(element => {
        if(!element.role){  
          this.usersResult.push(element)
        }
        this.summaryPercNum[(Math.ceil(this.usersResult.length-1)/6)]=0;

        this.lineChartColours=[];
        result.json().forEach(element => {
          var r = this.getRandomInt(-1,256)    
          var g = this.getRandomInt(-1,256)    
          var b = this.getRandomInt(-1,256)    
          this.lineChartColours.push(
            { 
              backgroundColor: 'rgba('+r+','+g+','+b+',0.2)',
              borderColor:  'rgba('+r+','+g+','+b+',1)',
              pointBackgroundColor:  'rgba('+r+','+g+','+b+',1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor:  'rgba('+r+','+g+','+b+',0.8)',
            }
          )
        });

      });
      
    })
    this.projectsService.getProjects()
    .then((result) => {
      this.projectResult=result.json();
    })
    this.clientsviewService.getClients()

    .then((result) => {
     
      this.lineChartColoursClient=[];
      result.json().forEach(element => {
        var r = this.getRandomInt(-1,256)    
        var g = this.getRandomInt(-1,256)    
        var b = this.getRandomInt(-1,256)    
        this.lineChartColoursClient.push(
          { 
            backgroundColor: 'rgba('+r+','+g+','+b+',0.2)',
            borderColor:  'rgba('+r+','+g+','+b+',1)',
            pointBackgroundColor:  'rgba('+r+','+g+','+b+',1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor:  'rgba('+r+','+g+','+b+',0.8)',
          }
        )
      });

      console.log(result.json())
      this.clientResult=result.json();
      this.summaryPercNumClient[(Math.ceil(this.clientResult.length-1)/6)]=0;
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

    switch (this.Type) {
      case 1:
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
      this.barChartLabels=[]  
      this.tempBarData=[]
      var barData=[];
      var dataTotalBar=[];
      
      this.usersResult.forEach((element1,index1,array1) => {
          
          var data =[]
          
  
  
        
        this.projectResult.forEach((element2,index2,array2) =>{
          this.projectsService.adminGetHours(element2._id,element1._id,moment(this.date_start).toISOString()+"",moment(this.date_end).toISOString()+"",this.frecText)
          .then((result)=>{
            
            result.json().log.forEach(function(element3,index3,array3) {
              if(!data[index3]){
                data[index3]=0;
              }            
              if(!barData[index1]){
                barData[index1]=0;
              }            
              data[index3]+=element3.time/factor*100;
             barData[index1]+=element3.time/factor*100;
             if(( index2==(array2.length-1))&&( index3==(array3.length-1))){
              barData[index1]/=(result.json().diff);
              barData[index1]
              dataTotalBar.push(barData[index1])
            }
            });
  
            
            this.lineChartLabels=[]
                 
           for (let index = 0; index < result.json().diff; index++) { 

            this.lineChartLabels.push(moment(this.date_start).add(index,this.frecText).format('DD/MM/YYYY'))         
           }
                
          })   
        });
          var r = this.getRandomInt(-1,256)    
          var g = this.getRandomInt(-1,256)    
          var b = this.getRandomInt(-1,256)    
          this.lineChartColours.push(
            { 
              backgroundColor: 'rgba('+r+','+g+','+b+',0.2)',
              borderColor:  'rgba('+r+','+g+','+b+',1)',
              pointBackgroundColor:  'rgba('+r+','+g+','+b+',1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor:  'rgba('+r+','+g+','+b+',0.8)',
            }
          )
          this.barChartLabels.push(element1.name)
          this.tempChartData.push({data: data, label: element1.name}) 
          this.summaryPerc=barData;
          this.tempBarData=[{data: barData, label: 'Porcentaje de utilización'}]
          
          if(index1==(array1.length-1)){
            this.tempBarData=[{data: dataTotalBar, label: "Porcentaje de utilización"}]
            /* this.tempBarData=[{data: [65.13213, 59.12, 80.12315, 81.1231245], label: 'Porcentaje de utilización'}] */
          }
  
        
      })
      
     
      
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
      var dataTotal=[];
      this.tempBarData=[]
      var barData=[];
      var dataTotalBar=[];
      this.usersResult.forEach((element,index1,array1) => {      
                    
       
        this.projectResult.forEach((element1,index2,array2) =>{
         
          this.projectsService.adminGetHours(element1._id,element._id,moment(this.date_start).toISOString()+"",moment(this.date_end).toISOString()+"",this.frecText)
          .then((result)=>{
            
            result.json().log.forEach(function(element,index,array) {
              if(!data[index]){
                data[index]=0;
              }            
              if(!barData[index1]){
                barData[index1]=0;
              }        
              
              data[index]+=element.time/factor*100;
              if(index1==(array1.length-1) && ( index2==(array2.length-1))){
          
                dataTotal.push(data[index]/4);
              }
  
              barData[index1]+=element.time/factor*100;
              if(( index2==(array2.length-1))&&( index==(array.length-1))){
               barData[index1]/=(result.json().diff);
               dataTotalBar.push(barData[index1])
             }
              
            });
            this.lineChartLabels=[]       
           for (let index = 0; index < result.json().diff; index++) {        
            this.lineChartLabels.push(moment(this.date_start).add(index,this.frecText).format('DD/MM/YYYY'))         
           }
                
          })   
       
        });
        this.tempChartData=[{data: data, label: "Porcentaje de utilización"}]
        this.barChartLabels.push(element.name)
        this.tempChartData.push({data: data, label: element.name}) 
        
        this.tempBarData=[{data: barData, label: 'Porcentaje de utilización'}]
        if(index1==(array1.length-1)){
          this.tempBarData=[{data: dataTotalBar, label: "Porcentaje de utilización"}]
          this.tempChartData=[{data: dataTotal, label: "Porcentaje de utilización"}]
        }
       
        
          
        
        
      })
      
  /*     this.tempChartData=[{data: data, label: "Porcentaje de utilización"}] */
    
      }
        break;
      case 2:
      if(this.View){
 
      this.tempChartData=[]
      this.barChartLabels=[]  
      this.tempBarData=[]
      var barData=[];
      var dataTotalBar=[];
      this.usersResult.forEach((element1,index1,array1) => {
          
          var data =[]
          
  
  
        
        this.projectResult.forEach((element2,index2,array2) =>{
          this.projectsService.adminGetHours(element2._id,element1._id,moment(this.date_start).toISOString()+"",moment(this.date_end).toISOString()+"",this.frecText)
          .then((result)=>{
            
            result.json().log.forEach(function(element3,index3,array3) {
              if(!data[index3]){
                data[index3]=0;
              }            
              if(!barData[index1]){
                barData[index1]=0;
              }            
              data[index3]+=element3.time*0.0166666666666667*element2.rate;
             barData[index1]+=element3.time*0.0166666666666667*element2.rate;
             if(( index2==(array2.length-1))&&( index3==(array3.length-1))){
              barData[index1]/=(result.json().diff);
              barData[index1]
              dataTotalBar.push(barData[index1])
            }
            });
  
            
            this.lineChartLabels=[]
                 
           for (let index = 0; index < result.json().diff; index++) {     
  
            this.lineChartLabels.push(moment(this.date_start).add(index,this.frecText).format('DD/MM/YYYY'))         
           }
                
          })   
        });
          this.barChartLabels.push(element1.name)
          this.tempChartData.push({data: data, label: element1.name}) 
          this.summaryPerc=barData;
          this.tempBarData=[{data: barData, label: 'Porcentaje de utilización'}]
          
          if(index1==(array1.length-1)){
            this.tempBarData=[{data: dataTotalBar, label: "Porcentaje de utilización"}]
            /* this.tempBarData=[{data: [65.13213, 59.12, 80.12315, 81.1231245], label: 'Porcentaje de utilización'}] */
          }
  
        
      })
      
     
      
      }else{

      this.tempChartData=[]
      var data =[]
      var dataTotal=[];
      this.tempBarData=[]
      var barData=[];
      var dataTotalBar=[];
      this.usersResult.forEach((element,index1,array1) => {      
                    
       
        this.projectResult.forEach((element1,index2,array2) =>{
         
          this.projectsService.adminGetHours(element1._id,element._id,moment(this.date_start).toISOString()+"",moment(this.date_end).toISOString()+"",this.frecText)
          .then((result)=>{
            
            result.json().log.forEach(function(element,index,array) {
              if(!data[index]){
                data[index]=0;
              }            
              if(!barData[index1]){
                barData[index1]=0;
              }        
              
              data[index]+=element.time*0.0166666666666667*element1.rate;
              if(index1==(array1.length-1) && ( index2==(array2.length-1))){
          
                dataTotal.push(data[index]/4);
              }
  
              barData[index1]+=element.time*0.0166666666666667*element1.rate;
              if(( index2==(array2.length-1))&&( index==(array.length-1))){
               barData[index1]/=(result.json().diff);
               dataTotalBar.push(barData[index1])
             }
              
            });
            this.lineChartLabels=[]       
           for (let index = 0; index < result.json().diff; index++) {        
            this.lineChartLabels.push(moment(this.date_start).add(index,this.frecText).format('DD/MM/YYYY'))         
           }
                
          })   
       
        });
        this.tempChartData=[{data: data, label: "Porcentaje de utilización"}]
        this.barChartLabels.push(element.name)
        this.tempChartData.push({data: data, label: element.name}) 
        
        this.tempBarData=[{data: barData, label: 'Porcentaje de utilización'}]
        if(index1==(array1.length-1)){
          this.tempBarData=[{data: dataTotalBar, label: "Porcentaje de utilización"}]
          this.tempChartData=[{data: dataTotal, label: "Porcentaje de utilización"}]
        }
       
        
          
        
        
      })
      
  /*     this.tempChartData=[{data: data, label: "Porcentaje de utilización"}] */
    
      }
        break;
      case 3:
      if(this.View){
 
        this.tempChartData=[]
        this.barChartLabels=[]  
        this.tempBarData=[]
        var barData=[];
        var dataTotalBar=[];
        this.clientResult.forEach((element1,index1,array1) => {
            
            var data =[]
            
    
    
          
          element1.projects.forEach((element2,index2,array2) =>{
            this.projectsService.adminGetHours(element2._id,"",moment(this.date_start).toISOString()+"",moment(this.date_end).toISOString()+"",this.frecText)
            .then((result)=>{
              
              result.json().log.forEach(function(element3,index3,array3) {
                if(!data[index3]){
                  data[index3]=0;
                }            
                if(!barData[index1]){
                  barData[index1]=0;
                }            
                data[index3]+=element3.time*0.0166666666666667*element2.rate;
               barData[index1]+=element3.time*0.0166666666666667*element2.rate;
               if(( index2==(array2.length-1))&&( index3==(array3.length-1))){
                barData[index1]/=(result.json().diff);
                barData[index1]
                dataTotalBar.push(barData[index1])
              }
              });
    
              
              this.lineChartLabels=[]
                   
             for (let index = 0; index < result.json().diff; index++) {     
    
              this.lineChartLabels.push(moment(this.date_start).add(index,this.frecText).format('DD/MM/YYYY'))         
             }
                  
            })   
          });
            this.barChartLabels.push(element1.name)
            this.tempChartData.push({data: data, label: element1.name}) 
            this.summaryPercClient=barData;
            this.tempBarData=[{data: barData, label: 'Porcentaje de utilización'}]
            
            if(index1==(array1.length-1)){
              this.tempBarData=[{data: dataTotalBar, label: "Porcentaje de utilización"}]
              /* this.tempBarData=[{data: [65.13213, 59.12, 80.12315, 81.1231245], label: 'Porcentaje de utilización'}] */
            }
    
          
        })
        
       
        
        }else{
  
        this.tempChartData=[]
        var data =[]
        var dataTotal=[];
        this.tempBarData=[]
        var barData=[];
        var dataTotalBar=[];
        this.clientResult.forEach((element,index1,array1) => {      
                      
         
          element.projects.forEach((element1,index2,array2) =>{
           
            this.projectsService.adminGetHours(element1._id,"",moment(this.date_start).toISOString()+"",moment(this.date_end).toISOString()+"",this.frecText)
            .then((result)=>{
              
              result.json().log.forEach(function(element,index,array) {
                if(!data[index]){
                  data[index]=0;
                }            
                if(!barData[index1]){
                  barData[index1]=0;
                }        
                
                data[index]+=element.time*0.0166666666666667*element1.rate;
                if(index1==(array1.length-1) && ( index2==(array2.length-1))){
            
                  dataTotal.push(data[index]/4);
                }
    
                barData[index1]+=element.time*0.0166666666666667*element1.rate;
                if(( index2==(array2.length-1))&&( index==(array.length-1))){
                 barData[index1]/=(result.json().diff);
                 dataTotalBar.push(barData[index1])
               }
                
              });
              this.lineChartLabels=[]       
             for (let index = 0; index < result.json().diff; index++) {        
              this.lineChartLabels.push(moment(this.date_start).add(index,this.frecText).format('DD/MM/YYYY'))         
             }
                  
            })   
         
          });
          this.tempChartData=[{data: data, label: "Producción por cliente"}]
          this.barChartLabels.push(element.name)
          this.tempChartData.push({data: data, label: element.name}) 
          
          this.tempBarData=[{data: barData, label: 'Producción por cliente'}]
          if(index1==(array1.length-1)){
            this.tempBarData=[{data: dataTotalBar, label: "Producción por cliente"}]
            this.tempChartData=[{data: dataTotal, label: "Producción por cliente"}]
          }
         
          console.log(this.tempChartData)
          
            
          
          
        })
        
    /*     this.tempChartData=[{data: data, label: "Porcentaje de utilización"}] */
      
        }
        break;
    
      default:
        break;
    }

 
    this.update()
  }

  public tempChartData: Array<any> = [
    
  ]
  public tempBarData: Array<any> = [
    
  ]
  public lineChartData: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series A'},
  ];

  
  
  public week = moment().week()
  public lineChartLabels: Array<any> = ['Week '+(this.week-3), 'Week '+(this.week-2), 'Week '+(this.week-1), 'Week '+(this.week), 'Week '+(this.week+1), 'Week '+(this.week+2), 'Week '+(this.week+3)];
  public lineChartOptions: any = {
    onAnimationComplete: this.update(),
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
    }
  ];
  public lineChartColoursClient: Array<any> = [
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
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81], label: 'Porcentaje de utilización'}
  ];

  public barChartColours: Array<any> = [
    { // FTF color
      backgroundColor: 'rgba(32,168,216,0.5)',
      borderColor: 'rgba(32,168,216,1)',
      pointBackgroundColor: 'rgba(32,168,216,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(32,168,216,0.8)'
    },
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

  update(){
    this.toggleTable=false;
  
    this.lineChartData=this.tempChartData
    this.barChartData=this.tempBarData
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {

        if(this.chart !== undefined){
          this.chart.ngOnDestroy();
          this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
        }
      }
  });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  ToggleGraph(){
    this.toggleTable=!this.toggleTable;

    if(this.toggleTable){
      this.texto="tabla";
      
    }else{
      this.texto="gráfica";
    }
  }

  changeTab(tab){ 
    this.tabNumber=tab;
  }
  nextTab(){ 
    if(this.tabNumber<this.summaryPercNum.length-1){
      this.tabNumber++;
    }
  }
  prevTab(){ 
    if(this.tabNumber>0){
      this.tabNumber--;
    }
  }


}
