import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../shared/store/ui/ui.actions'
import * as fromCharacterActions from './character.actions'
import * as fromRoot from '../../../store/app.reducer'
import { AppState } from '../../../store/app.reducer'
import { Character } from '../../../shared/model/shared.interface'
import { CharacterModel } from '../../character.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'

@Injectable()
export class CharacterEffects {
    showSpinner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCharacterActions.fetchStart),
            switchMap(() => {
                return of(fromUIActions.showSpinner(this.TAG)())
            })
        )
    )

    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCharacterActions.fetchStart),
            withLatestFrom(this.store.pipe(select(fromRoot.selectCharactersTotal)), this.store.select('characters')),
            switchMap(([action, count, { data }]) => {
                if (count > 0) {
                    const character = data.entities[action.payload]
                    if (character) {
                        return of(
                            fromCharacterActions.fetchSuccess({
                                payload: character,
                            })
                        )
                    }
                }
                return this.fetchFromServer(action)
            })
        )
    )

    hideSpinner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCharacterActions.fetchSuccess, fromUIActions.setError(this.TAG)),
            switchMap(() => of(fromUIActions.hideSpinner(this.TAG)()))
        )
    )

    private readonly TAG = ACTION_TAGS.character
    private URL = action => `characters/${action.payload}`

    constructor(private api: APIService, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch character from server
     * @params action: action
     * return : Observable<FetchCharactersSuccess | FetchCharacterError>
     */
    private fetchFromServer(action) {
        return this.api.fetchFromServer<Character>(this.URL(action)).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null)),
            map(res =>
                fromCharacterActions.fetchSuccess({
                    payload: new CharacterModel(res.id, res.name, res.description, res.thumbnail),
                })
            ),
            catchError(err =>
                of(
                    fromUIActions.setError(this.TAG)({
                        payload: err,
                    })
                )
            )
        )
    }
}
