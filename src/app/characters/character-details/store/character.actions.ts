import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Character } from '../../../shared/model/shared.interface'

export const FETCH_CHARACTER_START = '[CHARACTER] Fetch Start'
export const FETCH_CHARACTER_SUCCESS = '[CHARACTER] Fetch Success'
export const FETCH_CHARACTER_ERROR = '[CHARACTER] Fetch Error'

export class FetchCharacterStart implements Action {
    readonly type = FETCH_CHARACTER_START

    constructor(public payload: number) {}
}

export class FetchCharacterSuccess implements Action {
    readonly type = FETCH_CHARACTER_SUCCESS

    constructor(public payload: Character) {}
}

export class FetchCharacterError implements Action {
    readonly type = FETCH_CHARACTER_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export type type = FetchCharacterStart | FetchCharacterSuccess | FetchCharacterError
