import { HttpErrorResponse } from '@angular/common/http'
import { createReducer, on, Action } from '@ngrx/store'

import * as fromSeriesActions from './series.actions'
import { PAGE_LIMIT } from '../../constants'
import { Pagination } from '../../shared/model/pagination.model'
import { SeriesModel } from '../series.model'

export interface State {
    fetching: boolean
    data: SeriesModel[]
    pagination: Pagination
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    pagination: new Pagination(-1, PAGE_LIMIT, 0, 0),
    data: [],
    error: null,
}

const seriesReducer = createReducer<State>(
    initialState,
    on(fromSeriesActions.fetchStart, fromSeriesActions.fetchNextPage, state => ({
        ...state,
        fetching: true,
        error: null,
    })),
    on(fromSeriesActions.fetchSuccess, (state, action) => ({
        ...state,
        fetching: false,
        error: null,
        pagination: action.pagination,
        data: [...state.data, ...action.payload],
    })),
    on(fromSeriesActions.fetchError, (state, action) => ({
        ...state,
        fetching: false,
        error: action.payload,
    })),
    on(fromSeriesActions.fetchedFromStore, fromSeriesActions.noMoreToFetch, state => ({
        ...state,
        fetching: false,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return seriesReducer(state, action)
}
