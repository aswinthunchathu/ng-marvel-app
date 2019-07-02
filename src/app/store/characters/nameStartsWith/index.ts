import { combineReducers } from '@ngrx/store'

import { ACTION_TAGS } from '../../../constants'
import * as fromUIReducer from '../../ui/ui.reducer'
import * as fromReducer from './characters-by-name.reducer'

export interface State {
    ui: fromUIReducer.State
    data: fromReducer.State
}

export default combineReducers<State>({
    ui: fromUIReducer.reducer(ACTION_TAGS.charactersByNameStartsWith),
    data: fromReducer.reducer,
})
