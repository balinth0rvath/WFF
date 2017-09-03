import { ModalModule } from 'ng2-modal';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { Group } from './../../model/group.model';
import { GroupService } from './../../service/group.service';
import { Component, OnInit, OnDestroy, ViewChild, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit, OnDestroy {

  areaList: Group[];

  status: number;
  subscription: Subscription;
  statusSubscription: Subscription;

  selected: Group;

  constructor(private router: Router, private groupService: GroupService) { }

  ngOnInit() {
    if (this.areaList == null) {
      console.log('ures');
      this.areaList = this.groupService.getList();
    }
    this.subscription = this.groupService.listChanged.subscribe(
      (list: Group[]) => {
        this.areaList = list;
      }
    )
    this.statusSubscription = this.groupService.status.subscribe(
      (status: number) => {
        this.status = status;
        console.log('status update' + status);
      }
    )

  }

  onNew() {
    this.router.navigate(['/area', 'new']);
  }
  onEdit(id: number) {

    this.router.navigate(['/area', 'edit', id]);
  }

  onSelect(id: number) {
    this.selected = this.groupService.getGroup(id);
  }

  onDelete() {
    this.groupService.deleteOne(this.selected.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.statusSubscription.unsubscribe();
  }

  onPrev() {
    console.log('előző');
    this.groupService.prevPage();
  }

  onNext() {
    console.log('következő');
    this.groupService.nextPage();
  }

  goToPage(n: number) {
    
    this.groupService.goToPage(n);
  }
}
