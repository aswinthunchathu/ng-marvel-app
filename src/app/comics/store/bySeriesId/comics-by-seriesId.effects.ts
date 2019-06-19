import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of, Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromComicsBySeriesIdActions from './comics-by-seriesId.actions'
import { ComicsResults } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { State } from './comics-by-seriesId.reducer'
import { FETCHED_FROM_STORE } from '../../../shared/constants'
import { ComicModel } from '../../comic.model'

@Injectable()
export class ComicsBySeriesIdEffects {
    /*
     * This effect is fired when FETCH_COMICS_BY_SERIES_ID_START action is fired
     */
    @Effect() fetchComicsInit = this.actions$.pipe(
        ofType(fromComicsBySeriesIdActions.FETCH_COMICS_BY_SERIES_ID_START),
        withLatestFrom(this.store.select('comicBySeriesId')),
        switchMap(([action, comicsState]: [fromComicsBySeriesIdActions.FetchComicsBySeriesIdStart, State]) => {
            if (comicsState.previousFilterId === comicsState.filterId && comicsState.data.length > 0) {
                return of({ type: FETCHED_FROM_STORE })
            }
            return this._fetchComics(action, comicsState.pagination.limit, comicsState.pagination.nextPage)
        }),
        catchError(err => of(new fromComicsBySeriesIdActions.FetchComicsBySeriesIdError(err)))
    )

    /*
     * This effect is fired when FETCH_COMICS_BY_SERIES_ID_NEXT_PAGE action is fired
     */
    @Effect() fetchComicsNextPage = this.actions$.pipe(
        ofType(fromComicsBySeriesIdActions.FETCH_COMICS_BY_SERIES_ID_NEXT_PAGE),
        withLatestFrom(this.store.select('comicBySeriesId')),
        switchMap(([action, comicsState]: [fromComicsBySeriesIdActions.FetchComicsBySeriesIdNextPage, State]) => {
            if (!comicsState.pagination.hasMore) {
                return of({ type: fromComicsBySeriesIdActions.NO_MORE_COMICS_BY_SERIES_ID })
            } else {
                return this._fetchComics(action, comicsState.pagination.limit, comicsState.pagination.nextPage)
            }
        }),
        catchError(err => of(new fromComicsBySeriesIdActions.FetchComicsBySeriesIdError(err)))
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch comics from server
     * @param action : type of Comics Actions
     * limit: number - limit per page
     * offset: number - page offset
     * return : Observable<FetchComicsSuccess>
     */
    private _fetchComics(
        action: fromComicsBySeriesIdActions.type,
        limit: number,
        offset: number
    ): Observable<fromComicsBySeriesIdActions.FetchComicsBySeriesIdSuccess> {
        return this.http$
            .get<ComicsResults>(this._getURL(action), {
                params: new HttpParams().set('limit', String(limit)).set('offset', String(offset)),
            })
            .pipe(
                map(res => res.data),
                map(
                    res =>
                        new fromComicsBySeriesIdActions.FetchComicsBySeriesIdSuccess(
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

    /*
     * return API url based on given action
     * @param action : type of Comics Actions
     * return : string - URL
     */
    private _getURL(action?: fromComicsBySeriesIdActions.type) {
        switch (true) {
            case action.type === fromComicsBySeriesIdActions.FETCH_COMICS_BY_SERIES_ID_START:
            case action.type === fromComicsBySeriesIdActions.FETCH_COMICS_BY_SERIES_ID_NEXT_PAGE:
                return `/series/${action['payload']}/comics?orderBy=-modified`
            default:
                return 'comics?orderBy=-modified'
        }
    }
}
