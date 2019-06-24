import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromSeriesDetailsActions from './series-details.actions'
import { AppState } from '../../../store/app.reducer'
import { Series } from '../../../shared/model/shared.interface'
import { SeriesModel } from '../../series.model'
import { APIService } from 'src/app/shared/services/api.service'

@Injectable()
export class SeriesDetailsEffects {
    private _URL = action => `series/${action.payload}`

    @Effect() fetchCharacters = this._actions$.pipe(
        ofType(fromSeriesDetailsActions.fetchStart),
        withLatestFrom(this._store.select('series')),
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

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch series from server
     * @params action: action
     * return : Observable<FetchComicSuccess | FetchComicError>
     */
    private _fetchFromServer(action) {
        return this._APIService.fetchFromServer<Series>(this._URL(action)).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null)),
            map(res =>
                fromSeriesDetailsActions.fetchSuccess({
                    payload: new SeriesModel(res.id, res.title, res.description, res.thumbnail),
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
