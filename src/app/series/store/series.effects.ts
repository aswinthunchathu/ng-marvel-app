import { Injectable } from '@angular/core'
import { switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromPaginationActions from '../../shared/store/pagination/pagination.action'
import * as fromRoot from '../../store/app.selector'
import * as fromSeriesActions from './series.actions'
import { Pagination } from '../../model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { SeriesModel } from '../../model/series.model'
import { APIService } from '../../shared/services/api.service'
import { ACTION_TAGS } from '../../constants'
import { UIService } from '../../shared/store/ui/ui.service'

@Injectable()
export class SeriesEffects {
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSeriesActions.fetchStart),
            withLatestFrom(this.store.pipe(select(fromRoot.selectSeriesTotal)), this.store.select('series')),
            switchMap(([__, count, { pagination }]) => {
                if (count > 0) {
                    return of(fromSeriesActions.fetchedFromStore())
                }
                return this.fetchFromServer(pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    fetchNextPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSeriesActions.fetchNextPage),
            withLatestFrom(this.store.select('series')),
            switchMap(([__, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromSeriesActions.noMoreToFetch())
                } else {
                    return this.fetchFromServer(pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    private readonly TAG = ACTION_TAGS.series

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    showSpinner$ = this.uiService.showSpinnerEffect(
        [fromSeriesActions.fetchStart, fromSeriesActions.fetchNextPage],
        this.TAG
    )

    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [fromSeriesActions.fetchSuccess, fromSeriesActions.fetchedFromStore, fromSeriesActions.noMoreToFetch],
        this.TAG
    )

    private fetchFromServer(limit: number, offset: number) {
        return this.api.getSeries(limit, offset).pipe(
            mergeMap(res => [
                fromSeriesActions.fetchSuccess({
                    payload: res.results.map(
                        item => new SeriesModel(item.id, item.title, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(this.TAG)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err => of(this.uiService.setError(err, this.TAG)))
        )
    }
}
