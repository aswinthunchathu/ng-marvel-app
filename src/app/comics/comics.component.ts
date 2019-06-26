import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'

import { AppState } from '../store/app.reducer'
import * as fromRoot from '../store/app.reducer'
import * as fromComicsAction from './store/comics.actions'
import * as fromComicsByCharacterIdAction from './store/byCharacterId/comics-by-characterId.actions'
import * as fromComicsBySeriesIdAction from './store/bySeriesId/comics-by-seriesId.actions'
import { Style } from '../shared/components/list/list.component'
import { ComicModel } from './comic.model'
import { FILTER_TYPE } from '../constants'
import { switchMap } from 'rxjs/operators'
import { Filter } from '../shared/model/shared.interface'

const keyMap = {
    [FILTER_TYPE.none]: {
        action: fromComicsAction,
        state: 'comics',
        list: fromRoot.selectAllComics,
    },
    [FILTER_TYPE.character]: {
        action: fromComicsByCharacterIdAction,
        state: 'comicByCharacterId',
        list: fromRoot.selectAllComicsByCharacterId,
    },
    [FILTER_TYPE.series]: {
        action: fromComicsBySeriesIdAction,
        state: 'comicBySeriesId',
        list: fromRoot.selectAllComicsBySeriesId,
    },
}

@Component({
    selector: 'app-comics',
    templateUrl: './comics.component.html',
    styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit, OnDestroy {
    storeSubscription: Subscription
    comics: ComicModel[]
    hasMore: boolean
    loading: boolean
    gridStyle = Style.gridSpaced
    hasError: boolean
    @Input('filter') filter: Filter

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        if (this.filter) {
            this.gridStyle = Style.gridSpaced
            this.store.dispatch(
                keyMap[this.filter.type].action.fetchStart({
                    payload: this.filter.id,
                })
            )
        } else {
            this.store.dispatch(keyMap[FILTER_TYPE.none].action.fetchStart())
        }
    }

    subscribeToStore() {
        const type = this.filter ? this.filter.type : FILTER_TYPE.none

        this.storeSubscription = this.store
            .select(keyMap[type].state)
            .pipe(
                switchMap(res => {
                    this.loading = res.ui.fetching
                    this.hasError = !!res.ui.error
                    if (this.hasMore !== res.pagination.data.hasMore) {
                        this.hasMore = res.pagination.data.hasMore
                    }

                    return this.store.pipe(select(keyMap[type].list))
                })
            )
            .subscribe(res => (this.comics = res))
    }

    onScroll() {
        this.store.dispatch(keyMap[this.filter ? this.filter.type : FILTER_TYPE.none].action.fetchNextPage())
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe()
    }
}
