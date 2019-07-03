import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ActivatedRoute, Params } from '@angular/router'
import { tap } from 'rxjs/operators'

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
import { Pagination } from '../model/pagination.model'
import { ROUTE_PATHS } from '../constants'

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
    @Input() spacedItems = false
    @Input() withPagination = true

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

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        switch (this.filter ? this.filter.type : undefined) {
            // filtered by comic id
            case FILTER_TYPE.byComicId:
                this.initCharactersByComicId()
                break
            // filtered by series id
            case FILTER_TYPE.bySeriesId:
                this.initCharactersBySeriesId()
                break
            // full list or filtered by title
            default:
                this.route.queryParams.subscribe((data: Params) => {
                    const { key } = data

                    if (this.route.snapshot.routeConfig.path !== ROUTE_PATHS.search) {
                        this.isAnimated = true
                        this.isFloatingLabel = true
                        this.imageType = ImageType.standard
                    }

                    if (!!key) {
                        this.filter = {
                            type: FILTER_TYPE.byTitle,
                            value: key,
                        }
                        this.initCharactersByName()
                    } else {
                        this.initCharacters()
                    }
                })
        }
    }

    initCharacters() {
        this.store.dispatch(fromCharactersAction.fetchStart())
        this.state = this.store.select('characters').pipe(tap(res => this.setShowPagination(res.pagination.data)))
        this.list = this.store.pipe(select(fromRoot.selectAllCharacters))
    }

    initCharactersByComicId() {
        this.store.dispatch(
            fromCharactersByComicIdAction.fetchStart({
                payload: +this.filter.value,
            })
        )
        this.state = this.store
            .select('charactersByComicId')
            .pipe(tap(res => this.setShowPagination(res.pagination.data)))
        this.list = this.store.pipe(select(fromRoot.selectAllCharactersByComicId))
    }

    initCharactersBySeriesId() {
        this.store.dispatch(
            fromCharactersBySeriesIdAction.fetchStart({
                payload: +this.filter.value,
            })
        )
        this.state = this.store
            .select('charactersBySeriesId')
            .pipe(tap(res => this.setShowPagination(res.pagination.data)))
        this.list = this.store.pipe(select(fromRoot.selectAllCharactersBySeriesId))
    }

    initCharactersByName() {
        this.store.dispatch(
            fromCharactersByNameAction.fetchStart({
                payload: String(this.filter.value),
            })
        )

        this.state = this.store.select('charactersByName').pipe(tap(res => this.setShowPagination(res.pagination.data)))
        this.list = this.store.pipe(select(fromRoot.selectAllCharactersByName))
    }

    setShowPagination(data: Pagination) {
        if (this.withPagination) {
            this.showPagination = data.total > 0
        }
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
