import { HttpErrorResponse } from '@angular/common/http'
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'

import * as fromCharactersByComicIdActions from './characters-by-comicId.actions'
import { PAGE_LIMIT } from '../../../constants'
import { Pagination } from '../../../shared/model/pagination.model'
import { CharacterModel } from '../../character.model'
import { createReducer, on, Action } from '@ngrx/store'

export interface State extends EntityState<CharacterModel> {
    fetching: boolean
    pagination: Pagination
    error: HttpErrorResponse
    filterId: number
}

export const adapter: EntityAdapter<CharacterModel> = createEntityAdapter<CharacterModel>()

const initialState = adapter.getInitialState({
    fetching: false,
    pagination: new Pagination(-1, PAGE_LIMIT, 0, 0),
    error: null,
    filterId: null,
})

const charactersByComicIdReducer = createReducer<State>(
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
    return charactersByComicIdReducer(state, action)
}

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
