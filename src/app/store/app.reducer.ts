import { createSelector, ActionReducerMap } from '@ngrx/store'

import { ACTION_TAGS } from '../constants'

import * as fromUIReducer from './ui/ui.reducer'
import * as fromPaginationReducer from './ui/pagination.reducer'
import * as fromCharacters from '../characters/store'
import * as fromCharactersByComicId from '../characters/store/byComicId'
import * as fromCharactersReducer from '../characters/store/characters.reducer'
import * as fromCharactersByComicIdReducer from '../characters/store/byComicId/characters-by-comicId.reducer'

import * as fromComicsReducer from '../comics/store/comics.reducer'
import * as fromComicsByCharacterIdReducer from '../comics/store/byCharacterId/comics-by-characterId.reducer'
import * as fromComicsBySeriesIdReducer from '../comics/store/bySeriesId/comics-by-seriesId.reducer'
import * as fromComicReducer from '../comics/comic-details/store/comic.reducer'
import * as fromCharacterReducer from '../characters/character-details/store/character.reducer'
import * as fromSeriesReducer from '../series/store/series.reducer'
import * as fromSeriesDetailsReducer from '../series/series-details/store/series-details.reducer'
import * as fromSeriesByCharacterIdReducer from '../series/store/byCharacterId/series-by-characterId.reducer'
import * as fromCharactersBySeriesIdReducer from '../characters/store/bySeriesId/characters-by-seriesId.reducer'

export interface AppState {
    characters: fromCharacters.State
    charactersByComicId: fromCharactersByComicId.State

    charactersBySeriesIdUI: fromUIReducer.State
    charactersBySeriesIdPagination: fromPaginationReducer.State
    charactersBySeriesId: fromCharactersBySeriesIdReducer.State

    comics: fromComicsReducer.State
    series: fromSeriesReducer.State
    character: fromCharacterReducer.State
    comicBySeriesId: fromComicsBySeriesIdReducer.State
    comicByCharacterId: fromComicsByCharacterIdReducer.State
    comic: fromComicReducer.State
    seriesDetails: fromSeriesDetailsReducer.State
    seriesByCharacterId: fromSeriesByCharacterIdReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    characters: fromCharacters.default,
    charactersByComicId: fromCharactersByComicId.default,

    charactersBySeriesIdUI: fromUIReducer.reducer(ACTION_TAGS.charactersBySeriesId),
    charactersBySeriesIdPagination: fromPaginationReducer.reducer(ACTION_TAGS.charactersBySeriesId),
    charactersBySeriesId: fromCharactersBySeriesIdReducer.reducer,

    comics: fromComicsReducer.reducer,
    series: fromSeriesReducer.reducer,

    character: fromCharacterReducer.reducer,
    comicBySeriesId: fromComicsBySeriesIdReducer.reducer,
    comicByCharacterId: fromComicsByCharacterIdReducer.reducer,
    comic: fromComicReducer.reducer,
    seriesDetails: fromSeriesDetailsReducer.reducer,
    seriesByCharacterId: fromSeriesByCharacterIdReducer.reducer,
}

export const selectAllCharacters = createSelector(
    (state: AppState) => state.characters.data,
    fromCharactersReducer.selectAll
)

export const selectCharactersTotal = createSelector(
    (state: AppState) => state.characters.data,
    fromCharactersReducer.selectTotal
)

export const selectAllCharactersByComicId = createSelector(
    (state: AppState) => state.charactersByComicId.data,
    fromCharactersByComicIdReducer.selectAll
)

export const selectCharactersByComicIdTotal = createSelector(
    (state: AppState) => state.charactersByComicId.data,
    fromCharactersByComicIdReducer.selectTotal
)

export const selectFilterIdForCharactersByComicId = createSelector(
    (state: AppState) => state.charactersByComicId.data,
    state => {
        return state.filterId
    }
)

const selectCharactersBySeriesIdState = (state: AppState) => state.charactersBySeriesId

export const charactersBySeriesIdState = createSelector(
    (state: AppState) => state.charactersBySeriesIdUI,
    (state: AppState) => state.charactersBySeriesIdPagination,
    selectCharactersBySeriesIdState,
    (ui, pagination, state) => ({
        ui,
        data: fromCharactersBySeriesIdReducer.selectAll(state),
        pagination: pagination.data,
        filterId: state.filterId,
    })
)
export const selectTotalCharactersBySeriesId = createSelector(
    selectCharactersBySeriesIdState,
    fromCharactersBySeriesIdReducer.selectTotal
)
