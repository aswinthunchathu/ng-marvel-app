import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Subscription } from 'rxjs'

import { AppState } from '../../store/app.reducer'
import * as fromCharacterDetailsActions from '../../characters/store/details/character.actions'
import { ListDetailsModel } from '../../shared/components/list-view/list-view-details/list-details.model'
import { Filter, FILTER_TYPE } from '../../list/list.metadata'
import { COMPONENT_TYPE, mapping } from './list-details.metadata'

@Component({
    selector: 'app-list-details',
    templateUrl: './list-details.component.html',
    styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit, OnDestroy {
    storeSub: Subscription
    routeSub: Subscription
    data: ListDetailsModel
    hasError: boolean
    loading: boolean
    filter: Filter

    @Input() type: COMPONENT_TYPE
    tabs: any[]

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.tabs = mapping[this.type].tabs
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
        this.storeSub = this.store.select(this.type).subscribe(res => {
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
        this.filter = {
            type: mapping[this.type].filterKey,
            value,
        }
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe()
        this.routeSub.unsubscribe()
    }
}
