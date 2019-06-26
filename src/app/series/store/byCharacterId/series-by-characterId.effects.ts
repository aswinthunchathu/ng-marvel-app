import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../shared/store/ui/ui.actions'
import * as fromPaginationActions from '../../../shared/store/pagination/pagination.action'
import * as fromRoot from '../../../store/app.reducer'
import * as fromSeriesByCharacterIDActions from './series-by-characterId.actions'
import { Series } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { SeriesModel } from '../../series.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'

@Injectable()
export class SeriesByCharacterIdEffects {
    private _URL = action => `characters/${action['payload']}/series`

    showSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromSeriesByCharacterIDActions.fetchStart, fromSeriesByCharacterIDActions.fetchNextPage),
            switchMap(() => {
                return of(fromUIActions.showSpinner(ACTION_TAGS.seriesByCharacterId)())
            })
        )
    )
    /*
     * This effect is fired when FETCH_SERIES_BY_CHARACTER_ID_START action is fired
     */
    fetchStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromSeriesByCharacterIDActions.fetchStart),
            withLatestFrom(
                this._store.pipe(select(fromRoot.selectSeriesByCharacterIdTotal)),
                this._store.select('seriesByCharacterId')
            ),
            switchMap(([action, count, { pagination }]) => {
                this._store.dispatch(fromUIActions.resetError(ACTION_TAGS.charactersByComicId)())
                if (count > 0) {
                    return of(fromSeriesByCharacterIDActions.fetchedFromStore())
                }
                return this._fetchFromServer(this._URL(action.payload), pagination.data.limit, pagination.data.nextPage)
            })
        )
    )
    /*
     * This effect is fired when FETCH_SERIES_BY_CHARACTER_ID_NEXT_PAGE action is fired
     */
    fetchNextPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromSeriesByCharacterIDActions.fetchNextPage),
            withLatestFrom(
                this._store.pipe(select(fromRoot.selectFilterIdForSeriesByCharacterId)),
                this._store.select('seriesByCharacterId')
            ),
            switchMap(([__, filterId, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromSeriesByCharacterIDActions.noMoreToFetch())
                } else {
                    return this._fetchFromServer(this._URL(filterId), pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    hideSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                fromSeriesByCharacterIDActions.fetchSuccess,
                fromSeriesByCharacterIDActions.fetchedFromStore,
                fromSeriesByCharacterIDActions.noMoreToFetch,
                fromUIActions.setError(ACTION_TAGS.seriesByCharacterId)
            ),
            switchMap(() => of(fromUIActions.hideSpinner(ACTION_TAGS.seriesByCharacterId)()))
        )
    )

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch Series from server
     * @param action : type of series by character id Actions
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchSeriesSuccess>
     */
    private _fetchFromServer(action, limit: number, offset: number) {
        return this._APIService.fetchFromServer<Series>(this._URL(action), limit, offset).pipe(
            map(res => res.data),
            mergeMap(res => [
                fromSeriesByCharacterIDActions.fetchSuccess({
                    payload: res.results.map(
                        item => new SeriesModel(item.id, item.title, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(ACTION_TAGS.seriesByCharacterId)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err =>
                of(
                    fromUIActions.setError(ACTION_TAGS.seriesByCharacterId)({
                        payload: err,
                    })
                )
            )
        )
    }
}
