import { HttpErrorResponse } from '@angular/common/http'

import { Character } from '../../../shared/model/shared.interface'
import * as fromCharacterActions from './character.actions'

export interface State {
    fetching: boolean
    data: Character
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    data: null,
    error: null,
}

export const characterReducer = (state = initialState, action: fromCharacterActions.type) => {
    switch (action.type) {
        case fromCharacterActions.FETCH_CHARACTER_START:
            return {
                ...state,
                fetching: true,
                error: null,
            }
        case fromCharacterActions.FETCH_CHARACTER_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                data: action.payload,
            }
        case fromCharacterActions.FETCH_CHARACTER_ERROR:
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
