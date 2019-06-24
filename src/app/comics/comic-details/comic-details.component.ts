import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Params } from '@angular/router'

import { AppState } from 'src/app/store/app.reducer'
import * as fromComicActions from './store/comic.actions'
import { ListDetailsModel } from '../../shared/components/list/list-details/list-details.model'
import { FilterType as CharacterFilterType } from 'src/app/characters/characters.component'

@Component({
    selector: 'app-comic-details',
    templateUrl: './comic-details.component.html',
    styleUrls: ['./comic-details.component.scss'],
})
export class ComicDetailsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription
    private comicSub: Subscription
    loading: boolean
    comic: ListDetailsModel
    filter: CharacterFilterType = null
    hasError: boolean

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            const id = +params['id']
            this.filter = {
                type: 'comics',
                id,
            }
            this.store.dispatch(
                fromComicActions.fetchStart({
                    payload: id,
                })
            )
        })
    }

    subscribeToStore() {
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

            if (res.error) {
                this.hasError = true
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
        this.comicSub.unsubscribe()
    }
}
