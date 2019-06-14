import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, Action } from '@ngrx/store'

import * as fromSeriesActions from './series.actions'
import { SeriesResults } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { State } from './series.reducer'
import { FETCHED_FROM_STORE } from 'src/app/shared/constants'

@Injectable()
export class SeriesEffects {
    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromSeriesActions.FETCH_SERIES_INIT, fromSeriesActions.FETCH_SERIES_NEXT_PAGE),
        withLatestFrom(this.store.select('series')),
        switchMap(([action, seriesState]: [Action, State]) => {
            if (action.type === fromSeriesActions.FETCH_SERIES_INIT && seriesState.data.length > 0) {
                return of({ type: FETCHED_FROM_STORE })
            }

            const pagination: Pagination = seriesState.pagination

            if (!pagination.hasMore) {
                return of({ type: fromSeriesActions.NO_MORE_SERIES })
            } else {
                return this.http$
                    .get<SeriesResults>('series?orderBy=-modified', {
                        params: new HttpParams()
                            .set('limit', String(pagination.limit))
                            .set('offset', String(pagination.nextPage)),
                    })
                    .pipe(
                        map(res => res.data),
                        map(
                            res =>
                                new fromSeriesActions.FetchSeriesSuccess(
                                    res.results,
                                    new Pagination(res.offset, res.limit, res.total, res.count)
                                )
                        )
                    )
            }
        }),
        catchError(err => of(new fromSeriesActions.FetchSeriesError(err)))
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}
}
