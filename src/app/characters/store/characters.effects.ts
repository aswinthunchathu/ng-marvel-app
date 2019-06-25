import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromCharactersActions from './characters.actions'
import * as fromRoot from '../../store/app.reducer'
import { Character } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { CharacterModel } from '../character.model'
import { APIService } from 'src/app/shared/services/api.service'

@Injectable()
export class CharactersEffects {
    private readonly _URL = 'characters'

    /*
     * This effect is fired when FETCH_CHARACTERS_INIT action is fired
     */
    fetchCharacters$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromCharactersActions.fetchStart),
            withLatestFrom(
                this._store.pipe(select(fromRoot.selectTotalCharacters)),
                this._store.pipe(select(fromRoot.selectCharactersState))
            ),
            switchMap(([__, count, { pagination }]) => {
                if (count > 0) {
                    return of(fromCharactersActions.fetchedFromStore())
                }
                return this._fetchFromServer(pagination.limit, pagination.nextPage)
            })
        )
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_NEXT_PAGE action is fired
     */
    fetchCharactersNextPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromCharactersActions.fetchNextPage),
            withLatestFrom(this._store.pipe(select(fromRoot.selectCharactersState))),
            switchMap(([__, { pagination }]) => {
                if (!pagination.hasMore) {
                    return of(fromCharactersActions.noMoreToFetch())
                } else {
                    return this._fetchFromServer(pagination.limit, pagination.nextPage)
                }
            })
        )
    )

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch characters from server
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchCharactersSuccess>
     */
    private _fetchFromServer = (limit: number, offset: number) =>
        this._APIService.fetchFromServer<Character>(this._URL, limit, offset).pipe(
            map(res => res.data),
            map(res =>
                fromCharactersActions.fetchSuccess({
                    payload: res.results.map(
                        item => new CharacterModel(item.id, item.name, item.description, item.thumbnail)
                    ),
                    pagination: new Pagination(res.offset, res.limit, res.total, res.count),
                })
            ),
            catchError(err =>
                of(
                    fromCharactersActions.fetchError({
                        payload: err,
                    })
                )
            )
        )
}
