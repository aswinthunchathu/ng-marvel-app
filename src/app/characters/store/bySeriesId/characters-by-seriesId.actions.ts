import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'

import { Pagination } from '../../../shared/model/pagination.model'
import { CharacterModel } from '../../character.model'

export const FETCH_CHARACTERS_BY_SERIES_ID_START = '[CHARACTERS BY SERIES ID] Fetch Start'
export const FETCH_CHARACTERS_BY_SERIES_ID_NEXT_PAGE = '[CHARACTERS BY SERIES ID] Fetch Next Page'
export const FETCH_CHARACTERS_BY_SERIES_ID_SUCCESS = '[CHARACTERS BY SERIES ID] Fetch Success'
export const FETCH_CHARACTERS_BY_SERIES_ID_ERROR = '[CHARACTERS BY SERIES ID] Fetch Error'
export const NO_MORE_CHARACTERS_BY_SERIES_ID = '[CHARACTERS BY SERIES ID] No More'
export const FETCHED_FROM_STORE = '[CHARACTERS BY SERIES ID] Fetched From Store'

export class FetchCharactersBySeriesIdStart implements Action {
    readonly type = FETCH_CHARACTERS_BY_SERIES_ID_START

    constructor(public payload: number) {}
}

export class FetchCharactersBySeriesIdNextPage implements Action {
    readonly type = FETCH_CHARACTERS_BY_SERIES_ID_NEXT_PAGE

    constructor(public payload: number) {}
}

export class FetchCharactersBySeriesIdSuccess implements Action {
    readonly type = FETCH_CHARACTERS_BY_SERIES_ID_SUCCESS

    constructor(public payload: CharacterModel[], public pagination: Pagination) {}
}

export class FetchCharactersBySeriesIdError implements Action {
    readonly type = FETCH_CHARACTERS_BY_SERIES_ID_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export class FetchedFromStore implements Action {
    readonly type = FETCHED_FROM_STORE
}

export type type =
    | FetchCharactersBySeriesIdStart
    | FetchCharactersBySeriesIdSuccess
    | FetchCharactersBySeriesIdError
    | FetchCharactersBySeriesIdNextPage
    | FetchedFromStore
