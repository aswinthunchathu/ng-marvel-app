import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Params } from '@angular/router'

import { AppState } from '../../store/app.reducer'
import { BgService } from '../../shared/services/bg.service'
import { ListDetailsModel } from '../../shared/components/list/list-details/list-details.model'
import * as fromMapping from './details.metadata'
import { COMPONENT_TYPE } from './details.metadata'
import { Filter, Tab } from '../list-view.interface'

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
    private paramsSub: Subscription
    private dataSub: Subscription
    private storeSub: Subscription
    loading: boolean
    collection: ListDetailsModel
    bgImage = ''
    filter: Filter = null
    hasError: boolean
    type: COMPONENT_TYPE
    isBgImage: false
    tabs: Tab[]

    constructor(private store: Store<AppState>, private route: ActivatedRoute, private bgService: BgService) {}

    ngOnInit() {
        this.dataSub = this.route.data.subscribe(({ type, isBgImage, tabs }) => {
            this.isBgImage = isBgImage
            this.type = type
            this.tabs = tabs
            this.queryOnStore()
            this.subscribeToStore()
        })
    }

    get service() {
        return fromMapping.getSettings(this.type)
    }

    queryOnStore() {
        this.paramsSub = this.route.params.subscribe((params: Params) => {
            const key = 'id'
            const id = +params[key]
            this.filter = {
                type: this.service.filterKey,
                id,
            }
            this.store.dispatch(
                this.service.action.fetchStart({
                    payload: id,
                })
            )
        })
    }

    subscribeToStore() {
        this.storeSub = this.store.select(this.service.state).subscribe(({ ui, data: state }) => {
            this.loading = ui.fetching
            if (state.data) {
                this.collection = new ListDetailsModel(
                    state.data.title,
                    state.data.image.portrait.actual,
                    state.data.image.portrait.placeholder,
                    state.data.description
                )

                if (this.isBgImage) {
                    this.bgService.setBgImage(state.data.image.default.actual)
                }
            }

            if (ui.error) {
                this.hasError = true
            }
        })
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe()
        this.storeSub.unsubscribe()
        this.dataSub.unsubscribe()
        if (this.isBgImage) {
            this.bgService.setBgImage('')
        }
    }
}
