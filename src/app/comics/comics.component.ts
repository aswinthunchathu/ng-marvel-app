import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { tap, map } from 'rxjs/operators'

import { AppState } from '../store/app.reducer'
import * as fromComicsAction from './store/comics.actions'
import * as fromComicsByCharacterIdAction from './store/byCharacterId/comics-by-characterId.actions'
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
export class ComicsComponent implements OnInit {
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
            if (this.filter.type === 'character') {
                this.store.dispatch(new fromComicsByCharacterIdAction.FetchComicsByCharacterIdStart(this.filter.id))
            } else {
                //this.store.dispatch(new fromComicsAction.FetchComicsBySeriesIdStart(this.filter.id))
            }
        } else {
            this.store.dispatch(new fromComicsAction.FetchComicsStart())
        }
    }

    subscribeToStore() {
        const store = this.filter.type === 'character' ? 'comicByCharacterId' : 'comics'
        this.comics = this.store.select(store).pipe(
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
                this.store.dispatch(new fromComicsByCharacterIdAction.FetchComicsByCharacterIdNextPage(this.filter.id))
            } else {
                //this.store.dispatch(new fromComicsAction.FetchComicsBySeriesIdNextPage(this.filter.id))
            }
        } else {
            this.store.dispatch(new fromComicsAction.FetchComicsNextPage())
        }
    }
}
