import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromCharactersActions from './characters.actions'
import { CharacterResults } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { State } from './characters.reducer'

@Injectable()
export class CharactersEffects {
    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromCharactersActions.FETCH_CHARACTERS_START),
        withLatestFrom(this.store.select('characters')),
        switchMap(([action, characterState]: [fromCharactersActions.FetchCharactersStart, State]) => {
            const pagination: Pagination = characterState.pagination

            if (!action.loadMore && characterState.data.length > 0) {
                return of({ type: fromCharactersActions.FETCH_CHARACTERS_STORE })
            } else if (!pagination.hasMore) {
                return of({ type: fromCharactersActions.NO_MORE_CHARACTERS })
            } else {
                return this.http$
                    .get<CharacterResults>('characters', {
                        params: new HttpParams()
                            .set('limit', String(pagination.limit))
                            .set('offset', String(pagination.nextPage)),
                    })
                    .pipe(
                        map(res => res.data),
                        map(
                            res =>
                                new fromCharactersActions.FetchCharactersSuccess(
                                    res.results,
                                    new Pagination(res.offset, res.limit, res.total, res.count)
                                )
                        )
                    )
            }
        }),
        catchError(err => of(new fromCharactersActions.FetchCharactersError(err)))
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}
}
