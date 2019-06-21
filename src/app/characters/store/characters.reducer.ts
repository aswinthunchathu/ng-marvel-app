import { HttpErrorResponse } from '@angular/common/http'
import { createReducer, on, Action, createSelector } from '@ngrx/store'

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

const charactersReducer = createReducer(
    initialState,
    on(fromCharacterActions.fetchStart, fromCharacterActions.fetchNextPage, state => ({
        ...state,
        fetching: true,
        error: null,
    })),
    on(fromCharacterActions.fetchSuccess, (state, action) => ({
        ...state,
        fetching: false,
        error: null,
        pagination: action.pagination,
        data: [...state.data, ...action.payload],
    })),
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
