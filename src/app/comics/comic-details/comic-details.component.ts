import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Params } from '@angular/router'

import { AppState } from 'src/app/store/app.reducer'
import * as fromComicActions from './store/comic.actions'
import { ListDetailsModel } from '../../UI/list/list-details/list-details.model'

@Component({
    selector: 'app-comic-details',
    templateUrl: './comic-details.component.html',
    styleUrls: ['./comic-details.component.scss'],
})
export class ComicDetailsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription
    private comicSub: Subscription
    loading: boolean = true
    comic: ListDetailsModel = null

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            this.store.dispatch(new fromComicActions.FetchComicStart(+params['id']))
        })

        this.comicSub = this.store.select('comic').subscribe(res => {
            this.loading = res.fetching
            if (res.data) {
                this.comic = new ListDetailsModel(
                    res.data.title,
                    res.data.image,
                    res.data.placeholder,
                    res.data.description
                )
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
        this.comicSub.unsubscribe()
    }
}
