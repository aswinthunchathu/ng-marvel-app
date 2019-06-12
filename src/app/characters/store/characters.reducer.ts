import { HttpErrorResponse } from '@angular/common/http'

import { Character } from '../../shared/model/shared.interface'
import * as fromCharacterActions from './characters.actions'
import { CHARACTER_LIMIT } from 'src/app/shared/constants'
import { Pagination } from '../../shared/model/pagination.model'

export interface State {
    fetching: boolean
    data: Character[]
    pagination: Pagination
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    pagination: new Pagination(-1, CHARACTER_LIMIT, 0, 0),
    data: [],
    error: null,
}

export const CharactersReducer = (state = initialState, action: fromCharacterActions.type) => {
    switch (action.type) {
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
        default:
            return {
                ...state,
            }
    }
}
