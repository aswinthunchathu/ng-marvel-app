import { HttpErrorResponse } from '@angular/common/http'

import * as fromComicsBySeriesIdActions from './comics-by-seriesId.actions'
import { PAGE_LIMIT } from '../../../shared/constants'
import { Pagination } from '../../../shared/model/pagination.model'
import { ComicModel } from '../../comic.model'

export interface State {
    fetching: boolean
    data: ComicModel[]
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

export const comicsBySeriesIdReducer = (state = initialState, action: fromComicsBySeriesIdActions.type) => {
    switch (action.type) {
        case fromComicsBySeriesIdActions.FETCH_COMICS_BY_SERIES_ID_START:
            return {
                ...state,
                fetching: true,
                error: null,
                previousFilterId: state.filterId,
                filterId: action.payload,
                data: state.filterId === action.payload ? [...state.data] : [],
                pagination: state.filterId === action.payload ? state.pagination : new Pagination(-1, PAGE_LIMIT, 0, 0),
            }
        case fromComicsBySeriesIdActions.FETCH_COMICS_BY_SERIES_ID_NEXT_PAGE:
            return {
                ...state,
                fetching: true,
                error: null,
            }
        case fromComicsBySeriesIdActions.FETCH_COMICS_BY_SERIES_ID_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                pagination: action.pagination,
                data: [...state.data, ...action.payload],
            }
        case fromComicsBySeriesIdActions.FETCH_COMICS_BY_SERIES_ID_ERROR:
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
