import { createReducer, on, Action } from '@ngrx/store'
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'

import * as fromComicsByNameActions from './comics-by-name.actions'
import { CharacterModel } from '../../../characters/character.model'

export interface State extends EntityState<CharacterModel> {
    filter: string
}

export const adapter: EntityAdapter<CharacterModel> = createEntityAdapter<CharacterModel>()

const initialState = adapter.getInitialState({
    filter: null,
})

const generateReducer = createReducer<State>(
    initialState,
    on(fromComicsByNameActions.fetchStart, (state, action) => {
        if (state.filter === action.payload) {
            return {
                ...state,
            }
        } else {
            return {
                ...state,
                ...initialState,
                filter: action.payload,
            }
        }
    }),
    on(fromComicsByNameActions.fetchSuccess, (state, action) => adapter.addMany(action.payload, state))
)

export function reducer(state: State | undefined, action: Action) {
    return generateReducer(state, action)
}

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
