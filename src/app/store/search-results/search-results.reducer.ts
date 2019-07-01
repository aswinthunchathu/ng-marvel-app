import { createReducer, on, Action } from '@ngrx/store'

import * as fromSearchResultsActions from './search-results.actions'
import { CharacterModel } from 'src/app/model/character.model'
import { ComicModel } from 'src/app/model/comic.model'
import { SeriesModel } from 'src/app/model/series.model'

export interface State {
    key: string
    characters: CharacterModel[]
    comics: ComicModel[]
    series: SeriesModel[]
}

const initialState: State = {
    key: null,
    characters: [],
    comics: [],
    series: [],
}

const searchResultsReducer = createReducer<State>(
    initialState,
    on(fromSearchResultsActions.setSearchKey, (state, action) => ({
        ...state,
        key: action.payload,
    })),
    on(fromSearchResultsActions.fetchCharactersSuccess, (state, action) => ({
        ...state,
        characters: action.payload,
    })),
    on(fromSearchResultsActions.fetchComicsSuccess, (state, action) => ({
        ...state,
        comics: action.payload,
    })),
    on(fromSearchResultsActions.fetchSeriesSuccess, (state, action) => ({
        ...state,
        series: action.payload,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return searchResultsReducer(state, action)
}
