import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'

import { AppState } from '../store/app.reducer'
import { State as CharactersState } from './store'
import { State as CharactersByComicIdState } from './store/byComicId'
import { State as CharactersBySeriesIdState } from './store/bySeriesId'
import { State as CharactersByNameState } from './store/byName'
import { CharacterModel, FILTER_TYPE } from './character.model'
import { ImageType } from '../model/image-generator.model'

import * as fromRoot from '../store/app.selector'
import * as fromCharactersAction from './store/characters.actions'
import * as fromCharactersByComicIdAction from './store/byComicId/characters-by-comicId.actions'
import * as fromCharactersBySeriesIdAction from './store/bySeriesId/characters-by-seriesId.actions'
import * as fromCharactersByNameAction from './store/byName/characters-by-name.actions'
import { map, tap } from 'rxjs/operators'

//filtered by title without infinite scroll

export interface Filter {
    type: FILTER_TYPE
    value: string | number
}

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
    @Input() filter: Filter
    @Input() infinityScroll = true
    @Input() spacedItems: boolean = false

    //component props
    state:
        | Observable<CharactersState>
        | Observable<CharactersByComicIdState>
        | Observable<CharactersBySeriesIdState>
        | Observable<CharactersByNameState>
    list: Observable<CharacterModel[]>
    showPagination: boolean

    //app-card props
    imageType = ImageType.portrait
    isAnimated = false
    isFloatingLabel = false

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        switch (this.filter ? this.filter.type : undefined) {
            // filtered by comic id list with infinite scroll
            case FILTER_TYPE.byComicId:
                this.initCharactersByComicId()
                break
            // filtered by series id list with infinite scroll
            case FILTER_TYPE.bySeriesId:
                this.initCharactersBySeriesId()
                break
            // filtered by title with infinite scroll
            case FILTER_TYPE.byTitle:
                this.initCharactersByName()
                break
            // full list with infinite scroll
            default:
                this.initCharacters()
        }
    }

    initCharacters() {
        this.imageType = ImageType.standard
        this.isAnimated = true
        this.isFloatingLabel = true
        this.store.dispatch(fromCharactersAction.fetchStart())
        this.state = this.store.select('characters')
        this.list = this.store.pipe(select(fromRoot.selectAllCharacters))
    }

    initCharactersByComicId() {
        this.store.dispatch(
            fromCharactersByComicIdAction.fetchStart({
                payload: +this.filter.value,
            })
        )
        this.state = this.store.select('charactersByComicId')
        this.list = this.store.pipe(select(fromRoot.selectAllCharactersByComicId))
    }

    initCharactersBySeriesId() {
        this.store.dispatch(
            fromCharactersBySeriesIdAction.fetchStart({
                payload: +this.filter.value,
            })
        )
        this.state = this.store.select('charactersBySeriesId')
        this.list = this.store.pipe(select(fromRoot.selectAllCharactersBySeriesId))
    }

    initCharactersByName() {
        this.store.dispatch(
            fromCharactersByNameAction.fetchStart({
                payload: String(this.filter.value),
            })
        )
        this.state = this.store
            .select('charactersByName')
            .pipe(tap(res => (this.showPagination = res.pagination.data.total > 0)))
        this.list = this.store.pipe(select(fromRoot.selectAllCharactersByName))
    }

    onScroll() {
        switch (this.filter ? this.filter.type : undefined) {
            case FILTER_TYPE.byComicId:
                this.store.dispatch(fromCharactersByComicIdAction.fetchNextPage())
                break
            case FILTER_TYPE.bySeriesId:
                this.store.dispatch(fromCharactersBySeriesIdAction.fetchNextPage())
                break
            case FILTER_TYPE.byTitle:
                this.store.dispatch(fromCharactersByNameAction.fetchNextPage())
                break
            default:
                this.store.dispatch(fromCharactersAction.fetchNextPage())
                this.initCharacters()
        }
    }
}
