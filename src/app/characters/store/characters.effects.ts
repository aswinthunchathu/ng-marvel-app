import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of, Observable } from 'rxjs'
import { Store, Action } from '@ngrx/store'

import * as fromCharactersActions from './characters.actions'
import { CharacterResults } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { State } from './characters.reducer'
import { FETCHED_FROM_STORE } from '../../shared/constants'
import { CharacterModel } from '../character.model'

@Injectable()
export class CharactersEffects {
    private readonly _URL = 'characters?orderBy=-modified'

    /*
     * This effect is fired when FETCH_CHARACTERS_INIT action is fired
     */
    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromCharactersActions.FETCH_CHARACTERS_INIT),
        withLatestFrom(this.store.select('characters')),
        switchMap(([__, characterState]) => {
            if (characterState.data.length > 0) {
                return of({ type: FETCHED_FROM_STORE })
            }
            return this._fetchFromServer(characterState.pagination.limit, characterState.pagination.nextPage)
        })
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_NEXT_PAGE action is fired
     */
    @Effect() fetchCharactersNextPage = this.actions$.pipe(
        ofType(fromCharactersActions.FETCH_CHARACTERS_NEXT_PAGE),
        withLatestFrom(this.store.select('characters')),
        switchMap(([__, characterState]) => {
            const pagination: Pagination = characterState.pagination

            if (!pagination.hasMore) {
                return of({ type: fromCharactersActions.NO_MORE_CHARACTERS })
            } else {
                return this._fetchFromServer(pagination.limit, pagination.nextPage)
            }
        })
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch characters from server
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchCharactersSuccess>
     */
    private _fetchFromServer(
        limit: number,
        offset: number
    ): Observable<fromCharactersActions.FetchCharactersSuccess | fromCharactersActions.FetchCharactersError> {
        return this.http$
            .get<CharacterResults>(this._URL, {
                params: new HttpParams().set('limit', String(limit)).set('offset', String(offset)),
            })
            .pipe(
                map(res => res.data),
                map(
                    res =>
                        new fromCharactersActions.FetchCharactersSuccess(
                            res.results.map(
                                item =>
                                    new CharacterModel(
                                        item.id,
                                        item.name,
                                        item.description,
                                        item.thumbnail,
                                        item.series,
                                        item.comics
                                    )
                            ),
                            new Pagination(res.offset, res.limit, res.total, res.count)
                        )
                ),
                catchError(err => of(new fromCharactersActions.FetchCharactersError(err)))
            )
    }
}
