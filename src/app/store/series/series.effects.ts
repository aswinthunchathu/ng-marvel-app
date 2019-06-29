import { Injectable } from '@angular/core'
import { switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromPaginationActions from '../pagination/pagination.action'
import * as fromRoot from '../app.selector'
import * as fromSeriesActions from './series.actions'
import { Pagination } from '../../model/pagination.model'
import { AppState } from '../app.reducer'
import { SeriesModel } from '../../model/series.model'
import { APIService } from '../../shared/services/api.service'
import { ACTION_TAGS } from '../../constants'
import { UIService } from '../ui/ui.service'

@Injectable()
export class SeriesEffects {
    /*
     * This effect fetch from server
     * @triggering action: fetch start
     * @action fired: fetch success / fetch error
     */
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

    /*
     * This effect is used to show spinner
     * @triggering action: fetch start/fetch next page
     * @action fired: show UI spinner
     */
    showSpinner$ = this.uiService.showSpinnerEffect(
        [fromSeriesActions.fetchStart, fromSeriesActions.fetchNextPage],
        this.TAG
    )

    /*
     * This effect is used to hide spinner
     * @triggering action: fetch success / fetch from store/ no moire to fetch
     * @action fired: show UI spinner
     */
    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [fromSeriesActions.fetchSuccess, fromSeriesActions.fetchedFromStore, fromSeriesActions.noMoreToFetch],
        this.TAG
    )

    /*
     * This function fetch data from server
     * @params limit : number
     * @params offset : number
     * return : Observable<fetch success / fetch error action>
     */
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
