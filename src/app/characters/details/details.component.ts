import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Subscription } from 'rxjs'

import { AppState } from '../../store/app.reducer'
import * as fromCharacterDetailsActions from '../store/details/character.actions'
import { ListDetailsModel } from '../../shared/components/list-view/list-view-details/list-details.model'
import { Filter } from '../../list/list.metadata'

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
    comicsFilter: Filter
    seriesFilter: Filter

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscribeToStore()
        this.queryOnStore()
    }

    queryOnStore() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            const key = 'id'
            const filter = params[key]
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

    setFilter(value: string) {
        // this.comicsFilter = {
        //     type: ComicsFilterType.byCharacterId,
        //     value,
        // }
        // this.seriesFilter = {
        //     type: SeriesFilterType.byCharacterId,
        //     value,
        // }
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe()
        this.routeSub.unsubscribe()
    }
}
