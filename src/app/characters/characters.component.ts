import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromRoot from '../store/app.reducer'
import { CharacterModel } from './character.model'
import { Style } from '../shared/components/list/list.component'
import { ImageType } from '../shared/model/image-generator.model'
import * as fromCharactersAction from './store/characters.actions'
import * as fromCharactersByComicIdAction from './store/byComicId/characters-by-comicId.actions'
import * as fromCharactersBySeriesIdAction from './store/bySeriesId/characters-by-seriesId.actions'
import { FILTER_TYPE } from '../constants'
import { switchMap } from 'rxjs/operators'
import { Filter } from '../shared/model/shared.interface'

const keyMap = {
    [FILTER_TYPE.none]: {
        action: fromCharactersAction,
        state: 'characters',
        list: fromRoot.selectAllCharacters,
    },
    [FILTER_TYPE.comics]: {
        action: fromCharactersByComicIdAction,
        state: 'charactersByComicId',
        list: fromRoot.selectAllCharactersByComicId,
    },
    [FILTER_TYPE.series]: {
        action: fromCharactersBySeriesIdAction,
        state: 'charactersBySeriesId',
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

    @Input() filter: Filter

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

        this.storeSubscription = this.store
            .select(keyMap[type].state)
            .pipe(
                switchMap(res => {
                    this.loading = res.ui.fetching
                    this.hasError = !!res.ui.error
                    if (this.hasMore !== res.pagination.data.hasMore) {
                        this.hasMore = res.pagination.data.hasMore
                    }

                    return this.store.pipe(select(keyMap[type].list))
                })
            )
            .subscribe(res => (this.characters = res))
    }

    onScroll() {
        this.store.dispatch(keyMap[this.filter ? this.filter.type : FILTER_TYPE.none].action.fetchNextPage())
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe()
    }
}
