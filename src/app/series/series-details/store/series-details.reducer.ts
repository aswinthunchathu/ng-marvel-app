import { HttpErrorResponse } from '@angular/common/http'

import { Series } from '../../../shared/model/shared.interface'
import * as fromSeriesDetailsActions from './series-details.actions'

export interface State {
    fetching: boolean
    data: Series
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    data: null,
    error: null,
}

export const seriesDetailsReducer = (state = initialState, action: fromSeriesDetailsActions.type) => {
    switch (action.type) {
        case fromSeriesDetailsActions.FETCH_SERIES_DETAILS_START:
            return {
                ...state,
                fetching: true,
                error: null,
            }
        case fromSeriesDetailsActions.FETCH_SERIES_DETAILS_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                data: action.payload,
            }
        case fromSeriesDetailsActions.FETCH_SERIES_DETAILS_ERROR:
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
