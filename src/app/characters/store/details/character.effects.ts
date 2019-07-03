import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromCharacterActions from './character.actions'
import * as fromRoot from '../../../store/app.selector'
import { AppState } from '../../../store/app.reducer'
import { CharacterModel } from '../../../model/character.model'
import { APIService } from '../../../shared/services/api.service'
import { ACTION_TAGS } from '../../../constants'
import { UIService } from '../../../store/ui/ui.service'

@Injectable()
export class CharacterEffects {
    /*
     * This effect fetch from server
     * @triggering action: fetch start
     * @action fired: fetch success / fetch error
     */
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

    /*
     * This effect is used to show spinner
     * @triggering action: fetch start
     * @action fired: show UI spinner
     */
    showSpinner$ = this.uiService.showSpinnerEffect([fromCharacterActions.fetchStart], this.TAG)

    /*
     * This effect is used to hide spinner
     * @triggering action: fetch success
     * @action fired: show UI spinner
     */
    hideSpinner$ = this.uiService.hideSpinnerEffect([fromCharacterActions.fetchSuccess], this.TAG)

    /*
     *This function fetch data from server
     * @params id : number
     * return : Observable<fetch success / fetch error action>
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
