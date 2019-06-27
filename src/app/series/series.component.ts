import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { switchMap } from 'rxjs/operators'

import { AppState } from '../store/app.reducer'
import * as fromRoot from '../store/app.selector'
import { Style } from '../shared/components/list/list.component'
import { SeriesModel } from './series.model'
import * as fromSeriesActions from './store/series.actions'
import * as fromSeriesByCharacterIdActions from './store/byCharacterId/series-by-characterId.actions'
import { FILTER_TYPE } from '../constants'
import { Filter } from '../shared/model/shared.interface'

const keyMap = {
    [FILTER_TYPE.none]: {
        action: fromSeriesActions,
        state: 'series',
        list: fromRoot.selectAllComics,
    },
    [FILTER_TYPE.character]: {
        action: fromSeriesByCharacterIdActions,
        state: 'seriesByCharacterId',
        list: fromRoot.selectAllSeriesByCharacterId,
    },
}

@Component({
    selector: 'app-series',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit, OnDestroy {
    storeSubscription: Subscription
    seriesList: SeriesModel[]
    hasMore: boolean
    loading: boolean
    gridStyle = Style.gridSpaced
    hasError: boolean
    @Input() filter: Filter

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        if (this.filter) {
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
            .subscribe(res => (this.seriesList = res))
    }

    onScroll() {
        this.store.dispatch(keyMap[this.filter ? this.filter.type : FILTER_TYPE.none].action.fetchNextPage())
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe()
    }
}
