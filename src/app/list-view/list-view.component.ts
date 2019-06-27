import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'

import { Style } from '../shared/components/list/list.component'
import { ImageType } from '../model/image-generator.model'
import { switchMap } from 'rxjs/operators'
import { AppState } from '../store/app.reducer'
import { ComicModel } from '../model/comic.model'
import { SeriesModel } from '../model/series.model'
import { CharacterModel } from '../model/character.model'
import * as fromMapping from './map'
import { ActivatedRoute } from '@angular/router'
import { Filter } from './list-view.interface'

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit, OnDestroy {
    storeSubscription: Subscription
    routeSubscription: Subscription
    collection: CharacterModel[] | ComicModel[] | SeriesModel[]
    hasMore: boolean
    loading: boolean
    hasError: boolean
    gridStyle = Style.gridSpaced
    isAnimated = false
    isFloatingLabel = false
    imageType = ImageType.portrait
    @Input() type: fromMapping.COMPONENT_TYPE
    @Input() filter: Filter

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        if (!!this.type) {
            // this.queryOnStore()
            this.subscribeToStore()
        } else {
            this.routeSubscription = this.route.data.subscribe(({ type }) => {
                if (type) {
                    this.type = type
                    //this.queryOnStore()
                    this.subscribeToStore()
                }
            })
        }
    }

    get service() {
        return fromMapping.getSettings(this.type, this.filter ? this.filter.type : fromMapping.FILTER_TYPE.none)
    }

    queryOnStore() {
        if (this.filter) {
            this.store.dispatch(
                this.service.action.fetchStart({
                    payload: this.filter.id,
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

    subscribeToStore() {
        this.storeSubscription = this.store
            .select(this.service.state)
            .pipe(
                switchMap(res => {
                    this.loading = res.ui.fetching
                    this.hasError = !!res.ui.error
                    if (this.hasMore !== res.pagination.data.hasMore) {
                        this.hasMore = res.pagination.data.hasMore
                    }

                    return this.store.pipe(select(this.service.list))
                })
            )
            .subscribe(res => (this.collection = res))
    }

    onScroll() {
        this.store.dispatch(
            fromMapping.componentSettings[this.type][
                this.filter ? this.filter.type : fromMapping.FILTER_TYPE.none
            ].action.fetchNextPage()
        )
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe()
        if (!this.type) {
            this.routeSubscription.unsubscribe()
        }
    }
}
