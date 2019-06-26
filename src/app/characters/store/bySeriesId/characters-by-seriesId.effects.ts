import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../shared/store/ui/ui.actions'
import * as fromPaginationActions from '../../../shared/store/pagination/pagination.action'
import * as fromCharactersBySeriesIdActions from './characters-by-seriesId.actions'
import * as fromRoot from '../../../store/app.reducer'
import { Character } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { CharacterModel } from '../../character.model'
import { APIService } from 'src/app/shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'
import { UIService } from 'src/app/shared/store/ui/ui.service'

@Injectable()
export class CharactersBySeriesIdEffects {
    /*
     * This effect is fired when FETCH_CHARACTERS_BY_SERIES_ID_START action is fired
     */
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCharactersBySeriesIdActions.fetchStart),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectCharactersBySeriesIdTotal)),
                this.store.select('charactersBySeriesId')
            ),
            switchMap(([action, count, { pagination }]) => {
                this.store.dispatch(fromUIActions.resetError(this.TAG)())
                if (count > 0) {
                    return of(fromCharactersBySeriesIdActions.fetchedFromStore())
                }
                return this.fetchFromServer(this.URL(action.payload), pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_BY_SERIES_ID_NEXT_PAGE action is fired
     */
    fetchNextPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCharactersBySeriesIdActions.fetchNextPage),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectFilterIdForCharactersBySeriesId)),
                this.store.select('charactersBySeriesId')
            ),
            switchMap(([__, filterId, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromCharactersBySeriesIdActions.noMoreToFetch())
                } else {
                    return this.fetchFromServer(this.URL(filterId), pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    private readonly TAG = ACTION_TAGS.charactersBySeriesId
    private URL = (id: number) => `series/${id}/characters`

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    showSpinner$ = this.uiService.showSpinnerEffect(
        [fromCharactersBySeriesIdActions.fetchStart, fromCharactersBySeriesIdActions.fetchNextPage],
        this.TAG
    )

    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [
            fromCharactersBySeriesIdActions.fetchSuccess,
            fromCharactersBySeriesIdActions.fetchedFromStore,
            fromCharactersBySeriesIdActions.noMoreToFetch,
        ],
        this.TAG
    )

    /*
     * fetch comics from server
     * @params action: type
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchCharactersSuccess>
     */
    private fetchFromServer(url: string, limit: number, offset: number) {
        return this.api.fetchFromServer<Character>(url, limit, offset).pipe(
            map(res => res.data),
            mergeMap(res => [
                fromCharactersBySeriesIdActions.fetchSuccess({
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
}
