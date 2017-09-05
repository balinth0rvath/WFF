import { GenericService } from './generic.service';
import { Subject } from 'rxjs/Subject';
import { Group } from './../model/group.model';
import { AuthorizationService } from './../authorization/authorization.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupService extends GenericService<Group> {

  resource: string;

  constructor(private authorizationService: AuthorizationService) {
    super(authorizationService);
  }

  getOne(id: number): Group {
    if (this.list == null)
      return null;
    return this.list.slice().find(x => x.id == id);
  }

  sortList() {
    let sortedList: Group[] = this.list.sort((a: Group, b: Group) => {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  
}
