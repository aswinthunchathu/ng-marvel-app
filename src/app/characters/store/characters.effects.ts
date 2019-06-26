import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../shared/store/ui/ui.actions'
import * as fromPaginationActions from '../../shared/store/pagination/pagination.action'
import * as fromCharactersActions from './characters.actions'
import * as fromRoot from '../../store/app.reducer'
import { Character } from '../../shared/model/shared.interface'
import { Pagination } from '../../shared/model/pagination.model'
import { AppState } from '../../store/app.reducer'
import { CharacterModel } from '../character.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'

@Injectable()
export class CharactersEffects {
    private readonly _tag = ACTION_TAGS.characters
    private readonly _URL = 'characters'

    showSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromCharactersActions.fetchStart, fromCharactersActions.fetchNextPage),
            switchMap(() => {
                return of(fromUIActions.showSpinner(this._tag)())
            })
        )
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_INIT action is fired
     */
    fetchStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromCharactersActions.fetchStart),
            withLatestFrom(this._store.pipe(select(fromRoot.selectCharactersTotal)), this._store.select('characters')),
            switchMap(([__, count, { pagination }]) => {
                this._store.dispatch(fromUIActions.resetError(this._tag)())

                if (count > 0) {
                    return of(fromCharactersActions.fetchedFromStore())
                }

                return this._fetchFromServer(pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_NEXT_PAGE action is fired
     */
    fetchNextPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromCharactersActions.fetchNextPage),
            withLatestFrom(this._store.select('characters')),
            switchMap(([__, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromCharactersActions.noMoreToFetch())
                } else {
                    return this._fetchFromServer(pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    hideSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                fromCharactersActions.fetchSuccess,
                fromCharactersActions.fetchedFromStore,
                fromCharactersActions.noMoreToFetch,
                fromUIActions.setError(this._tag)
            ),
            switchMap(() => of(fromUIActions.hideSpinner(this._tag)()))
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
            mergeMap(res => [
                fromCharactersActions.fetchSuccess({
                    payload: res.results.map(
                        item => new CharacterModel(item.id, item.name, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(this._tag)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err =>
                of(
                    fromUIActions.setError(this._tag)({
                        payload: err,
                    })
                )
            )
        )
}
