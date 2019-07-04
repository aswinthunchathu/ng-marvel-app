import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromRoot from '../../app.selector'
import * as fromSeriesDetailsActions from './series-details.actions'
import { AppState } from '../../app.reducer'
import { SeriesModel } from '../../../series/series.model'
import { APIService } from '../../../shared/services/api.service'
import { ACTION_TAGS } from '../../../constants'
import { UIService } from '../../ui/ui.service'

@Injectable()
export class SeriesDetailsEffects {
    /*
     * This effect fetch from server
     * @triggering action: fetch start
     * @action fired: fetch success / fetch error
     */
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
                return this.fetchFromServer(action.payload)
            })
        )
    )

    private readonly TAG = ACTION_TAGS.seriesDetails

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    /*
     * This effect is used to show spinner
     * @triggering action: fetch start
     * @action fired: show UI spinner
     */
    showSpinner$ = this.uiService.showSpinnerEffect([fromSeriesDetailsActions.fetchStart], this.TAG)

    /*
     * This effect is used to hide spinner
     * @triggering action: fetch success
     * @action fired: show UI spinner
     */
    hideSpinner$ = this.uiService.hideSpinnerEffect([fromSeriesDetailsActions.fetchSuccess], this.TAG)

    /*
     * This function fetch data from server
     * @params id : number
     * return : Observable<fetch success / fetch error action>
     */
    private fetchFromServer(id: number) {
        return this.api.getSeriesById(id).pipe(
            map(res =>
                fromSeriesDetailsActions.fetchSuccess({
                    payload: new SeriesModel(res.id, res.title, res.description, res.thumbnail),
                })
            ),
            catchError(err => of(this.uiService.setError(err, this.TAG)))
        )
    }
}
