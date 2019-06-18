import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { tap, map } from 'rxjs/operators'

import { AppState } from '../store/app.reducer'
import * as fromComicsAction from './store/comics.actions'
import { Style } from '../UI/list/list.component'
import { ComicModel } from './comic.model'

export interface FilterType {
    type: 'character' | 'series'
    id: number
}

@Component({
    selector: 'app-comics',
    templateUrl: './comics.component.html',
    styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit, OnDestroy {
    comics: Observable<ComicModel[]>
    hasMore: boolean = true
    loading: boolean = true
    gridStyle = Style.gridSpaced

    @Input('filter') filter: FilterType

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        if (this.filter) {
            this.store.dispatch(new fromComicsAction.ResetComics())
            if (this.filter.type === 'character') {
                this.store.dispatch(new fromComicsAction.FetchComicsByCharacterIdStart(this.filter.id))
            } else {
            }
        } else {
            this.store.dispatch(new fromComicsAction.FetchComicsStart())
        }
    }

    subscribeToStore() {
        this.comics = this.store.select('comics').pipe(
            tap(res => {
                this.loading = res.fetching
                if (this.hasMore !== res.pagination.hasMore) {
                    this.hasMore = res.pagination.hasMore
                }
            }),
            map(res => res.data)
        )
    }

    onScroll() {
        if (this.filter) {
            if (this.filter.type === 'character') {
                this.store.dispatch(new fromComicsAction.FetchComicsByCharacterIdNextPage(this.filter.id))
            } else {
            }
        } else {
            this.store.dispatch(new fromComicsAction.FetchComicsNextPage())
        }
    }

    ngOnDestroy() {
        if (this.filter) {
            this.store.dispatch(new fromComicsAction.ResetComics())
        }
    }
}
