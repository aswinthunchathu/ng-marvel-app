import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../shared/store/ui/ui.actions'
import * as fromPaginationActions from '../../shared/store/pagination/pagination.action'
import * as fromComicsActions from './comics.actions'
import * as fromRoot from '../../store/app.reducer'
import { Comic } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { ComicModel } from '../comic.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'
import { UIService } from 'src/app/shared/store/ui/ui.service'

@Injectable()
export class ComicsEffects {
    /*
     * This effect is fired when FETCH_COMICS_START action is fired
     */
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

    /*
     * This effect is fired when FETCH_COMICS_NEXT_PAGE action is fired
     */
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
    private readonly URL = 'comics'

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

    /*
     * fetch comics from server
     * @param limit: number - limit per page
     * @param offset: number - page offset
     * return : Observable<FetchComicsSuccess>
     */
    private fetchFromServer(limit: number, offset: number) {
        return this.api.fetchFromServer<Comic>(this.URL, limit, offset).pipe(
            map(res => res.data),
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
