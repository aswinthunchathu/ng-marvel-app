import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromCharacterActions from './character.actions'
import * as fromRoot from '../../../store/app.reducer'
import { AppState } from '../../../store/app.reducer'
import { Character } from '../../../shared/model/shared.interface'
import { CharacterModel } from '../../character.model'
import { APIService } from 'src/app/shared/services/api.service'

@Injectable()
export class CharacterEffects {
    private _URL = action => `characters/${action.payload}`

    @Effect() fetchCharacters = this._actions$.pipe(
        ofType(fromCharacterActions.fetchStart),
        withLatestFrom(this._store.select('characters')),
        switchMap(([action, charactersState]) => {
            if (charactersState.ids.length > 0) {
                const character = charactersState[action.payload]
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

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch character from server
     * @params action: action
     * return : Observable<FetchCharactersSuccess | FetchCharacterError>
     */
    private _fetchFromServer(action) {
        return this._APIService.fetchFromServer<Character>(this._URL(action)).pipe(
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
