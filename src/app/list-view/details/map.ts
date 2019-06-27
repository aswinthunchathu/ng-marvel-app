import { FILTER_TYPE } from '../map'
import * as fromCharacterActions from '../../characters/character-details/store/character.actions'
import * as fromComicActions from '../../comics/comic-details/store/comic.actions'
import * as fromSeriesDetailsActions from '../../series/details/store/series-details.actions'

export enum COMPONENT_TYPE {
    'characterDetails' = 'characterDetails',
    'comicDetails' = 'comicDetails',
    'seriesDetails' = 'seriesDetails',
}

export const componentSettings = {
    [COMPONENT_TYPE.characterDetails]: {
        filterKey: FILTER_TYPE.character,
        action: fromCharacterActions,
        state: 'character',
    },
    [COMPONENT_TYPE.comicDetails]: {
        filterKey: FILTER_TYPE.comic,
        action: fromComicActions,
        state: 'comic',
    },
    [COMPONENT_TYPE.seriesDetails]: {
        filterKey: FILTER_TYPE.series,
        action: fromSeriesDetailsActions,
        state: 'seriesDetails',
    },
}

export const getSettings = (type: COMPONENT_TYPE) => componentSettings[type]
