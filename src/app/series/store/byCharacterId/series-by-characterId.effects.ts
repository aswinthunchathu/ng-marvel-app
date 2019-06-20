import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of, Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromSeriesByCharacterIDActions from './series-by-characterId.actions'
import { SeriesResults } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { State } from './series-by-characterId.reducer'
import { FETCHED_FROM_STORE } from '../../../shared/constants'
import { SeriesModel } from '../../series.model'

@Injectable()
export class SeriesByCharacterIdEffects {
    private _URL = (action: fromSeriesByCharacterIDActions.type) =>
        `characters/${action['payload']}/series?orderBy=-modified`
    /*
     * This effect is fired when FETCH_SERIES_BY_CHARACTER_ID_START action is fired
     */
    @Effect() fetchSeriesInit = this.actions$.pipe(
        ofType(fromSeriesByCharacterIDActions.FETCH_SERIES_BY_CHARACTER_ID_START),
        withLatestFrom(this.store.select('seriesByCharacterId')),
        switchMap(([action, SeriesState]: [fromSeriesByCharacterIDActions.FetchSeriesByCharacterIdStart, State]) => {
            if (SeriesState.data.length > 0) {
                return of(new fromSeriesByCharacterIDActions.FetchedFromStore())
            }
            return this._fetchFromServer(action, SeriesState.pagination.limit, SeriesState.pagination.nextPage)
        })
    )

    /*
     * This effect is fired when FETCH_SERIES_BY_CHARACTER_ID_NEXT_PAGE action is fired
     */
    @Effect() fetchSeriesNextPage = this.actions$.pipe(
        ofType(fromSeriesByCharacterIDActions.FETCH_SERIES_BY_CHARACTER_ID_NEXT_PAGE),
        withLatestFrom(this.store.select('seriesByCharacterId')),
        switchMap(([action, SeriesState]: [fromSeriesByCharacterIDActions.FetchSeriesByCharacterIdNextPage, State]) => {
            if (!SeriesState.pagination.hasMore) {
                return of({ type: fromSeriesByCharacterIDActions.NO_MORE_SERIES_BY_CHARACTER_ID })
            } else {
                return this._fetchFromServer(action, SeriesState.pagination.limit, SeriesState.pagination.nextPage)
            }
        })
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch Series from server
     * @param action : type of series by character id Actions
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchSeriesSuccess>
     */
    private _fetchFromServer(
        action: fromSeriesByCharacterIDActions.type,
        limit: number,
        offset: number
    ): Observable<
        | fromSeriesByCharacterIDActions.FetchSeriesByCharacterIdSuccess
        | fromSeriesByCharacterIDActions.FetchSeriesByCharacterIdError
    > {
        return this.http$
            .get<SeriesResults>(this._URL(action), {
                params: new HttpParams().set('limit', String(limit)).set('offset', String(offset)),
            })
            .pipe(
                map(res => res.data),
                map(
                    res =>
                        new fromSeriesByCharacterIDActions.FetchSeriesByCharacterIdSuccess(
                            res.results.map(
                                item =>
                                    new SeriesModel(
                                        item.id,
                                        item.title,
                                        item.description,
                                        item.thumbnail,
                                        item.characters,
                                        item.comics
                                    )
                            ),
                            new Pagination(res.offset, res.limit, res.total, res.count)
                        )
                ),
                catchError(err => of(new fromSeriesByCharacterIDActions.FetchSeriesByCharacterIdError(err)))
            )
    }
}
