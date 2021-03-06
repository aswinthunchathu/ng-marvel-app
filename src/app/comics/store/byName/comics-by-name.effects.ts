import { Injectable } from '@angular/core'
import { switchMap, catchError, withLatestFrom, map } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromComicsByNameActions from './comics-by-name.actions'
import * as fromRoot from '../../../store/app.selector'
import { AppState } from '../../../store/app.reducer'
import { ComicModel } from '../../comic.model'
import { APIService } from '../../../shared/services/api.service'
import { ACTION_TAGS, SEARCH_PAGE_LIMIT, PAGE_LIMIT } from '../../../constants'
import { UIService } from '../../../store/ui/ui.service'

@Injectable()
export class ComicsByNameEffects {
    /*
     * This effect fetch from server
     * @triggering action: fetch start
     * @action fired: fetch success / fetch error
     */

    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicsByNameActions.fetchStart),
            withLatestFrom(this.store.pipe(select(fromRoot.selectCharactersByNameTotal))),
            switchMap(([action, count]) => {
                if (count > 0) {
                    return of(fromComicsByNameActions.fetchedFromStore())
                }
                return this.fetchFromServer(action.payload, PAGE_LIMIT, 0)
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
            ofType(fromComicsByNameActions.fetchNextPage),
            withLatestFrom(
                this.store.pipe(select(fromRoot.selectFilterForCharactersByName)),
                this.store.select('charactersByName')
            ),
            switchMap(([__, filter, { pagination }]) => {
                if (!pagination.data.hasMore) {
                    return of(fromComicsByNameActions.noMoreToFetch())
                } else {
                    return this.fetchFromServer(filter, pagination.data.limit, pagination.data.nextPage)
                }
            })
        )
    )

    private readonly TAG = ACTION_TAGS.comicsByName

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
        [fromComicsByNameActions.fetchStart, fromComicsByNameActions.fetchNextPage],
        this.TAG
    )

    /*
     * This effect is used to hide spinner
     * @triggering action: fetch success / fetch from store/ no moire to fetch
     * @action fired: show UI spinner
     */
    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [
            fromComicsByNameActions.fetchSuccess,
            fromComicsByNameActions.fetchedFromStore,
            fromComicsByNameActions.noMoreToFetch,
        ],
        this.TAG
    )

    /*
     * This function fetch data from server
     * @params filter : string
     * @params limit : number
     * @params offset : number
     * return : Observable<fetch success / fetch error action>
     */
    private fetchFromServer(filter: string, limit: number, offset: number) {
        return this.api.getComics(limit, offset, filter).pipe(
            map(res =>
                fromComicsByNameActions.fetchSuccess({
                    payload: res.results.map(
                        item => new ComicModel(item.id, item.title, item.description, item.thumbnail)
                    ),
                })
            ),
            catchError(err => of(this.uiService.setError(err, this.TAG)))
        )
    }
}
