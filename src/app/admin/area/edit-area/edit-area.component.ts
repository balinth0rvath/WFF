import { GroupService } from './../../../service/group.service';
import { Group } from './../../../model/group.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-area',
  templateUrl: './edit-area.component.html',
  styleUrls: ['./edit-area.component.css']
})
export class EditAreaComponent implements OnInit {
  editLabel: string;
  editMode: boolean;
  id: number;
  area: Group;
  areaForm: FormGroup;
  constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        !this.editMode ? this.editLabel = 'Új terület' : this.editLabel = 'Terület szerkesztése';
        this.area = this.groupService.getGroup(this.id);
        console.log('ezide:' + this.area);
        console.log(this.id);
        this.formInit();
      }
    )
  }

  formInit() {
    let areaName;
    let areaDescription;
    this.area!=null ? areaName = this.area.name:'';
    this.area!=null ? areaDescription = this.area.description:'';
      
    this.areaForm = new FormGroup({
      'name': new FormControl(areaName, Validators.required),
      'description': new FormControl(areaDescription, Validators.required)
    });
  }

  onSubmit() {
    const newArea = new Group(this.id, this.areaForm.value['name'],
      this.areaForm.value['description'], 'AREA'
    );
    if (this.editMode) {
      
    } else {
      
    }
    console.log('most:');
    console.log(newArea);
    this.groupService.saveOne(newArea);
    this.router.navigate(['/area']);
  }

  onCancel() {
    this.router.navigate(['/area']);
  }
}
