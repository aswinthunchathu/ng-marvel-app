import { Injectable } from '@angular/core'
import { switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../shared/store/ui/ui.actions'
import * as fromPaginationActions from '../../../shared/store/pagination/pagination.action'
import * as fromRoot from '../../../store/app.selector'
import * as fromComicsBySeriesIdActions from './comics-by-seriesId.actions'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { ComicModel } from '../../comic.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'
import { UIService } from 'src/app/shared/store/ui/ui.service'

@Injectable()
export class ComicsBySeriesIdEffects {
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicsBySeriesIdActions.fetchStart),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectComicsBySeriesIdTotal)),
                this.store.select('comicBySeriesId')
            ),
            switchMap(([action, count, { pagination }]) => {
                this.store.dispatch(fromUIActions.resetError(this.TAG)())
                if (count > 0) {
                    return of(fromComicsBySeriesIdActions.fetchedFromStore())
                }
                return this.fetchFromServer(action.payload, pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    fetchNextPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicsBySeriesIdActions.fetchNextPage),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectFilterIdForComicsByCharacterId)),
                this.store.select('comicBySeriesId')
            ),
            switchMap(([__, filterId, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromComicsBySeriesIdActions.noMoreToFetch())
                } else {
                    return this.fetchFromServer(filterId, pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    private readonly TAG = ACTION_TAGS.comicsBySeriesId
    private URL = (action, key = 'payload') => `series/${action[key]}/comics`

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    showSpinner$ = this.uiService.showSpinnerEffect(
        [fromComicsBySeriesIdActions.fetchStart, fromComicsBySeriesIdActions.fetchNextPage],
        this.TAG
    )

    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [
            fromComicsBySeriesIdActions.fetchSuccess,
            fromComicsBySeriesIdActions.fetchedFromStore,
            fromComicsBySeriesIdActions.noMoreToFetch,
        ],
        this.TAG
    )

    private fetchFromServer(id: number, limit: number, offset: number) {
        return this.api.getComicsBySeriesId(id, limit, offset).pipe(
            mergeMap(res => [
                fromComicsBySeriesIdActions.fetchSuccess({
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
