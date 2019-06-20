import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from 'src/app/shared/model/pagination.model'
import { SeriesModel } from '../../series.model'

export const FETCH_SERIES_BY_CHARACTER_ID_START = '[SERIES BY CHARACTER ID] Fetch Start'
export const FETCH_SERIES_BY_CHARACTER_ID_NEXT_PAGE = '[SERIES BY CHARACTER ID] Fetch Next Page'
export const FETCH_SERIES_BY_CHARACTER_ID_SUCCESS = '[SERIES BY CHARACTER ID] Fetch Success'
export const FETCH_SERIES_BY_CHARACTER_ID_ERROR = '[SERIES BY CHARACTER ID] Fetch Error'
export const NO_MORE_SERIES_BY_CHARACTER_ID = '[SERIES BY CHARACTER ID] No More'

export class FetchSeriesByCharacterIdStart implements Action {
    readonly type = FETCH_SERIES_BY_CHARACTER_ID_START

    constructor(public payload: number) {}
}

export class FetchSeriesByCharacterIdNextPage implements Action {
    readonly type = FETCH_SERIES_BY_CHARACTER_ID_NEXT_PAGE

    constructor(public payload: number) {}
}

export class FetchSeriesByCharacterIdSuccess implements Action {
    readonly type = FETCH_SERIES_BY_CHARACTER_ID_SUCCESS

    constructor(public payload: SeriesModel[], public pagination: Pagination) {}
}

export class FetchSeriesByCharacterIdError implements Action {
    readonly type = FETCH_SERIES_BY_CHARACTER_ID_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export type type =
    | FetchSeriesByCharacterIdStart
    | FetchSeriesByCharacterIdNextPage
    | FetchSeriesByCharacterIdSuccess
    | FetchSeriesByCharacterIdError
