import { HttpErrorResponse } from '@angular/common/http'
import { createReducer, on, Action } from '@ngrx/store'

import * as fromComicActions from './comic.actions'
import { ComicModel } from '../../comic.model'

export interface State {
    fetching: boolean
    data: ComicModel
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    data: null,
    error: null,
}

const comicReducer = createReducer(
    initialState,
    on(fromComicActions.fetchStart, state => ({
        ...state,
        fetching: true,
        error: null,
    })),
    on(fromComicActions.fetchSuccess, (state, action) => ({
        ...state,
        fetching: false,
        error: null,
        data: action.payload,
    })),
    on(fromComicActions.fetchError, (state, action) => ({
        ...state,
        fetching: false,
        error: action.payload,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return comicReducer(state, action)
}
