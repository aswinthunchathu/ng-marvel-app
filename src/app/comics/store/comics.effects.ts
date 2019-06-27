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

@Injectable()
export class ComicsEffects {
    private readonly _tag = ACTION_TAGS.comics
    private readonly _URL = 'comics'

    showSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicsActions.fetchStart, fromComicsActions.fetchNextPage),
            switchMap(() => {
                return of(fromUIActions.showSpinner(this._tag)())
            })
        )
    )

    /*
     * This effect is fired when FETCH_COMICS_START action is fired
     */
    fetchStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicsActions.fetchStart),
            withLatestFrom(this._store.pipe(select(fromRoot.selectComicsTotal)), this._store.select('comics')),
            switchMap(([__, count, { pagination }]) => {
                if (count > 0) {
                    return of(fromComicsActions.fetchedFromStore())
                }
                return this._fetchFromServer(pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    /*
     * This effect is fired when FETCH_COMICS_NEXT_PAGE action is fired
     */
    fetchNextPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicsActions.fetchNextPage),
            withLatestFrom(this._store.select('comics')),
            switchMap(([__, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromComicsActions.noMoreToFetch())
                } else {
                    return this._fetchFromServer(pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    hideSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                fromComicsActions.fetchSuccess,
                fromComicsActions.fetchedFromStore,
                fromComicsActions.noMoreToFetch,
                fromUIActions.setError(this._tag)
            ),
            switchMap(() => of(fromUIActions.hideSpinner(this._tag)()))
        )
    )

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch comics from server
     * @param limit: number - limit per page
     * @param offset: number - page offset
     * return : Observable<FetchComicsSuccess>
     */
    private _fetchFromServer(limit: number, offset: number) {
        return this._APIService.fetchFromServer<Comic>(this._URL, limit, offset).pipe(
            map(res => res.data),
            mergeMap(res => [
                fromComicsActions.fetchSuccess({
                    payload: res.results.map(
                        item => new ComicModel(item.id, item.title, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(this._tag)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err =>
                of(
                    fromUIActions.setError(this._tag)({
                        payload: err,
                    })
                )
            )
        )
    }
}
