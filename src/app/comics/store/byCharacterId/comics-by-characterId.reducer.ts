import { HttpErrorResponse } from '@angular/common/http'

import * as fromComicsByCharacterIdActions from './comics-by-characterId.actions'
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

export const comicsByCharacterIdReducer = (state = initialState, action: fromComicsByCharacterIdActions.type) => {
    switch (action.type) {
        case fromComicsByCharacterIdActions.FETCH_COMICS_BY_CHARACTER_ID_START:
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
        case fromComicsByCharacterIdActions.FETCH_COMICS_BY_CHARACTER_ID_NEXT_PAGE:
            return {
                ...state,
                fetching: true,
                error: null,
            }
        case fromComicsByCharacterIdActions.FETCH_COMICS_BY_CHARACTER_ID_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                pagination: action.pagination,
                data: [...state.data, ...action.payload],
            }
        case fromComicsByCharacterIdActions.FETCH_COMICS_BY_CHARACTER_ID_ERROR:
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
