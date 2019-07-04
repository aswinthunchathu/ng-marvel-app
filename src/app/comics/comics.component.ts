import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ActivatedRoute, Params } from '@angular/router'
import { tap } from 'rxjs/operators'

import { AppState } from '../store/app.reducer'
import { State as ComicsState } from './store'
import { State as ComicsByCharacterIdState } from './store/byCharacterId'
import { State as ComicsBySeriesIdState } from './store/bySeriesId'
import { State as ComicsByNameState } from './store/byName'
import { ComicModel, FILTER_TYPE } from './comic.model'
import { ImageType } from '../shared/model/image-generator.model'

import * as fromRoot from '../store/app.selector'

import * as fromComicsAction from './store/comics.actions'
import * as fromComicsByCharacterIdAction from './store/byCharacterId/comics-by-characterId.actions'
import * as fromComicsBySeriesIdAction from './store/bySeriesId/comics-by-seriesId.actions'
import * as fromComicsByNameActions from './store/byName/comics-by-name.actions'
import { Pagination } from '../shared/model/pagination.model'

export interface Filter {
    type: FILTER_TYPE
    value: string | number
}

@Component({
    selector: 'app-comics',
    templateUrl: './comics.component.html',
    styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {
    @Input() filter: Filter
    @Input() infinityScroll = true
    @Input() spacedItems = true
    @Input() withPagination = true

    //component props
    state:
        | Observable<ComicsState>
        | Observable<ComicsByCharacterIdState>
        | Observable<ComicsBySeriesIdState>
        | Observable<ComicsByNameState>
    list: Observable<ComicModel[]>
    showPagination: boolean

    //app-card props
    imageType = ImageType.portrait
    isAnimated = false
    isFloatingLabel = false

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        switch (this.filter ? this.filter.type : undefined) {
            // filtered by character id
            case FILTER_TYPE.byCharacterId:
                this.initComicsByCharacterId()
                break
            // filtered by series id
            case FILTER_TYPE.bySeriesId:
                this.initComicsBySeriesId()
                break
            // full list or filtered by title
            default:
                this.route.queryParams.subscribe((data: Params) => {
                    const { key } = data

                    if (!!key) {
                        this.filter = {
                            type: FILTER_TYPE.byTitle,
                            value: key,
                        }
                        this.initComicsByName()
                    } else {
                        this.initComics()
                    }
                })
        }
    }

    initComics() {
        this.store.dispatch(fromComicsAction.fetchStart())
        this.state = this.store.select('comics').pipe(tap(res => this.setShowPagination(res.pagination.data)))
        this.list = this.store.pipe(select(fromRoot.selectAllComics))
    }

    initComicsByCharacterId() {
        this.store.dispatch(
            fromComicsByCharacterIdAction.fetchStart({
                payload: +this.filter.value,
            })
        )
        this.state = this.store
            .select('comicByCharacterId')
            .pipe(tap(res => this.setShowPagination(res.pagination.data)))
        this.list = this.store.pipe(select(fromRoot.selectAllComicsByCharacterId))
    }

    initComicsBySeriesId() {
        this.store.dispatch(
            fromComicsBySeriesIdAction.fetchStart({
                payload: +this.filter.value,
            })
        )

        this.state = this.store.select('comicBySeriesId').pipe(tap(res => this.setShowPagination(res.pagination.data)))
        this.list = this.store.pipe(select(fromRoot.selectAllComicsBySeriesId))
    }

    initComicsByName() {
        this.store.dispatch(
            fromComicsByNameActions.fetchStart({
                payload: String(this.filter.value),
            })
        )

        this.state = this.store.select('comicsByName').pipe(tap(res => this.setShowPagination(res.pagination.data)))
        this.list = this.store.pipe(select(fromRoot.selectAllComicsByName))
    }

    setShowPagination(data: Pagination) {
        if (this.withPagination) {
            this.showPagination = data.total > 0
        }
    }

    onScroll() {
        switch (this.filter ? this.filter.type : undefined) {
            case FILTER_TYPE.byCharacterId:
                this.store.dispatch(fromComicsByCharacterIdAction.fetchNextPage())
                break
            case FILTER_TYPE.bySeriesId:
                this.store.dispatch(fromComicsBySeriesIdAction.fetchNextPage())
                break
            case FILTER_TYPE.byTitle:
                this.store.dispatch(fromComicsByNameActions.fetchNextPage())
                break
            default:
                this.store.dispatch(fromComicsAction.fetchNextPage())
        }
    }
}
