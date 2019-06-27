import { Injectable } from '@angular/core'
import { switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromPaginationActions from '../../shared/store/pagination/pagination.action'
import * as fromComicsActions from './comics.actions'
import * as fromRoot from '../../store/app.selector'
import { Pagination } from '../../model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { ComicModel } from '../../model/comic.model'
import { APIService } from '../../shared/services/api.service'
import { ACTION_TAGS } from '../../constants'
import { UIService } from '../../shared/store/ui/ui.service'

@Injectable()
export class ComicsEffects {
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicsActions.fetchStart),
            withLatestFrom(this.store.pipe(select(fromRoot.selectComicsTotal)), this.store.select('comics')),
            switchMap(([__, count, { pagination }]) => {
                if (count > 0) {
                    return of(fromComicsActions.fetchedFromStore())
                }
                return this.fetchFromServer(pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    fetchNextPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicsActions.fetchNextPage),
            withLatestFrom(this.store.select('comics')),
            switchMap(([__, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromComicsActions.noMoreToFetch())
                } else {
                    return this.fetchFromServer(pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    private readonly TAG = ACTION_TAGS.comics

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    showSpinner$ = this.uiService.showSpinnerEffect(
        [fromComicsActions.fetchStart, fromComicsActions.fetchNextPage],
        this.TAG
    )

    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [fromComicsActions.fetchSuccess, fromComicsActions.fetchedFromStore, fromComicsActions.noMoreToFetch],
        this.TAG
    )

    private fetchFromServer(limit: number, offset: number) {
        return this.api.getComics(limit, offset).pipe(
            mergeMap(res => [
                fromComicsActions.fetchSuccess({
                    payload: res.results.map(
                        item => new ComicModel(item.id, item.title, item.description, item.thumbnail)
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
