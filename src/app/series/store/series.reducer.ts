import { HttpErrorResponse } from '@angular/common/http'

import * as fromSeriesActions from './series.actions'
import { PAGE_LIMIT } from '../../shared/constants'
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

export const seriesReducer = (state = initialState, action: fromSeriesActions.type) => {
    switch (action.type) {
        case fromSeriesActions.FETCH_SERIES_NEXT_PAGE:
        case fromSeriesActions.FETCH_SERIES_INIT:
            return {
                ...state,
                fetching: true,
                error: null,
            }
        case fromSeriesActions.FETCH_SERIES_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                pagination: action.pagination,
                data: [...state.data, ...action.payload],
            }
        case fromSeriesActions.FETCH_SERIES_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}
