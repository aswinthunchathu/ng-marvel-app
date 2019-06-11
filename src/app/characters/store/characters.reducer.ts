import { HttpErrorResponse } from '@angular/common/http'

import { Character } from 'src/app/shared/shared.interface'
import { Page } from '../../shared/shared.interface'
import * as fromCharacterActions from './characters.actions'

export interface State {
    fetching: boolean
    data: Character[]
    pagination: Page
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    pagination: {
        offset: 0,
        limit: 0,
        total: 0,
        count: 0,
    },
    data: [],
    error: null,
}

export const CharactersReducer = (state = initialState, action: fromCharacterActions.type) => {
    switch (action.type) {
        case fromCharacterActions.FETCH_CHARACTERS_START:
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
                pagination: { ...state.pagination, ...action.pagination },
                data: [...action.payload],
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
