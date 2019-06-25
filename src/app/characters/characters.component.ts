import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { tap, switchMap } from 'rxjs/operators'

import * as fromRoot from '../store/app.reducer'
import { CharacterModel } from './character.model'
import { Style } from '../shared/components/list/list.component'
import { ImageType } from '../shared/model/image-generator.model'
import * as fromUIAction from '../store/ui/ui.actions'
import * as fromCharactersAction from './store/characters.actions'
import * as fromCharactersByComicIdAction from './store/byComicId/characters-by-comicId.actions'
import * as fromCharactersBySeriesIdAction from './store/bySeriesId/characters-by-seriesId.actions'
import { FILTER_TYPE } from '../constants'

export interface Filter {
    type: FILTER_TYPE.comics | FILTER_TYPE.series
    id: number
}

const keyMap = {
    [FILTER_TYPE.none]: {
        action: fromCharactersAction,
        state: fromRoot.charactersState,
    },
    // [FILTER_TYPE.comics]: {
    //     action: fromCharactersByComicIdAction,
    //     state: fromRoot.selectCharactersByComicIdState,
    //     list: fromRoot.selectAllCharactersByComicId,
    // },
    // [FILTER_TYPE.series]: {
    //     action: fromCharactersBySeriesIdAction,
    //     state: fromRoot.selectCharactersBySeriesIdState,
    //     list: fromRoot.selectAllCharactersBySeriesId,
    // },
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
                keyMap[this.filter.type].action.fetchStart({
                    payload: this.filter.id,
                })
            )
        } else {
            this.store.dispatch(keyMap[FILTER_TYPE.none].action.fetchStart())
        }
    }

    subscribeToStore() {
        const type = this.filter ? this.filter.type : FILTER_TYPE.none

        this.storeSubscription = this.store.pipe(select(keyMap[type].state)).subscribe(res => {
            this.characters = res.data
            this.loading = res.ui.fetching
            this.hasError = !!res.ui.error
            if (this.hasMore !== res.pagination.hasMore) {
                this.hasMore = res.pagination.hasMore
            }
        })
    }

    onScroll() {
        this.store.dispatch(keyMap[this.filter ? this.filter.type : FILTER_TYPE.none].action.fetchNextPage())
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe()
    }
}
