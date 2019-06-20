import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'

import { Pagination } from '../../../shared/model/pagination.model'
import { CharacterModel } from '../../character.model'

export const FETCH_CHARACTERS_BY_COMIC_ID_START = '[CHARACTERS BY COMIC ID] Fetch Start'
export const FETCH_CHARACTERS_BY_COMIC_ID_NEXT_PAGE = '[CHARACTERS BY COMIC ID] Fetch Next Page'
export const FETCH_CHARACTERS_BY_COMIC_ID_SUCCESS = '[CHARACTERS BY COMIC ID] Fetch Success'
export const FETCH_CHARACTERS_BY_COMIC_ID_ERROR = '[CHARACTERS BY COMIC ID] Fetch Error'
export const NO_MORE_TO_FETCH = '[CHARACTERS BY COMIC ID] No More'
export const FETCHED_FROM_STORE = '[CHARACTERS BY COMIC ID] Fetched From Store'

export class FetchCharactersByComicIdStart implements Action {
    readonly type = FETCH_CHARACTERS_BY_COMIC_ID_START

    constructor(public payload: number) {}
}

export class FetchCharactersByComicIdNextPage implements Action {
    readonly type = FETCH_CHARACTERS_BY_COMIC_ID_NEXT_PAGE

    constructor(public payload: number) {}
}

export class FetchCharactersByComicIdSuccess implements Action {
    readonly type = FETCH_CHARACTERS_BY_COMIC_ID_SUCCESS

    constructor(public payload: CharacterModel[], public pagination: Pagination) {}
}

export class FetchCharactersByComicIdError implements Action {
    readonly type = FETCH_CHARACTERS_BY_COMIC_ID_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export class FetchedFromStore implements Action {
    readonly type = FETCHED_FROM_STORE
}

export class NoMoreToFetch implements Action {
    readonly type = NO_MORE_TO_FETCH
}

export type type =
    | FetchCharactersByComicIdStart
    | FetchCharactersByComicIdSuccess
    | FetchCharactersByComicIdError
    | FetchCharactersByComicIdNextPage
    | FetchedFromStore
    | NoMoreToFetch
