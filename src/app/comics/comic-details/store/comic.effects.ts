import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../shared/store/ui/ui.actions'
import * as fromComicActions from './comic.actions'
import * as fromRoot from '../../../store/app.reducer'
import { AppState } from '../../../store/app.reducer'
import { Comic } from 'src/app/shared/model/shared.interface'
import { ComicModel } from '../../comic.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'

@Injectable()
export class ComicEffects {
    private readonly _tag = ACTION_TAGS.comic
    private _URL = action => `comics/${action.payload}`

    showSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicActions.fetchStart),
            switchMap(() => {
                return of(fromUIActions.showSpinner(this._tag)())
            })
        )
    )

    fetchStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicActions.fetchStart),
            withLatestFrom(this._store.pipe(select(fromRoot.selectComicsTotal)), this._store.select('comics')),
            switchMap(([action, count, { data }]) => {
                if (count > 0) {
                    const comic = data.entities[action.payload]
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
    )

    hideSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicActions.fetchSuccess, fromUIActions.setError(this._tag)),
            switchMap(() => of(fromUIActions.hideSpinner(this._tag)()))
        )
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
                    fromUIActions.setError(this._tag)({
                        payload: err,
                    })
                )
            )
        )
    }
}
