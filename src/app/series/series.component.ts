import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ActivatedRoute, Params } from '@angular/router'
import { tap } from 'rxjs/operators'

import { AppState } from '../store/app.reducer'
import { State as SeriesState } from './store'
import { State as SeriesByCharacterIdState } from './store/byCharacterId'
import { State as SeriesByNameState } from './store/byName'
import { SeriesModel, FILTER_TYPE } from './series.model'
import { ImageType } from '../shared/model/image-generator.model'

import * as fromRoot from '../store/app.selector'

import * as fromSeriesAction from './store/series.actions'
import * as fromSeriesByCharacterIdAction from './store/byCharacterId/series-by-characterId.actions'
import * as fromSeriesByNameActions from './store/byName/series-by-name.actions'
import { Pagination } from '../shared/model/pagination.model'
import { ROUTE_PATHS } from '../constants'

export interface Filter {
    type: FILTER_TYPE
    value: string | number
}

@Component({
    selector: 'app-series',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
    @Input() filter: Filter
    @Input() infinityScroll = true
    @Input() spacedItems = true
    @Input() withPagination = true

    //component props
    state: Observable<SeriesState> | Observable<SeriesByCharacterIdState> | Observable<SeriesByNameState>
    list: Observable<SeriesModel[]>
    showPagination: boolean

    //app-card props
    imageType = ImageType.portrait
    isAnimated = false
    isFloatingLabel = false

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        switch (this.filter ? this.filter.type : undefined) {
            // filtered by character id
            case FILTER_TYPE.byCharacterId:
                this.initSeriesByCharacterId()
                break
            // full list or filtered by title
            default:
                this.route.queryParams.subscribe((data: Params) => {
                    const { key } = data

                    if (!!key) {
                        this.filter = {
                            type: FILTER_TYPE.byTitle,
                            value: key,
                        }
                        this.initSeriesByName()
                    } else {
                        this.initSeries()
                    }
                })
        }
    }

    initSeries() {
        this.store.dispatch(fromSeriesAction.fetchStart())
        this.state = this.store.select('series').pipe(tap(res => this.setShowPagination(res.pagination.data)))
        this.list = this.store.pipe(select(fromRoot.selectAllSeries))
    }

    initSeriesByCharacterId() {
        this.store.dispatch(
            fromSeriesByCharacterIdAction.fetchStart({
                payload: +this.filter.value,
            })
        )
        this.state = this.store
            .select('seriesByCharacterId')
            .pipe(tap(res => this.setShowPagination(res.pagination.data)))
        this.list = this.store.pipe(select(fromRoot.selectAllSeriesByCharacterId))
    }

    initSeriesByName() {
        this.store.dispatch(
            fromSeriesByNameActions.fetchStart({
                payload: String(this.filter.value),
            })
        )

        this.state = this.store.select('seriesByName').pipe(tap(res => this.setShowPagination(res.pagination.data)))
        this.list = this.store.pipe(select(fromRoot.selectAllSeriesByName))
    }

    setShowPagination(data: Pagination) {
        if (this.withPagination) {
            this.showPagination = data.total > 0
        }
    }

    onScroll() {
        switch (this.filter ? this.filter.type : undefined) {
            case FILTER_TYPE.byCharacterId:
                this.store.dispatch(fromSeriesByCharacterIdAction.fetchNextPage())
                break
            case FILTER_TYPE.byTitle:
                this.store.dispatch(fromSeriesByNameActions.fetchNextPage())
                break
            default:
                this.store.dispatch(fromSeriesAction.fetchNextPage())
        }
    }
}
