import { Subject } from 'rxjs/Subject';
import { Group } from './../model/group.model';
import { AuthorizationService } from './../authorization/authorization.service';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class GenericService<T> {

    protected resource;

    list: T[];

    currentList: T[];

    count: number; // total rows
    page = 1; // the current page
    perPage = 5; // rows per page
    pagesToShow = 5; // pages to show on pagination
    loading = "someLoadingVar";
    onPrev = "prevPage()";
    onNext = "nextPage()";
    onPage = "goToPage($event)";

    listChanged = new Subject<T[]>();
    status = new Subject<number>();
    private authService: AuthorizationService;

    constructor(authorizationService: AuthorizationService) {
        this.authService = authorizationService;
    }

    abstract getOne(id: number)

    prevPage() {
        if (this.page > 1)
            this.page--;

        this.goToPage(this.page);

    }

    nextPage() {
        if (this.page * this.perPage < this.count) {
            this.page++
            this.goToPage(this.page);
        }
    }

    goToPage(id: number) {
        console.log(id);
        this.page = id;
        let minIndex = (this.page - 1) * this.perPage;
        let maxIndex = this.page * this.perPage - 1;
        maxIndex > this.count ? maxIndex = this.count : maxIndex;
        this.currentList = this.list.slice(minIndex, maxIndex + 1);
        this.listChanged.next(this.currentList.slice());
    }

    getList(): any {
        /* szinkronizáláskor itt hiba lehet, ha valaki más módosítja a listát */

        this.fetchList();
        return null;

    }

    saveOne(t: T) {
        this.authService.saveData(t, this.resource)
            .subscribe(
            () => { this.fetchList(); this.status.next(1); },
            (error) => {
                this.status.next(-1)
                this.errorHandling(error);
            }
            );
    }

    deleteOne(id) {
        this.authService.deleteData(id, this.resource)
            .subscribe(
            () => { this.fetchList(); this.status.next(2); },
            (error) => {
                this.status.next(-1)
                this.errorHandling(error);
            }
            );
    }

    abstract sortList()

    fetchList() {
        this.authService.getData<T[]>(this.resource)
            .subscribe(
            (list: T[]) => {
                this.list = list;
                this.sortList();
                this.currentList = list.slice(0, this.perPage);
                this.count = this.list.length;
                this.listChanged.next(this.currentList.slice());

            },
            (error) => {
                this.status.next(-1);
                this.errorHandling(error);
            }
            );
    }

    errorHandling(response: Response ) {
        if (response.status == 401) {
            console.log("invalid access token. trying to fetch new");
            this.authService.getAccessToken();
        } else if
          (response.status >= 399 && response.status < 500) {
            console.log('access denied');
            this.authService.authenticated.next(false);
        } else {
            console.log();
        }
    }
}
