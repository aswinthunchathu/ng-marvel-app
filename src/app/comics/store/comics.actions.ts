import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from 'src/app/shared/model/pagination.model'
import { ComicModel } from '../comic.model'

export const FETCH_COMICS_START = '[COMICS] Fetch Start'
export const FETCH_COMICS_NEXT_PAGE = '[COMICS] Fetch Next Page'
export const FETCH_COMICS_SUCCESS = '[COMICS] Fetch Success'
export const FETCH_COMICS_ERROR = '[COMICS] Fetch Error'
export const NO_MORE_COMICS = '[COMICS] No More'
export const FETCHED_FROM_STORE = '[COMICS] Fetched From Store'

export class FetchComicsStart implements Action {
    readonly type = FETCH_COMICS_START
}

export class FetchComicsNextPage implements Action {
    readonly type = FETCH_COMICS_NEXT_PAGE
}

export class FetchComicsSuccess implements Action {
    readonly type = FETCH_COMICS_SUCCESS

    constructor(public payload: ComicModel[], public pagination: Pagination) {}
}

export class FetchComicsError implements Action {
    readonly type = FETCH_COMICS_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export class FetchedFromStore implements Action {
    readonly type = FETCHED_FROM_STORE
}

export type type = FetchComicsStart | FetchComicsNextPage | FetchComicsSuccess | FetchComicsError | FetchedFromStore
