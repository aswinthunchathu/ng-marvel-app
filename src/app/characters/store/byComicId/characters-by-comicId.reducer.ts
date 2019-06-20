import { HttpErrorResponse } from '@angular/common/http'

import * as fromCharactersByComicIdActions from './characters-by-comicId.actions'
import { PAGE_LIMIT } from '../../../shared/constants'
import { Pagination } from '../../../shared/model/pagination.model'
import { CharacterModel } from '../../character.model'

export interface State {
    fetching: boolean
    data: CharacterModel[]
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

export const charactersByComicIdReducer = (state = initialState, action: fromCharactersByComicIdActions.type) => {
    switch (action.type) {
        case fromCharactersByComicIdActions.FETCH_CHARACTERS_BY_COMIC_ID_START:
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
        case fromCharactersByComicIdActions.FETCH_CHARACTERS_BY_COMIC_ID_NEXT_PAGE:
            return {
                ...state,
                fetching: true,
                error: null,
            }
        case fromCharactersByComicIdActions.FETCH_CHARACTERS_BY_COMIC_ID_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                pagination: action.pagination,
                data: [...state.data, ...action.payload],
            }
        case fromCharactersByComicIdActions.FETCH_CHARACTERS_BY_COMIC_ID_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        case fromCharactersByComicIdActions.FETCHED_FROM_STORE:
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
