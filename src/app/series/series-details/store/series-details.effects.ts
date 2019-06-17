import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromSeriesDetailsActions from './series-details.actions'
import * as fromSeriesReducer from '../../store/series.reducer'
import { AppState } from '../../../store/app.reducer'
import { SeriesResults } from '../../../shared/model/shared.interface'
import { SeriesModel } from '../../series.model'

@Injectable()
export class SeriesDetailsEffects {
    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromSeriesDetailsActions.FETCH_SERIES_DETAILS_START),
        withLatestFrom(this.store.select('series')),
        switchMap(
            ([action, seriesState]: [fromSeriesDetailsActions.FetchSeriesDetailsStart, fromSeriesReducer.State]) => {
                if (seriesState.data.length > 0) {
                    const series = seriesState.data.find(res => res.id === action.payload)
                    if (series) {
                        return of(new fromSeriesDetailsActions.FetchSeriesDetailsSuccess(series))
                    }
                }

                return this.http$.get<SeriesResults>(`series/${action.payload}`).pipe(
                    map(res =>
                        res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null
                    ),
                    map(
                        res =>
                            new fromSeriesDetailsActions.FetchSeriesDetailsSuccess(
                                new SeriesModel(
                                    res.id,
                                    res.title,
                                    res.description,
                                    res.thumbnail,
                                    res.comics,
                                    res.characters
                                )
                            )
                    )
                )
            }
        ),
        catchError(err => of(new fromSeriesDetailsActions.FetchSeriesDetailsError(err)))
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}
}
