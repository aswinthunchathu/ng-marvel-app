import { Component, OnInit, OnDestroy, Input, AfterViewChecked } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs'

import { AppState } from '../../store/app.reducer'
import { Filter } from '../../list/list.metadata'
import { COMPONENT_TYPE, mapping } from './list-details.metadata'
import { BgService } from 'src/app/shared/services/bg.service'
import { ListDetailsModel } from './list-details.model'

@Component({
    selector: 'app-list-details',
    templateUrl: './list-details.component.html',
    styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit, OnDestroy, AfterViewChecked {
    storeSub: Subscription
    routeSub: Subscription
    data: ListDetailsModel
    hasError: boolean
    loading: boolean
    filter: Filter
    tabs: any[]

    @Input() isBgImage: false
    @Input() type: COMPONENT_TYPE

    constructor(private store: Store<AppState>, private route: ActivatedRoute, private bgService: BgService) {}

    ngOnInit() {
        this.tabs = mapping[this.type].tabs
        this.subscribeToStore()
        this.queryOnStore()
    }

    ngAfterViewChecked() {
        if (this.data && this.isBgImage) {
            this.bgService.setBgImage(this.data.image)
        }
    }

    queryOnStore() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            const key = 'id'
            const filter = params[key]
            this.setFilter(filter)
            this.store.dispatch(
                mapping[this.type].action.fetchStart({
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

        if (this.isBgImage) {
            this.bgService.setBgImage('')
        }
    }
}
