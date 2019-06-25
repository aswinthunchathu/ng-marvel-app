import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { tap, switchMap } from 'rxjs/operators'

import * as fromRoot from '../store/app.reducer'
import { CharacterModel } from './character.model'
import { Style } from '../shared/components/list/list.component'
import { ImageType } from '../shared/model/image-generator.model'
import * as fromCharactersAction from './store/characters.actions'
import * as fromCharactersByComicIdAction from './store/byComicId/characters-by-comicId.actions'
import * as fromCharactersBySeriesIdAction from './store/bySeriesId/characters-by-seriesId.actions'

export enum types {
    default = 'default',
    comics = 'comics',
    series = 'series',
}

export interface Filter {
    type: types
    id: number
}

const actionMap = {
    [types.default]: fromCharactersAction,
    [types.comics]: fromCharactersByComicIdAction,
    [types.series]: fromCharactersBySeriesIdAction,
}

const selectorMap = {
    [types.default]: {
        state: fromRoot.selectCharactersState,
        list: fromRoot.selectAllCharacters,
    },
    [types.comics]: {
        state: fromRoot.selectCharactersByComicIdState,
        list: fromRoot.selectAllCharactersByComicId,
    },
    [types.series]: {
        state: fromRoot.selectCharactersBySeriesIdState,
        list: fromRoot.selectAllCharactersBySeriesId,
    },
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
    hasError: boolean
    gridStyle = Style.grid
    isAnimated = true
    isFloatingLabel = true
    imageType = ImageType.standard

    @Input('filter') filter: Filter

    constructor(private store: Store<fromRoot.AppState>) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        if (this.filter) {
            this.gridStyle = Style.gridSpaced
            this.isAnimated = false
            this.isFloatingLabel = false
            this.imageType = ImageType.portrait
            this.store.dispatch(
                actionMap[this.filter.type].fetchStart({
                    payload: this.filter.id,
                })
            )
        } else {
            this.store.dispatch(actionMap[types.default].fetchStart())
        }
    }

    subscribeToStore() {
        const type = this.filter ? this.filter.type : types.default

        this.storeSubscription = this.store
            .pipe(
                select(selectorMap[type].state),
                tap(res => {
                    this.loading = res.fetching
                    if (res.error) {
                        this.hasError = true
                    }
                    if (this.hasMore !== res.pagination.hasMore) {
                        this.hasMore = res.pagination.hasMore
                    }
                }),
                switchMap(() => this.store.pipe(select(selectorMap[type].list)))
            )
            .subscribe(res => (this.characters = res))
    }

    onScroll() {
        this.store.dispatch(actionMap[this.filter ? this.filter.type : types.default].fetchNextPage())
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe()
    }
}
