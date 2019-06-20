import { HttpErrorResponse } from '@angular/common/http'

import * as fromCharacterActions from './characters.actions'
import { PAGE_LIMIT } from '../../shared/constants'
import { Pagination } from '../../shared/model/pagination.model'
import { CharacterModel } from '../character.model'

export interface State {
    fetching: boolean
    data: CharacterModel[]
    pagination: Pagination
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    pagination: new Pagination(-1, PAGE_LIMIT, 0, 0),
    data: [],
    error: null,
}

export const charactersReducer = (state = initialState, action: fromCharacterActions.type) => {
    switch (action.type) {
        case fromCharacterActions.FETCH_CHARACTERS_NEXT_PAGE:
        case fromCharacterActions.FETCH_CHARACTERS_INIT:
            return {
                ...state,
                fetching: true,
                error: null,
            }
        case fromCharacterActions.FETCH_CHARACTERS_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                pagination: action.pagination,
                data: [...state.data, ...action.payload],
            }
        case fromCharacterActions.FETCH_CHARACTERS_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        case fromCharacterActions.FETCHED_FROM_STORE:
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
