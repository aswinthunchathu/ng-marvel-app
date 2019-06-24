import { HttpErrorResponse } from '@angular/common/http'

import * as fromCharactersByComicIdActions from './characters-by-comicId.actions'
import { PAGE_LIMIT } from '../../../constants'
import { Pagination } from '../../../shared/model/pagination.model'
import { CharacterModel } from '../../character.model'
import { createReducer, on, Action } from '@ngrx/store'

export interface State {
    fetching: boolean
    data: CharacterModel[]
    pagination: Pagination
    error: HttpErrorResponse
    filterId: number
}

const initialState: State = {
    fetching: false,
    pagination: new Pagination(-1, PAGE_LIMIT, 0, 0),
    data: [],
    error: null,
    filterId: null,
}

const charactersByComicIdReducer = createReducer<State>(
    initialState,
    on(fromCharactersByComicIdActions.fetchStart, (state, action) => {
        if (state.filterId === action.payload) {
            return {
                ...state,
                fetching: true,
                error: null,
            }
        } else {
            return {
                ...state,
                ...initialState,
                fetching: true,
                filterId: action.payload,
            }
        }
    }),
    on(fromCharactersByComicIdActions.fetchNextPage, state => ({
        ...state,
        fetching: true,
        error: null,
    })),
    on(fromCharactersByComicIdActions.fetchSuccess, (state, action) => ({
        ...state,
        fetching: false,
        error: null,
        pagination: action.pagination,
        data: [...state.data, ...action.payload],
    })),
    on(fromCharactersByComicIdActions.fetchError, (state, action) => ({
        ...state,
        fetching: false,
        error: action.payload,
    })),
    on(fromCharactersByComicIdActions.fetchedFromStore, fromCharactersByComicIdActions.noMoreToFetch, state => ({
        ...state,
        fetching: false,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return charactersByComicIdReducer(state, action)
}
