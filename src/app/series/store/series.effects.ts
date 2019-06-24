import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromSeriesActions from './series.actions'
import { SeriesResults } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { SeriesModel } from '../series.model'

@Injectable()
export class SeriesEffects {
    private readonly _URL = 'series'

    @Effect() fetchSeries = this.actions$.pipe(
        ofType(fromSeriesActions.fetchStart),
        withLatestFrom(this.store.select('series')),
        switchMap(([__, seriesState]) => {
            if (seriesState.data.length > 0) {
                return of(fromSeriesActions.fetchedFromStore())
            }

            return this._fetchFromServer(seriesState.pagination.limit, seriesState.pagination.nextPage)
        })
    )

    @Effect() fetchSeriesNextPage = this.actions$.pipe(
        ofType(fromSeriesActions.fetchNextPage),
        withLatestFrom(this.store.select('series')),
        switchMap(([__, seriesState]) => {
            const pagination: Pagination = seriesState.pagination

            if (!pagination.hasMore) {
                return of(fromSeriesActions.noMoreToFetch())
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
    private _fetchFromServer(limit: number, offset: number) {
        return this.http$
            .get<SeriesResults>(this._URL, {
                params: new HttpParams().set('limit', String(limit)).set('offset', String(offset)),
            })
            .pipe(
                map(res => res.data),
                map(res =>
                    fromSeriesActions.fetchSuccess({
                        payload: res.results.map(
                            item => new SeriesModel(item.id, item.title, item.description, item.thumbnail)
                        ),
                        pagination: new Pagination(res.offset, res.limit, res.total, res.count),
                    })
                ),
                catchError(err =>
                    of(
                        fromSeriesActions.fetchError({
                            payload: err,
                        })
                    )
                )
            )
    }
}
