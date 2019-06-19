import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { AppState } from '../store/app.reducer'
import * as fromComicsAction from './store/comics.actions'
import * as fromComicsByCharacterIdAction from './store/byCharacterId/comics-by-characterId.actions'
import * as fromComicsBySeriesIdAction from './store/bySeriesId/comics-by-seriesId.actions'
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
    storeSubscription: Subscription
    comics: ComicModel[]
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
            if (this.filter.type === 'character') {
                this.store.dispatch(new fromComicsByCharacterIdAction.FetchComicsByCharacterIdStart(this.filter.id))
            } else {
                this.store.dispatch(new fromComicsBySeriesIdAction.FetchComicsBySeriesIdStart(this.filter.id))
            }
        } else {
            this.store.dispatch(new fromComicsAction.FetchComicsStart())
        }
    }

    subscribeToStore() {
        let store = 'comics'

        if (this.filter) {
            if (this.filter.type === 'character') {
                store = 'comicByCharacterId'
            } else {
                store = 'comicBySeriesId'
            }
        }

        this.storeSubscription = this.store.select(store).subscribe(res => {
            this.loading = res.fetching
            this.comics = res.data
            if (this.hasMore !== res.pagination.hasMore) {
                this.hasMore = res.pagination.hasMore
            }
        })
    }

    onScroll() {
        if (this.filter) {
            if (this.filter.type === 'character') {
                this.store.dispatch(new fromComicsByCharacterIdAction.FetchComicsByCharacterIdNextPage(this.filter.id))
            } else {
                this.store.dispatch(new fromComicsBySeriesIdAction.FetchComicsBySeriesIdNextPage(this.filter.id))
            }
        } else {
            this.store.dispatch(new fromComicsAction.FetchComicsNextPage())
        }
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe()
    }
}
