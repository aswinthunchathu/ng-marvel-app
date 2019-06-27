import { combineReducers } from '@ngrx/store'

import { ACTION_TAGS } from '../../../constants'
import * as fromUIReducer from '../../../shared/store/ui/ui.reducer'
import * as fromReducer from './character.reducer'

export interface State {
    ui: fromUIReducer.State
    data: fromReducer.State
}

export default combineReducers<State>({
    ui: fromUIReducer.reducer(ACTION_TAGS.character),
    data: fromReducer.reducer,
})
