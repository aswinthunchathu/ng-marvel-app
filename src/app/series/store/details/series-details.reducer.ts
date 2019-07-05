import { createReducer, on, Action } from '@ngrx/store'

import * as fromSeriesDetailsActions from './series-details.actions'
import { SeriesModel } from '../../series.model'

export interface State {
    data: SeriesModel
}

const initialState: State = {
    data: null,
}

const characterReducer = createReducer<State>(
    initialState,
    on(fromSeriesDetailsActions.fetchSuccess, (state, action) => ({
        ...state,
        data: action.payload,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return characterReducer(state, action)
}
