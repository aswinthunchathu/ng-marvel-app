import { createReducer, on, Action } from '@ngrx/store'

import * as fromCharacterActions from './character.actions'
import { CharacterModel } from '../../../model/character.model'

export interface State {
    data: CharacterModel
}

const initialState: State = {
    data: null,
}

const characterReducer = createReducer<State>(
    initialState,
    on(fromCharacterActions.fetchSuccess, (state, action) => ({
        ...state,
        data: action.payload,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return characterReducer(state, action)
}
