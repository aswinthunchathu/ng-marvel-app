import { createReducer, on, Action } from '@ngrx/store'
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'

import * as fromCharactersByComicIdActions from './characters-by-comicId.actions'
import { CharacterModel } from '../../character.model'

export interface State extends EntityState<CharacterModel> {
    filterId: string
}

export const adapter: EntityAdapter<CharacterModel> = createEntityAdapter<CharacterModel>()

const initialState = adapter.getInitialState({
    filterId: null,
})

const generateReducer = createReducer<State>(
    initialState,
    on(fromCharactersByComicIdActions.fetchStart, (state, action) => {
        if (state.filterId === action.payload) {
            return {
                ...state,
            }
        } else {
            return {
                ...state,
                ...initialState,
                filterId: action.payload,
            }
        }
    }),
    on(fromCharactersByComicIdActions.fetchSuccess, (state, action) => adapter.addMany(action.payload, state))
)

export function reducer(state: State | undefined, action: Action) {
    return generateReducer(state, action)
}

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
