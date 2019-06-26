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
    showSpinner$ = createEffect(() =>
        this.action$.pipe(
            ofType(fromSeriesDetailsActions.fetchStart),
            switchMap(() => {
                return of(fromUIActions.showSpinner(this.TAG)())
            })
        )
    )

    fetchStart$ = createEffect(() =>
        this.action$.pipe(
            ofType(fromSeriesDetailsActions.fetchStart),
            withLatestFrom(this.store.pipe(select(fromRoot.selectSeriesTotal)), this.store.select('series')),
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
                return this.fetchFromServer(action)
            })
        )
    )

    hideSpinner$ = createEffect(() =>
        this.action$.pipe(
            ofType(fromSeriesDetailsActions.fetchSuccess, fromUIActions.setError(this.TAG)),
            switchMap(() => of(fromUIActions.hideSpinner(this.TAG)()))
        )
    )

    private readonly TAG = ACTION_TAGS.seriesDetails
    private URL = action => `series/${action.payload}`

    constructor(private api: APIService, private action$: Actions, private store: Store<AppState>) {}

    /*
     * fetch series from server
     * @params action: action
     * return : Observable<FetchComicSuccess | FetchComicError>
     */
    private fetchFromServer(action) {
        return this.api.fetchFromServer<Series>(this.URL(action)).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null)),
            map(res =>
                fromSeriesDetailsActions.fetchSuccess({
                    payload: new SeriesModel(res.id, res.title, res.description, res.thumbnail),
                })
            ),
            catchError(err =>
                of(
                    fromUIActions.setError(this.TAG)({
                        payload: err,
                    })
                )
            )
        )
    }
}
