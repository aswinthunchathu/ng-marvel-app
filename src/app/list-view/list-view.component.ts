import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'

import { ImageType } from '../model/image-generator.model'
import { switchMap } from 'rxjs/operators'
import { AppState } from '../store/app.reducer'
import { ComicModel } from '../comics/comic.model'
import { SeriesModel } from '../series/series.model'
import { CharacterModel } from '../characters/character.model'
import * as fromMapping from './list-view.metadata'
import { ActivatedRoute } from '@angular/router'
import { Filter } from './list-view.interface'
import { Pagination } from '../model/pagination.model'

export enum Style {
    grid = 'grid',
    gridSpaced = 'grid-spaced',
}

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit, OnDestroy {
    /*
        component subscriptions
    */
    storeSubscription: Subscription
    routeSubscription: Subscription

    /*
        Input data for the component app-list
    */
    gridStyle = Style.gridSpaced
    isAnimated = false
    isFloatingLabel = false
    imageType = ImageType.portrait

    /*
        Input data for the component app-list
    */
    collection: CharacterModel[] | ComicModel[] | SeriesModel[]
    hasMore: boolean
    loading: boolean
    hasError: boolean
    isInfiniteScroll = false

    /*
        Input data for the component app-page-info
    */
    pagination: Pagination
    showPagination = false

    /*
        Input data for this component
    */
    @Input() type: fromMapping.COMPONENT_TYPE
    @Input() filter: Filter

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        /*
            Switching this component for rendering characters list
            or comics list or series list based on route or filter
        */
        if (!!this.type) {
            this.queryOnStore()
            this.subscribeToStore()
        } else {
            this.routeSubscription = this.route.data.subscribe(({ type, infiniteScroll }) => {
                if (type) {
                    this.type = type
                    this.isInfiniteScroll = infiniteScroll
                    this.queryOnStore()
                    this.subscribeToStore()
                }
            })
        }
    }

    /*
        This getter function return an object pointing to state, list and actions
        based on the 'type' for which this component is rendered
    */
    get service() {
        return fromMapping.getSettings(this.type, this.filter ? this.filter.type : fromMapping.FILTER_TYPE.none)
    }

    /*
        Fetching state slice from NgRx store by dispatching actions
    */
    queryOnStore() {
        if (this.filter) {
            this.store.dispatch(
                this.service.action.fetchStart({
                    payload: this.filter.value,
                })
            )
        } else {
            if (this.type === fromMapping.COMPONENT_TYPE.characters) {
                this.gridStyle = Style.grid
                this.isAnimated = true
                this.isFloatingLabel = true
                this.imageType = ImageType.standard
            }

            this.store.dispatch(this.service.action.fetchStart())
        }
    }

    /*
        Subscription to NgRx store
    */
    subscribeToStore() {
        this.storeSubscription = this.store
            .select(this.service.state)
            .pipe(
                switchMap(res => {
                    this.loading = res.ui.fetching
                    if (res.pagination) {
                        this.pagination = res.pagination.data
                        if (this.hasMore !== this.pagination.hasMore) {
                            this.hasMore = this.pagination.hasMore
                        }
                    }

                    this.hasError = !!res.ui.error

                    return this.store.pipe(select(this.service.list))
                })
            )
            .subscribe(res => {
                this.collection = res
                if (this.pagination && this.pagination.offset > -1) {
                    this.showPagination = true
                }
            })
    }

    /*
        This event is fired when user scrolls down the list
    */
    onScroll() {
        this.store.dispatch(
            fromMapping.componentSettings[this.type][
                this.filter ? this.filter.type : fromMapping.FILTER_TYPE.none
            ].action.fetchNextPage()
        )
    }

    ngOnDestroy() {
        /*
            Unsubscribing the subscriptions made
        */
        this.storeSubscription.unsubscribe()
        if (!this.type) {
            this.routeSubscription.unsubscribe()
        }
    }
}
