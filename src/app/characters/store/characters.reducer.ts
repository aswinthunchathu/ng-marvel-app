import { HttpErrorResponse } from '@angular/common/http'
import { createReducer, on, Action } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

import * as fromCharacterActions from './characters.actions'
import { PAGE_LIMIT } from '../../constants'
import { Pagination } from '../../shared/model/pagination.model'
import { CharacterModel } from '../character.model'

export interface State extends EntityState<CharacterModel> {
    fetching: boolean
    pagination: Pagination
    error: HttpErrorResponse
}

export const adapter: EntityAdapter<CharacterModel> = createEntityAdapter<CharacterModel>()

const initialState = adapter.getInitialState({
    fetching: false,
    pagination: new Pagination(-1, PAGE_LIMIT, 0, 0),
    error: null,
})

const charactersReducer = createReducer<State>(
    initialState,
    on(fromCharacterActions.fetchStart, fromCharacterActions.fetchNextPage, state => ({
        ...state,
        fetching: true,
        error: null,
    })),
    on(fromCharacterActions.fetchSuccess, (state, action) =>
        adapter.addMany(action.payload, {
            ...state,
            fetching: false,
            error: null,
            pagination: action.pagination,
        })
    ),
    on(fromCharacterActions.fetchError, (state, action) => ({
        ...state,
        fetching: false,
        error: action.payload,
    })),
    on(fromCharacterActions.fetchedFromStore, fromCharacterActions.noMoreToFetch, state => ({
        ...state,
        fetching: false,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return charactersReducer(state, action)
}

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
