import { ModalModule } from 'ng2-modal';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { Group } from './../../model/group.model';
import { GroupService } from './../../service/group.service';
import { Component, OnInit, OnDestroy, ViewChild, ContentChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit, OnDestroy {

  type: string; // area, group
  typeLabelArray = [];

  list: Group[];

  status: number;
  subscription: Subscription;
  statusSubscription: Subscription;

  selected: Group;

  count:number;
  page:number;
  perPage:number;
  pagesToShow:number;
  someLoadingVar:string;
  
  constructor(private router: Router, private groupService: GroupService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.count=this.groupService.count;
    this.page=this.groupService.page
    this.perPage=this.groupService.perPage
    this.pagesToShow=this.groupService.pagesToShow
    this.someLoadingVar=null;
    
    this.type = this.route.snapshot.url[0].path;
    this.type == 'area' ? this.typeLabelArray[0] = 'Területek' : this.typeLabelArray[0] = 'Csoportok';
    this.type == 'area' ? this.typeLabelArray[1] = 'Új terület' : this.typeLabelArray[1] = 'Új csoport';
    this.type == 'area' ? this.typeLabelArray[2] = 'terület' : this.typeLabelArray[2] = 'csoport';

    this.groupService.resource = this.type;
    if (this.list == null) {
      this.list = this.groupService.getList();
    }
    this.subscription = this.groupService.listChanged.subscribe(
      (list: Group[]) => {
        this.list = list;
      }
    )
    this.statusSubscription = this.groupService.status.subscribe(
      (status: number) => {
        this.status = status;
      }
    )
  }

  onNew() {
    this.router.navigate(['/' + this.type, 'new']);
  }
  onEdit(id: number) {
    this.router.navigate(['/' + this.type, 'edit', id]);
  }

  onSelect(id: number) {
    this.selected = this.groupService.getOne(id);
  }

  onDelete() {
    this.groupService.deleteOne(this.selected.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.statusSubscription.unsubscribe();
  }

  onPrev() {
    this.groupService.prevPage();
  }

  onNext() {
    this.groupService.nextPage();
  }

  goToPage(n: number) {

    this.groupService.goToPage(n);
  }
}
