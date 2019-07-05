import { Injectable } from '@angular/core'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromComicActions from './comic.actions'
import * as fromRoot from '../../../store/app.selector'
import { AppState } from '../../../store/app.reducer'
import { ComicModel } from '../../comic.model'
import { APIService } from '../../../shared/services/api.service'
import { ACTION_TAGS } from '../../../constants'
import { UIService } from '../../../store/ui/ui.service'

@Injectable()
export class ComicEffects {
    /*
     * This effect fetch from server
     * @triggering action: fetch start
     * @action fired: fetch success / fetch error
     */
    fetchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromComicActions.fetchStart),
            withLatestFrom(this.store.pipe(select(fromRoot.selectComicsTotal)), this.store.select('comics')),
            switchMap(([action, count, { data }]) => {
                if (count > 0) {
                    const comic = data.entities[action.payload]
                    if (comic) {
                        return of(
                            fromComicActions.fetchSuccess({
                                payload: comic,
                            })
                        )
                    }
                }
                return this.fetchFromServer(action.payload)
            })
        )
    )

    private readonly TAG = ACTION_TAGS.comic

    constructor(
        private api: APIService,
        private actions$: Actions,
        private store: Store<AppState>,
        private uiService: UIService
    ) {}

    /*
     * This effect is used to show spinner
     * @triggering action: fetch start
     * @action fired: show UI spinner
     */
    showSpinner$ = this.uiService.showSpinnerEffect([fromComicActions.fetchStart], this.TAG)

    /*
     * This effect is used to hide spinner
     * @triggering action: fetch success
     * @action fired: show UI spinner
     */
    hideSpinner$ = this.uiService.hideSpinnerEffect([fromComicActions.fetchSuccess], this.TAG)

    /*
     * This function fetch data from server
     * @params id : number
     * return : Observable<fetch success / fetch error action>
     */
    private fetchFromServer(id: string) {
        return this.api.getComic(id).pipe(
            map(res =>
                fromComicActions.fetchSuccess({
                    payload: new ComicModel(res.id, res.title, res.description, res.thumbnail),
                })
            ),
            catchError(err => of(this.uiService.setError(err, this.TAG)))
        )
    }
}
