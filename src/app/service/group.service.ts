import { Subject } from 'rxjs/Subject';
import { Group } from './../model/group.model';
import { AuthorizationService } from './../authorization/authorization.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupService {

  private resource = 'group';
  
  groupList: Group[];
  constructor(private authorizationService: AuthorizationService) { }

  getGroups(): Group[] {
    return this.groupList.slice();
  }

  fetchGroups() {
    this.authorizationService.getData<Group[]>(this.resource)
      .subscribe((groupList: Group[]) => {
        this.groupList = groupList;
      },
      () => { console.log('error fetching groups') });
  }
}
