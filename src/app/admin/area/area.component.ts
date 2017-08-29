import { GroupService } from './../../service/group.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    
  }

}
