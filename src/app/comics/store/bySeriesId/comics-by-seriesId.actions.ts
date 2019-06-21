import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from 'src/app/shared/model/pagination.model'
import { ComicModel } from '../../comic.model'

export const FETCH_COMICS_BY_SERIES_ID_START = '[COMICS BY SERIES ID] Fetch Start'
export const FETCH_COMICS_BY_SERIES_ID_NEXT_PAGE = '[COMICS BY SERIES ID] Fetch Next Page'
export const FETCH_COMICS_BY_SERIES_ID_SUCCESS = '[COMICS BY SERIES ID] Fetch Success'
export const FETCH_COMICS_BY_SERIES_ID_ERROR = '[COMICS BY SERIES ID] Fetch Error'
export const NO_MORE_TO_FETCH = '[COMICS BY SERIES ID] No More'
export const FETCHED_FROM_STORE = '[COMICS BY SERIES ID] Fetched From Store'

// const TAG = 'COMICS BY SERIES ID'

// export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

// export const fetchNextPage = createAction(`${TAG} Fetch Next Page`, props<{ payload: number }>())

// export const fetchSuccess = createAction(
//     `${TAG} Fetch Success`,
//     props<{ payload: ComicModel[]; pagination: Pagination }>()
// )

// export const fetchError = createAction(`${TAG} Fetch Error`, props<{ payload: HttpErrorResponse }>())

// export const fetchedFromStore = createAction(`${TAG} No More`)

// export const noMoreToFetch = createAction(`${TAG} Fetched From Store`)

export class FetchComicsBySeriesIdStart implements Action {
    readonly type = FETCH_COMICS_BY_SERIES_ID_START

    constructor(public payload: number) {}
}

export class FetchComicsBySeriesIdNextPage implements Action {
    readonly type = FETCH_COMICS_BY_SERIES_ID_NEXT_PAGE

    constructor(public payload: number) {}
}

export class FetchComicsBySeriesIdSuccess implements Action {
    readonly type = FETCH_COMICS_BY_SERIES_ID_SUCCESS

    constructor(public payload: ComicModel[], public pagination: Pagination) {}
}

export class FetchComicsBySeriesIdError implements Action {
    readonly type = FETCH_COMICS_BY_SERIES_ID_ERROR

    constructor(public payload: HttpErrorResponse) {}
}

export class FetchedFromStore implements Action {
    readonly type = FETCHED_FROM_STORE
}

export class NoMoreToFetch implements Action {
    readonly type = NO_MORE_TO_FETCH
}

export type type =
    | FetchComicsBySeriesIdStart
    | FetchComicsBySeriesIdNextPage
    | FetchComicsBySeriesIdSuccess
    | FetchComicsBySeriesIdError
    | FetchedFromStore
    | NoMoreToFetch
