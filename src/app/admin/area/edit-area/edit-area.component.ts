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
  type: string; // area, group
  typeLabelArray = [];
  
  
  editMode: boolean;
  id: number;
  area: Group;
  areaForm: FormGroup;
  constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.type = this.route.snapshot.url[0].path;

    console.log(this.type);
    this.route.params.subscribe(
      (params: Params) => {  
        this.id = +params['id'];
        this.editMode = params['id'] != null;

        switch(this.type) {
          case 'area':
          this.typeLabelArray[0]='Területek Karbantartása';
          !this.editMode ? this.typeLabelArray[1] = 'Új terület' : 
                           this.typeLabelArray[1] = 'Terület szerkesztése';
          this.typeLabelArray[2]='Terület';                 
          break;

          case 'group':
          this.typeLabelArray[0]='Csoportok Karbantartása';
          !this.editMode ? this.typeLabelArray[1] = 'Új csoport' : 
                           this.typeLabelArray[1] = 'Csoport szerkesztése';
          this.typeLabelArray[2]='Csoport';
          break;

          default:
          
          break;
        }

        this.area = this.groupService.getGroup(this.id);
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
      this.areaForm.value['description'], this.type
    );
    if (this.editMode) {
      
    } else {
      
    }

    this.groupService.saveOne(newArea);
    this.router.navigate(['/'+this.type]);
  }

  onCancel() {
    this.router.navigate(['/'+this.type]);
  }
}
