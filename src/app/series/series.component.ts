import { Component, OnInit, Input } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { tap, map } from 'rxjs/operators'

import { AppState } from '../store/app.reducer'
import { Style } from '../UI/list/list.component'
import { SeriesModel } from './series.model'
import * as fromSeriesActions from './store/series.actions'
import * as fromSeriesByCharacterIdActions from './store/byCharacterId/series-by-characterId.actions'

export interface FilterType {
    type: 'character'
    id: number
}

@Component({
    selector: 'app-series',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
    storeSubscription: Subscription
    seriesList: SeriesModel[]
    hasMore: boolean
    loading: boolean
    gridStyle = Style.gridSpaced
    hasError: boolean
    @Input('filter') filter: FilterType

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        if (this.filter) {
            this.store.dispatch(
                fromSeriesByCharacterIdActions.fetchStart({
                    payload: this.filter.id,
                })
            )
        } else {
            this.store.dispatch(fromSeriesActions.fetchStart())
        }
    }

    subscribeToStore() {
        let store = 'series'

        if (this.filter) {
            store = 'seriesByCharacterId'
        }

        this.storeSubscription = this.store.select(store).subscribe(res => {
            this.loading = res.fetching
            if (res.error) {
                this.hasError = true
            }
            if (this.hasMore !== res.pagination.hasMore) {
                this.hasMore = res.pagination.hasMore
            }
            this.seriesList = res.data
        })
    }

    onScroll() {
        if (this.filter) {
            this.store.dispatch(
                fromSeriesByCharacterIdActions.fetchNextPage({
                    payload: this.filter.id,
                })
            )
        } else {
            this.store.dispatch(fromSeriesActions.fetchNextPage())
        }
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe()
    }
}
