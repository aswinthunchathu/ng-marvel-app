/*
 * All the NgRx selectors goes here
 */

import { createSelector } from '@ngrx/store'

import { AppState } from './app.reducer'

import * as fromCharactersReducer from '../characters/store/characters.reducer'
import * as fromCharactersByComicIdReducer from '../characters/store/byComicId/characters-by-comicId.reducer'
import * as fromCharactersBySeriesIdReducer from '../characters/store/bySeriesId/characters-by-seriesId.reducer'
import * as fromCharactersByNameReducer from '../characters/store/byName/characters-by-name.reducer'
import * as fromComicsReducer from '../comics/store/comics.reducer'
import * as fromComicsByCharacterIdReducer from '../comics/store/byCharacterId/comics-by-characterId.reducer'
import * as fromComicsBySeriesIdReducer from '../comics/store/bySeriesId/comics-by-seriesId.reducer'
import * as fromComicsByNameReducer from '../comics/store/byName/comics-by-name.reducer'
import * as fromSeriesReducer from '../series/store/series.reducer'
import * as fromSeriesByCharacterIdReducer from '../series/store/byCharacterId/series-by-characterId.reducer'
import * as fromSeriesByNameReducer from '../series/store/byName/series-by-name.reducer'

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

const charactersByName = (state: AppState) => state.charactersByName.data

export const selectAllCharactersByName = createSelector(
    charactersByName,
    fromCharactersByNameReducer.selectAll
)

export const selectCharactersByNameTotal = createSelector(
    charactersByName,
    fromCharactersByNameReducer.selectTotal
)

export const selectFilterForCharactersByName = createSelector(
    charactersByName,
    state => {
        return state.filter
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

const comicsByName = (state: AppState) => state.comicsByName.data

export const selectAllComicsByName = createSelector(
    comicsByName,
    fromComicsByNameReducer.selectAll
)

export const selectComicsByNameTotal = createSelector(
    comicsByName,
    fromComicsByNameReducer.selectTotal
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

const seriesByName = (state: AppState) => state.seriesByName.data

export const selectAllSeriesByName = createSelector(
    seriesByName,
    fromSeriesByNameReducer.selectAll
)

export const selectSeriesByNameTotal = createSelector(
    seriesByName,
    fromSeriesByNameReducer.selectTotal
)
