import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from 'src/app/shared/model/pagination.model'
import { ComicModel } from '../../comic.model'

export const FETCH_COMICS_BY_SERIES_ID_START = '[COMICS BY SERIES ID] Fetch Start'
export const FETCH_COMICS_BY_SERIES_ID_NEXT_PAGE = '[COMICS BY SERIES ID] Fetch Next Page'
export const FETCH_COMICS_BY_SERIES_ID_SUCCESS = '[COMICS BY SERIES ID] Fetch Success'
export const FETCH_COMICS_BY_SERIES_ID_ERROR = '[COMICS BY SERIES ID] Fetch Error'
export const NO_MORE_COMICS_BY_SERIES_ID = '[COMICS BY SERIES ID] No More'

export class FetchComicsBySeriesIdStart implements Action {
    readonly type = FETCH_COMICS_BY_SERIES_ID_START

    constructor(public payload: number) {}
}

export class FetchComicsBySeriesIdNextPage implements Action {
    readonly type = FETCH_COMICS_BY_SERIES_ID_NEXT_PAGE

    constructor(public payload: number) {}
}

export class FetchComicsBySeriesIdSuccess implements Action {
    readonly type = FETCH_COMICS_BY_SERIES_ID_SUCCESS

    constructor(public payload: ComicModel[], public pagination: Pagination) {}
}

export class FetchComicsBySeriesIdError implements Action {
    readonly type = FETCH_COMICS_BY_SERIES_ID_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export type type =
    | FetchComicsBySeriesIdStart
    | FetchComicsBySeriesIdNextPage
    | FetchComicsBySeriesIdSuccess
    | FetchComicsBySeriesIdError
