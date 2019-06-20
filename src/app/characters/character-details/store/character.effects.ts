import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of, Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromCharacterActions from './character.actions'
import * as fromCharactersReducer from '../../store/characters.reducer'
import { AppState } from '../../../store/app.reducer'
import { CharacterResults } from '../../../shared/model/shared.interface'
import { CharacterModel } from '../../character.model'

@Injectable()
export class CharacterEffects {
    private _URL = action => `characters/${action.payload}`

    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromCharacterActions.FETCH_CHARACTER_START),
        withLatestFrom(this.store.select('characters')),
        switchMap(
            ([action, charactersState]: [fromCharacterActions.FetchCharacterStart, fromCharactersReducer.State]) => {
                if (charactersState.data.length > 0) {
                    const character = charactersState.data.find(res => res.id === action.payload)
                    if (character) {
                        return of(new fromCharacterActions.FetchCharacterSuccess(character))
                    }
                }
                return this._fetchFromServer(action)
            }
        )
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch character from server
     * @params action: action
     * return : Observable<FetchCharactersSuccess | FetchCharacterError>
     */
    private _fetchFromServer(
        action: fromCharacterActions.type
    ): Observable<fromCharacterActions.FetchCharacterSuccess | fromCharacterActions.FetchCharacterError> {
        return this.http$.get<CharacterResults>(this._URL(action)).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null)),
            map(
                res =>
                    new fromCharacterActions.FetchCharacterSuccess(
                        new CharacterModel(res.id, res.name, res.description, res.thumbnail, res.series, res.comics)
                    )
            ),
            catchError(err => of(new fromCharacterActions.FetchCharacterError(err)))
        )
    }
}
