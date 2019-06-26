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
import { UIService } from 'src/app/shared/store/ui/ui.service'

@Injectable()
export class SeriesDetailsEffects {
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
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

    private readonly TAG = ACTION_TAGS.seriesDetails
    private URL = action => `series/${action.payload}`

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    showSpinner$ = this.uiService.showSpinnerEffect([fromSeriesDetailsActions.fetchStart], this.TAG)

    hideSpinner$ = this.uiService.hideSpinnerEffect([fromSeriesDetailsActions.fetchSuccess], this.TAG)
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
            catchError(err => of(this.uiService.setError(err, this.TAG)))
        )
    }
}
