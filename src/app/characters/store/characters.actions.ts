import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'

import { Pagination } from '../../shared/model/pagination.model'
import { CharacterModel } from '../character.model'

export const FETCH_CHARACTERS_INIT = '[CHARACTERS] Fetch Init'
export const FETCH_CHARACTERS_NEXT_PAGE = '[CHARACTERS] Fetch Next Page'
export const FETCH_CHARACTERS_SUCCESS = '[CHARACTERS] Fetch Success'
export const FETCH_CHARACTERS_ERROR = '[CHARACTERS] Fetch Error'
export const NO_MORE_CHARACTERS = '[CHARACTERS] No More'

export class FetchCharactersInit implements Action {
    readonly type = FETCH_CHARACTERS_INIT
}

export class FetchCharactersNextPage implements Action {
    readonly type = FETCH_CHARACTERS_NEXT_PAGE
}

export class FetchCharactersSuccess implements Action {
    readonly type = FETCH_CHARACTERS_SUCCESS

    constructor(public payload: CharacterModel[], public pagination: Pagination) {}
}

export class FetchCharactersError implements Action {
    readonly type = FETCH_CHARACTERS_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export type type = FetchCharactersInit | FetchCharactersSuccess | FetchCharactersError | FetchCharactersNextPage
