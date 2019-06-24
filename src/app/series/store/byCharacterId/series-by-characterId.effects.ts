import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromSeriesByCharacterIDActions from './series-by-characterId.actions'
import { Series } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { SeriesModel } from '../../series.model'
import { APIService } from 'src/app/shared/services/api.service'

@Injectable()
export class SeriesByCharacterIdEffects {
    private _URL = action => `characters/${action['payload']}/series`
    /*
     * This effect is fired when FETCH_SERIES_BY_CHARACTER_ID_START action is fired
     */
    @Effect() fetchSeriesInit = this._actions$.pipe(
        ofType(fromSeriesByCharacterIDActions.FETCH_SERIES_BY_CHARACTER_ID_START),
        withLatestFrom(this._store.select('seriesByCharacterId')),
        switchMap(([action, SeriesState]) => {
            if (SeriesState.data.length > 0) {
                return of(fromSeriesByCharacterIDActions.fetchedFromStore())
            }
            return this._fetchFromServer(action, SeriesState.pagination.limit, SeriesState.pagination.nextPage)
        })
    )

    /*
     * This effect is fired when FETCH_SERIES_BY_CHARACTER_ID_NEXT_PAGE action is fired
     */
    @Effect() fetchSeriesNextPage = this._actions$.pipe(
        ofType(fromSeriesByCharacterIDActions.fetchNextPage),
        withLatestFrom(this._store.select('seriesByCharacterId')),
        switchMap(([action, SeriesState]) => {
            if (!SeriesState.pagination.hasMore) {
                return of(fromSeriesByCharacterIDActions.noMoreToFetch())
            } else {
                return this._fetchFromServer(action, SeriesState.pagination.limit, SeriesState.pagination.nextPage)
            }
        })
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
            map(res =>
                fromSeriesByCharacterIDActions.fetchSuccess({
                    payload: res.results.map(
                        item => new SeriesModel(item.id, item.title, item.description, item.thumbnail)
                    ),
                    pagination: new Pagination(res.offset, res.limit, res.total, res.count),
                })
            ),
            catchError(err =>
                of(
                    fromSeriesByCharacterIDActions.fetchError({
                        payload: err,
                    })
                )
            )
        )
    }
}
