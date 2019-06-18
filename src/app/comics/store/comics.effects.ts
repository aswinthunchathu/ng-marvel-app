import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType, act } from '@ngrx/effects'
import { of, Observable } from 'rxjs'
import { Store, Action } from '@ngrx/store'

import * as fromComicsActions from './comics.actions'
import { ComicsResults } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { State } from './comics.reducer'
import { FETCHED_FROM_STORE } from 'src/app/shared/constants'
import { ComicModel } from '../comic.model'

@Injectable()
export class ComicsEffects {
    @Effect() fetchComicsInit = this.actions$.pipe(
        ofType(fromComicsActions.FETCH_COMICS_START),
        withLatestFrom(this.store.select('comics')),
        switchMap(([, comicsState]) => {
            if (comicsState.data.length > 0) {
                return of({ type: FETCHED_FROM_STORE })
            }
            return this._fetchComics(
                'comics?orderBy=-modified',
                comicsState.pagination.limit,
                comicsState.pagination.nextPage
            )
        }),
        catchError(err => of(new fromComicsActions.FetchComicsError(err)))
    )

    @Effect() fetchComicsByCharacterId = this.actions$.pipe(
        ofType(fromComicsActions.FETCH_COMICS_BY_CHARACTER_ID_START),
        withLatestFrom(this.store.select('comics')),
        switchMap(([action, comicsState]: [fromComicsActions.FetchComicsByCharacterIdStart, State]) => {
            return this._fetchComics(
                `/characters/${action.payload}/comics?orderBy=-modified`,
                comicsState.pagination.limit,
                comicsState.pagination.nextPage
            )
        }),
        catchError(err => of(new fromComicsActions.FetchComicsError(err)))
    )

    @Effect() fetchComicsNextPage = this.actions$.pipe(
        ofType(fromComicsActions.FETCH_COMICS_NEXT_PAGE, fromComicsActions.FETCH_COMICS_BY_CHARACTER_ID_NEXT_PAGE),
        withLatestFrom(this.store.select('comics')),
        switchMap(
            ([action, comicsState]: [
                fromComicsActions.FetchComicsNextPage | fromComicsActions.FetchComicsByCharacterIdNextPage,
                State
            ]) => {
                if (!comicsState.pagination.hasMore) {
                    return of({ type: fromComicsActions.NO_MORE_COMICS })
                } else {
                    let url = 'comics?orderBy=-modified'

                    if (action.type === fromComicsActions.FETCH_COMICS_BY_CHARACTER_ID_NEXT_PAGE) {
                        url = `characters/${action.payload}/comics?orderBy=-modified`
                    }

                    return this._fetchComics(url, comicsState.pagination.limit, comicsState.pagination.nextPage)
                }
            }
        ),
        catchError(err => of(new fromComicsActions.FetchComicsError(err)))
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    private _fetchComics(url: string, limit: number, offset: number): Observable<fromComicsActions.FetchComicsSuccess> {
        return this.http$
            .get<ComicsResults>(url, {
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
                )
            )
    }
}
