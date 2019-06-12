import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Character } from '../../shared/model/shared.interface'
import { Pagination } from 'src/app/shared/model/pagination.model'

export const FETCH_CHARACTERS_START = '[CHARACTERS] Fetch Start'
export const FETCH_CHARACTERS_STORE = '[CHARACTERS] Fetched From Store'
export const FETCH_CHARACTERS_SUCCESS = '[CHARACTERS] Fetch Success'
export const NO_MORE_CHARACTERS = '[CHARACTERS] No More'
export const FETCH_CHARACTERS_ERROR = '[CHARACTERS] Fetch Error'

export class FetchCharactersStart implements Action {
    readonly type = FETCH_CHARACTERS_START

    constructor(public loadMore: boolean = false) {}
}

export class FetchCharactersSuccess implements Action {
    readonly type = FETCH_CHARACTERS_SUCCESS

    constructor(public payload: Character[], public pagination: Pagination) {}
}

export class FetchCharactersError implements Action {
    readonly type = FETCH_CHARACTERS_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export type type = FetchCharactersStart | FetchCharactersSuccess | FetchCharactersError
