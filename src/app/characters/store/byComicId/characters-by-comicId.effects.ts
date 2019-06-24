import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromCharactersByComicIdActions from './characters-by-comicId.actions'
import { Character } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { CharacterModel } from '../../character.model'
import { APIService } from 'src/app/shared/services/api.service'

@Injectable()
export class CharactersByComicIdEffects {
    private _URL = action => `comics/${action['payload']}/characters`

    /*
     * This effect is fired when FETCH_CHARACTERS_BY_COMIC_ID_START action is fired
     */
    @Effect() fetchCharacters = this._actions$.pipe(
        ofType(fromCharactersByComicIdActions.fetchStart),
        withLatestFrom(this._store.select('charactersByComicId')),
        switchMap(([action, characterState]) => {
            if (characterState.data.length > 0) {
                return of(fromCharactersByComicIdActions.fetchedFromStore())
            }
            return this._fetchFromServer(action, characterState.pagination.limit, characterState.pagination.nextPage)
        })
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_BY_COMIC_ID_NEXT_PAGE action is fired
     */
    @Effect() fetchCharactersNextPage = this._actions$.pipe(
        ofType(fromCharactersByComicIdActions.fetchNextPage),
        withLatestFrom(this._store.select('charactersByComicId')),
        switchMap(([action, characterState]) => {
            const pagination: Pagination = characterState.pagination

            if (!pagination.hasMore) {
                return of(fromCharactersByComicIdActions.noMoreToFetch())
            } else {
                return this._fetchFromServer(action, pagination.limit, pagination.nextPage)
            }
        })
    )

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch comics from server
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchCharactersSuccess>
     */
    private _fetchFromServer(action, limit: number, offset: number) {
        return this._APIService.fetchFromServer<Character>(this._URL(action), limit, offset).pipe(
            map(res => res.data),
            map(res =>
                fromCharactersByComicIdActions.fetchSuccess({
                    payload: res.results.map(
                        item => new CharacterModel(item.id, item.name, item.description, item.thumbnail)
                    ),
                    pagination: new Pagination(res.offset, res.limit, res.total, res.count),
                })
            ),
            catchError(err =>
                of(
                    fromCharactersByComicIdActions.fetchError({
                        payload: err,
                    })
                )
            )
        )
    }
}
