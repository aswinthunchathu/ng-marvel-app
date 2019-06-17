import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Params } from '@angular/router'

import { AppState } from 'src/app/store/app.reducer'
import { ImageGenerator, types } from 'src/app/shared/model/image-generator.model'
import { Image } from 'src/app/shared/model/shared.interface'
import * as fromSeriesDetailsActions from './store/series-details.actions'
import { SeriesModel } from '../series.model'

@Component({
    selector: 'app-series-details',
    templateUrl: './series-details.component.html',
    styleUrls: ['./series-details.component.scss'],
})
export class SeriesDetailsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription
    private comicSub: Subscription
    loading: boolean = true
    series: SeriesModel = null

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            this.store.dispatch(new fromSeriesDetailsActions.FetchSeriesDetailsStart(+params['id']))
        })

        this.comicSub = this.store.select('seriesDetails').subscribe(res => {
            this.loading = res.fetching
            if (res.data) {
                this.series = res.data
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
        this.comicSub.unsubscribe()
    }
}
