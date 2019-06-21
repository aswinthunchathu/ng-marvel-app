import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Params } from '@angular/router'

import { AppState } from '../../store/app.reducer'
import * as fromSeriesDetailsActions from './store/series-details.actions'
import { ListDetailsModel } from '../../UI/list/list-details/list-details.model'
import { FilterType as ComicFilterType } from '../../comics/comics.component'
import { FilterType as CharacterFilterType } from '../../characters/characters.component'

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
    filter: ComicFilterType | CharacterFilterType = null
    hasError: boolean

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            const id = +params['id']
            this.filter = {
                type: 'series',
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

            if (res.error) {
                this.hasError = true
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
        this.seriesSub.unsubscribe()
    }
}
