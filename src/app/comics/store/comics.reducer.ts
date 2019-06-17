import { HttpErrorResponse } from '@angular/common/http'

import * as fromComicsActions from './comics.actions'
import { PAGE_LIMIT } from '../../shared/constants'
import { Pagination } from '../../shared/model/pagination.model'
import { ComicModel } from '../comic.model'

export interface State {
    fetching: boolean
    data: ComicModel[]
    pagination: Pagination
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    pagination: new Pagination(-1, PAGE_LIMIT, 0, 0),
    data: [],
    error: null,
}

export const comicsReducer = (state = initialState, action: fromComicsActions.type) => {
    switch (action.type) {
        case fromComicsActions.FETCH_COMICS_NEXT_PAGE:
        case fromComicsActions.FETCH_COMICS_INIT:
            return {
                ...state,
                fetching: true,
                error: null,
            }
        case fromComicsActions.FETCH_COMICS_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                pagination: action.pagination,
                data: [...state.data, ...action.payload],
            }
        case fromComicsActions.FETCH_COMICS_ERROR:
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
