import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromCharacterActions from './character.actions'
import { AppState } from '../../../store/app.reducer'
import { APIResponse, Character } from '../../../shared/model/shared.interface'
import { CharacterModel } from '../../character.model'

@Injectable()
export class CharacterEffects {
    private _URL = action => `characters/${action.payload}`

    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromCharacterActions.fetchStart),
        withLatestFrom(this.store.select('characters')),
        switchMap(([action, charactersState]) => {
            if (charactersState.data.length > 0) {
                const character = charactersState.data.find(res => res.id === action.payload)
                if (character) {
                    return of(
                        fromCharacterActions.fetchSuccess({
                            payload: character,
                        })
                    )
                }
            }
            return this._fetchFromServer(action)
        })
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch character from server
     * @params action: action
     * return : Observable<FetchCharactersSuccess | FetchCharacterError>
     */
    private _fetchFromServer(action) {
        return this.http$.get<APIResponse<Character>>(this._URL(action)).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null)),
            map(res =>
                fromCharacterActions.fetchSuccess({
                    payload: new CharacterModel(res.id, res.name, res.description, res.thumbnail),
                })
            ),
            catchError(err =>
                of(
                    fromCharacterActions.fetchError({
                        payload: err,
                    })
                )
            )
        )
    }
}
