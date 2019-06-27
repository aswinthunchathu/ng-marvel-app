import { createReducer, on, Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'

import * as fromActions from './ui.actions'

export interface State {
    fetching: boolean
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    error: null,
}

const uiReducer = (tag: string) =>
    createReducer<State>(
        initialState,
        on(fromActions.showSpinner(tag), state => ({
            ...state,
            fetching: true,
        })),
        on(fromActions.hideSpinner(tag), state => ({
            ...state,
            fetching: false,
        })),
        on(fromActions.setError(tag), (state, action) => ({
            ...state,
            error: action.payload,
        })),
        on(fromActions.resetError(tag), (state, action) => ({
            ...state,
            error: null,
        }))
    )

export const reducer = (tag: string) => (state: State | undefined, action: Action) => uiReducer(tag)(state, action)
