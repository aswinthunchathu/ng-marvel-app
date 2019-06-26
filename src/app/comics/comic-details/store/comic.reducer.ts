import { HttpErrorResponse } from '@angular/common/http'
import { createReducer, on, Action } from '@ngrx/store'

import * as fromComicActions from './comic.actions'
import { ComicModel } from '../../comic.model'

export interface State {
    data: ComicModel
}

const initialState: State = {
    data: null,
}

const characterReducer = createReducer<State>(
    initialState,
    on(fromComicActions.fetchSuccess, (state, action) => ({
        ...state,
        data: action.payload,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return characterReducer(state, action)
}
