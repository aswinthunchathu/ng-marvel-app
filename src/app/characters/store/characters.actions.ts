import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Character } from 'src/app/shared/shared.interface'
import { Page } from '../../shared/shared.interface'

export const FETCH_CHARACTERS_START = '[CHARACTERS] Fetch Start'
export const FETCH_CHARACTERS_SUCCESS = '[CHARACTERS] Fetch Success'
export const FETCH_CHARACTERS_ERROR = '[CHARACTERS] Fetch Error'

export class FetchCharactersStart implements Action {
    readonly type = FETCH_CHARACTERS_START
}

export class FetchCharactersSuccess implements Action {
    readonly type = FETCH_CHARACTERS_SUCCESS

    constructor(public payload: Character[], public pagination: Page) {}
}

export class FetchCharactersError implements Action {
    readonly type = FETCH_CHARACTERS_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export type type = FetchCharactersStart | FetchCharactersSuccess | FetchCharactersError
