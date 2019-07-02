import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MatTabChangeEvent } from '@angular/material'

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
    /*
        component subscriptions
    */
    private paramsSub: Subscription
    private dataSub: Subscription
    private storeSub: Subscription

    /*
        Input data for the component app-list-details
    */
    loading: boolean
    collection: ListDetailsModel
    bgImage = ''
    hasError: boolean

    /*
        Input data for this component
    */
    tabs: Tab[]
    activeTab = 0
    filter: Filter = null
    type: COMPONENT_TYPE
    isBgImage: false

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private bgService: BgService,
        private router: Router
    ) {}

    ngOnInit() {
        /*
            Switching this component for rendering character details
            or comic details or series details based on route
        */
        this.dataSub = this.route.data.subscribe(({ type, isBgImage, tabs }) => {
            this.isBgImage = isBgImage
            this.type = type
            this.tabs = tabs
            this.queryOnStore()
            this.subscribeToStore()
        })

        /*
         * Retaining selected tab after reloading
         */
        const queryParams = this.route.snapshot.queryParams

        if (queryParams) {
            const key = 'tab'
            this.activeTab = queryParams[key]
        }
    }

    /*
        This getter function return an object pointing to state, filter and actions
        based on the 'type' for which this component is rendered
    */
    get service() {
        return fromMapping.getSettings(this.type)
    }

    /*
        Fetching state slice from NgRx store by dispatching actions
    */
    queryOnStore() {
        this.paramsSub = this.route.params.subscribe((params: Params) => {
            const key = 'id'
            const id = +params[key]
            this.filter = {
                type: this.service.filterKey,
                value: id,
            }
            this.store.dispatch(
                this.service.action.fetchStart({
                    payload: id,
                })
            )
        })
    }

    /*
        Subscription to NgRx store
    */
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

    /*
        Adding tab index to URL for every tab change to
        retain selected tab after reloading
    */
    onTabChange(event: MatTabChangeEvent) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                tab: event.index,
            },
        })
    }

    ngOnDestroy() {
        /*
            Unsubscribing the subscriptions made
        */
        this.paramsSub.unsubscribe()
        this.storeSub.unsubscribe()
        this.dataSub.unsubscribe()
        /*
            Resetting Background image set to empty
        */
        if (this.isBgImage) {
            this.bgService.setBgImage('')
        }
    }
}
