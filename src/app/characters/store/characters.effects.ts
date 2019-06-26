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
import { APIService } from '../../shared/services/api.service'
import { ACTION_TAGS } from '../../constants'
import { TypedAction, ActionCreator } from '@ngrx/store/src/models'
import { UIService } from '../../shared/store/ui/ui.service'

@Injectable()
export class CharactersEffects {
    /*
     * This effect is fired when FETCH_CHARACTERS_INIT action is fired
     */
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCharactersActions.fetchStart),
            withLatestFrom(this.store.pipe(select(fromRoot.selectCharactersTotal)), this.store.select('characters')),
            switchMap(([__, count, { pagination }]) => {
                this.store.dispatch(fromUIActions.resetError(this.TAG)())

                if (count > 0) {
                    return of(fromCharactersActions.fetchedFromStore())
                }

                return this.fetchFromServer(pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_NEXT_PAGE action is fired
     */
    fetchNextPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCharactersActions.fetchNextPage),
            withLatestFrom(this.store.select('characters')),
            switchMap(([__, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromCharactersActions.noMoreToFetch())
                } else {
                    return this.fetchFromServer(pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    private readonly TAG = ACTION_TAGS.characters
    private readonly URL = 'characters'

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    showSpinner$ = this.uiService.showSpinnerEffect(
        [fromCharactersActions.fetchStart, fromCharactersActions.fetchNextPage],
        this.TAG
    )

    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [
            fromCharactersActions.fetchSuccess,
            fromCharactersActions.fetchedFromStore,
            fromCharactersActions.noMoreToFetch,
        ],
        this.TAG
    )

    /*
     * fetch characters from server
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchCharactersSuccess>
     */
    private fetchFromServer = (limit: number, offset: number) =>
        this.api.fetchFromServer<Character>(this.URL, limit, offset).pipe(
            map(res => res.data),
            mergeMap(res => [
                fromCharactersActions.fetchSuccess({
                    payload: res.results.map(
                        item => new CharacterModel(item.id, item.name, item.description, item.thumbnail)
                    ),
                }),
                fromPaginationActions.setPagination(this.TAG)({
                    payload: new Pagination(res.offset, res.limit, res.total, res.count),
                }),
            ]),
            catchError(err => of(this.uiService.setError(err, this.TAG)))
        )
}
