import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { map, tap } from 'rxjs/operators'

import { AppState } from '../store/app.reducer'
import { CharacterModel } from './character.model'
import { Style } from '../shared/components/list/list.component'
import * as fromCharactersAction from './store/characters.actions'
import * as fromCharactersByComicIdAction from './store/byComicId/characters-by-comicId.actions'
import * as fromCharactersBySeriesIdAction from './store/bySeriesId/characters-by-seriesId.actions'

export interface FilterType {
    type: 'comics' | 'series'
    id: number
}

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit, OnDestroy {
    storeSubscription: Subscription
    characters: CharacterModel[]
    hasMore: boolean
    loading: boolean
    gridStyle = Style.grid
    isAnimated = true
    isFloatingLabel = true
    hasError: boolean

    imageType = {
        image: 'image',
        placeholder: 'placeholder',
    }

    @Input('filter') filter: FilterType

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        if (this.filter) {
            this.gridStyle = Style.gridSpaced
            this.isAnimated = false
            this.isFloatingLabel = false
            this.imageType = {
                image: 'portraitImage',
                placeholder: 'portraitPlaceholder',
            }

            if (this.filter.type === 'comics') {
                this.store.dispatch(
                    fromCharactersByComicIdAction.fetchStart({
                        payload: this.filter.id,
                    })
                )
            } else {
                this.store.dispatch(
                    fromCharactersBySeriesIdAction.fetchStart({
                        payload: this.filter.id,
                    })
                )
            }
        } else {
            this.store.dispatch(fromCharactersAction.fetchStart())
        }
    }

    subscribeToStore() {
        let store = 'characters'

        if (this.filter) {
            if (this.filter.type === 'comics') {
                store = 'charactersByComicId'
            } else {
                store = 'charactersBySeriesId'
            }
        }

        this.storeSubscription = this.store.select(store).subscribe(res => {
            this.loading = res.fetching
            if (res.error) {
                this.hasError = true
            }
            this.characters = res.data
            if (this.hasMore !== res.pagination.hasMore) {
                this.hasMore = res.pagination.hasMore
            }
        })
    }

    onScroll() {
        if (this.filter) {
            if (this.filter.type === 'comics') {
                this.store.dispatch(
                    fromCharactersByComicIdAction.fetchNextPage({
                        payload: this.filter.id,
                    })
                )
            } else {
                this.store.dispatch(
                    fromCharactersBySeriesIdAction.fetchNextPage({
                        payload: this.filter.id,
                    })
                )
            }
        } else {
            this.store.dispatch(fromCharactersAction.fetchNextPage())
        }
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe()
    }
}
