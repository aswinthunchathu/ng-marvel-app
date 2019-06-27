import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromRoot from '../../../store/app.selector'
import * as fromSeriesDetailsActions from './series-details.actions'
import { AppState } from '../../../store/app.reducer'
import { SeriesModel } from '../../../model/series.model'
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

    showSpinner$ = this.uiService.showSpinnerEffect([fromSeriesDetailsActions.fetchStart], this.TAG)

    hideSpinner$ = this.uiService.hideSpinnerEffect([fromSeriesDetailsActions.fetchSuccess], this.TAG)

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
