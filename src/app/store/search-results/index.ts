import { combineReducers } from '@ngrx/store'

import { ACTION_TAGS } from '../../constants'
import * as fromUIReducer from '../ui/ui.reducer'
import * as fromReducer from './search-results.reducer'

export interface State {
    charactersUI: fromUIReducer.State
    comicsUI: fromUIReducer.State
    seriesUI: fromUIReducer.State
    data: fromReducer.State
}

export default combineReducers<State>({
    charactersUI: fromUIReducer.reducer(ACTION_TAGS.searchCharacters),
    comicsUI: fromUIReducer.reducer(ACTION_TAGS.searchComics),
    seriesUI: fromUIReducer.reducer(ACTION_TAGS.searchSeries),
    data: fromReducer.reducer,
})
