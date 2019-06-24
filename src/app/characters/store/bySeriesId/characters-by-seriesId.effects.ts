import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromCharactersByComicIdActions from './characters-by-seriesId.actions'
import { APIResponse, Character } from '../../../shared/model/shared.interface'
import { Pagination } from '../../../shared/model/pagination.model'
import { AppState } from '../../../store/app.reducer'
import { CharacterModel } from '../../character.model'

@Injectable()
export class CharactersBySeriesIdEffects {
    private _URL = action => `series/${action['payload']}/characters`

    /*
     * This effect is fired when FETCH_CHARACTERS_BY_SERIES_ID_START action is fired
     */
    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromCharactersByComicIdActions.fetchStart),
        withLatestFrom(this.store.select('charactersBySeriesId')),
        switchMap(([action, characterState]) => {
            if (characterState.data.length > 0) {
                return of(fromCharactersByComicIdActions.fetchedFromStore())
            }
            return this._fetchFromServer(action, characterState.pagination.limit, characterState.pagination.nextPage)
        })
    )

    /*
     * This effect is fired when FETCH_CHARACTERS_BY_SERIES_ID_NEXT_PAGE action is fired
     */
    @Effect() fetchCharactersNextPage = this.actions$.pipe(
        ofType(fromCharactersByComicIdActions.fetchNextPage),
        withLatestFrom(this.store.select('charactersBySeriesId')),
        switchMap(([action, characterState]) => {
            const pagination: Pagination = characterState.pagination

            if (!pagination.hasMore) {
                return of(fromCharactersByComicIdActions.noMoreToFetch())
            } else {
                return this._fetchFromServer(action, pagination.limit, pagination.nextPage)
            }
        })
    )

    constructor(private http$: HttpClient, private actions$: Actions, private store: Store<AppState>) {}

    /*
     * fetch comics from server
     * @params action: type
     * @params limit: number - limit per page
     * @params offset: number - page offset
     * return : Observable<FetchCharactersSuccess>
     */
    private _fetchFromServer(action, limit: number, offset: number) {
        return this.http$
            .get<APIResponse<Character>>(this._URL(action), {
                params: new HttpParams().set('limit', String(limit)).set('offset', String(offset)),
            })
            .pipe(
                map(res => res.data),
                map(res =>
                    fromCharactersByComicIdActions.fetchSuccess({
                        payload: res.results.map(
                            item => new CharacterModel(item.id, item.name, item.description, item.thumbnail)
                        ),
                        pagination: new Pagination(res.offset, res.limit, res.total, res.count),
                    })
                ),
                catchError(err =>
                    of(
                        fromCharactersByComicIdActions.fetchError({
                            payload: err,
                        })
                    )
                )
            )
    }
}
