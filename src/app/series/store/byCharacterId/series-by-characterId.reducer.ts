import { HttpErrorResponse } from '@angular/common/http'

import * as fromSeriesByCharacterIdActions from './series-by-characterId.actions'
import { PAGE_LIMIT } from '../../../shared/constants'
import { Pagination } from '../../../shared/model/pagination.model'
import { SeriesModel } from '../../series.model'
import { createReducer, on, Action } from '@ngrx/store'

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

const seriesByCharacterIdReducer = createReducer(
    initialState,
    on(fromSeriesByCharacterIdActions.fetchStart, (state, action) => {
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
    }),
    on(fromSeriesByCharacterIdActions.fetchNextPage, state => ({
        ...state,
        fetching: true,
        error: null,
    })),
    on(fromSeriesByCharacterIdActions.fetchSuccess, (state, action) => ({
        ...state,
        fetching: false,
        error: null,
        pagination: action.pagination,
        data: [...state.data, ...action.payload],
    })),
    on(fromSeriesByCharacterIdActions.fetchError, (state, action) => ({
        ...state,
        fetching: false,
        error: action.payload,
    })),
    on(fromSeriesByCharacterIdActions.fetchedFromStore, fromSeriesByCharacterIdActions.noMoreToFetch, state => ({
        ...state,
        fetching: false,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return seriesByCharacterIdReducer(state, action)
}
