import { Injectable } from '@angular/core'
import { switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../store/ui/ui.actions'
import * as fromPaginationActions from '../../../store/pagination/pagination.action'
import * as fromCharactersBySeriesIdActions from './characters-by-seriesId.actions'
import * as fromRoot from '../../../store/app.selector'
import { Pagination } from '../../../model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { CharacterModel } from '../../../model/character.model'
import { APIService } from '../../../shared/services/api.service'
import { ACTION_TAGS } from '../../../constants'
import { UIService } from '../../../store/ui/ui.service'

@Injectable()
export class CharactersBySeriesIdEffects {
    /*
     * This effect fetch from server
     * @triggering action: fetch start
     * @action fired: fetch success / fetch error
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
                return this.fetchFromServer(action.payload, pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    /*
     * This effect fetch next set from server
     * @triggering action: fetch next page
     * @action fired: fetch success / fetch  error
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
                    return this.fetchFromServer(filterId, pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    private readonly TAG = ACTION_TAGS.charactersBySeriesId

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    /*
     * This effect is used to show spinner
     * @triggering action: fetch start/fetch next page
     * @action fired: show UI spinner
     */
    showSpinner$ = this.uiService.showSpinnerEffect(
        [fromCharactersBySeriesIdActions.fetchStart, fromCharactersBySeriesIdActions.fetchNextPage],
        this.TAG
    )

    /*
     * This effect is used to hide spinner
     * @triggering action: fetch success / fetch from store/ no moire to fetch
     * @action fired: show UI spinner
     */
    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [
            fromCharactersBySeriesIdActions.fetchSuccess,
            fromCharactersBySeriesIdActions.fetchedFromStore,
            fromCharactersBySeriesIdActions.noMoreToFetch,
        ],
        this.TAG
    )

    /*
     * This function fetch data from server
     * @params id : number
     * @params limit : number
     * @params offset : number
     * return : Observable<fetch success / fetch error action>
     */
    private fetchFromServer(id: number, limit: number, offset: number) {
        return this.api.getCharactersBySeriesId(id, limit, offset).pipe(
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
