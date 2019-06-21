import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromSeriesByCharacterIDActions from './series-by-characterId.actions'
import { SeriesResults } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { SeriesModel } from '../../series.model'

@Injectable()
export class SeriesByCharacterIdEffects {
    private _URL = action => `characters/${action['payload']}/series?orderBy=-modified`
    /*
     * This effect is fired when FETCH_SERIES_BY_CHARACTER_ID_START action is fired
     */
    @Effect() fetchSeriesInit = this.actions$.pipe(
        ofType(fromSeriesByCharacterIDActions.FETCH_SERIES_BY_CHARACTER_ID_START),
        withLatestFrom(this.store.select('seriesByCharacterId')),
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
    @Effect() fetchSeriesNextPage = this.actions$.pipe(
        ofType(fromSeriesByCharacterIDActions.fetchNextPage),
        withLatestFrom(this.store.select('seriesByCharacterId')),
        switchMap(([action, SeriesState]) => {
            if (!SeriesState.pagination.hasMore) {
                return of(fromSeriesByCharacterIDActions.noMoreToFetch())
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
    private _fetchFromServer(action, limit: number, offset: number) {
        return this.http$
            .get<SeriesResults>(this._URL(action), {
                params: new HttpParams().set('limit', String(limit)).set('offset', String(offset)),
            })
            .pipe(
                map(res => res.data),
                map(res =>
                    fromSeriesByCharacterIDActions.fetchSuccess({
                        payload: res.results.map(
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
