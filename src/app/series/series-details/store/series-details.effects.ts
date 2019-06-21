import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromSeriesDetailsActions from './series-details.actions'
import { AppState } from '../../../store/app.reducer'
import { SeriesResults } from '../../../shared/model/shared.interface'
import { SeriesModel } from '../../series.model'

@Injectable()
export class SeriesDetailsEffects {
    private _URL = action => `series/${action.payload}`

    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromSeriesDetailsActions.fetchStart),
        withLatestFrom(this.store.select('series')),
        switchMap(([action, seriesState]) => {
            if (seriesState.data.length > 0) {
                const series = seriesState.data.find(res => res.id === action.payload)
                if (series) {
                    return of(
                        fromSeriesDetailsActions.fetchSuccess({
                            payload: series,
                        })
                    )
                }
            }

            return this._fetchFromServer(action)
        })
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch series from server
     * @params action: action
     * return : Observable<FetchComicSuccess | FetchComicError>
     */
    private _fetchFromServer(action) {
        return this.http$.get<SeriesResults>(this._URL(action)).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null)),
            map(res =>
                fromSeriesDetailsActions.fetchSuccess({
                    payload: new SeriesModel(
                        res.id,
                        res.title,
                        res.description,
                        res.thumbnail,
                        res.comics,
                        res.characters
                    ),
                })
            ),
            catchError(err =>
                of(
                    fromSeriesDetailsActions.fetchError({
                        payload: err,
                    })
                )
            )
        )
    }
}
