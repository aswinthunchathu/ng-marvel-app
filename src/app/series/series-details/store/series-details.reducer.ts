import { HttpErrorResponse } from '@angular/common/http'
import { createReducer, on, Action } from '@ngrx/store'

import * as fromSeriesDetailsActions from './series-details.actions'
import { SeriesModel } from '../../series.model'

export interface State {
    fetching: boolean
    data: SeriesModel
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    data: null,
    error: null,
}

const seriesDetailsReducer = createReducer(
    initialState,
    on(fromSeriesDetailsActions.fetchStart, state => ({
        ...state,
        fetching: true,
        error: null,
    })),
    on(fromSeriesDetailsActions.fetchSuccess, (state, action) => ({
        ...state,
        fetching: false,
        error: null,
        data: action.payload,
    })),
    on(fromSeriesDetailsActions.fetchError, (state, action) => ({
        ...state,
        fetching: false,
        error: action.payload,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return seriesDetailsReducer(state, action)
}
