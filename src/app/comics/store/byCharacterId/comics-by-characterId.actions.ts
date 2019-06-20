import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from 'src/app/shared/model/pagination.model'
import { ComicModel } from '../../comic.model'

export const FETCH_COMICS_BY_CHARACTER_ID_START = '[COMICS BY CHARACTER ID] Fetch Start'
export const FETCH_COMICS_BY_CHARACTER_ID_NEXT_PAGE = '[COMICS BY CHARACTER ID] Fetch Next Page'
export const FETCH_COMICS_BY_CHARACTER_ID_SUCCESS = '[COMICS BY CHARACTER ID] Fetch Success'
export const FETCH_COMICS_BY_CHARACTER_ID_ERROR = '[COMICS BY CHARACTER ID] Fetch Error'
export const NO_MORE_TO_FETCH = '[COMICS BY CHARACTER ID] No More'
export const FETCHED_FROM_STORE = '[COMICS BY CHARACTER ID] Fetched From Store'

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

export class FetchedFromStore implements Action {
    readonly type = FETCHED_FROM_STORE
}

export class NoMoreToFetch implements Action {
    readonly type = NO_MORE_TO_FETCH
}

export type type =
    | FetchComicsByCharacterIdStart
    | FetchComicsByCharacterIdNextPage
    | FetchComicsByCharacterIdSuccess
    | FetchComicsByCharacterIdError
    | FetchedFromStore
    | NoMoreToFetch
