import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../shared/store/ui/ui.actions'
import * as fromPaginationActions from '../../../shared/store/pagination/pagination.action'
import * as fromComicsByCharacterIDActions from './comics-by-characterId.actions'
import * as fromRoot from '../../../store/app.reducer'
import { APIResponse, Comic } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { ComicModel } from '../../comic.model'
import { APIService } from '../../../shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'

@Injectable()
export class ComicsByCharacterIdEffects {
    private _URL = action => `characters/${action['payload']}/comics`

    showSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicsByCharacterIDActions.fetchStart, fromComicsByCharacterIDActions.fetchNextPage),
            switchMap(() => {
                return of(fromUIActions.showSpinner(ACTION_TAGS.comicsByCharacterId)())
            })
        )
    )
    /*
     * This effect is fired when FETCH_COMICS_BY_CHARACTER_ID_START action is fired
     */
    fetchStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicsByCharacterIDActions.fetchStart),
            withLatestFrom(
                this._store.pipe(select(fromRoot.selectComicsByCharacterIdTotal)),
                this._store.select('comicByCharacterId')
            ),
            switchMap(([action, count, { pagination }]) => {
                this._store.dispatch(fromUIActions.resetError(ACTION_TAGS.charactersByComicId)())
                if (count > 0) {
                    return of(fromComicsByCharacterIDActions.fetchedFromStore())
                }
                return this._fetchFromServer(this._URL(action.payload), pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    /*
     * This effect is fired when FETCH_COMICS_BY_CHARACTER_ID_NEXT_PAGE action is fired
     */
    fetchNextPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromComicsByCharacterIDActions.fetchNextPage),
            withLatestFrom(
                this._store.pipe(select(fromRoot.selectFilterIdForComicsByCharacterId)),
                this._store.select('comicByCharacterId')
            ),
            switchMap(([__, filterId, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromComicsByCharacterIDActions.noMoreToFetch())
                } else {
                    return this._fetchFromServer(this._URL(filterId), pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    hideSpinner$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                fromComicsByCharacterIDActions.fetchSuccess,
                fromComicsByCharacterIDActions.fetchedFromStore,
                fromComicsByCharacterIDActions.noMoreToFetch,
                fromUIActions.setError(ACTION_TAGS.comicsByCharacterId)
            ),
            switchMap(() => of(fromUIActions.hideSpinner(ACTION_TAGS.comicsByCharacterId)()))
        )
    )

    constructor(private _APIService: APIService, private _actions$: Actions, private _store: Store<AppState>) {}

    /*
     * fetch comics from server
     * @param action : type of Comics By Character Id Actions
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<fromComicsByCharacterIDActions.type>
     */
    private _fetchFromServer(action, limit: number, offset: number) {
        return this._APIService.fetchFromServer<Comic>(this._URL(action), limit, offset).pipe(
            map(res => res.data),
            mergeMap(res => [
                fromComicsByCharacterIDActions.fetchSuccess({
                    payload: res.results.map(
                        item => new ComicModel(item.id, item.title, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(ACTION_TAGS.charactersByComicId)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err =>
                of(
                    fromUIActions.setError(ACTION_TAGS.comicsByCharacterId)({
                        payload: err,
                    })
                )
            )
        )
    }
}
