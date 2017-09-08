import { Account } from './../../../model/account.model';
import { AccountService } from './../../../service/account.service';
import { GroupService } from './../../../service/group.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {
  
  editMode: boolean;
  id: number;
  account: Account;
  accountForm: FormGroup;
  
  constructor(private accountService: AccountService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {  
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.account = this.accountService.getOne(this.id);
        console.log(this.account);
        this.formInit();
      });


  }

  formInit() {
    
    let accountName = this.account.fullName;
    this.accountForm = new FormGroup({
      'name': new FormControl(accountName, Validators.required)
    });
  }
  onSubmit() {
    
    this.router.navigate(['/member']);
  }

  onCancel() {
    this.router.navigate(['/member']);
  }

}
