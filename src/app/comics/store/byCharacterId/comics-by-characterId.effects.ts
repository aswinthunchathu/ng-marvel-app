import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of, Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromComicsByCharacterIDActions from './comics-by-characterId.actions'
import { ComicsResults } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { State } from './comics-by-characterId.reducer'
import { FETCHED_FROM_STORE } from '../../../shared/constants'
import { ComicModel } from '../../comic.model'

@Injectable()
export class ComicsByCharacterIdEffects {
    private _URL = action => `characters/${action['payload']}/comics`
    /*
     * This effect is fired when FETCH_COMICS_BY_CHARACTER_ID_START action is fired
     */
    @Effect() fetchComicsInit = this.actions$.pipe(
        ofType(fromComicsByCharacterIDActions.fetchStart),
        withLatestFrom(this.store.select('comicByCharacterId')),
        switchMap(([action, comicsState]) => {
            if (comicsState.data.length > 0) {
                return of(fromComicsByCharacterIDActions.fetchedFromStore())
            }

            return this._fetchFromServer(action, comicsState.pagination.limit, comicsState.pagination.nextPage)
        })
    )

    /*
     * This effect is fired when FETCH_COMICS_BY_CHARACTER_ID_NEXT_PAGE action is fired
     */
    @Effect() fetchComicsNextPage = this.actions$.pipe(
        ofType(fromComicsByCharacterIDActions.fetchNextPage),
        withLatestFrom(this.store.select('comicByCharacterId')),
        switchMap(([action, comicsState]) => {
            if (!comicsState.pagination.hasMore) {
                return of(fromComicsByCharacterIDActions.noMoreToFetch())
            } else {
                return this._fetchFromServer(action, comicsState.pagination.limit, comicsState.pagination.nextPage)
            }
        })
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch comics from server
     * @param action : type of Comics By Character Id Actions
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<fromComicsByCharacterIDActions.type>
     */
    private _fetchFromServer(action, limit: number, offset: number) {
        return this.http$
            .get<ComicsResults>(this._URL(action), {
                params: new HttpParams().set('limit', String(limit)).set('offset', String(offset)),
            })
            .pipe(
                map(res => res.data),
                map(res =>
                    fromComicsByCharacterIDActions.fetchSuccess({
                        payload: res.results.map(
                            item => new ComicModel(item.id, item.title, item.description, item.thumbnail)
                        ),
                        pagination: new Pagination(res.offset, res.limit, res.total, res.count),
                    })
                ),
                catchError(err =>
                    of(
                        fromComicsByCharacterIDActions.fetchError({
                            payload: err,
                        })
                    )
                )
            )
    }
}
