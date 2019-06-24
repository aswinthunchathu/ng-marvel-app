import { HttpErrorResponse } from '@angular/common/http'
import { createReducer, on, Action } from '@ngrx/store'

import * as fromCharacterActions from './character.actions'
import { CharacterModel } from '../../character.model'

export interface State {
    fetching: boolean
    data: CharacterModel
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    data: null,
    error: null,
}

const characterReducer = createReducer<State>(
    initialState,
    on(fromCharacterActions.fetchStart, state => ({
        ...state,
        fetching: true,
        error: null,
    })),
    on(fromCharacterActions.fetchSuccess, (state, action) => ({
        ...state,
        fetching: false,
        error: null,
        data: action.payload,
    })),
    on(fromCharacterActions.fetchError, (state, action) => ({
        ...state,
        fetching: false,
        error: action.payload,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return characterReducer(state, action)
}
