import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from 'src/app/shared/model/pagination.model'
import { ComicModel } from '../../comic.model'

export const FETCH_COMICS_BY_CHARACTER_ID_START = '[COMICS BY CHARACTER ID] Fetch Start'
export const FETCH_COMICS_BY_CHARACTER_ID_NEXT_PAGE = '[COMICS BY CHARACTER ID] Fetch Next Page'
export const FETCH_COMICS_BY_CHARACTER_ID_SUCCESS = '[COMICS BY CHARACTER ID] Fetch Success'
export const FETCH_COMICS_BY_CHARACTER_ID_ERROR = '[COMICS BY CHARACTER ID] Fetch Error'
export const NO_MORE_COMICS_BY_CHARACTER_ID = '[COMICS BY CHARACTER ID] No More'

export class FetchComicsByCharacterIdStart implements Action {
    readonly type = FETCH_COMICS_BY_CHARACTER_ID_START

    constructor(public payload: number) {}
}

export class FetchComicsByCharacterIdNextPage implements Action {
    readonly type = FETCH_COMICS_BY_CHARACTER_ID_NEXT_PAGE

    constructor(public payload: number) {}
}

export class FetchComicsByCharacterIdSuccess implements Action {
    readonly type = FETCH_COMICS_BY_CHARACTER_ID_SUCCESS

    constructor(public payload: ComicModel[], public pagination: Pagination) {}
}

export class FetchComicsByCharacterIdError implements Action {
    readonly type = FETCH_COMICS_BY_CHARACTER_ID_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export type type =
    | FetchComicsByCharacterIdStart
    | FetchComicsByCharacterIdNextPage
    | FetchComicsByCharacterIdSuccess
    | FetchComicsByCharacterIdError