import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Comic } from '../../../shared/model/shared.interface'

export const FETCH_COMIC_START = '[COMIC] Fetch Start'
export const FETCH_COMIC_SUCCESS = '[COMIC] Fetch Success'
export const FETCH_COMIC_ERROR = '[COMIC] Fetch Error'

export class FetchComicStart implements Action {
    readonly type = FETCH_COMIC_START

    constructor(public payload: number) {}
}

export class FetchComicSuccess implements Action {
    readonly type = FETCH_COMIC_SUCCESS

    constructor(public payload: Comic) {}
}

export class FetchComicError implements Action {
    readonly type = FETCH_COMIC_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export type type = FetchComicStart | FetchComicSuccess | FetchComicError
