import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Subscription } from 'rxjs'

import { AppState } from '../../store/app.reducer'
import { BgService } from '../../shared/services/bg.service'
import * as fromCharacterDetailsActions from '../store/details/character.actions'
import { ListDetailsModel } from 'src/app/list-view/details/list-details.model'
import { Filter as ComicsFilter } from '../../comics/comics.component'
import { FILTER_TYPE as ComicsFilterType } from '../../comics/comic.model'
import { Filter as SeriesFilter } from '../../series/series.component'
import { FILTER_TYPE as SeriesFilterType } from '../../series/series.model'

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
    storeSub: Subscription
    routeSub: Subscription
    data: ListDetailsModel
    hasError: boolean
    loading: boolean
    comicsFilter: ComicsFilter
    seriesFilter: SeriesFilter

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscribeToStore()
        this.queryOnStore()
    }

    queryOnStore() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            const key = 'id'
            const filter = +params[key]
            this.setFilter(filter)
            this.store.dispatch(
                fromCharacterDetailsActions.fetchStart({
                    payload: filter,
                })
            )
        })
    }

    subscribeToStore() {
        this.storeSub = this.store.select('character').subscribe(res => {
            this.hasError = !!res.ui.error
            this.loading = res.ui.fetching

            if (res.data && res.data.data) {
                this.data = new ListDetailsModel(
                    res.data.data.title,
                    res.data.data.image.portrait.actual,
                    res.data.data.image.portrait.placeholder,
                    res.data.data.description
                )
            }
        })
    }

    setFilter(value: number) {
        this.comicsFilter = {
            type: ComicsFilterType.byCharacterId,
            value,
        }

        this.seriesFilter = {
            type: SeriesFilterType.byCharacterId,
            value,
        }
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe()
        this.routeSub.unsubscribe()
    }
}
