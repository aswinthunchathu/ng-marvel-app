import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'

import { Pagination } from '../../../shared/model/pagination.model'
import { CharacterModel } from '../../character.model'

export const FETCH_CHARACTERS_BY_COMIC_ID_START = '[CHARACTERS BY COMIC ID] Fetch Start'
export const FETCH_CHARACTERS_BY_COMIC_ID_NEXT_PAGE = '[CHARACTERS BY COMIC ID] Fetch Next Page'
export const FETCH_CHARACTERS_BY_COMIC_ID_SUCCESS = '[CHARACTERS BY COMIC ID] Fetch Success'
export const FETCH_CHARACTERS_BY_COMIC_ID_ERROR = '[CHARACTERS BY COMIC ID] Fetch Error'
export const NO_MORE_CHARACTERS_BY_COMIC_ID = '[CHARACTERS BY COMIC ID] No More'

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

export type type =
    | FetchCharactersByComicIdStart
    | FetchCharactersByComicIdSuccess
    | FetchCharactersByComicIdError
    | FetchCharactersByComicIdNextPage
