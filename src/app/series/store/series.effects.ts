import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of, Observable } from 'rxjs'
import { Store, Action } from '@ngrx/store'

import * as fromSeriesActions from './series.actions'
import { SeriesResults } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { State } from './series.reducer'
import { FETCHED_FROM_STORE } from 'src/app/shared/constants'
import { SeriesModel } from '../series.model'

@Injectable()
export class SeriesEffects {
    private readonly _URL = 'series?orderBy=-modified'

    @Effect() fetchSeries = this.actions$.pipe(
        ofType(fromSeriesActions.FETCH_SERIES_INIT),
        withLatestFrom(this.store.select('series')),
        switchMap(([__, seriesState]) => {
            if (seriesState.data.length > 0) {
                return of(new fromSeriesActions.FetchedFromStore())
            }

            return this._fetchFromServer(seriesState.pagination.limit, seriesState.pagination.nextPage)
        })
    )

    @Effect() fetchSeriesNextPage = this.actions$.pipe(
        ofType(fromSeriesActions.FETCH_SERIES_NEXT_PAGE),
        withLatestFrom(this.store.select('series')),
        switchMap(([__, seriesState]) => {
            const pagination: Pagination = seriesState.pagination

            if (!pagination.hasMore) {
                return of({ type: fromSeriesActions.NO_MORE_SERIES })
            } else {
                return this._fetchFromServer(pagination.limit, pagination.nextPage)
            }
        })
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch Series from server
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchSeriesSuccess>
     */
    private _fetchFromServer(
        limit: number,
        offset: number
    ): Observable<fromSeriesActions.FetchSeriesSuccess | fromSeriesActions.FetchSeriesError> {
        return this.http$
            .get<SeriesResults>(this._URL, {
                params: new HttpParams().set('limit', String(limit)).set('offset', String(offset)),
            })
            .pipe(
                map(res => res.data),
                map(
                    res =>
                        new fromSeriesActions.FetchSeriesSuccess(
                            res.results.map(
                                item =>
                                    new SeriesModel(
                                        item.id,
                                        item.title,
                                        item.description,
                                        item.thumbnail,
                                        item.comics,
                                        item.characters
                                    )
                            ),
                            new Pagination(res.offset, res.limit, res.total, res.count)
                        )
                ),
                catchError(err => of(new fromSeriesActions.FetchSeriesError(err)))
            )
    }
}
