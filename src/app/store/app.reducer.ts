import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store'

import * as fromUIReducer from './ui/ui.reducer'
import * as fromPaginationReducer from './ui/pagination.reducer'
import * as fromCharactersReducer from '../characters/store/characters.reducer'
import * as fromComicsReducer from '../comics/store/comics.reducer'
import * as fromComicsByCharacterIdReducer from '../comics/store/byCharacterId/comics-by-characterId.reducer'
import * as fromComicsBySeriesIdReducer from '../comics/store/bySeriesId/comics-by-seriesId.reducer'
import * as fromComicReducer from '../comics/comic-details/store/comic.reducer'
import * as fromCharacterReducer from '../characters/character-details/store/character.reducer'
import * as fromSeriesReducer from '../series/store/series.reducer'
import * as fromSeriesDetailsReducer from '../series/series-details/store/series-details.reducer'
import * as fromSeriesByCharacterIdReducer from '../series/store/byCharacterId/series-by-characterId.reducer'
import * as fromCharactersByComicIdReducer from '../characters/store/byComicId/characters-by-comicId.reducer'
import * as fromCharactersBySeriesIdReducer from '../characters/store/bySeriesId/characters-by-seriesId.reducer'
import { ACTION_TAGS } from '../constants'

export interface AppState {
    charactersUI: fromUIReducer.State
    charactersPagination: fromPaginationReducer.State
    characters: fromCharactersReducer.State

    charactersByComicIdUI: fromUIReducer.State
    charactersByComicIdPagination: fromPaginationReducer.State
    charactersByComicId: fromCharactersByComicIdReducer.State

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
    charactersUI: fromUIReducer.reducer(ACTION_TAGS.characters),
    charactersPagination: fromPaginationReducer.reducer(ACTION_TAGS.characters),
    characters: fromCharactersReducer.reducer,

    charactersByComicIdUI: fromUIReducer.reducer(ACTION_TAGS.charactersByComicId),
    charactersByComicIdPagination: fromPaginationReducer.reducer(ACTION_TAGS.charactersByComicId),
    charactersByComicId: fromCharactersByComicIdReducer.reducer,

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

const selectCharactersState = (state: AppState) => state.characters

export const charactersState = createSelector(
    (state: AppState) => state.charactersUI,
    (state: AppState) => state.charactersPagination,
    selectCharactersState,
    (ui, pagination, state) => ({
        ui,
        data: fromCharactersReducer.selectAll(state),
        pagination: pagination.data,
    })
)

export const selectTotalCharacters = createSelector(
    selectCharactersState,
    fromCharactersReducer.selectTotal
)

const selectCharactersByComicIdState = (state: AppState) => state.charactersByComicId

export const charactersByComicIdState = createSelector(
    (state: AppState) => state.charactersByComicIdUI,
    (state: AppState) => state.charactersByComicIdPagination,
    selectCharactersByComicIdState,
    (ui, pagination, state) => ({
        ui,
        data: fromCharactersByComicIdReducer.selectAll(state),
        pagination: pagination.data,
        filterId: state.filterId,
    })
)

export const selectTotalCharactersByComicId = createSelector(
    selectCharactersByComicIdState,
    fromCharactersByComicIdReducer.selectTotal
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
    selectCharactersByComicIdState,
    fromCharactersBySeriesIdReducer.selectTotal
)
