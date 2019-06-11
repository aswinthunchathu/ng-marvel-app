import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, switchMap, catchError } from 'rxjs/operators'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'

import * as fromCharactersActions from './characters.actions'
import { CharacterResults } from 'src/app/shared/shared.interface'
import { Pagination } from 'src/app/shared/pagination.model'

@Injectable()
export class CharactersEffects {
    @Effect() fetchCharacters = this.actions$.pipe(
        ofType(fromCharactersActions.FETCH_CHARACTERS_START),
        switchMap(() => this.http$.get<CharacterResults>('characters')),
        map(res => res.data),
        map(
            res =>
                new fromCharactersActions.FetchCharactersSuccess(
                    res.results,
                    new Pagination(res.offset, res.limit, res.total, res.count)
                )
        ),
        catchError(err => of(new fromCharactersActions.FetchCharactersError(err)))
    )

    constructor(private http$: HttpClient, private actions$: Actions) {}
}
