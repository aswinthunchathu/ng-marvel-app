import { Injectable } from '@angular/core'
import { switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../shared/store/ui/ui.actions'
import * as fromPaginationActions from '../../../shared/store/pagination/pagination.action'
import * as fromComicsByCharacterIDActions from './comics-by-characterId.actions'
import * as fromRoot from '../../../store/app.selector'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { ComicModel } from '../../../model/comic.model'
import { APIService } from '../../../shared/services/api.service'
import { ACTION_TAGS } from '../../../constants'
import { UIService } from '../../../shared/store/ui/ui.service'

@Injectable()
export class ComicsByCharacterIdEffects {
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicsByCharacterIDActions.fetchStart),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectComicsByCharacterIdTotal)),
                this.store.select('comicByCharacterId')
            ),
            switchMap(([action, count, { pagination }]) => {
                this.store.dispatch(fromUIActions.resetError(this.TAG)())
                if (count > 0) {
                    return of(fromComicsByCharacterIDActions.fetchedFromStore())
                }
                return this.fetchFromServer(action.payload, pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    fetchNextPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicsByCharacterIDActions.fetchNextPage),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectFilterIdForComicsByCharacterId)),
                this.store.select('comicByCharacterId')
            ),
            switchMap(([__, filterId, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromComicsByCharacterIDActions.noMoreToFetch())
                } else {
                    return this.fetchFromServer(filterId, pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    private readonly TAG = ACTION_TAGS.comicsByCharacterId

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    showSpinner$ = this.uiService.showSpinnerEffect(
        [fromComicsByCharacterIDActions.fetchStart, fromComicsByCharacterIDActions.fetchNextPage],
        this.TAG
    )

    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [
            fromComicsByCharacterIDActions.fetchSuccess,
            fromComicsByCharacterIDActions.fetchedFromStore,
            fromComicsByCharacterIDActions.noMoreToFetch,
        ],
        this.TAG
    )

    private fetchFromServer(id: number, limit: number, offset: number) {
        return this.api.getComicsByCharactersId(id, limit, offset).pipe(
            mergeMap(res => [
                fromComicsByCharacterIDActions.fetchSuccess({
                    payload: res.results.map(
                        item => new ComicModel(item.id, item.title, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(this.TAG)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err => of(this.uiService.setError(err, this.TAG)))
        )
    }
}
