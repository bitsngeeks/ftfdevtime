import { Component, OnInit } from '@angular/core';

import { UsersService } from './../services/users.service';

@Component({
  selector: 'app-usersview',
  templateUrl: './usersview.component.html',
  styleUrls: ['./usersview.component.scss']
})
export class UsersviewComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  ngOnInit() {
  }

}
