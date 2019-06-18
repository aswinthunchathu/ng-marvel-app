import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from 'src/app/shared/model/pagination.model'
import { ComicModel } from '../comic.model'

export const RESET_COMICS = '[COMICS] Reset Store'

export const FETCH_COMICS_START = '[COMICS] Fetch Start'
export const FETCH_COMICS_NEXT_PAGE = '[COMICS] Fetch Next Page'

export const FETCH_COMICS_BY_CHARACTER_ID_START = '[COMICS] Fetch By Character Id Start'
export const FETCH_COMICS_BY_CHARACTER_ID_NEXT_PAGE = '[COMICS] Fetch By Character Id Next Page'

export const FETCH_COMICS_BY_SERIES_ID_START = '[COMICS] Fetch By Series Id Start'
export const FETCH_COMICS_BY_SERIES_ID_NEXT_PAGE = '[COMICS] Fetch By Series Id Next Page'

export const FETCH_COMICS_SUCCESS = '[COMICS] Fetch Success'
export const FETCH_COMICS_ERROR = '[COMICS] Fetch Error'
export const NO_MORE_COMICS = '[COMICS] No More'

export class ResetComics implements Action {
    readonly type = RESET_COMICS
}

export class FetchComicsStart implements Action {
    readonly type = FETCH_COMICS_START
}

export class FetchComicsNextPage implements Action {
    readonly type = FETCH_COMICS_NEXT_PAGE
}

export class FetchComicsByCharacterIdStart implements Action {
    readonly type = FETCH_COMICS_BY_CHARACTER_ID_START

    constructor(public payload: number) {}
}

export class FetchComicsByCharacterIdNextPage implements Action {
    readonly type = FETCH_COMICS_BY_CHARACTER_ID_NEXT_PAGE

    constructor(public payload: number) {}
}

export class FetchComicsBySeriesIdStart implements Action {
    readonly type = FETCH_COMICS_BY_SERIES_ID_START

    constructor(public payload: number) {}
}

export class FetchComicsBySeriesIdNextPage implements Action {
    readonly type = FETCH_COMICS_BY_SERIES_ID_NEXT_PAGE

    constructor(public payload: number) {}
}

export class FetchComicsSuccess implements Action {
    readonly type = FETCH_COMICS_SUCCESS

    constructor(public payload: ComicModel[], public pagination: Pagination) {}
}

export class FetchComicsError implements Action {
    readonly type = FETCH_COMICS_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export type type =
    | FetchComicsStart
    | FetchComicsNextPage
    | FetchComicsSuccess
    | FetchComicsError
    | ResetComics
    | FetchComicsByCharacterIdStart
    | FetchComicsByCharacterIdNextPage
    | FetchComicsBySeriesIdStart
    | FetchComicsBySeriesIdNextPage
