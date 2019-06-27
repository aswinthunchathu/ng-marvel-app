import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromCharacterActions from './character.actions'
import * as fromRoot from '../../../store/app.reducer'
import { AppState } from '../../../store/app.reducer'
import { CharacterModel } from '../../character.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'
import { UIService } from 'src/app/shared/store/ui/ui.service'

@Injectable()
export class CharacterEffects {
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
                return this.fetchFromServer(action.payload)
            })
        )
    )

    private readonly TAG = ACTION_TAGS.character

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    showSpinner$ = this.uiService.showSpinnerEffect([fromCharacterActions.fetchStart], this.TAG)

    hideSpinner$ = this.uiService.hideSpinnerEffect([fromCharacterActions.fetchSuccess], this.TAG)

    /*
     * fetch character from server
     * @params action: action
     * return : Observable<FetchCharactersSuccess | FetchCharacterError>
     */
    private fetchFromServer(id: number) {
        return this.api.getCharacter(id).pipe(
            map(res =>
                fromCharacterActions.fetchSuccess({
                    payload: new CharacterModel(res.id, res.name, res.description, res.thumbnail),
                })
            ),
            catchError(err => of(this.uiService.setError(err, this.TAG)))
        )
    }
}
