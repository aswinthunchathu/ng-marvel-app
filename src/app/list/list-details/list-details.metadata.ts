import { FILTER_TYPE } from '../list.metadata'

import * as fromListMetadata from '../list.metadata'
import * as fromCharacterDetailsActions from '../../characters/store/details/character.actions'
import * as fromComicDetailsActions from '../../comics/store/details/comic.actions'
import * as fromSeriesDetailsActions from '../../series/store/details/series-details.actions'

export enum COMPONENT_TYPE {
    'character' = 'character',
    'comic' = 'comic',
    'seriesDetails' = 'seriesDetails',
}

export const mapping: Record<string, any> = {
    [COMPONENT_TYPE.character]: {
        action: fromCharacterDetailsActions,
        filterKey: FILTER_TYPE.byCharacterId,
        tabs: [
            {
                label: 'Comics',
                type: fromListMetadata.COMPONENT_TYPE.comics,
            },
            {
                label: 'Series',
                type: fromListMetadata.COMPONENT_TYPE.series,
            },
        ],
    },
    [COMPONENT_TYPE.comic]: {
        action: fromComicDetailsActions,
        filterKey: FILTER_TYPE.byComicId,
        tabs: [
            {
                label: 'Characters',
                type: fromListMetadata.COMPONENT_TYPE.characters,
            },
        ],
    },
    [COMPONENT_TYPE.seriesDetails]: {
        action: fromSeriesDetailsActions,
        filterKey: FILTER_TYPE.bySeriesId,
        tabs: [
            {
                label: 'Characters',
                type: fromListMetadata.COMPONENT_TYPE.characters,
            },
            {
                label: 'Comics',
                type: fromListMetadata.COMPONENT_TYPE.comics,
            },
        ],
    },
}
