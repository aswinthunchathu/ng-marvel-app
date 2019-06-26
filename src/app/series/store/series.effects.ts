import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../shared/store/ui/ui.actions'
import * as fromPaginationActions from '../../shared/store/pagination/pagination.action'
import * as fromRoot from '../../store/app.reducer'
import * as fromSeriesActions from './series.actions'
import { Series } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { SeriesModel } from '../series.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'

@Injectable()
export class SeriesEffects {
    private readonly _URL = 'series'

    showSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromSeriesActions.fetchStart, fromSeriesActions.fetchNextPage),
            switchMap(() => {
                return of(fromUIActions.showSpinner(ACTION_TAGS.series)())
            })
        )
    )

    fetchStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromSeriesActions.fetchStart),
            withLatestFrom(this._store.pipe(select(fromRoot.selectSeriesTotal)), this._store.select('series')),
            switchMap(([__, count, { pagination }]) => {
                if (count > 0) {
                    return of(fromSeriesActions.fetchedFromStore())
                }
                return this._fetchFromServer(pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    fetchNextPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromSeriesActions.fetchNextPage),
            withLatestFrom(this._store.select('series')),
            switchMap(([__, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromSeriesActions.noMoreToFetch())
                } else {
                    return this._fetchFromServer(pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    hideSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                fromSeriesActions.fetchSuccess,
                fromSeriesActions.fetchedFromStore,
                fromSeriesActions.noMoreToFetch,
                fromUIActions.setError(ACTION_TAGS.series)
            ),
            switchMap(() => of(fromUIActions.hideSpinner(ACTION_TAGS.series)()))
        )
    )

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch Series from server
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchSeriesSuccess>
     */
    private _fetchFromServer(limit: number, offset: number) {
        return this._APIService.fetchFromServer<Series>(this._URL, limit, offset).pipe(
            map(res => res.data),
            mergeMap(res => [
                fromSeriesActions.fetchSuccess({
                    payload: res.results.map(
                        item => new SeriesModel(item.id, item.title, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(ACTION_TAGS.comics)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err =>
                of(
                    fromUIActions.setError(ACTION_TAGS.series)({
                        payload: err,
                    })
                )
            )
        )
    }
}
