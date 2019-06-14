import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, Action } from '@ngrx/store'

import * as fromComicsActions from './comics.actions'
import { ComicsResults } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { State } from './comics.reducer'
import { FETCHED_FROM_STORE } from 'src/app/shared/constants'

@Injectable()
export class ComicsEffects {
    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromComicsActions.FETCH_COMICS_INIT, fromComicsActions.FETCH_COMICS_NEXT_PAGE),
        withLatestFrom(this.store.select('comics')),
        switchMap(([action, comicsState]: [Action, State]) => {
            if (action.type === fromComicsActions.FETCH_COMICS_INIT && comicsState.data.length > 0) {
                return of({ type: FETCHED_FROM_STORE })
            }

            const pagination: Pagination = comicsState.pagination

            if (!pagination.hasMore) {
                return of({ type: fromComicsActions.NO_MORE_COMICS })
            } else {
                return this.http$
                    .get<ComicsResults>('comics?orderBy=-modified', {
                        params: new HttpParams()
                            .set('limit', String(pagination.limit))
                            .set('offset', String(pagination.nextPage)),
                    })
                    .pipe(
                        map(res => res.data),
                        map(
                            res =>
                                new fromComicsActions.FetchComicsSuccess(
                                    res.results,
                                    new Pagination(res.offset, res.limit, res.total, res.count)
                                )
                        )
                    )
            }
        }),
        catchError(err => of(new fromComicsActions.FetchComicsError(err)))
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}
}
