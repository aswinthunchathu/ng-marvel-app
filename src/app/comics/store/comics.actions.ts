import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Comic } from '../../shared/model/shared.interface'
import { Pagination } from 'src/app/shared/model/pagination.model'

export const FETCH_COMICS_INIT = '[COMICS] Fetch Init'
export const FETCH_COMICS_NEXT_PAGE = '[COMICS] Fetch Next Page'
export const FETCH_COMICS_SUCCESS = '[COMICS] Fetch Success'
export const FETCH_COMICS_ERROR = '[COMICS] Fetch Error'
export const NO_MORE_COMICS = '[COMICS] No More'

export class FetchComicsInit implements Action {
    readonly type = FETCH_COMICS_INIT
}

export class FetchComicsNextPage implements Action {
    readonly type = FETCH_COMICS_NEXT_PAGE
}

export class FetchComicsSuccess implements Action {
    readonly type = FETCH_COMICS_SUCCESS

    constructor(public payload: Comic[], public pagination: Pagination) {}
}

export class FetchComicsError implements Action {
    readonly type = FETCH_COMICS_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export type type = FetchComicsInit | FetchComicsNextPage | FetchComicsSuccess | FetchComicsError
