import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType, act } from '@ngrx/effects'
import { of, Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromComicsActions from './comics.actions'
import { ComicsResults } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { State } from './comics.reducer'
import { FETCHED_FROM_STORE } from '../../shared/constants'
import { ComicModel } from '../comic.model'

@Injectable()
export class ComicsEffects {
    private readonly _URL = 'comics?orderBy=-modified'
    /*
     * This effect is fired when FETCH_COMICS_START action is fired
     */
    @Effect() fetchComicsInit = this.actions$.pipe(
        ofType(fromComicsActions.FETCH_COMICS_START),
        withLatestFrom(this.store.select('comics')),
        switchMap(([__, comicsState]) => {
            if (comicsState.data.length > 0) {
                return of({ type: FETCHED_FROM_STORE })
            }
            return this._fetchFromServer(comicsState.pagination.limit, comicsState.pagination.nextPage)
        })
    )

    /*
     * This effect is fired when FETCH_COMICS_NEXT_PAGE action is fired
     */
    @Effect() fetchComicsNextPage = this.actions$.pipe(
        ofType(fromComicsActions.FETCH_COMICS_NEXT_PAGE),
        withLatestFrom(this.store.select('comics')),
        switchMap(([__, comicsState]: [fromComicsActions.FetchComicsNextPage, State]) => {
            if (!comicsState.pagination.hasMore) {
                return of({ type: fromComicsActions.NO_MORE_COMICS })
            } else {
                return this._fetchFromServer(comicsState.pagination.limit, comicsState.pagination.nextPage)
            }
        })
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch comics from server
     * @param limit: number - limit per page
     * @param offset: number - page offset
     * return : Observable<FetchComicsSuccess>
     */
    private _fetchFromServer(
        limit: number,
        offset: number
    ): Observable<fromComicsActions.FetchComicsSuccess | fromComicsActions.FetchComicsError> {
        return this.http$
            .get<ComicsResults>(this._URL, {
                params: new HttpParams().set('limit', String(limit)).set('offset', String(offset)),
            })
            .pipe(
                map(res => res.data),
                map(
                    res =>
                        new fromComicsActions.FetchComicsSuccess(
                            res.results.map(
                                item =>
                                    new ComicModel(
                                        item.id,
                                        item.title,
                                        item.description,
                                        item.thumbnail,
                                        item.characters,
                                        item.series
                                    )
                            ),
                            new Pagination(res.offset, res.limit, res.total, res.count)
                        )
                ),
                catchError(err => of(new fromComicsActions.FetchComicsError(err)))
            )
    }
}
