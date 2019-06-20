import { HttpErrorResponse } from '@angular/common/http'

import * as fromSeriesByCharacterIdActions from './series-by-characterId.actions'
import { PAGE_LIMIT } from '../../../shared/constants'
import { Pagination } from '../../../shared/model/pagination.model'
import { SeriesModel } from '../../series.model'

export interface State {
    fetching: boolean
    data: SeriesModel[]
    pagination: Pagination
    error: HttpErrorResponse
    filterId: number
    previousFilterId: number
}

const initialState: State = {
    fetching: false,
    pagination: new Pagination(-1, PAGE_LIMIT, 0, 0),
    data: [],
    error: null,
    filterId: null,
    previousFilterId: null,
}

export const seriesByCharacterIdReducer = (state = initialState, action: fromSeriesByCharacterIdActions.type) => {
    switch (action.type) {
        case fromSeriesByCharacterIdActions.FETCH_SERIES_BY_CHARACTER_ID_START:
            if (state.filterId === action.payload) {
                return {
                    ...state,
                    fetching: true,
                    error: null,
                }
            } else {
                return {
                    ...state,
                    ...initialState,
                    fetching: true,
                    filterId: action.payload,
                }
            }
        case fromSeriesByCharacterIdActions.FETCH_SERIES_BY_CHARACTER_ID_NEXT_PAGE:
            return {
                ...state,
                fetching: true,
                error: null,
            }
        case fromSeriesByCharacterIdActions.FETCH_SERIES_BY_CHARACTER_ID_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                pagination: action.pagination,
                data: [...state.data, ...action.payload],
            }
        case fromSeriesByCharacterIdActions.FETCH_SERIES_BY_CHARACTER_ID_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        case fromSeriesByCharacterIdActions.FETCHED_FROM_STORE:
            return {
                ...state,
                fetching: false,
            }
        default:
            return {
                ...state,
            }
    }
}
