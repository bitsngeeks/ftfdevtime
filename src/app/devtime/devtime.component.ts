import { CommonModule } from '@angular/common/src/common_module';
import { ProjectsService } from './../services/projects.service';
import { Component, OnInit } from '@angular/core';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';


@Component({
  selector: 'app-devtime',
  templateUrl: './devtime.component.html',
  styleUrls: ['./devtime.component.scss']
})
export class DevtimeComponent implements OnInit {
  date = new Date();

  myOptions: INgxMyDpOptions = {
    disableSince: {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()+1},
    disableWeekends: true,
    dateFormat: 'dd.mm.yyyy',
};
  resultProject=[];
/* model: any = { date: { year: 2018, month: 10, day: 9 } }; */

  constructor(public projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getProjects()
    .then((result) => {

      console.log(result.json())
      this.resultProject=result.json();
    })
  }

  onDateChanged(event: IMyDateModel): void {
    // date selected
}

}
