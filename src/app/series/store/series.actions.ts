import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from '../../shared/model/pagination.model'
import { SeriesModel } from '../series.model'

export const FETCH_SERIES_INIT = '[SERIES] Fetch Init'
export const FETCH_SERIES_NEXT_PAGE = '[SERIES] Fetch Next Page'
export const FETCH_SERIES_SUCCESS = '[SERIES] Fetch Success'
export const FETCH_SERIES_ERROR = '[SERIES] Fetch Error'
export const NO_MORE_SERIES = '[SERIES] No More'
export const FETCHED_FROM_STORE = '[SERIES] Fetched From Store'

export class FetchSeriesInit implements Action {
    readonly type = FETCH_SERIES_INIT
}

export class FetchSeriesNextPage implements Action {
    readonly type = FETCH_SERIES_NEXT_PAGE
}

export class FetchSeriesSuccess implements Action {
    readonly type = FETCH_SERIES_SUCCESS

    constructor(public payload: SeriesModel[], public pagination: Pagination) {}
}

export class FetchSeriesError implements Action {
    readonly type = FETCH_SERIES_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export class FetchedFromStore implements Action {
    readonly type = FETCHED_FROM_STORE
}

export type type = FetchSeriesInit | FetchSeriesNextPage | FetchSeriesSuccess | FetchSeriesError | FetchedFromStore
