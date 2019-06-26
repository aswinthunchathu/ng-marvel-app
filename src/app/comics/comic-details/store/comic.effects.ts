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
    showSpinner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicActions.fetchStart),
            switchMap(() => {
                return of(fromUIActions.showSpinner(this.TAG)())
            })
        )
    )

    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicActions.fetchStart),
            withLatestFrom(this.store.pipe(select(fromRoot.selectComicsTotal)), this.store.select('comics')),
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
                return this.fetchFromServer(action)
            })
        )
    )

    hideSpinner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicActions.fetchSuccess, fromUIActions.setError(this.TAG)),
            switchMap(() => of(fromUIActions.hideSpinner(this.TAG)()))
        )
    )

    private readonly TAG = ACTION_TAGS.comic
    private URL = action => `comics/${action.payload}`

    constructor(private api: APIService, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch comic from server
     * @params action: action
     * return : Observable<FetchComicSuccess | FetchComicError>
     */
    private fetchFromServer(action) {
        return this.api.fetchFromServer<Comic>(this.URL(action)).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null)),
            map(res =>
                fromComicActions.fetchSuccess({
                    payload: new ComicModel(res.id, res.title, res.description, res.thumbnail),
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
