import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of, Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromCharactersByComicIdActions from './characters-by-comicId.actions'
import { CharacterResults } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { FETCHED_FROM_STORE } from '../../../shared/constants'
import { CharacterModel } from '../../character.model'

@Injectable()
export class CharactersByComicIdEffects {
    private _URL = (action: fromCharactersByComicIdActions.type) =>
        `comics/${action['payload']}/characters?orderBy=-modified`

    /*
     * This effect is fired when FETCH_CHARACTERS_BY_COMIC_ID_START action is fired
     */
    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromCharactersByComicIdActions.FETCH_CHARACTERS_BY_COMIC_ID_START),
        withLatestFrom(this.store.select('charactersByComicId')),
        switchMap(([action, characterState]) => {
            if (characterState.data.length > 0) {
                return of({ type: FETCHED_FROM_STORE })
            }
            return this._fetchComics(action, characterState.pagination.limit, characterState.pagination.nextPage)
        }),
        catchError(err => of(new fromCharactersByComicIdActions.FetchCharactersByComicIdError(err)))
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_BY_COMIC_ID_NEXT_PAGE action is fired
     */
    @Effect() fetchCharactersNextPage = this.actions$.pipe(
        ofType(fromCharactersByComicIdActions.FETCH_CHARACTERS_BY_COMIC_ID_NEXT_PAGE),
        withLatestFrom(this.store.select('charactersByComicId')),
        switchMap(([action, characterState]) => {
            const pagination: Pagination = characterState.pagination

            if (!pagination.hasMore) {
                return of({ type: fromCharactersByComicIdActions.NO_MORE_CHARACTERS_BY_COMIC_ID })
            } else {
                return this._fetchComics(action, pagination.limit, pagination.nextPage)
            }
        }),
        catchError(err => of(new fromCharactersByComicIdActions.FetchCharactersByComicIdError(err)))
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch comics from server
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchCharactersSuccess>
     */
    private _fetchComics(
        action: fromCharactersByComicIdActions.type,
        limit: number,
        offset: number
    ): Observable<fromCharactersByComicIdActions.FetchCharactersByComicIdSuccess> {
        return this.http$
            .get<CharacterResults>(this._URL(action), {
                params: new HttpParams().set('limit', String(limit)).set('offset', String(offset)),
            })
            .pipe(
                map(res => res.data),
                map(
                    res =>
                        new fromCharactersByComicIdActions.FetchCharactersByComicIdSuccess(
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
                )
            )
    }
}
