import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../store/ui/ui.actions'
import * as fromPaginationActions from '../../../store/ui/pagination.action'
import * as fromCharactersByComicIdActions from './characters-by-comicId.actions'
import * as fromRoot from '../../../store/app.reducer'
import { Character } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { CharacterModel } from '../../character.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'

@Injectable()
export class CharactersByComicIdEffects {
    private _URL = (id: number) => `comics/${id}/characters`

    showSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromCharactersByComicIdActions.fetchStart, fromCharactersByComicIdActions.fetchNextPage),
            switchMap(() => {
                return of(fromUIActions.showSpinner(ACTION_TAGS.charactersByComicId)())
            })
        )
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_BY_COMIC_ID_START action is fired
     */
    @Effect() fetchCharacters = this._actions$.pipe(
        ofType(fromCharactersByComicIdActions.fetchStart),
        withLatestFrom(
            this._store.pipe(select(fromRoot.selectTotalCharactersByComicId)),
            this._store.pipe(select(fromRoot.charactersByComicIdState))
        ),
        switchMap(([action, count, { pagination }]) => {
            this._store.dispatch(fromUIActions.resetError(ACTION_TAGS.charactersByComicId)())
            if (count > 0) {
                return of(fromCharactersByComicIdActions.fetchedFromStore())
            }
            return this._fetchFromServer(this._URL(action.payload), pagination.limit, pagination.nextPage)
        })
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_BY_COMIC_ID_NEXT_PAGE action is fired
     */
    @Effect() fetchCharactersNextPage = this._actions$.pipe(
        ofType(fromCharactersByComicIdActions.fetchNextPage),
        withLatestFrom(this._store.pipe(select(fromRoot.charactersByComicIdState))),
        switchMap(([__, { pagination, filterId }]) => {
            if (!pagination.hasMore) {
                return of(fromCharactersByComicIdActions.noMoreToFetch())
            } else {
                return this._fetchFromServer(this._URL(filterId), pagination.limit, pagination.nextPage)
            }
        })
    )

    hideSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                fromCharactersByComicIdActions.fetchSuccess,
                fromCharactersByComicIdActions.fetchedFromStore,
                fromCharactersByComicIdActions.noMoreToFetch,
                fromUIActions.setError(ACTION_TAGS.charactersByComicId)
            ),
            switchMap(() => of(fromUIActions.hideSpinner(ACTION_TAGS.charactersByComicId)()))
        )
    )

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch comics from server
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchCharactersSuccess>
     */
    private _fetchFromServer(url: string, limit: number, offset: number) {
        return this._APIService.fetchFromServer<Character>(url, limit, offset).pipe(
            map(res => res.data),
            mergeMap(res => [
                fromCharactersByComicIdActions.fetchSuccess({
                    payload: res.results.map(
                        item => new CharacterModel(item.id, item.name, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(ACTION_TAGS.charactersByComicId)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err =>
                of(
                    fromUIActions.setError(ACTION_TAGS.charactersByComicId)({
                        payload: err,
                    })
                )
            )
        )
    }
}
