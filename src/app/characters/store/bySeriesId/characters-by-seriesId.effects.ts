import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../store/ui/ui.actions'
import * as fromPaginationActions from '../../../store/ui/pagination.action'
import * as fromCharactersBySeriesIdActions from './characters-by-seriesId.actions'
import * as fromRoot from '../../../store/app.reducer'
import { Character } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { CharacterModel } from '../../character.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'

@Injectable()
export class CharactersBySeriesIdEffects {
    private _URL = (id: number) => `series/${id}/characters`

    showSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromCharactersBySeriesIdActions.fetchStart, fromCharactersBySeriesIdActions.fetchNextPage),
            switchMap(() => {
                return of(fromUIActions.showSpinner(ACTION_TAGS.charactersBySeriesId)())
            })
        )
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_BY_SERIES_ID_START action is fired
     */
    fetchStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromCharactersBySeriesIdActions.fetchStart),
            withLatestFrom(
                this._store.pipe(select(fromRoot.selectCharactersBySeriesIdTotal)),
                this._store.select('charactersBySeriesId')
            ),
            switchMap(([action, count, { pagination }]) => {
                this._store.dispatch(fromUIActions.resetError(ACTION_TAGS.charactersBySeriesId)())
                if (count > 0) {
                    return of(fromCharactersBySeriesIdActions.fetchedFromStore())
                }
                return this._fetchFromServer(this._URL(action.payload), pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_BY_SERIES_ID_NEXT_PAGE action is fired
     */
    fetchNextPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromCharactersBySeriesIdActions.fetchNextPage),
            withLatestFrom(
                this._store.pipe(select(fromRoot.selectFilterIdForCharactersBySeriesId)),
                this._store.select('charactersBySeriesId')
            ),
            switchMap(([__, filterId, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromCharactersBySeriesIdActions.noMoreToFetch())
                } else {
                    return this._fetchFromServer(this._URL(filterId), pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    hideSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                fromCharactersBySeriesIdActions.fetchSuccess,
                fromCharactersBySeriesIdActions.fetchedFromStore,
                fromCharactersBySeriesIdActions.noMoreToFetch,
                fromUIActions.setError(ACTION_TAGS.charactersBySeriesId)
            ),
            switchMap(() => of(fromUIActions.hideSpinner(ACTION_TAGS.charactersBySeriesId)()))
        )
    )

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch comics from server
     * @params action: type
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchCharactersSuccess>
     */
    private _fetchFromServer(url: string, limit: number, offset: number) {
        return this._APIService.fetchFromServer<Character>(url, limit, offset).pipe(
            map(res => res.data),
            mergeMap(res => [
                fromCharactersBySeriesIdActions.fetchSuccess({
                    payload: res.results.map(
                        item => new CharacterModel(item.id, item.name, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(ACTION_TAGS.charactersBySeriesId)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err =>
                of(
                    fromUIActions.setError(ACTION_TAGS.charactersBySeriesId)({
                        payload: err,
                    })
                )
            )
        )
    }
}
