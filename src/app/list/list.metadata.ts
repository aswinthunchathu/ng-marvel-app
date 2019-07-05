import * as fromRoot from '../store/app.selector'
import * as fromCharactersAction from '../characters/store/characters.actions'
import * as fromCharactersByComicIdAction from '../characters/store/byComicId/characters-by-comicId.actions'
import * as fromCharactersBySeriesIdAction from '../characters/store/bySeriesId/characters-by-seriesId.actions'
import * as fromCharactersByNameAction from '../characters/store/byName/characters-by-name.actions'
import * as fromComicsAction from '../comics/store/comics.actions'
import * as fromComicsByCharacterIdAction from '../comics/store/byCharacterId/comics-by-characterId.actions'
import * as fromComicsBySeriesIdAction from '../comics/store/bySeriesId/comics-by-seriesId.actions'
import * as fromComicsByNameActions from '../comics/store/byName/comics-by-name.actions'

import * as fromSeriesAction from '../series/store/series.actions'
import * as fromSeriesByCharacterIdAction from '../series/store/byCharacterId/series-by-characterId.actions'
import * as fromSeriesByNameActions from '../series/store/byName/series-by-name.actions'

export enum COMPONENT_TYPE {
    'characters' = 'characters',
    'comics' = 'comics',
    'series' = 'series',
}

export enum FILTER_TYPE {
    'none' = 'none',
    'byCharacterId' = 'byCharacterId',
    'byComicId' = 'byComicId',
    'bySeriesId' = 'bySeriesId',
    'byTitle' = 'byTitle',
}

export interface Filter {
    type: FILTER_TYPE
    value: string
}

const characterMapping: Record<string, any> = {
    [FILTER_TYPE.none]: {
        action: fromCharactersAction,
        state: 'characters',
        list: fromRoot.selectAllCharacters,
    },
    [FILTER_TYPE.byComicId]: {
        action: fromCharactersByComicIdAction,
        state: 'charactersByComicId',
        list: fromRoot.selectAllCharactersByComicId,
    },
    [FILTER_TYPE.bySeriesId]: {
        action: fromCharactersBySeriesIdAction,
        state: 'charactersBySeriesId',
        list: fromRoot.selectAllCharactersBySeriesId,
    },
    [FILTER_TYPE.byTitle]: {
        action: fromCharactersByNameAction,
        state: 'charactersByName',
        list: fromRoot.selectAllCharactersByName,
    },
}

const comicsMapping: Record<string, any> = {
    [FILTER_TYPE.none]: {
        action: fromComicsAction,
        state: 'comics',
        list: fromRoot.selectAllComics,
    },
    [FILTER_TYPE.byCharacterId]: {
        action: fromComicsByCharacterIdAction,
        state: 'comicByCharacterId',
        list: fromRoot.selectAllComicsByCharacterId,
    },
    [FILTER_TYPE.bySeriesId]: {
        action: fromComicsBySeriesIdAction,
        state: 'comicBySeriesId',
        list: fromRoot.selectAllComicsBySeriesId,
    },
    [FILTER_TYPE.byTitle]: {
        action: fromComicsByNameActions,
        state: 'comicsByName',
        list: fromRoot.selectAllComicsByName,
    },
}

const seriesMapping: Record<string, any> = {
    [FILTER_TYPE.none]: {
        action: fromSeriesAction,
        state: 'series',
        list: fromRoot.selectAllSeries,
    },
    [FILTER_TYPE.byCharacterId]: {
        action: fromSeriesByCharacterIdAction,
        state: 'seriesByCharacterId',
        list: fromRoot.selectAllSeriesByCharacterId,
    },
    [FILTER_TYPE.byTitle]: {
        action: fromSeriesByNameActions,
        state: 'seriesByName',
        list: fromRoot.selectAllSeriesByName,
    },
}

export const mapping: Record<string, any> = {
    [COMPONENT_TYPE.characters]: characterMapping,
    [COMPONENT_TYPE.comics]: comicsMapping,
    [COMPONENT_TYPE.series]: seriesMapping,
}
