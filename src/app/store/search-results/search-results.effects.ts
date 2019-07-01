import { Injectable } from '@angular/core'
import { switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromUIActions from '../ui/ui.actions'
import * as fromSearchResultsActions from './search-results.actions'
import * as fromRoot from '../app.selector'
import { AppState } from '../app.reducer'
import { CharacterModel } from '../../model/character.model'
import { APIService } from '../../shared/services/api.service'
import { ACTION_TAGS } from '../../constants'
import { UIService } from '../ui/ui.service'

@Injectable()
export class SearchResultsEffects {
    /*
     * This effect fetch from server
     * @triggering action: fetch start
     * @action fired: fetch success / fetch error
     */
    fetchCharactersStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSearchResultsActions.fetchCharactersStart),
            switchMap(() => this.fetchCharactersFromServer(10, 0, 'spi'))
        )
    )

    private readonly TAG = ACTION_TAGS.characters

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
        [
            fromSearchResultsActions.fetchCharactersStart,
            // fromSearchResultsActions.fetchComicsStart,
            // fromSearchResultsActions.fetchSeriesStart,
        ],
        this.TAG
    )

    /*
     * This effect is used to hide spinner
     * @triggering action: fetch success / fetch from store/ no moire to fetch
     * @action fired: show UI spinner
     */
    hideSpinner$ = this.uiService.hideSpinnerEffect(
        [
            fromSearchResultsActions.fetchCharactersSuccess,
            // fromSearchResultsActions.fetchComicsSuccess,
            // fromSearchResultsActions.fetchSeriesSuccess,
        ],
        this.TAG
    )

    /*
     *This function fetch data from server
     * @params limit : number
     * @params offset : number
     * return : Observable<fetch success / fetch error action>
     */
    private fetchCharactersFromServer = (limit: number, offset: number, key: string) =>
        this.api.getCharacters(limit, offset, key).pipe(
            mergeMap(res => [
                fromSearchResultsActions.fetchCharactersSuccess({
                    payload: res.results.map(
                        item => new CharacterModel(item.id, item.name, item.description, item.thumbnail)
                    ),
                }),
            ]),
            catchError(err => of(this.uiService.setError(err, this.TAG)))
        )
}
