import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../../../shared/store/ui/ui.actions'
import * as fromPaginationActions from '../../../shared/store/pagination/pagination.action'
import * as fromComicsByCharacterIDActions from './comics-by-characterId.actions'
import * as fromRoot from '../../../store/app.reducer'
import { Comic } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { ComicModel } from '../../comic.model'
import { APIService } from '../../../shared/services/api.service'
import { ACTION_TAGS } from 'src/app/constants'
import { UIService } from 'src/app/shared/store/ui/ui.service'

@Injectable()
export class ComicsByCharacterIdEffects {
    /*
     * This effect is fired when FETCH_COMICS_BY_CHARACTER_ID_START action is fired
     */
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicsByCharacterIDActions.fetchStart),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectComicsByCharacterIdTotal)),
                this.store.select('comicByCharacterId')
            ),
            switchMap(([action, count, { pagination }]) => {
                this.store.dispatch(fromUIActions.resetError(this.TAG)())
                if (count > 0) {
                    return of(fromComicsByCharacterIDActions.fetchedFromStore())
                }
                return this.fetchFromServer(this.URL(action.payload), pagination.data.limit, pagination.data.nextPage)
            })
        )
    )

    /*
     * This effect is fired when FETCH_COMICS_BY_CHARACTER_ID_NEXT_PAGE action is fired
     */
    fetchNextPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicsByCharacterIDActions.fetchNextPage),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectFilterIdForComicsByCharacterId)),
                this.store.select('comicByCharacterId')
            ),
            switchMap(([__, filterId, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromComicsByCharacterIDActions.noMoreToFetch())
                } else {
                    return this.fetchFromServer(this.URL(filterId), pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    private readonly TAG = ACTION_TAGS.comicsByCharacterId
    private URL = (action, key = 'payload') => `characters/${action[key]}/comics`

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    showSpinner$ = this.uiService.showSpinnerEffect(
        [fromComicsByCharacterIDActions.fetchStart, fromComicsByCharacterIDActions.fetchNextPage],
        this.TAG
    )

    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [
            fromComicsByCharacterIDActions.fetchSuccess,
            fromComicsByCharacterIDActions.fetchedFromStore,
            fromComicsByCharacterIDActions.noMoreToFetch,
        ],
        this.TAG
    )

    /*
     * fetch comics from server
     * @param action : type of Comics By Character Id Actions
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<fromComicsByCharacterIDActions.type>
     */
    private fetchFromServer(action, limit: number, offset: number) {
        return this.api.fetchFromServer<Comic>(this.URL(action), limit, offset).pipe(
            map(res => res.data),
            mergeMap(res => [
                fromComicsByCharacterIDActions.fetchSuccess({
                    payload: res.results.map(
                        item => new ComicModel(item.id, item.title, item.description, item.thumbnail)
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
