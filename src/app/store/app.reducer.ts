import { ActionReducerMap } from '@ngrx/store'

import * as fromCharacters from './characters'
import * as fromCharacter from './characters/details'
import * as fromCharactersByComicId from './characters/byComicId'
import * as fromCharactersBySeriesId from './characters/bySeriesId'
import * as fromCharactersByName from './characters/byName'

import * as fromComics from './comics'
import * as fromComic from './comics/details'
import * as fromComicsByCharacterId from './comics/byCharacterId'
import * as fromComicsBySeriesId from './comics/bySeriesId'

import * as fromSeries from './series'
import * as fromSeriesByCharacterId from './series/byCharacterId'
import * as fromSeriesDetails from './series/details'

export interface AppState {
    characters: fromCharacters.State
    character: fromCharacter.State
    charactersByComicId: fromCharactersByComicId.State
    charactersBySeriesId: fromCharactersBySeriesId.State
    charactersByName: fromCharactersByName.State
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
    charactersByName: fromCharactersByName.default,
    comics: fromComics.default,
    comic: fromComic.default,
    comicByCharacterId: fromComicsByCharacterId.default,
    comicBySeriesId: fromComicsBySeriesId.default,
    series: fromSeries.default,
    seriesDetails: fromSeriesDetails.default,
    seriesByCharacterId: fromSeriesByCharacterId.default,
}
