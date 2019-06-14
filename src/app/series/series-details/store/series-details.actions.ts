import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Series } from '../../../shared/model/shared.interface'

export const FETCH_SERIES_DETAILS_START = '[SERIES DETAILS] Fetch Start'
export const FETCH_SERIES_DETAILS_SUCCESS = '[SERIES DETAILS] Fetch Success'
export const FETCH_SERIES_DETAILS_ERROR = '[SERIES DETAILS] Fetch Error'

export class FetchSeriesDetailsStart implements Action {
    readonly type = FETCH_SERIES_DETAILS_START

    constructor(public payload: number) {}
}

export class FetchSeriesDetailsSuccess implements Action {
    readonly type = FETCH_SERIES_DETAILS_SUCCESS

    constructor(public payload: Series) {}
}

export class FetchSeriesDetailsError implements Action {
    readonly type = FETCH_SERIES_DETAILS_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export type type = FetchSeriesDetailsStart | FetchSeriesDetailsSuccess | FetchSeriesDetailsError
