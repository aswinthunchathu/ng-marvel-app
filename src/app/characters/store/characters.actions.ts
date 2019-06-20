import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'

import { Pagination } from '../../shared/model/pagination.model'
import { CharacterModel } from '../character.model'

export const FETCH_CHARACTERS_INIT = '[CHARACTERS] Fetch Init'
export const FETCH_CHARACTERS_NEXT_PAGE = '[CHARACTERS] Fetch Next Page'
export const FETCH_CHARACTERS_SUCCESS = '[CHARACTERS] Fetch Success'
export const FETCH_CHARACTERS_ERROR = '[CHARACTERS] Fetch Error'
export const NO_MORE_TO_FETCH = '[CHARACTERS] No More'
export const FETCHED_FROM_STORE = '[CHARACTERS] Fetched From Store'

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

export class FetchedFromStore implements Action {
    readonly type = FETCHED_FROM_STORE
}

export class NoMoreToFetch implements Action {
    readonly type = NO_MORE_TO_FETCH
}

export type type =
    | FetchCharactersInit
    | FetchCharactersSuccess
    | FetchCharactersError
    | FetchCharactersNextPage
    | FetchedFromStore
    | NoMoreToFetch
