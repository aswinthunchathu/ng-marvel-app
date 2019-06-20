import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of, Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromComicActions from './comic.actions'
import * as fromComicsReducer from '../../store/comics.reducer'
import { AppState } from '../../../store/app.reducer'
import { ComicsResults } from 'src/app/shared/model/shared.interface'
import { ComicModel } from '../../comic.model'

@Injectable()
export class ComicEffects {
    private _URL = action => `comics/${action.payload}`

    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromComicActions.FETCH_COMIC_START),
        withLatestFrom(this.store.select('comics')),
        switchMap(([action, comicsState]: [fromComicActions.FetchComicStart, fromComicsReducer.State]) => {
            if (comicsState.data.length > 0) {
                const comic = comicsState.data.find(res => res.id === action.payload)
                if (comic) {
                    return of(new fromComicActions.FetchComicSuccess(comic))
                }
            }
            return this._fetchFromServer(action)
        })
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch comic from server
     * @params action: action
     * return : Observable<FetchComicSuccess | FetchComicError>
     */
    private _fetchFromServer(
        action: fromComicActions.type
    ): Observable<fromComicActions.FetchComicSuccess | fromComicActions.FetchComicError> {
        return this.http$.get<ComicsResults>(this._URL(action)).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null)),
            map(
                res =>
                    new fromComicActions.FetchComicSuccess(
                        new ComicModel(res.id, res.title, res.description, res.thumbnail, res.characters, res.series)
                    )
            ),
            catchError(err => of(new fromComicActions.FetchComicError(err)))
        )
    }
}
