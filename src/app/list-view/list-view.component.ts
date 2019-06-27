import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'

import { Style } from '../shared/components/list/list.component'
import { ImageType } from '../shared/model/image-generator.model'
import { switchMap } from 'rxjs/operators'
import { AppState } from '../store/app.reducer'
import { ComicModel } from '../comics/comic.model'
import { SeriesModel } from '../series/series.model'
import { CharacterModel } from '../characters/character.model'
import * as fromMapping from './map'

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit, OnDestroy {
    storeSubscription: Subscription
    collection: CharacterModel[] | ComicModel[] | SeriesModel[]
    hasMore: boolean
    loading: boolean
    hasError: boolean
    gridStyle = Style.gridSpaced
    isAnimated = false
    isFloatingLabel = false
    imageType = ImageType.portrait
    @Input() type: fromMapping.COMPONENT_TYPE
    @Input() filter: fromMapping.Filter

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        if (this.filter) {
            this.store.dispatch(
                fromMapping.componentSettings[this.type][this.filter.type].action.fetchStart({
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

            this.store.dispatch(
                fromMapping.componentSettings[this.type][fromMapping.FILTER_TYPE.none].action.fetchStart()
            )
        }
    }

    subscribeToStore() {
        const type = this.filter ? this.filter.type : fromMapping.FILTER_TYPE.none

        this.storeSubscription = this.store
            .select(fromMapping.componentSettings[this.type][type].state)
            .pipe(
                switchMap(res => {
                    this.loading = res.ui.fetching
                    this.hasError = !!res.ui.error
                    if (this.hasMore !== res.pagination.data.hasMore) {
                        this.hasMore = res.pagination.data.hasMore
                    }

                    return this.store.pipe(select(fromMapping.componentSettings[this.type][type].list))
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
    }
}
