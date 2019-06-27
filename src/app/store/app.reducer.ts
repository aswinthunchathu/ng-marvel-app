import { createSelector, ActionReducerMap } from '@ngrx/store'

import * as fromCharacters from '../characters/store'
import * as fromCharacter from '../characters/character-details/store'
import * as fromCharactersByComicId from '../characters/store/byComicId'
import * as fromCharactersBySeriesId from '../characters/store/bySeriesId'
import * as fromCharactersReducer from '../characters/store/characters.reducer'
import * as fromCharactersByComicIdReducer from '../characters/store/byComicId/characters-by-comicId.reducer'
import * as fromCharactersBySeriesIdReducer from '../characters/store/bySeriesId/characters-by-seriesId.reducer'

import * as fromComics from '../comics/store'
import * as fromComicsReducer from '../comics/store/comics.reducer'
import * as fromComic from '../comics/comic-details/store'
import * as fromComicsByCharacterId from '../comics/store/byCharacterId'
import * as fromComicsByCharacterIdReducer from '../comics/store/byCharacterId/comics-by-characterId.reducer'
import * as fromComicsBySeriesId from '../comics/store/bySeriesId'
import * as fromComicsBySeriesIdReducer from '../comics/store/bySeriesId/comics-by-seriesId.reducer'

import * as fromSeries from '../series/store'
import * as fromSeriesByCharacterId from '../series/store/byCharacterId'
import * as fromSeriesReducer from '../series/store/series.reducer'
import * as fromSeriesDetails from '../series/series-details/store'
import * as fromSeriesByCharacterIdReducer from '../series/store/byCharacterId/series-by-characterId.reducer'

export interface AppState {
    characters: fromCharacters.State
    character: fromCharacter.State
    charactersByComicId: fromCharactersByComicId.State
    charactersBySeriesId: fromCharactersBySeriesId.State

    comics: fromComics.State
    comic: fromComic.State
    comicByCharacterId: fromComicsByCharacterId.State
    comicBySeriesId: fromComicsBySeriesId.State

    series: fromSeries.State
    seriesDetails: fromSeriesDetails.State
    seriesByCharacterId: fromSeriesByCharacterId.State
}

export const appReducer: ActionReducerMap<AppState> = {
    characters: fromCharacters.default,
    character: fromCharacter.default,
    charactersByComicId: fromCharactersByComicId.default,
    charactersBySeriesId: fromCharactersBySeriesId.default,

    comics: fromComics.default,
    comic: fromComic.default,
    comicByCharacterId: fromComicsByCharacterId.default,
    comicBySeriesId: fromComicsBySeriesId.default,

    series: fromSeries.default,
    seriesDetails: fromSeriesDetails.default,
    seriesByCharacterId: fromSeriesByCharacterId.default,
}

const characters = (state: AppState) => state.characters.data

export const selectAllCharacters = createSelector(
    characters,
    fromCharactersReducer.selectAll
)

export const selectCharactersTotal = createSelector(
    characters,
    fromCharactersReducer.selectTotal
)

const charactersByComicId = (state: AppState) => state.charactersByComicId.data

export const selectAllCharactersByComicId = createSelector(
    charactersByComicId,
    fromCharactersByComicIdReducer.selectAll
)

export const selectCharactersByComicIdTotal = createSelector(
    charactersByComicId,
    fromCharactersByComicIdReducer.selectTotal
)

export const selectFilterIdForCharactersByComicId = createSelector(
    charactersByComicId,
    state => {
        return state.filterId
    }
)

const charactersBySeriesId = (state: AppState) => state.charactersBySeriesId.data

export const selectAllCharactersBySeriesId = createSelector(
    charactersBySeriesId,
    fromCharactersBySeriesIdReducer.selectAll
)

export const selectCharactersBySeriesIdTotal = createSelector(
    charactersBySeriesId,
    fromCharactersBySeriesIdReducer.selectTotal
)

export const selectFilterIdForCharactersBySeriesId = createSelector(
    charactersBySeriesId,
    state => {
        return state.filterId
    }
)

const comics = (state: AppState) => state.comics.data

export const selectAllComics = createSelector(
    comics,
    fromComicsReducer.selectAll
)

export const selectComicsTotal = createSelector(
    comics,
    fromComicsReducer.selectTotal
)

const comicsByCharacterId = (state: AppState) => state.comicByCharacterId.data

export const selectAllComicsByCharacterId = createSelector(
    comicsByCharacterId,
    fromComicsByCharacterIdReducer.selectAll
)

export const selectComicsByCharacterIdTotal = createSelector(
    comicsByCharacterId,
    fromComicsByCharacterIdReducer.selectTotal
)

export const selectFilterIdForComicsByCharacterId = createSelector(
    comicsByCharacterId,
    state => {
        return state.filterId
    }
)

const comicsBySeriesId = (state: AppState) => state.comicBySeriesId.data

export const selectAllComicsBySeriesId = createSelector(
    comicsBySeriesId,
    fromComicsBySeriesIdReducer.selectAll
)

export const selectComicsBySeriesIdTotal = createSelector(
    comicsBySeriesId,
    fromComicsBySeriesIdReducer.selectTotal
)

export const selectFilterIdForComicsBySeriesId = createSelector(
    comicsBySeriesId,
    state => {
        return state.filterId
    }
)

const series = (state: AppState) => state.series.data

export const selectAllSeries = createSelector(
    series,
    fromSeriesReducer.selectAll
)

export const selectSeriesTotal = createSelector(
    series,
    fromSeriesReducer.selectTotal
)

const seriesByCharacterId = (state: AppState) => state.seriesByCharacterId.data

export const selectAllSeriesByCharacterId = createSelector(
    seriesByCharacterId,
    fromSeriesByCharacterIdReducer.selectAll
)

export const selectSeriesByCharacterIdTotal = createSelector(
    seriesByCharacterId,
    fromSeriesByCharacterIdReducer.selectTotal
)

export const selectFilterIdForSeriesByCharacterId = createSelector(
    seriesByCharacterId,
    state => {
        return state.filterId
    }
)
