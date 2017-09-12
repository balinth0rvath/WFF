import { Group } from './../../model/group.model';
import { ModalModule } from 'ng2-modal';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { Account } from './../../model/account.model';
import { AccountService } from './../../service/account.service';
import { Component, OnInit, OnDestroy, ViewChild, ContentChild, ElementRef, Input } from '@angular/core';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  list: Account[];
  myGrouplist: Group[];
  status: number;
  subscription: Subscription;
  statusSubscription: Subscription;
  groupsSubscription: Subscription;

  selected: Account;

  constructor(private router: Router, private accountService: AccountService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    if (this.list == null) {
      this.list = this.accountService.getList();
    }
    this.subscription = this.accountService.listChanged.subscribe(
      (list: Account[]) => {
        this.list = list;
      }
    )
    this.statusSubscription = this.accountService.status.subscribe(
      (status: number) => {
        this.status = status;
      }
    )
  }

  onNew() {
    this.router.navigate(['admin','member', 'new']);
  }
  onEdit(id: number) {
    this.router.navigate(['admin','member', 'edit', id]);
  }
  onShow(id: number) {
    this.router.navigate(['admin','member', 'show', id]);
  }

  onSelect(id: number) {
    this.selected = this.accountService.getOne(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.statusSubscription.unsubscribe();
  }

  onPrev() {
    this.accountService.prevPage();
  }

  onNext() {
    this.accountService.nextPage();
  }

  goToPage(n: number) {

    this.accountService.goToPage(n);
  }
}

