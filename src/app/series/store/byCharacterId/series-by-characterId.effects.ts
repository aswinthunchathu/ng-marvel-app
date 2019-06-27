import { Injectable } from '@angular/core'
import { switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../shared/store/ui/ui.actions'
import * as fromPaginationActions from '../../../shared/store/pagination/pagination.action'
import * as fromRoot from '../../../store/app.selector'
import * as fromSeriesByCharacterIDActions from './series-by-characterId.actions'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { SeriesModel } from '../../series.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'
import { UIService } from 'src/app/shared/store/ui/ui.service'

@Injectable()
export class SeriesByCharacterIdEffects {
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSeriesByCharacterIDActions.fetchStart),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectSeriesByCharacterIdTotal)),
                this.store.select('seriesByCharacterId')
            ),
            switchMap(([action, count, { pagination }]) => {
                this.store.dispatch(fromUIActions.resetError(this.TAG)())
                if (count > 0) {
                    return of(fromSeriesByCharacterIDActions.fetchedFromStore())
                }
                return this.fetchFromServer(action.payload, pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    fetchNextPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSeriesByCharacterIDActions.fetchNextPage),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectFilterIdForSeriesByCharacterId)),
                this.store.select('seriesByCharacterId')
            ),
            switchMap(([__, filterId, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromSeriesByCharacterIDActions.noMoreToFetch())
                } else {
                    return this.fetchFromServer(filterId, pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    private readonly TAG = ACTION_TAGS.seriesByCharacterId

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    showSpinner$ = this.uiService.showSpinnerEffect(
        [fromSeriesByCharacterIDActions.fetchStart, fromSeriesByCharacterIDActions.fetchNextPage],
        this.TAG
    )

    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [
            fromSeriesByCharacterIDActions.fetchSuccess,
            fromSeriesByCharacterIDActions.fetchedFromStore,
            fromSeriesByCharacterIDActions.noMoreToFetch,
        ],
        this.TAG
    )

    private fetchFromServer(id: number, limit: number, offset: number) {
        return this.api.getSeriesByCharactersId(id, limit, offset).pipe(
            mergeMap(res => [
                fromSeriesByCharacterIDActions.fetchSuccess({
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
