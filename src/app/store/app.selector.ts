/*
 * All the NgRx selectors goes here
 */

import { createSelector } from '@ngrx/store'

import { AppState } from './app.reducer'

import * as fromCharactersReducer from './characters/characters.reducer'
import * as fromCharactersByComicIdReducer from './characters/byComicId/characters-by-comicId.reducer'
import * as fromCharactersBySeriesIdReducer from './characters/bySeriesId/characters-by-seriesId.reducer'
import * as fromCharactersByNameReducer from './characters/byName/characters-by-name.reducer'
import * as fromComicsReducer from './comics/comics.reducer'
import * as fromComicsByCharacterIdReducer from './comics/byCharacterId/comics-by-characterId.reducer'
import * as fromComicsBySeriesIdReducer from './comics/bySeriesId/comics-by-seriesId.reducer'
import * as fromSeriesReducer from './series/series.reducer'
import * as fromSeriesByCharacterIdReducer from './series/byCharacterId/series-by-characterId.reducer'

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

const charactersByName = (state: AppState) => state.charactersByName.data

export const selectAllCharactersByName = createSelector(
    charactersByName,
    fromCharactersByNameReducer.selectAll
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
