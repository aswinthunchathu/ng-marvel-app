import { HttpErrorResponse } from '@angular/common/http'

import { Comic } from '../../shared/model/shared.interface'
import * as fromComicsActions from './comics.actions'
import { CHARACTER_LIMIT } from 'src/app/shared/constants'
import { Pagination } from '../../shared/model/pagination.model'

export interface State {
    fetching: boolean
    data: Comic[]
    pagination: Pagination
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    pagination: new Pagination(-1, CHARACTER_LIMIT, 0, 0),
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
