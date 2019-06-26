import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Params } from '@angular/router'

import { AppState } from '../../store/app.reducer'
import * as fromSeriesDetailsActions from './store/series-details.actions'
import { ListDetailsModel } from '../../shared/components/list/list-details/list-details.model'
import { Filter } from '../../shared/model/shared.interface'
import { FILTER_TYPE } from '../../constants'

@Component({
    selector: 'app-series-details',
    templateUrl: './series-details.component.html',
    styleUrls: ['./series-details.component.scss'],
})
export class SeriesDetailsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription
    private seriesSub: Subscription
    loading: boolean
    series: ListDetailsModel
    filter: Filter = null
    hasError: boolean

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            const key = 'id'
            const id = +params[key]

            this.filter = {
                type: FILTER_TYPE.series,
                id,
            }

            this.store.dispatch(
                fromSeriesDetailsActions.fetchStart({
                    payload: id,
                })
            )
        })
    }

    subscribeToStore() {
        this.seriesSub = this.store.select('seriesDetails').subscribe(({ ui, data: state }) => {
            this.loading = ui.fetching
            if (state.data) {
                this.series = new ListDetailsModel(
                    state.data.title,
                    state.data.image.portrait.actual,
                    state.data.image.portrait.placeholder,
                    state.data.description
                )
            }

            if (ui.error) {
                this.hasError = true
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
        this.seriesSub.unsubscribe()
    }
}
