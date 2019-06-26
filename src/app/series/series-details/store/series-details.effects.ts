import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../shared/store/ui/ui.actions'
import * as fromRoot from '../../../store/app.reducer'
import * as fromSeriesDetailsActions from './series-details.actions'
import { AppState } from '../../../store/app.reducer'
import { Series } from '../../../shared/model/shared.interface'
import { SeriesModel } from '../../series.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'

@Injectable()
export class SeriesDetailsEffects {
    private _URL = action => `series/${action.payload}`

    showSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromSeriesDetailsActions.fetchStart),
            switchMap(() => {
                return of(fromUIActions.showSpinner(ACTION_TAGS.seriesDetails)())
            })
        )
    )

    fetchStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromSeriesDetailsActions.fetchStart),
            withLatestFrom(this._store.pipe(select(fromRoot.selectSeriesTotal)), this._store.select('series')),
            switchMap(([action, count, { data }]) => {
                if (count > 0) {
                    const comic = data.entities[action.payload]
                    if (comic) {
                        return of(
                            fromSeriesDetailsActions.fetchSuccess({
                                payload: comic,
                            })
                        )
                    }
                }
                return this._fetchFromServer(action)
            })
        )
    )

    hideSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromSeriesDetailsActions.fetchSuccess, fromUIActions.setError(ACTION_TAGS.seriesDetails)),
            switchMap(() => of(fromUIActions.hideSpinner(ACTION_TAGS.seriesDetails)()))
        )
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
