import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Params } from '@angular/router'

import { AppState } from '../../store/app.reducer'
import * as fromSeriesDetailsActions from './store/series-details.actions'
import { ListDetailsModel } from '../../UI/list/list-details/list-details.model'
import { FilterType } from '../../comics/comics.component'

@Component({
    selector: 'app-series-details',
    templateUrl: './series-details.component.html',
    styleUrls: ['./series-details.component.scss'],
})
export class SeriesDetailsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription
    private seriesSub: Subscription
    loading: boolean = true
    series: ListDetailsModel = null
    filter: FilterType = null

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            const id = +params['id']
            this.filter = {
                type: 'series',
                id,
            }
            this.store.dispatch(new fromSeriesDetailsActions.FetchSeriesDetailsStart(id))
        })

        this.seriesSub = this.store.select('seriesDetails').subscribe(res => {
            this.loading = res.fetching
            if (res.data) {
                this.series = new ListDetailsModel(
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
        this.seriesSub.unsubscribe()
    }
}
