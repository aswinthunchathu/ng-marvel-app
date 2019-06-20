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
}

const initialState: State = {
    fetching: false,
    pagination: new Pagination(-1, PAGE_LIMIT, 0, 0),
    data: [],
    error: null,
    filterId: null,
}

export const comicsBySeriesIdReducer = (state = initialState, action: fromComicsBySeriesIdActions.type) => {
    switch (action.type) {
        case fromComicsBySeriesIdActions.FETCH_COMICS_BY_SERIES_ID_START:
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
        case fromComicsBySeriesIdActions.FETCHED_FROM_STORE:
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
