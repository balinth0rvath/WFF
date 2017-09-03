import { GenericService } from './generic.service';
import { Subject } from 'rxjs/Subject';
import { Group } from './../model/group.model';
import { AuthorizationService } from './../authorization/authorization.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupService extends GenericService<Group> {

  resource = 'group';

  constructor(private authorizationService: AuthorizationService) { 
    super(authorizationService);
  }

  getGroup(id: number): Group {
    if (this.list == null)
      return null;
    return this.list.slice().find(x => x.id ==id);
  }
}
