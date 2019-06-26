import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../shared/store/ui/ui.actions'
import * as fromPaginationActions from '../../../shared/store/pagination/pagination.action'
import * as fromRoot from '../../../store/app.reducer'
import * as fromComicsBySeriesIdActions from './comics-by-seriesId.actions'
import { Comic } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { ComicModel } from '../../comic.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'

@Injectable()
export class ComicsBySeriesIdEffects {
    private _URL = action => `series/${action['payload']}/comics`

    showSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicsBySeriesIdActions.fetchStart, fromComicsBySeriesIdActions.fetchNextPage),
            switchMap(() => {
                return of(fromUIActions.showSpinner(ACTION_TAGS.comicsBySeriesId)())
            })
        )
    )

    /*
     * This effect is fired when FETCH_COMICS_BY_SERIES_ID_START action is fired
     */

    fetchStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicsBySeriesIdActions.fetchStart),
            withLatestFrom(
                this._store.pipe(select(fromRoot.selectComicsBySeriesIdTotal)),
                this._store.select('comicBySeriesId')
            ),
            switchMap(([action, count, { pagination }]) => {
                this._store.dispatch(fromUIActions.resetError(ACTION_TAGS.charactersByComicId)())
                if (count > 0) {
                    return of(fromComicsBySeriesIdActions.fetchedFromStore())
                }
                return this._fetchFromServer(this._URL(action.payload), pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    /*
     * This effect is fired when FETCH_COMICS_BY_SERIES_ID_NEXT_PAGE action is fired
     */
    fetchNextPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicsBySeriesIdActions.fetchNextPage),
            withLatestFrom(
                this._store.pipe(select(fromRoot.selectFilterIdForComicsByCharacterId)),
                this._store.select('comicBySeriesId')
            ),
            switchMap(([__, filterId, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromComicsBySeriesIdActions.noMoreToFetch())
                } else {
                    return this._fetchFromServer(this._URL(filterId), pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    hideSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                fromComicsBySeriesIdActions.fetchSuccess,
                fromComicsBySeriesIdActions.fetchedFromStore,
                fromComicsBySeriesIdActions.noMoreToFetch,
                fromUIActions.setError(ACTION_TAGS.comicsBySeriesId)
            ),
            switchMap(() => of(fromUIActions.hideSpinner(ACTION_TAGS.comicsBySeriesId)()))
        )
    )

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch comics from server
     * @param action : type of comics by series id Actions
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchComicsBySeriesIdSuccess>
     */
    private _fetchFromServer(action, limit: number, offset: number) {
        return this._APIService.fetchFromServer<Comic>(this._URL(action), limit, offset).pipe(
            map(res => res.data),
            mergeMap(res => [
                fromComicsBySeriesIdActions.fetchSuccess({
                    payload: res.results.map(
                        item => new ComicModel(item.id, item.title, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(ACTION_TAGS.comicsBySeriesId)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err =>
                of(
                    fromUIActions.setError(ACTION_TAGS.comicsBySeriesId)({
                        payload: err,
                    })
                )
            )
        )
    }
}
