import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromComicActions from './comic.actions'
import { AppState } from '../../../store/app.reducer'
import { Comic } from 'src/app/shared/model/shared.interface'
import { ComicModel } from '../../comic.model'
import { APIService } from 'src/app/shared/services/api.service'

@Injectable()
export class ComicEffects {
    private _URL = action => `comics/${action.payload}`

    @Effect() fetchCharacters = this._actions$.pipe(
        ofType(fromComicActions.fetchStart),
        withLatestFrom(this._store.select('comics')),
        switchMap(([action, comicsState]) => {
            if (comicsState.data.length > 0) {
                const comic = comicsState.data.find(res => res.id === action.payload)
                if (comic) {
                    return of(
                        fromComicActions.fetchSuccess({
                            payload: comic,
                        })
                    )
                }
            }
            return this._fetchFromServer(action)
        })
    )

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch comic from server
     * @params action: action
     * return : Observable<FetchComicSuccess | FetchComicError>
     */
    private _fetchFromServer(action) {
        return this._APIService.fetchFromServer<Comic>(this._URL(action)).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null)),
            map(res =>
                fromComicActions.fetchSuccess({
                    payload: new ComicModel(res.id, res.title, res.description, res.thumbnail),
                })
            ),
            catchError(err =>
                of(
                    fromComicActions.fetchError({
                        payload: err,
                    })
                )
            )
        )
    }
}
