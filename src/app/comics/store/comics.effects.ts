import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromComicsActions from './comics.actions'
import { Comic } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { ComicModel } from '../comic.model'
import { APIService } from 'src/app/shared/services/api.service'

@Injectable()
export class ComicsEffects {
    private readonly _URL = 'comics'
    /*
     * This effect is fired when FETCH_COMICS_START action is fired
     */
    @Effect() fetchComicsInit = this._actions$.pipe(
        ofType(fromComicsActions.fetchStart),
        withLatestFrom(this._store.select('comics')),
        switchMap(([__, comicsState]) => {
            if (comicsState.data.length > 0) {
                return of(fromComicsActions.fetchedFromStore())
            }
            return this._fetchFromServer(comicsState.pagination.limit, comicsState.pagination.nextPage)
        })
    )

    /*
     * This effect is fired when FETCH_COMICS_NEXT_PAGE action is fired
     */
    @Effect() fetchComicsNextPage = this._actions$.pipe(
        ofType(fromComicsActions.fetchNextPage),
        withLatestFrom(this._store.select('comics')),
        switchMap(([__, comicsState]) => {
            if (!comicsState.pagination.hasMore) {
                return of(fromComicsActions.noMoreToFetch())
            } else {
                return this._fetchFromServer(comicsState.pagination.limit, comicsState.pagination.nextPage)
            }
        })
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
            map(res =>
                fromComicsActions.fetchSuccess({
                    payload: res.results.map(
                        item => new ComicModel(item.id, item.title, item.description, item.thumbnail)
                    ),
                    pagination: new Pagination(res.offset, res.limit, res.total, res.count),
                })
            ),
            catchError(err =>
                of(
                    fromComicsActions.fetchError({
                        payload: err,
                    })
                )
            )
        )
    }
}
